---
title: "如何在本地运行Gemma 3n：新手指南"
description: "开始使用Google最新的开源模型Gemma 3n。这个分步教程将带你在本地计算机上设置和运行模型。"
pubDate: 2025-06-20
lastUpdated: 2025-07-01
author: "The Gemma-3n.net Team"
tags: ["教程", "ollama", "本地AI"]
draft: false
lang: "zh"
---

欢迎来到在本地计算机上运行Gemma 3n的权威指南。Gemma 3n是Google开创性的开源模型。无论你是开发者、研究员还是AI爱好者，本教程都将为你提供开始使用所需的一切知识。

在本地机器上运行强大的AI模型比以往任何时候都更容易。在本指南中，我们将带你了解使用Ollama在笔记本电脑或台式机上运行Google最先进的Gemma 3n模型的最简单方法。无需复杂设置，只需几个简单命令。

## 前提条件
- 现代计算机（macOS、Linux或带有WSL2的Windows）
- 用于下载模型的互联网连接

## 步骤1：安装Ollama
Ollama是一个出色的工具，它将模型权重、配置和运行器打包成一个易于使用的包。这是最快的入门方式。

前往[Ollama网站](https://ollama.com/)下载适用于你操作系统的安装程序。运行安装程序在系统上设置Ollama。它将在后台运行。

## 步骤2：拉取Gemma 3n模型
安装Ollama后，打开终端（macOS/Linux上的Terminal，或Windows上的Command Prompt/PowerShell）。

要下载并运行Gemma 3n的E4B（40亿参数，仅嵌入）版本，请使用以下命令：
```bash
ollama run gemma-3n:e4b
```

如果你想要更小的E2B（20亿参数）版本，可以使用：
```bash
ollama run gemma-3n:e2b
```

Ollama将下载模型文件，这可能需要几分钟时间，具体取决于你的网络速度。完成后，你将进入终端中的交互式聊天会话！

## 步骤3：与模型对话
就是这样！现在你可以开始与Gemma 3n交互了。问它问题，让它总结文本，或给它任何其他任务。例如：
```bash
>>> 为什么天空是蓝色的？
```

## 结论
恭喜！你现在已经在本地计算机上运行了一个强大的多模态AI模型。通过Ollama，这个过程变得非常简化。从这里开始，你可以探索使用Ollama的API在Gemma 3n之上构建应用程序，或尝试其庞大库中的其他模型。 