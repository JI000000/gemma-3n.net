---
title: "使用Gemma 3n生成SVG"
title_en: "Generating SVGs with Gemma 3n"
description: "学习如何使用Gemma 3n生成可缩放矢量图形（SVG）代码。从简单形状到复杂插图，探索AI驱动设计的强大功能。"
description_en: "Learn how to use Gemma 3n to generate scalable vector graphics (SVG) code. From simple shapes to complex illustrations, discover the power of AI-driven design."
pubDate: 2025-07-19
lastUpdated: 2025-07-19
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "SVG", "图像生成", "代码生成", "创意AI", "教程"]
draft: false
lang: "zh"
---

像Gemma 3n这样强大的语言模型最富有创意和有趣的应用之一不仅仅是生成文本，而是生成具有视觉输出的结构化代码。可缩放矢量图形（SVG）非常适合这个用途，因为它们只是基于XML的文本文件，用于描述图像。

这意味着你可以要求Gemma 3n"绘制"某些东西，它可以为你编写SVG代码！

### 为什么要用LLM生成SVG？

-   **快速原型设计**：从文本描述快速创建图标、标志或简单插图。
-   **动态图形**：以编程方式生成图表、图表或其他数据可视化。
-   **创意探索**：通过提供抽象或不寻常的提示来实验生成艺术。
-   **无需图形软件**：你只需要一个文本编辑器和网络浏览器就能看到你的创作。

### 步骤1：设置你的工具

对于这个任务，你不需要复杂的Python环境。任何允许你与Gemma 3n聊天的工具都可以工作，包括：
-   **Ollama**（通过命令行）
-   **LM Studio**（通过GUI）
-   调用本地API的自定义Python脚本

我们将使用Ollama命令行界面作为示例，因为它简单有效。确保你已经拉取了Gemma 3n模型（例如，`ollama pull gemma3n`）。

### 步骤2：制作完美的提示

获得好的SVG的关键是清晰和具体的提示。你需要明确告诉模型你想要它做什么：**生成SVG代码**。

**一个好的提示结构：**
`"为[你的图像描述]生成SVG代码。SVG的大小应该是[宽度]x[高度]。[添加任何其他约束，如颜色、形状等]。`

**示例提示：**
-   "为简单的微笑太阳图标生成SVG代码。SVG应该是100x100像素。"
-   "为蓝色正方形内的红色圆圈编写SVG标记。总大小应该是200x200。"
-   "为具有三个不同高度和颜色柱子的基本柱状图创建SVG代码。"

### 步骤3：生成SVG代码

让我们在终端中使用Ollama来使用我们的"微笑太阳"提示。

1.  启动与Gemma 3n的聊天：
    ```bash
    ollama run gemma3n
    ```

2.  输入你的提示：
    ```
    >>> 为简单的微笑太阳图标生成SVG代码。SVG应该是100x100像素。
    ```

3.  Gemma 3n将用SVG代码块响应。它应该看起来像这样：

    ```xml
    当然！这是简单微笑太阳图标的SVG代码：

    ```svg
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#FFD700" stroke="#FDB813" stroke-width="2"/>
      <circle cx="38" cy="45" r="3" fill="black"/>
      <circle cx="62" cy="45" r="3" fill="black"/>
      <path d="M 35 60 A 15 15 0 0 0 65 60" stroke="black" stroke-width="2" fill="none"/>
    </svg>
    ```
    ```

### 步骤4：查看你的SVG

这是有趣的部分！
1.  复制模型生成的SVG代码块（从`<svg...`到`</svg>`的部分）。
2.  在你的计算机上创建一个名为`sun.svg`的新文件。
3.  将代码粘贴到这个文件中并保存。
4.  用任何现代网络浏览器（如Chrome、Firefox或Safari）打开`sun.svg`文件。

你应该看到你生成的图像！

![一个简单的微笑太阳图标，就像SVG可能渲染的那样。](https://i.imgur.com/3flhY5V.png)

### 步骤5：迭代和修改

第一个结果可能不完美。这个过程的力量在于迭代。你可以要求模型修改SVG：

-   `"好的，你能通过在中心添加放射状的黄色线条来制作太阳的光芒吗？"`
-   `"让笑容更宽一些。"`
-   `"将背景颜色改为浅天蓝色。"`

然后模型可以为你提供一个更新的SVG代码块来尝试。

### 结论

生成SVG是见证Gemma 3n创意和逻辑力量的绝佳方式。这是语言模型如何在设计和开发工作流程中用作强大助手的实际例子。这种技术弥合了自然语言想法和有形视觉输出之间的差距，为开发者和创作者开启了令人兴奋的可能性。 