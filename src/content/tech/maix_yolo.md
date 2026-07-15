---
title: 'YOLO11 自定义模型转换：从 PyTorch 到 MaixCAM2 完整踩坑记录'
description: '将 32 类 YOLO11 模型从 .pt 转换为 MaixCAM2 可运行的 .axmodel，涵盖 ONNX 导出、pulsar2 量化编译、mud 配置和 MaixPy 部署的全流程'
publishDate: '2026-07-15'
updatedDate: '2026-07-15'
tags:
  - YOLO11
  - MaixCAM2
  - ONNX
  - 模型部署
language: 'Chinese'
draft: false
slug: 'maix_yolo'
heroImage: { src: './images/maix_yolo/cover.jpg', color: '#4A90E2' }
---

## 前言

很多 MaixCAM2 的 AI 教程都是这样开始的：

```python
from maix import nn
detector = nn.YOLO11(model="/root/best.mud", dual_buff=True)
```

两行代码跑通，然后呢？`.pt` 怎么变成 `.axmodel` 的？pulsar2 量化到底做了什么？6 个 Conv 输出为什么被重构成了 3 个 Concat？`best.mud` 里 `mean` 和 `scale` 的值从哪来的？

这条命令背后压缩了一整套模型转换、量化编译、边缘部署的知识。这篇把 YOLO11 从 PyTorch 训练好的 `.pt`，经过 ONNX 导出、pulsar2 量化编译，到 MaixCAM2 上实时运行——不靠现成模型、不走一键脚本，每一步搞清楚为什么。

**起点**：32 类自定义数据集训练好的 `best.pt`，输入 640×480。

---

## 一、整体流程

目标很明确——训练好的 YOLO11 权重，跑到 MaixCAM2 的 NPU 上：

```
[训练机 Windows]  .pt → ONNX 导出
        │ scp / U盘
        ▼
[开发机 Linux]    检查 ONNX 通道 → 校准图片准备
        │
        ▼
[Docker 容器]     重构节点 → 提取 → 简化 → 量化校准 → NPU 编译 → .axmodel
        │ scp
        ▼
[MaixCAM2]        放入 mud + axmodel → MaixPy 加载运行
```

不用 Python 驱动层、不搞多传感器。Sipeed 官方提供 pulsar2 Docker 镜像做交叉编译，MaixPy 内置 YOLO11 解码器。

---

## 二、资源准备

### 2.1 工具链选型：Lite 还是 Full？

Sipeed 提供两个版本的 pulsar2 Docker 镜像：

| 文件 | 大小 | 说明 |
|------|------|------|
| `ax_pulsar2_6.0_lite.tar.gz` | ~1 GB | **Lite（精简版）**，推荐 |
| `ax_pulsar2_6.0.tar.gz` | ~5 GB | Full（完整版） |

我选了 Lite。为什么？因为 Lite 核心编译器完整，缺的包一条命令补上：

```bash
pip install onnx onnxsim -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

| 对比项 | Lite (~1GB) | Full (~5GB) |
|--------|-------------|-------------|
| `pulsar2 build` 编译器 | ✅ 有 | ✅ 有 |
| `onnxsim` | ❌ 没有 | ✅ 预装 |
| 压缩包大小 | 1 GB | 5 GB |
| 解压后体积 | ~3 GB | ~15 GB |

5GB 的镜像里大部分是我用不到的东西。Lite 解压快、占空间小，缺的 `onnxsim` 只多花一条 `pip install`，完全没必要为这一个包多下载 4GB。

补充安装的实际包量：

| 包名 | 大小 | 用途 |
|------|------|------|
| `onnx` | 19 MB | ONNX 模型读写 |
| `onnxsim` | 3 MB | ONNX 图简化 |
| `numpy` | 17 MB | onnx 依赖 |
| `protobuf` | 0.3 MB | onnx 依赖 |
| `ml_dtypes` | 5 MB | onnx 依赖 |
| `rich` + 其他 | < 2 MB | onnxsim 依赖 |

**下载地址：** [Sipeed 下载站 → MaixCAM2 → tools](https://dl.sipeed.com/shareURL/MaixCAM/MaixCAM2/tools)

### 2.2 参考文档

- MaixPy YOLO11 教程：https://wiki.sipeed.com/maixpy/doc/cn/course/basic/ai/yolo11.html
- Pulsar2 使用指南：https://pulsar2-docs.readthedocs.io/
- 模型转换教程：https://wiki.sipeed.com/maixpy/doc/cn/course/ai/deploy/maixcam2.html

---

## 三、ONNX 导出

在训练机上用 ultralytics 导出：

```python
from ultralytics import YOLO

