---
title: 'Ubuntu 常用命令大全'
description: '整理日常使用中最常用的 Ubuntu 命令，方便查阅和使用'
publishDate: '2024-04-08'
updatedDate: '2026-04-14'
tags:
  - 博客
  - 技术分享
language: 'Chinese'
draft: false
slug: 'ubuntu-common-commands'
heroImage: { src: './command.jpg', color: '#24292e' }
---



## 前言

本篇内容写作的初衷，是因为一些指令比较常见，所以写一篇博客记录一下，方便自己回看使用。



## 基础命令

```
df -h        #查看系统内存使用情况
```

```
！！  # 重复上一级命令
```

```
pwd  # 显示当前工作目录的绝对路径
```

```
ls -al  # 以列表形式显示当前目录的所有文件和目录，包括隐藏的
```

```
cd ..  # 回到当前目录的上一级目录
```

```
cd -   # 回到上一次所在的目录
```

```
cd ~   # 回到当前用户的家目录
cd     # 回到当前用户的家目录
```

```
rm -rf # 强制删除整个文件夹及其内容
```

```
touch filename  # 创建空文件
```

```
cp -r source destination  # 递归复制文件夹
```

```
mv source destination  # 移动或重命名文件
```

```
find . -type f -name "*.conf"  # 在当前目录查找类型为文件(f)的.conf文件
```

```
ifconfig    # 显示网络接口参数（新版本Ubuntu可能需要安装net-tools）
```

```
lsb_release -a   #​ 获取Ubuntu版本号
```

```
arch  # 或者
uname -m  #查看Ubuntu机器的处理器架构
```

```
shutdown  # 关机
```


## 小鱼大佬的一键安装

```
wget http://fishros.com/install -O fishros && . fishros
```

## Git 安装和配置

#### 安装 Git

```
sudo apt install git
```

#### 配置用户信息

```
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 配置 SSH

```
ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub
```

## Python 清华源配置

直接执行：

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```


## 终端工具

```
sudo apt install terminator
```


## 显卡驱动安装

```
sudo apt update
sudo ubuntu-drivers autoinstall
```

```
nvidia-smi
```


## 网络代理设置

```
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

## 软件包管理

```
sudo dpkg -i package.deb
```

## Windows 时间同步

```
sudo apt install ntpdate
sudo ntpdate time.windows.com
sudo hwclock --localtime --systohc
```


## 文件树查看工具

```
sudo apt-get install tree
```

## 中文语言包安装

```
sudo apt update
sudo apt install language-pack-zh-hans
```


### 中文输入法安装

```
sudo apt install ibus ibus-libpinyin
```


在终端执行以下代码：

```
ibus-setup
```


进入到此界面，在ibus首选项中，点击“输入法”，添加“中文”-“智能拼音”，然后关闭。

## 串口权限配置

查看

```
ls -la /dev/ttyUSB* /dev/ttyACM*
```


```
 ls -la /dev  # 或者
```


1. 进入udev主目录

```
cd /etc/udev/rules.d/
```


  
这一步是导航到存放udev规则文件的目录，通常自定义的设备规则会放在这里。  
2. 创建并编辑规则文件

```
sudo gedit tty_All.rules
```


```
sudo touch tty_All.rules
```


  
3. 添加设备权限规则  
在打开的tty_All.rules文件中，添加类似以下的规则（根据你的设备实际情况调整KERNEL和GROUP等信息）：

```
KERNEL=="ttyUSB*", MODE="0777", GROUP="dialout"
KERNEL=="ttyACM*", MODE="0777", GROUP="dialout"
KERNEL=="ttyTHS*", MODE="0777", GROUP="dialout"
KERNEL=="tty*", MODE="0777", GROUP="dialout"
```
这个可选，不一定全加，一般1-2个，看你需求加。

设置文件权限

```
sudo chmod 777 tty_All.rules
```


**查看当前用户**

```
whoami 
```


将用户加入dialout组

```
sudo usermod -a -G dialout $USER
```


**重新加载规则**

执行完上述步骤后，

```
sudo udevadm control --reload-rules
sudo udevadm trigger
```


编辑

```
sudo gedit ~/.bashrc
```


设置开机自启动文件

建立并打开一个“.sh”脚本

```
gedit ~/self.sh
```


输入 #! /bin/bash 并保存

添加权限

```
sudo chmod 777 self.sh 
```


使用gnome-session-properties 打开启动应用程序首选项，点击添加进行添加新的启动程序，输入对应的名称，选择文件路径，添加后，每一次开机都会调用

打开启动脚本添加需要的启动命令

```
gnome-terminal -- bash -c "roslaunch xxx.launch;exec bash"
```
结束。


```
echo 欢迎归来，我伟大的主人！您忠诚的,卑微的，谦虚的仆人阿罗德斯应您召唤而来，能追随您的步伐，是我至高无上的荣耀，您终将归于那至高的位置，让整个世界在您的注视下变得平静。
```

  
## 总结

以上内容总结了部分的笔者在日常使用中经常会用到的 命令，记录下来，方便回看。
​