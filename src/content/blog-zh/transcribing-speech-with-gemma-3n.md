---
title: "从音频到文本：使用Gemma 3n转录语音"
title_en: "From Audio to Text: Transcribing Speech with Gemma 3n"
description: "学习如何使用Gemma 3n的原生多模态功能将音频文件转录为文本。本教程涵盖设置并提供使用`mlx-vlm`库的Python代码示例。"
description_en: "Learn how to use Gemma 3n's native multimodal capabilities to transcribe audio files into text. This tutorial covers the setup and provides a Python code example using the `mlx-vlm` library."
pubDate: 2025-07-19
lastUpdated: 2025-07-19
draft: false
lang: "zh"
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "多模态", "音频转录", "Python", "MLX", "教程"]
---

Gemma 3n不仅仅用于文本。它的真正力量在于其原生多模态功能，允许它理解和处理各种输入，包括音频。这对于设备上AI应用程序来说是一个游戏规则改变者。

在本教程中，我们将探索如何使用Gemma 3n执行最常见的音频任务之一：语音到文本转录。我们将使用针对Apple Silicon优化的`mlx-vlm`库来演示这个强大功能。

### 为什么多模态很重要

在我们深入之前，让我们理解为什么这如此令人兴奋。一个能够处理文本、音频和图像的单一、高效模型为开发者开启了一个新的可能性世界，从创建语音控制应用程序到构建能够"看到"和"听到"周围世界的工具——所有这些都通过优先考虑用户隐私在设备上运行。

### 步骤1：设置你的环境

本指南专注于在带有Apple Silicon的Mac上使用`mlx-vlm`库，因为它为Gemma 3n的多模态功能提供了出色的优化性能。

首先，你需要安装Python和`pip`。我们建议使用虚拟环境来保持项目依赖的组织性。

```bash
# 为你的项目创建一个新目录
mkdir gemma-audio-test && cd gemma-audio-test

# 创建并激活虚拟环境
python3 -m venv .venv
source .venv/bin/activate
```

接下来，安装所需的库。`mlx-vlm`包将为我们处理模型下载和推理。

```bash
pip install mlx-vlm
```

### 步骤2：准备你的音频文件

你需要一个音频文件来转录。对于这个例子，让我们假设你有一个保存为`my-speech.wav`的短语音片段。WAV格式是此任务的好选择。

如果你没有，你可以使用QuickTime Player或Mac上的任何其他音频录制软件轻松录制一个短片。

### 步骤3：编写转录脚本

现在，让我们编写一个简单的Python脚本来加载Gemma 3n模型并转录我们的音频文件。创建一个名为`transcribe.py`的文件：

```python
import mlx.core as mx
from mlx_vlm import load

# 加载Gemma 3n模型。这将在第一次运行时下载模型权重。
# 注意：模型有几个GB，所以第一次运行可能需要一段时间。
model, processor = load("gg-hf-gm/gemma-3n-E4B-it")

# 为模型准备提示和音频文件。
# 提示指导模型需要执行的任务。
prompt = "用英语转录以下语音片段："
audio_file = "my-speech.wav"

# 生成转录
response = model.generate(
    audio=audio_file,
    prompt=prompt,
    max_tokens=256,
    temp=0.0 # 对转录等事实性任务使用0.0的温度
)

# 打印结果
print(f"转录：\n{response}")

```

### 步骤4：运行脚本

将你的`transcribe.py`脚本和`my-speech.wav`音频文件放在同一目录中，从终端运行脚本：

```bash
python transcribe.py
```

第一次运行时，`mlx-vlm`将下载Gemma 3n模型，这可能相当大（`E4B-it`版本约为15GB）。请耐心等待。后续运行会快得多，因为模型将在本地缓存。

一旦模型加载完成并且推理完成，你应该看到音频文件的转录打印到控制台！

### 视频指南

虽然本教程专注于使用MLX的设备上功能，但音频理解的基础技术与Google更广泛的模型系列共享。这个视频提供了使用Python从音频生成文本的出色概述，展示了类似的概念。

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/L3qAzagAtCs" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

### 结论

你刚刚成功使用了Gemma 3n的多模态功能将语音转换为文本。这只是开始。你可以调整这个脚本来构建更复杂的应用程序，如本地语音助手、会议转录工具或无障碍应用程序。

敬请关注更多教程，我们将探索Gemma 3n的其他多模态功能，包括图像理解！ 