model = YOLO("best_last.pt")

path = model.export(
    format="onnx",
    imgsz=[640, 480],
    dynamic=False,
    simplify=True,
    opset=17
)
print(f"导出到: {path}")
```

导出后用 [Netron](https://netron.app/) 打开 ONNX，确认 6 个 Conv 输出节点：

```
/model.23/cv2.0/cv2.0.2/Conv_output_0   [1, 64, 80, 60]  ← bbox
/model.23/cv2.1/cv2.1.2/Conv_output_0   [1, 64, 40, 30]  ← bbox
/model.23/cv2.2/cv2.2.2/Conv_output_0   [1, 64, 20, 15]  ← bbox
/model.23/cv3.0/cv3.0.2/Conv_output_0   [1, 32, 80, 60]  ← cls
/model.23/cv3.1/cv3.1.2/Conv_output_0   [1, 32, 40, 30]  ← cls
/model.23/cv3.2/cv3.2.2/Conv_output_0   [1, 32, 20, 15]  ← cls
```

**检查要点：**
- 6 个输出，3 个 cv2（bbox 回归，64 通道 = 4×reg_max=16）+ 3 个 cv3（分类，32 通道 = 类别数）
- 通道数正确即可，具体空间尺寸取决于 imgsz

---

## 四、ONNX 通道错误：第一个坑

把转换后的 `.axmodel` 部署到 MaixCAM2，以为大功告成，结果：

```
need 3 bbox and 3 cls outputs
```

**原因：** ONNX 导出的 cv3 通道数 ≠ 训练类别数——被截断了。

**解决：** 重新导出，不加 `output_names` 参数，保留完整输出。ultralytics 的 `model.export()` 默认会把所有检测头都输出，但如果手动指定了 `output_names` 筛选，就可能漏掉部分通道。

教训：导出后一定用 Netron 肉眼确认 6 个输出的通道数。

---

## 五、上传到 Linux 开发机

```bash
scp best.onnx uu20@192.168.x.x:/home/uu20/桌面/yolo/yolo11/
```

校准图片需要 ≥200 张训练样本（.jpg/.png），放到 `yolo11/val/` 下：

```bash
cd /home/uu20/桌面/yolo/yolo11
ls val/ | wc -l          # 确认 ≥ 200
```

---

## 六、Docker 环境搭建

```bash
# 首次加载镜像
sudo docker load -i /home/uu20/下载/ax_pulsar2_6.0_lite.tar.gz
sudo docker images | grep pulsar2

# 启动容器（取名，去掉 --rm 保留环境）
cd /home/uu20/桌面/yolo/yolo11
sudo docker run -it --net host --name yolo_build -v ./:/data pulsar2:6.0-lite
```

### 6.1 容器每次都是新的：第二个坑

第一次没加 `--name`，也没去掉 `--rm`。退出容器后环境全丢——装的 `onnxsim` 没了，中间产物也没了。

**解决：** 去掉 `--rm`，加 `--name yolo_build` 命名。下次用 `docker start -ai yolo_build` 回来，环境完好：

```bash
sudo docker start -ai yolo_build
cd /data && bash build_yolo11.sh best
```

### 6.2 onnxsim 找不到：第三个坑

进入容器后直接跑转换脚本，报 `onnxsim: command not found`。

Lite 镜像不自带 `onnxsim`，但国内直连 PyPI 也慢。用阿里源：

```bash
pip install onnx onnxsim -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

---

## 七、ONNX → axmodel 转换

进入容器后：

```bash
cd /data

# 首次安装依赖（仅一次）
pip install onnx onnxsim -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com

# 一键转换（约 15-20 分钟）
bash build_yolo11.sh best
```

`build_yolo11.sh best` 做了五件事：

| 步骤 | 说明 | 产物 | 耗时 |
|------|------|------|------|
| Step 0 | `restructure_onnx.py` 重构：6 Conv → 3 per-scale 4D Concat | `tmp1/best_restructured.onnx` | < 1 min |
| Step 1 | `extract_onnx.py` 提取输出节点 | `tmp1/best_extracted.onnx` | < 1 min |
| Step 2 | `onnxsim` 简化 | `tmp1/best.onnx` | < 1 min |
| Step 3 | 打包校准图片 | `tmp_images/images.tar` | < 1 min |
| Step 4 | `pulsar2 build` NPU1 (vnpu) | `out/best_vnpu.axmodel` | ~8 min |
| Step 5 | `pulsar2 build` NPU2 (npu) | `out/best_npu.axmodel` | ~8 min |

