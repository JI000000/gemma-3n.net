---
title: "如何在macOS、Windows和Linux上使用Ollama运行Gemma 3n"
title_en: "How to Run Gemma 3n with Ollama on macOS, Windows, and Linux"
description: "使用Ollama在本地设置和运行Google的Gemma 3n模型的分步指南。涵盖安装、模型拉取和所有主要操作系统上的基本交互。"
description_en: "A step-by-step guide to setting up and running Google's Gemma 3n models locally using Ollama. Cover installation, model pulling, and basic interactions on all major operating systems."
pubDate: 2025-07-19
lastUpdated: 2025-07-19
draft: false
lang: "zh"
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "Ollama", "本地LLM", "教程", "macOS", "Windows", "Linux"]
---

由于隐私、离线功能和成本效益的原因，在自己的机器上运行大型语言模型变得越来越流行。Google的新Gemma 3n凭借其高效的架构，是本地部署的主要候选者。在本指南中，我们将带你使用Ollama设置和运行Gemma 3n，这是一个用于在本地管理和运行LLM的强大且易于使用的工具。

本教程专为macOS、Windows和Linux用户设计。

### 先决条件

在开始之前，请确保你有：
- 一台具有足够RAM的计算机（8GB是一个好的起点，推荐16GB+用于更大的模型）。
- 管理员/sudo权限来安装软件。

### 步骤1：安装Ollama

Ollama简化了下载和运行模型的过程。前往官方网站获取适合你操作系统的安装程序。

[**下载适用于macOS、Windows和Linux的Ollama**](https://ollama.com/download)

按照网站上提供的安装说明进行操作。安装后，Ollama将作为后台服务运行。你可以通过打开终端（或在Windows上打开命令提示符/PowerShell）并运行以下命令来验证安装：

```bash
ollama --version
```

这应该返回已安装的Ollama版本号。

### 步骤2：下载Gemma 3n模型

安装Ollama后，你现在可以直接从Ollama库中拉取Gemma 3n模型。Gemma 3n有几种变体。模型标签通常指定有效参数大小（`e2b`或`e4b`）、类型（`it`表示指令调优）和量化级别。

打开你的终端并使用`ollama pull`命令。以下是一些常见选项：

**1. 默认模型（推荐快速开始）：**
这通常是一个平衡良好的版本。

```bash
ollama pull gemma3n
```

**2. 特定大小和量化：**
为了更好的控制，你可以指定确切的模型。例如，要获得40亿有效参数、指令调优的模型：

```bash
ollama pull gemma3n:e4b-it
```

要获得较小的20亿有效参数版本：
```bash
ollama pull gemma3n:e2b-it
```

下载过程可能需要一些时间，具体取决于你的互联网连接和模型大小。Ollama将显示进度条。

### 步骤3：与Gemma 3n聊天

模型下载完成后，你可以直接从终端开始对话。就这么简单：

```bash
ollama run gemma3n
```

如果你下载了特定版本，使用其标签：
```bash
ollama run gemma3n:e4b-it
```

Ollama将加载模型并显示`>>>`提示。你现在可以与Gemma 3n聊天了。

**示例交互：**

```
>>> 给我讲一个关于鹈鹕的笑话。

当然！为什么鹈鹕被赶出餐厅？
因为它有一个很大的账单！

>>>
```

要退出对话，输入`/bye`。

### 步骤4：（高级）使用Ollama API

对于开发者来说，Ollama最好的功能之一是其内置的REST API，它允许你将Gemma 3n集成到你自己的应用程序中。API服务器会随着Ollama服务自动启动。

你可以使用`curl`从终端发送请求。

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3n",
  "prompt": "为什么天空是蓝色的？",
  "stream": false
}'
```

**请求的分解：**
- `model`：你想要使用的模型名称。
- `prompt`：你的输入文本。
- `stream`：如果设置为`true`，API将逐令牌流式返回响应。我们在这里设置为`false`以一次性获得完整响应。

响应将是一个包含模型输出和其他元数据的JSON对象。

### 视频指南

有关安装和使用Web界面的详细视频演练，请查看这个优秀的教程：

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/QEwJeU8vF7A" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

### 结论

恭喜！你现在已经在你的机器上本地运行了Google强大的Gemma 3n模型，准备好进行交互式聊天或集成到你的开发项目中。这个设置为你提供了一个私密的、离线优先的AI伴侣。

从这里，你可以探索：
- 构建调用Ollama API的简单脚本。
- 实验不同的Gemma 3n模型变体，为你的硬件找到最佳的性能/大小权衡。
- 敬请关注我们关于使用Gemma 3n进行微调和构建多模态应用程序的下一个教程！ 