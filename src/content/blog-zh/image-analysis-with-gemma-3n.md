---
title: "使用Gemma 3n进行图像分析：描述和理解视觉内容"
title_en: "Image Analysis with Gemma 3n: Describing and Understanding Visuals"
description: "探索Gemma 3n强大的视觉功能。学习如何使用Gemma 3n描述图像、回答关于图像的问题（VQA）和执行基本OCR，包含Python代码示例。"
description_en: "Explore Gemma 3n's powerful vision capabilities. Learn how to use Gemma 3n to describe images, answer questions about them (VQA), and perform basic OCR, complete with Python code examples."
pubDate: 2025-07-19
lastUpdated: 2025-07-19
draft: false
lang: "zh"
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "多模态", "视觉", "图像分析", "VQA", "Python", "教程"]
---

Gemma 3n的多模态功能不仅限于音频，还包括对视觉信息的复杂理解。你可以使用它来描述图像中的内容、回答关于图像的特定问题（视觉问答或VQA），甚至从图像中读取文本（光学字符识别或OCR）。

本教程将指导你使用Python使用Gemma 3n的视觉功能，再次利用Apple Silicon上的`mlx-vlm`库来获得流畅的体验。

### 设备上视觉的力量

在本地运行强大的视觉模型是AI应用程序的重要进步。它启用了以下用例：
-   **无障碍工具**，向视障用户描述世界。
-   **智能照片组织**，根据内容自动标记和分类你的图像。
-   **交互式学习应用程序**，可以"看到"并评论用户的绘画或图表。
-   **隐私优先分析**敏感图像，而无需将它们发送到云端。

### 步骤1：环境设置

设置与我们的音频转录教程相同。如果你已经有了，可以跳过这一步。否则，在新项目目录中创建并激活虚拟环境：

```bash
# 为你的项目创建一个新目录
mkdir gemma-vision-test && cd gemma-vision-test

# 创建并激活虚拟环境
python3 -m venv .venv
source .venv/bin/activate

# 安装所需的库
pip install mlx-vlm
```

### 步骤2：准备你的图像

找到你想要分析的图像。它可以是照片、图表或截图。对于这个例子，将其保存为项目目录中的`my-image.jpg`。

### 步骤3：编写图像分析脚本

让我们编写一个Python脚本`analyze_image.py`来执行不同的视觉任务。

```python
import mlx.core as mx
from mlx_vlm import load
from PIL import Image
import requests

# 加载Gemma 3n模型。这将在第一次运行时被缓存。
model, processor = load("gg-hf-gm/gemma-3n-E4B-it")

# 定义图像路径
image_file = "my-image.jpg"

# --- 任务1：一般图像描述 ---
prompt_describe = "详细描述这张图像。"

print("--- 生成图像描述 ---")
response_describe = model.generate(
    image=image_file,
    prompt=prompt_describe,
    max_tokens=512,
    temp=0.7
)
print(response_describe)


# --- 任务2：视觉问答（VQA） ---
prompt_vqa = "图像中主要物体的颜色是什么？"

print("\n--- 回答关于图像的问题 ---")
response_vqa = model.generate(
    image=image_file,
    prompt=prompt_vqa,
    max_tokens=128,
    temp=0.0 # 对转录等事实性任务使用较低的温度
)
print(response_vqa)


# --- 任务3：光学字符识别（OCR） ---
# 为此任务使用包含清晰文本的图像
image_with_text = "my-text-image.png"
prompt_ocr = "读取此图像中的文本。"

print("\n--- 对图像执行OCR ---")
response_ocr = model.generate(
    image=image_with_text,
    prompt=prompt_ocr,
    max_tokens=256,
    temp=0.0
)
print(response_ocr)

```

### 步骤4：运行和观察

将你的`my-image.jpg`和包含一些文本的图像（命名为`my-text-image.png`）放在目录中。现在运行脚本：

```bash
python analyze_image.py
```

你将看到模型输出三个不同的响应：第一张图像的详细描述、关于它的特定问题的答案，以及第二张图像中文本的转录。

### 视频演示

要看到Gemma 3n视觉功能的实际应用，包括同时处理多个图像，请查看这些有见地的视频：

**解锁多图像魔法：**
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/8n_tpLn6Xbo" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

**使用视觉进行OCR和理解：**
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/U8qt5IB__5c" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>


### 结论

Gemma 3n无缝处理和推理视觉信息的能力使其成为开发者的极其多功能的工具。通过结合其文本、音频和视觉功能，你可以构建真正智能的多模态应用程序，这些应用程序以前只能通过大型、基于云的模型实现。用你自己的图像和提示进行实验，以发现设备上视觉AI的全部潜力。 