**转换成功标志：**

```
========================================
转换完成! 输出文件在 out/ 目录:
  out/best_npu.axmodel
  out/best_vnpu.axmodel
========================================
```

6 个输出余弦相似度均 > 0.999 表示 INT8 量化精度接近无损。

### 7.1 YOLO26 与 YOLO11 的节点名差异：第四个坑

之前用 YOLO26 跑通了整个流程，换到 YOLO11 后节点名全变了：

| | YOLO26 | YOLO11 |
|---|---|---|
| bbox 节点 | `one2one_cv2.X/.../Conv` | `cv2.X/cv2.X.2/Conv` |
| cls 节点 | `one2one_cv3.X/.../Conv` | `cv3.X/cv3.X.2/Conv` |
| bbox 通道 | 4 | 64 (reg_max=16) |

`restructure_onnx.py` 里用节点名定位输出，YOLO26 的名字直接拿到 YOLO11 上全匹配不上。

**解决：** 用 Netron 找出 YOLO11 的实际节点名，更新 `restructure_onnx.py` 中的匹配规则。YOLO26 方案已归档到 `yolo26_archive/`。

### 7.2 Concat 输出维度问题：第五个坑（关键！）

MaixPy YOLO11 解码器需要 **3 个 4D Concat 输出**（每个尺度合并 bbox+cls），但 ultralytics 导出的 Concat 是跨尺度全局合并的 3D 输出。

**解决：** `restructure_onnx.py` 在编译前将 6 个 Conv 输出按尺度合并为 3 个 4D Concat（`per_scale_concat_0/1/2`，axis=1，输出 `[N, 96, H, W]`），再送入 pulsar2。

### 7.3 磁盘空间不足：第六个坑

Docker 镜像 1GB + ONNX 模型几百 MB + 校准图片 + pulsar2 中间产物，开发机磁盘很快就红了：

```bash
rm /home/uu20/下载/ax_pulsar2_6.0_lite.tar.gz  # 镜像已加载，tar.gz 可删
sudo apt clean
```

---

## 八、mud 配置文件

```ini
[basic]
type = axmodel
model_npu = best_npu.axmodel
model_vnpu = best_vnpu.axmodel

[extra]
model_type = yolo11
type = detector
input_type = rgb
labels = R_R1, B_R1, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, F18, F19, F20, F21, F22, F23, F24, F25, F26, F27, F28, F29, F30, F31, F32

input_cache = true
output_cache = true
input_cache_flush = false
output_cache_inval = true

mean = 0, 0, 0
scale = 0.00392156862745098, 0.00392156862745098, 0.00392156862745098
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| `type = axmodel` | MaixCAM2 模型格式 |
| `model_type = yolo11` | MaixPy YOLO11 解码器 |
| `model_npu` | 全 NPU 算力模型 |
| `model_vnpu` | AI-ISP 模式下半算力模型 |
| `labels` | 32 个类名，逗号分隔，顺序必须和训练一致 |
| `mean / scale` | 预处理参数（`1/255 ≈ 0.00392`，已在模型中集成） |

---

## 九、部署到 MaixCAM2

```bash
scp out/best_npu.axmodel root@maixcam2:/root/
scp out/best_vnpu.axmodel root@maixcam2:/root/
scp best.mud root@maixcam2:/root/
```

或用 ADB / U 盘。

---

## 十、MaixPy 运行

```python
from maix import camera, display, image, nn, app, comm
import struct, os, time

report_on = True
APP_CMD_DETECT_RES = 0x02
CONF_TH = 0.50
IOU_TH = 0.45


def encode_objs(objs):
    body = b''
    for obj in objs:
        body += struct.pack("<hhHHHf", obj.x, obj.y, obj.w, obj.h, obj.class_id, obj.score)
    return body


def find_model():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    except Exception:
        base_dir = "."
    candidates = [
        os.path.join(base_dir, "best.mud"),
        "best.mud",
        "/root/best.mud",
        "/root/models/best/best.mud",
    ]
    for path in candidates:
        if os.path.exists(path):
            return path
    raise RuntimeError("best.mud not found")


model_path = find_model()
detector = nn.YOLO11(model=model_path, dual_buff=True)

cam = camera.Camera(detector.input_width(), detector.input_height(), detector.input_format())
dis = display.Display()
p = comm.CommProtocol(buff_size=1024)

