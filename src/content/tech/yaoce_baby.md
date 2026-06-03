---
title: '适合于遥测宝宝体质的视觉学习教程'
description: ''
publishDate: '2026-06-03'
tags:
  - 技术分享
  - Astro
language: 'Chinese'
draft: false
password: '301'
heroImage: { src: './yaoce_baby.jpg', color: '#24292e' }
---


## 前言

其实关于学习教程，网上已经有很多了，但都不太齐，这里统一一下。之所以写这篇文章主要是为了方便自己看以及给小登一个学习方向——不管怎么说有一个统一的资料存放总是很方便的，写此教程送给我们可爱的小登们。

这里整理的是学到的知识体系，不是全部都要学，给自己有个系统的了解，每个部分具体的作用，根据实际情况学习，里面推荐学习课程有些是片面或者过时，大家可以根据关键词自行找资料。

## 视觉成员需要掌握的知识

### 基础篇

编程语言 Python && C/C++

基础计算机知识：[参考 你缺失的那门计算机课 ↗︎](https://www.criwits.top/missing/),进行一些基础知识的扫盲，其中的前几个篇章都很有阅读的必要。

基础数学知识：有条件的话可以观看 MIT 的相关课程，即 [高等数学-18.02](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)、[线性代数-18.06](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/)。[MIT 概率论-进阶](https://www.bilibili.com/video/BV1Rt411i7yy?spm_id_from=333.788.videopod.episodes&vd_source=ddae2b7332590050afe28928f52f0bda&p=5)

在这里笔者推荐 宋浩 ↗︎ 的相关课程，对于线性代数这门可以理解为几乎最重要的数学课程，推荐读者观看 3Blue1Brown 的相关讲解 ↗︎。这个系列课程通过大量直观有趣的可视化，给你提供直觉的理解。
数学基础，对于控制理论学习，非常重要的。


Markdown：记录你的笔记[Markdown 语法](https://www.markdownguide.org/basic-syntax/),通过 Markdown 官网 ↗︎，读者可以了解 Markdown 的全部语法，虽然说是全部，但实际上也非常简单，基本上两三次之后就可以熟练使用。推荐 Typora或者 Obsidian。

Ubuntu：Ubuntu是一个基于Linux的、开源的操作系统。

Shell：Linux 下的脚本编程，自动化任务的基础

Git：代码版本管理，团队协作必备

CMake：跨平台的构建工具，管理 C/C++ 项目的编译

IDE：推荐 VSCode，插件丰富，高度自定义

计算机科学基础：了解计算机底层原理，推荐 [计算机速成课](https://www.bilibili.com/video/BV1EW411u7th/)

视觉模块/运算平台：了解 minipc、jetson 等硬件平台，CPU 与 GPU 的区别

串行通信 & CAN 总线：下位机通信的基础，连接电机、电调等设备

OpenCV：计算机视觉核心库，图像处理的基础


### 进阶篇

数学基础：坐标变换、Eigen 库、相机模型，视觉算法的数学根基

卡尔曼滤波：状态估计算法，用于目标跟踪和传感器融合

ROS2：机器人操作系统，节点通信、传感器接入、导航框架

数据结构与算法：基本的数据结构和常用算法，实践中学习即可

深度学习 / PyTorch：神经网络、目标检测（YOLO），视觉算法的进阶方向

相机标定：成像模型、畸变校正，视觉系统的基础环节

科学上网：获取国外技术资料的必备技能

### 参考知识体系

下面是我找到构建体系非常好用的文章和资料，大家看看

[推荐硕哥的机器人工程师学习计划](https://zhuanlan.zhihu.com/p/22266788)，整体偏向软件，因此很适合视觉/算法组的同学参考

[计算机视觉知识框架图](https://www.processon.com/view/link/6236db1a5653bb071e70457b)

[西安交大生存指南](https://survivexjtu.cc/)


### 遇到问题怎么办

[How-To-Ask-Questions-The-Smart-Way](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)详细地介绍了提问的艺术，良好的问题描述有助于他人了解你的情况。


会提问是一个非常重要的能力，不只是向学长学姐提问，还有向老师，技术交流群，开源社区提问，你能提出一个好问题，别人看到也会非常乐意去回答。
比如说你遇到一个问题，不要直接找学长，问：学长学长，这个报错怎么解决？，这样我们又得问：你现在做什么遇到这个问题，你是怎么遇到这个问题的？然后你又一顿描述，一来一回，效率非常低，我们认识的还好，如果是社区和技术交流群，别人看到都不想搭理你，热心的还会提醒你把报错贴出来，但这也是一来一回也会浪费很多时间。推荐读一下上面那个文章，比较短的，很快就能读完。


## 氛围编程，编程是一种思想

现在在诸如 Cursor、Claude Code、Trae 这样的 AI 代码编辑器兴起之后，一个新的概念开始出现，也就是氛围编程。作为氛围编程，就是给AI写代码，我们在旁边加油打气，等待他写好，不合适再和他说怎么改。




## 基础篇

### 计算机科学基础

[计算机速成课](https://www.bilibili.com/video/BV1EW411u7th/?vd_source=5dedb30d6360efbc60e09176831af1d3),[模拟电路和数字电路速成](https://www.bilibili.com/video/BV1774114798/?spm_id_from=333.788.recommend_more_video.0&vd_source=ddae2b7332590050afe28928f52f0bda),[学院派的计算机科学导论](https://www.bilibili.com/video/BV1Rb411378V/?vd_source=ddae2b7332590050afe28928f52f0bda)



### 编程语言 Python 

Python是一门非常方便的编程语言。它有大量的现成库可供调用，可以提高视觉算法的开发速度。Python入门非常简单，要大致明白动态类型的实现原理，知道Python对内存的管理方法。

下面一些学习资料：
[廖雪峰Python教程（文档）](https://liaoxuefeng.com/books/python/introduction/index.html)，[小鱼视频](https://www.bilibili.com/video/BV1c4411e77t/?share_source=copy_web&vd_source=1b168096ad049545241f8cc47bbcded6)，[Python 3 教程-runoob](https://www.runoob.com/python3/python3-tutorial.html)



### 编程语言 C/C++

面向对象编程是重要的编程思想，大家要理解并运用封装、继承和多态。可以利用C++11的多线程机制进行并发编程的程序开发，熟练运用这些新特性。
要求是：面向对象编程的思想；类的抽象和封装，构造和析构；类的继承和多态。
此外，C++11的一些新特性、标准库STL以及C++多种设计模式能够给算法构建带来很大的便利。

至少掌握C语言，并且能够将C++用作C with class的程度。

[C++教程：Cherno C++](https://www.bilibili.com/video/BV1uy4y167h2/?spm_id_from=333.788&vd_source=caad4fcda780a379435d0144faf78679)

[黑马程序员匠心之作|C++教程](https://www.bilibili.com/video/BV1et411b73Z/?share_source=copy_web&vd_source=1b168096ad049545241f8cc47bbcded6)

[推荐浙江大学翁恺教授](https://www.icourse163.org/course/ZJU-9001?from=searchPage&outVendor=zw_mooc_pcssjg_)

[C++多线程编程](https://www.bilibili.com/video/BV1Yb411L7ak/?spm_id_from=333.788.top_right_bar_window_custom_collection.content.click&vd_source=ddae2b7332590050afe28928f52f0bda)

tips：新手不必在编程语言上斟酌得太过深入，可以在后续的应用实战中不断提高，毕竟编程语言只是人造的一门工具。
编程语言作为一种工具，在学习过程中最好能边学边动手，效果最好。

### Shell

[掌握Shell编程，一篇就够了](https://zhuanlan.zhihu.com/p/102176365)；[Shell 编程快速入门](https://www.runoob.com/w3cnote/shell-quick-start.html)；


### 视觉模块的学习

常见的运算平台有这几种：定制的minipc、Intel NUC、jetson系列、DJI manifold2（有cpu版本和gpu版本，分别相当于同配置的i7-8265u的minipc和jetson tx2，不过manifold的体积很小）、工控主板/工控机、OpenMV、k230、k510等。其实选型的空间并不大，不过需要大家根据预算平衡一下性能和价格。

那么如何评价一个运算平台的性能呢，这里要提一下CPU和GPU运行的概念。CPU的时钟频率高，但是内部的运算单元（ALU、FPU等）数量有限，是为通用计算和程序控制所设计的，其实并不擅长进行大规模的并行运算，比较擅长单线程的流水线处理。GPU则相反，GPU有大量的低速运算单元，但是能够一次性处理巨量并行数据，因此尤其适合图形计算。

实验室目前有这两个模块：openmv 和 K230

### Linux下的IDE

VSCode：[下载](https://code.visualstudio.com/Download)

[Qt](https://wiki.qt.io/Install_Qt_5_on_Ubuntu#:~:text=Installation%20Guide%20%28Ubuntu%20package%29%20Open%20a%20terminal.%20Type,or%2064-bit%20Linux%20installationdepending%20your%20version%20of%20Ubuntu.)

[Edge浏览器Linux版](https://www.microsoft.com/en-us/edge/download/insider?cc=1&platform=linux&cs=2193943070)，可以方便同步windows下的收藏夹、设置、插件等。集锦的功能非常好用。

[Fsearch](https://cboxdoerfer.github.io/fsearch/)和Windows下的everything类似，提供超快速的文件检索功能。

[SimpleScreenRecorder](https://www.maartenbaert.be/simplescreenrecorder/#download)：一款录制屏幕的软件

qv4l2：Linux下相机驱动的图形界面，在Ubuntu软件商店可以找到，方便调节普通USB相机的参数。这里推荐使用qv4l2这款软件，可以方便的给相机调参并实时显示效果。

### 操作系统Ubuntu

为什么使用Ubuntu?

Ubuntu是一个Debian系分支的第一大系统，是当前用户量最大的linux发行版。因此，遇到任何问题一般都能够在[用户社区 askubuntu](https://askubuntu.com/)中得到解答。

Linux下开发C++程序相比Windows有无与伦比的优势，可以方便的配置各种第三方库和依赖。Linux的内核和上层系统都比Windows更加精简。Linux对于深度学习的支持比Windows更加友好，经常有sh脚本能够一键配置开发环境。

我们推荐下载并安装Ubuntu 22.04版本。视觉组使用Ubuntu作为开发时使用的系统，需自行安装，并且了解一些基本指令。

如果你此前没有开发经验，建议优先尝试虚拟机作为安装方式。也可以使用双系统安装，即Ubuntu与Windows共存。安装相对简单，且重启电脑即可切换系统。

安装完Ubuntu后，各位需要熟悉Linux系统的一些基本命令行操作，如Ctrl+Alt+T打开一个终端，cd进入某个目录，sudo获取root权限，rm删除某个文件或文件夹等。初接触时可能觉得繁琐，但熟练运用后你会觉得特别便捷高效。

想要安装Ubuntu，可以参阅这篇教程：[Ubuntu/Windows双系统的安装](https://blog.csdn.net/NeoZng/article/details/122779035)，当然，学习时使用虚拟机也是不错的选择，这能给你更大的试错空间，不用担心把系统搞奔溃。

[Linux 101](https://101.lug.ustc.edu.cn/)

[linux常用命令行操作](https://www.cnblogs.com/banjinbaijiu/p/9140460.html)

提到Linux就不得不提到命令行的使用，在Linux上进行开发常会使用到命令行，有些软件甚至只有命令行界面的版本。在一些时候，直接在命令行中用键盘操作可能要比数不清的鼠标点击快得多。你需要学习：

- cd、ls、pwd、mv、cp、touch、diff、rm、cat、mkdir、rmdir、echo、tar等文件系统的基本操作，grep、find 查找文件和目录
- 帮助手册 man 和 --help 参数
- sudo、su、chmod 等权限相关的操作
- ping、ifconfig、wget 等网络相关的操作

一定要亲手熟悉命令行的基本命令，切忌只看不动手！学习以上命令，[戳这里](https://linuxconfig.org/linux-commands)

在使用系统的时候，建议大家有良好的文件分类习惯，把代码库、软件、开发环境分开存放，避免出现home目录乱糟糟的情况。

Linux的设计哲学是**”一切皆文件”**。它将所有的IO设备如网络接口、usb接口、显示屏、相机、键盘鼠标、应用都视为文件，和这些“文件”的交互就是以规定的方式进行读写。因此，有必要了解Linux下的基本目录和文件组织方式，其目录结构[请参考](http://c.biancheng.net/view/2833.html#:~:text=%E4%BD%BF%E7%94%A8%20Linux%20%E6%97%B6%EF%BC%8C%E9%80%9A%E8%BF%87%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%BE%93%E5%85%A5%20ls%20-l%20%2F%20%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%EF%BC%8C%E5%9C%A8%20Linux,%E5%90%8C%E6%97%B6%EF%BC%8C%E5%90%84%E4%B8%80%E7%BA%A7%E7%9B%AE%E5%BD%95%E4%B8%8B%E8%BF%98%E5%90%AB%E6%9C%89%E5%BE%88%E5%A4%9A%E5%AD%90%E7%9B%AE%E5%BD%95%EF%BC%88%E7%A7%B0%E4%B8%BA%20%E4%BA%8C%E7%BA%A7%E7%9B%AE%E5%BD%95%20%EF%BC%89%EF%BC%8C%E6%AF%94%E5%A6%82%20%2Fbin%2Fbash%E3%80%81%2Fbin%2Fed%20%E7%AD%89%E3%80%82%20Linux%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%9B%AE%E5%BD%95%E6%80%BB%E4%BD%93%E5%91%88%E7%8E%B0%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%EF%BC%8C%2F%20%E6%A0%B9%E7%9B%AE%E5%BD%95%E5%B0%B1%E7%9B%B8%E5%BD%93%E4%BA%8E%E6%A0%91%E6%A0%B9%E3%80%82)

[Ubuntu Tutorial](https://ubuntu.com/tutorials/command-line-for-beginners#7-the-command-line-and-the-superuser)

[Linux下的C++开发教程](https://www.bilibili.com/video/BV1fy4y1b7TC?spm_id_from=333.788.videopod.episodes&vd_source=caad4fcda780a379435d0144faf78679&p=12)

### 串行通信

常用下位机通信方法之一串口（Serial Port）。为了方便简单起见，我们使用的都是异步串行通信，通过一个usb转串口芯片将解算好的数据发送。[请参考](https://www.codrey.com/embedded-systems/serial-communication-basics/#google_vignette)
永久赋予串口权限，参考这个[教程](https://blog.csdn.net/qq_39779233/article/details/111400187)

### CAN&总线通信
和直接的点对点通信不同，还有一种常用的工业通信方式的分类为总线通信，即多个设备挂载在一条线上。大家最熟悉的总线莫过于USB总线（universal serial bus）。但USB的协议过于复杂，包括了物理到消息包的多层协议栈，这里我们简要介绍最常用的CAN。

CAN通信的基本知识：和串口一样，必然也需要一个通信协议。不同的是，其信号是通过其总线上电平的差值来表示的，这样能够有效抑制共模信号（因为噪声对两条线的影响通常是一样的，相减之后噪声的影响便被消除了），因此一般采用两条通信线。不过也最好连接地线，共地可以最大程度降低干扰。还有4-pin的CAN线，额外的一条线用于独立供电，适用于对信号质量特别高的场合，此电源专门为CAN收发器和信号电平供电。

### 代码管理工具Git

Git是目前世界上最先进的分布式版本控制系统，用于有效、高速的处理项目版本管理。Git本身就完全可以做到版本管理，但是其所有内容以及版本记录都只能保存在本机。
在团队协作中，你可能需要与队友合作编写大量代码。反复更改代码很容易产生混乱，此时学会使用强大的版本管理工具Git便显得格外重要。


使用Git，你可以看到自己和队友每次修改的内容，出现问题时也可以退回到任意一次修改之前。代码会被实时推送到云端服务器仓库中，即使电脑惨遭弹丸攻击，代码也会安然无恙。

如果想要将文件内容以及版本记录同时保存在远程，则需要结合远程的服务器仓库，将文件和记录托管到远程仓库。

我们实验室开始的时候都是用u盘拷贝程序，有时候在某个人的电脑上写一点有时候又在minipc上写一点，虽然在文件夹上标注了时间和版本号，然而这并没有什么用，这导致一次合并代码的时候有十多个版本的代码，根本不知道哪个能用哪个不能用，那时候又还不知道diff这个工具，弄得眼睛都快无了。

tips: 新手学习git容易把git用成百度网盘一样作为一个代码远程保存仓库。但事实上git核心在于代码版本的提交回溯和多分支管理合并，在使用中应该多寻找网上的资料拓展认知以及与身边的人多多交流。在学习Git的时候，**一定要动手跟着一起实践，切忌光看不动！**俗话说熟能生巧。

[Git命令行操作](https://git-scm.com/book/zh/v2)

[廖雪峰的git教程](https://liaoxuefeng.com/books/git/introduction/index.html) [git简易指南](https://www.bootcss.com/p/git-guide/) [GitHub Guides](https://docs.github.com/en)

常用代码托管平台：gitee,github

### CMake学习

不建议大家使用visual studio进行C++的开发，虽然vs很方便但不便于移植代码。

[CMake教程](https://www.bilibili.com/video/BV1D1421f7kG/?spm_id_from=333.999.0.0&vd_source=caad4fcda780a379435d0144faf78679)

[cmake入门极简教程](https://www.bilibili.com/video/BV1nw411C71Z/?spm_id_from=888.80997.embed_other.whitelist&t=5&bvid=BV1nw411C71Z&vd_source=5dedb30d6360efbc60e09176831af1d3)

[CMake 保姆级教程](https://www.bilibili.com/video/BV14s4y1g7Zj/?spm_id_from=888.80997.embed_other.whitelist&bvid=BV14s4y1g7Zj&vd_source=5dedb30d6360efbc60e09176831af1d3)

[CMake书籍](https://file.ncnynl.com/ros/CMake%20Practice.pdf)

## 算法篇

### OpenCV

视觉图像处理是视觉组最常见的工作内容，基于OpenCV开源视觉库进行图像处理是重点的学习内容，它是当前最具影响力的计算机视觉开源库。官网资料相当完整。
OpenCV最推荐的学习资料还是官网文档，其内容详尽、更新速度快。

在大部分时候我们都不需要设计底层的算法，而是直接调用封装好的API，设计更具体的应用于特定问题的算法。当然，有必要了解一下造轮子（底层算法的实现）的过程，这能够让我们深入理解算法内部的构造，从而更好地使用这些算法，出错的时候也能更快定位问题。如果只是调用API而不了解原理，那么只是简单的缝合+搭积木，对于提升自我的思考能力和逻辑思维没有任何帮助。应当要有*“使用科技的黑箱会使我惶惶不安”* 的觉悟。

我们最常用的OpenCV和一些神经网络模型都是开源的，它们都有优秀的注释和说明文档，尤其是OpenCV的Documentation和Tutorial十分详细，全是使用doxygen生成的标准文档系统。通过阅读这些材料，很快就能上手。

PS.大家需要尽快适应阅读英文资料，因为后面开发中遇到的一些问题很难用中文查到。

若你要在多视图几何以及3D视觉上开发深度学习的应用，可以使用[Kornia](https://kornia.readthedocs.io/en/latest/get-started/introduction.html)，这是一个基于python/pytorch打造的兼容pytorch的库，其中使用到的数据使用pytorch基本的数据结构tensor。

[安装教程](https://blog.csdn.net/NeoZng/article/details/122736571)


[OpenCV视频教程](https://www.bilibili.com/video/BV11A411T7rL/?spm_id_from=333.337.search-card.all.click&vd_source=caad4fcda780a379435d0144faf78679)

书籍:《OpenCV4.0快速入门》

[OpenCV官网学习文档](https://opencv.org/)


[RM 教程3-OpenCV 传统视觉](https://harry-hhj.github.io/posts/RM-Tutorial-3-Getting-Started-with-OpenCV/)

[东南大学的OpenCV入门教程](https://www.bilibili.com/video/BV1uF411K77F/)


### 数学基础

机器人的眼睛是相机。相机的作用就是将三维的真实世界投影到二维的图像数据中。我们需要在算法中利用降维的数据进行识别处理，使得机器人对三维世界具有一定的感知。

那么如何将三维世界降维到二维平面，又如何从二维平面反推到三维世界呢？这便是线性代数的一个重要应用——坐标变换（映射）。三维世界，我们一般称为世界坐标系（或笛卡尔坐标系），而相机图像的二维平面，一般称为像素坐标系。

如果考虑图像的深度信息、视角大小，我们就可以获得相机的三维坐标系。通过一些固定点在不同坐标系中的坐标，我们便可以通过旋转、平移变换获得坐标系之间的相对位姿，进而获得机器人的位姿。

数学基础在坐标变换中有很深的应用价值，在特征提取、数据处理（如卡尔曼滤波）中也有重要的应用。

在计算线性代数中的常用运算时，Eigen库是你提高计算速度的好帮手。这个库有丰富的接口来让你进行欧拉角、四元数、旋转矩阵、矩阵求逆等运算。此外，还可以方便地与OpenCV中的数据类型进行相互转换。

[3Blue1Brown线性代数教程](https://www.bilibili.com/video/BV1Ys411k7yQ/?spm_id_from=333.337.search-card.all.click&vd_source=caad4fcda780a379435d0144faf78679)



## 进阶篇

### 卡尔曼滤波

[教程](https://kalmanfilter.net/covextrap.html)

### ROS2

ROS2全称机器人操作系统，是用于构建机器人应用的软件库和工具集。其中的节点编写，节点通信、话题发布与订阅、节点参数等概念非常重要，建议系统学习。


它也提供用于获取、编译、编写和跨计算机运行代码所需的工具和库函数。

我们可以非常方便且安全地通过编写多个节点的代码来实现多进程编程（注意区别于多线程）

ROS2提供了大量的工具，如：用于检测每个节点的发布频率和信息类型的许多命令行工具，可视化工具rviz，用于数据可视化的rqt_plot，用于仿真的gazebo，用于标定相机内参的工具等等。

使用Ubuntu 22.04作为开发环境，并直接选用ROS2-humble进行开发。需要注意的是，ROS与Ubuntu的版本是一一对应的，比如Ubuntu 20.04对应的是ROS-Noetic，ROS2必须要22.04以上的版本才能安装。

它们的设计理念是类似的，从ROS1迁移到ROS2只会让你感觉无比轻松方便。若你对ROS不熟悉，请直接开始ROS2的学习。

通过ROS2，我们可以方便地构建视觉算法和建图定位、导航算法的框架，轻松接入各种传感器。

[ROS2 Wiki: （若有良好的阅读学习习惯，强烈推荐）](http://dev.ros2.fishros.com/doc/Tutorials/Configuring-ROS2-Environment.html)

[ROS2中文文档](http://dev.ros2.fishros.com/doc/index.html)

[动手学ROS2视频](https://www.bilibili.com/video/BV1gr4y1Q7j5/?share_source=copy_web&vd_source=1b168096ad049545241f8cc47bbcded6)


### 数据结构和算法

个人认为没有必要专门买算法书来看（CS专业学生除外），在实践中遇到相应的问题，查找资料即可。


[推荐浙江大学的mooc](https://www.icourse163.org/course/ZJU-93001?tid=1450069451)

推荐一个OI网站：[算法基础简介 - OI Wiki](https://oi-wiki.org/basic/)。可以当工具书查，过于复杂和艰深的算法和数据结构没必要学习。


[Data Structure Visualization](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) 包含了很多算法和数据结构执行过程的可视化，可以帮助理解。


### 深度学习 PyTorch

我们推荐使用Pytorch作为深度学习框架。如果你的笔记本电脑没有显卡或者显存较少，可以尝试仅仅安装它的CPU版本。如果你的电脑安装了可以跑深度学习的显卡，可以尝试安装好对应的开发环境，比如cuda、ROCm。

[Pytorch中文文档](https://pytorch-cn.readthedocs.io/zh/latest/)

[cuda安装指引](https://developer.nvidia.com/cuda-toolkit)

类似还有 TensorRT，Openvino

[3Blue1Brown神经网络](https://www.bilibili.com/video/BV16x411V7Qg/?spm_id_from=333.999.0.0)

[行为树学习](https://www.behaviortree.dev/docs/intro/)

[并行运算](https://developer.nvidia.com/cuda)

### 相机标定

相机标定来去除这种畸变以便还原图像中物体的真实位置。畸变主要分为切向畸变和桶型畸变，我们可以利用标定板和畸变的数学关系来进行相机标定，OpenCV中也有相关的函数可供调用。关于成像模型、畸变和标定，可以参阅[相机标定](https://docs.opencv.org/4.5.2/dc/dbb/tutorial_py_calibration.html)和OpenCV官方文档中的[CameraCaliberation](https://zhuanlan.zhihu.com/p/30813733)。在后续章节中我们还会提到这一点，并且给出了提供标定流程的参考文章。



如果你能学到这里，你已经具备独立开发视觉程序的能力了，什么车牌识别也就不在话下了。


### 科学上网

github有些同学可能进不去，Windows系统的同学可以下载一个 Watt Toolkit（原 Steam++），里面可以开一个加速正常就能进去。有能力可以挂个梯子，这里就不过多阐述。Linux使用 Watt Toolkit 进入github好像不行，我试过这个，但可能是我步骤问题吧，反正最后没有成功。



## 我的历程

先简单说说我自己的经历，总结一下感想。主要就是讲讲故事，嫌太长可以跳过不看。

在9月开学的时候，我们要招新了。我们收了10个大二的小朋友，和四个大一的小小朋友。当时的我也觉得，这是质量最高的一届视觉，我们要起飞了。不过我终于和前组长感同身受，一些在我看来想当然的东西，新队员都要学习很久。而且我常常对他们的效率和能力有过高的估计，从来没有想过当时的我也是经常摸鱼，需要大量的休息时间的。不过不管怎么说，他们当时的水平显然远超一年前的我。我给他们写了一些培训资料，在这个过程中也给自己的知识体系查缺补漏。

人大概都是喜欢安逸的，我也是如此。社会学研究发现，当人处在一个集体当中时，会降低自己承担责任的意愿。一开始的时候，我进队就只想抱抱别人的大腿，只要别人不催，我的工作就原地踏步。现在想来，我的学弟学妹们可能处在相似的境遇吧。这在某种程度上，也是一种畏难情绪，好像你不去做它，它就难不倒你似的。有很多队员都会把参加机甲大师看做是在学校的实验室献爱心，用爱发电。但是谁又需要你的这点施舍呢？你所做的一切都是为了你自己，为了你心中的那个梦想。

我的梦想是什么？小时候的梦想是成为一名伟大的科学家，要留名青史。但越是长大，就越感觉到有一些对我很重要的东西被剥夺。直到参加RoboMaster后的某个时刻，我突然明白我能在这里找到心中失落的遗迹。我不想讨论一些关于目的、意义和存在的宏大话题，也可能要暂时抛开对人生价值与真理的追求。因为我的故事还没有结束，还需要收起我的“感慨万千”继续前进。更多的精彩，更多的风景，也许是更多的遗憾。


我逐渐在做机器人的过程中跨越了愚昧的山顶，到最后终于明白自己有太多东西需要学习。



## 常见Q&A


欢迎补充。如果你有问题，也可以提出。
感觉视觉要学的东西好多好难，怕自己坚持不下来，配个环境都快劝退了

视觉学习的成长路线确实比较长，要点的技能较多，不过只要按照顺序，把基础知识学好，往后的学习就不会有太大困难。如果你一上来就想要装Linux系统想要安装OpenCV，然而连计算机是怎么工作的都不清楚，那必然是难过登天的。当你觉得某些事物无法理解的时候，基本上不是所谓智商或者能力的问题，而是缺少前置知识。所以一定要登高自卑，从基础开始学习，万丈高楼平地起。

自学的效率太差，而且学完很快就忘了

如果你希望有老师讲，跟着网上的视频教程一起学就完事了。自学最重要的其实是没人给你布置作业，一定要在学完以后立刻实践，自己把代码敲出来。如果不写代码，看完就觉得自己会了显然是不现实的，参考艾宾浩斯遗忘曲线。用得越多记得越牢固。至于效率可以找一些相关方面的方法论看一看，摸索出适合自己的学习方法。可以尝试记笔记、写文档等，也可以在学完一个知识点后尝试向别人讲解、写博客，教学相长也。

参加电赛要花的时间多吗，会不会影响课内成绩，还能参加其他项目吗

我们不谈电赛在成绩之外可能带来的好处。

显然参加比赛你要学习的知识在课内很可能不会包含，因此必然要在空余时间学习计算机视觉和机器人相关的知识。至于是否影响课内成绩，笔者认为这因人而异。首先，学习比赛相关的知识在很大程度上会帮助你理解课内知识并将它们应用到实践中去，你在学习扩展知识的过程中，也可能对基本的概念有了新的理解。同时，课外知识的学习在相当程度上依赖于基础课，包括高数、物理等，它们会对这些知识的掌握提出更高的要求，也有利于你课内知识的学习。其次，比赛中很多学到的知识在课内是用不上的，这点毋庸置疑，所以这些知识的学习对于你的成绩没有任何帮助。

至于学习比赛相关的内容是否会挤占课内知识的学习，这点也是必然的。如果你认为成绩更重要，GPA对于保研、留学申请确实必不可少，那你应该减少在电赛上的投入，专心学习课内知识，多刷题。在电赛上付出的时间增加了，就意味着你课后只有更少的时间用于预习/复习和反刍知识。你应该权衡利弊，考虑自己安排时间的能力和学习的效率。

在电赛圈子里，不乏一些成绩竞赛科研多点开花的大佬；也有一些因为全心全意投入比赛完全抛弃课内学习的例子（笔者不建议这样）。你应该想清楚，你要追求的事情是什么，再决定在不同方向上的时间分配。


电赛做的东西以后用得上吗？是不是为了比赛而比赛？

学校上的课以后可能用不到，但是电赛做的东西，在之后的科研或工作中一定用得上，只要你投身于相关行业。我们不谈所谓思维和方法论的突破，就看在这里学习的知识是否能用上：人脸识别已经深入千家万户，自动驾驶更是百家争鸣称为一片红海；你的手机相册能够帮你把照片分门别类放好，打开相机屏幕上自动出现的取景框内的物体位置和分类；搜索引擎可以用图片进行索引，AI自动生成视频字幕，甚至能告诉你视频里发生了什么；计算机作的画媲美人类画家，甚至能写小说谈时政；P图如此方便，美颜一键年轻20岁；庞大的生产线上只有机器运作的白噪声，百平面的车间空无一人······



## 后记

以上是对计算机视觉的一些理解，鄙见，管中窥豹，欢迎交流。

起步刚开始是想随便写一点教程，但在整理我过往收藏的资料发现，给后面新来的以及现在大一同学做一个全面的知识体系是非常有必要的，因为视觉学习多而杂，特别是进入Ubuntu后的学习，需要了解的东西很多，最近看他们安装好了虚拟机学习linux的一些命令，回想我学习的时候，非常有感触。