last_heartbeat_ms = 0

while not app.need_exit():
    try:
        img = cam.read()
        if img is None:
            continue

        objs = detector.detect(img, conf_th=CONF_TH, iou_th=IOU_TH)

        if len(objs) > 0 and report_on:
            body = encode_objs(objs)
            p.report(APP_CMD_DETECT_RES, body)

        for obj in objs:
            img.draw_rect(obj.x, obj.y, obj.w, obj.h, color=image.COLOR_RED)
            label = detector.labels[obj.class_id] if obj.class_id < len(detector.labels) else str(obj.class_id)
            msg = f'{label}: {obj.score:.2f}'
            y = obj.y if obj.y > 12 else 12
            img.draw_string(obj.x, y - 12, msg, color=image.COLOR_RED)
        dis.show(img)

        # 每秒心跳
        now_ms = time.ticks_ms()
        if now_ms - last_heartbeat_ms > 1000:
            p.report(0x01, struct.pack("<I", now_ms))
            last_heartbeat_ms = now_ms

    except Exception as e:
        print(f"loop error: {e}")
        continue
```

---

## 十一、换成其他类别数要改什么？

YOLO11 架构固定，**只有 `best.mud` 的 `labels =` 需要改**。

其余文件（`build_yolo11.sh`、`restructure_onnx.py`、导出代码）都不需要改——类别数由 ONNX 权重自动携带，编译器自动识别。

确认类别数：

```bash
python -c "
import onnx
m = onnx.load('best.onnx')
for n in m.graph.node:
    if 'cv3.0/cv3.0.2/Conv' in n.name:
        for inp in n.input:
            for init in m.graph.initializer:
                if init.name == inp and len(init.dims) >= 1:
                    print(f'类别数 = {init.dims[0]}')
"
```

---

## 十二、快速命令速查

```bash
# === 从零开始 ===
cd /home/uu20/桌面/yolo/yolo11

# 进容器（首次）
sudo docker run -it --net host --name yolo_build -v ./:/data pulsar2:6.0-lite

# 容器内
pip install onnx onnxsim -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
bash build_yolo11.sh best
exit

# 以后再进
sudo docker start -ai yolo_build

# 部署
scp out/best_npu.axmodel out/best_vnpu.axmodel best.mud root@maixcam2:/root/
```

---

## 写在最后

从训练好的 `.pt` 到 MaixCAM2 屏幕上实时出检测框，踩了六个坑，改了两处源码（节点名匹配 + Concat 维度重构），确认了一个关键事实（YOLO11 bbox 通道 = 64 不是 4，因为 reg_max=16）。

这事的意义不在于跑通了一个流程——教程里的 `nn.YOLO11(model="best.mud")` 本来就能跑通——而在于**跑通过程中每一步都知道为什么**。为什么 Lite 不是 Full？因为缺的只是一个 `pip install`，不值得多下 4GB。为什么 6 个 Conv 变成 3 个 Concat？因为 MaixPy 解码器按尺度组织输出，不是按 bbox/cls 分开取。为什么节点名全变了？因为 YOLO11 和 YOLO26 是两套完全不同的检测头命名。

每个坑背后都有一个具体的知识点。亲手踩过之后，再换其他 YOLO 版本、换其他 NPU 平台，看到类似报错就知道往哪方向排查。

这不是终点——32 类模型跑通是第一步。接下来的事情是：

- **替换 MaixCAM2 内置模型**——用自己的 32 类模型跑实时检测，对比内置模型的精度和速度
- **量化感知训练（QAT）**——pulsar2 的 INT8 量化余弦相似度 > 0.999 已经很好，但如果某些类别精度掉得厉害，QAT 是下一道防线
- **模型剪枝 + 知识蒸馏**——YOLO11 在 640×480 上跑 NPU 够用，但如果要上更高分辨率或更低延迟，需要更小的 backbone

---

## 参考

- MaixPy YOLO11 文档：https://wiki.sipeed.com/maixpy/doc/cn/course/basic/ai/yolo11.html
- Pulsar2 使用指南：https://pulsar2-docs.readthedocs.io/
- Sipeed 模型转换教程：https://wiki.sipeed.com/maixpy/doc/cn/course/ai/deploy/maixcam2.html
- Sipeed 下载站：https://dl.sipeed.com/shareURL/MaixCAM/MaixCAM2/tools
- ONNX 模型可视化：https://netron.app/
- YOLO11 ultralytics 文档：https://docs.ultralytics.com/

> 本文部分内容由 AI 辅助整理和润色。
