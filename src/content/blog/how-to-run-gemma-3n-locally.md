---
title: "How to Run Gemma 3n Locally: A Beginner's Guide"
description: "Get started with Google's latest open-source model, Gemma 3n. This step-by-step tutorial walks you through setting it up on your local machine."
pubDate: 2025-06-20
heroImage: "/blog-placeholder-1.jpg"
author: "The Gemma-3n.net Team"
tags: ["tutorial", "ollama", "local-ai"]
---

Welcome to the definitive guide for running Gemma 3n, Google's groundbreaking open-source model, right on your own computer. Whether you're a developer, a researcher, or just an AI enthusiast, this tutorial will provide you with everything you need to get up and running.

Running powerful AI models on your local machine is easier than ever. In this guide, we'll walk you through the simplest method to get Google's state-of-the-art Gemma 3n model running on your laptop or desktop using Ollama. No complex setup, just a few simple commands.

## Prerequisites
- A modern computer (macOS, Linux, or Windows with WSL2).
- An internet connection to download the model.

## Step 1: Install Ollama
Ollama is a fantastic tool that bundles model weights, configuration, and a runner into a single, easy-to-use package. It's the fastest way to get started.

Head over to the [Ollama website](https://ollama.com/) and download the installer for your operating system. Run the installer to get Ollama set up on your system. It will run in the background.

## Step 2: Pull the Gemma 3n Model
Once Ollama is installed, open your terminal (Terminal on macOS/Linux, or Command Prompt/PowerShell on Windows).

To download and run the E4B (4B parameter, embed-only) version of Gemma 3n, use the following command:
```bash
ollama run gemma-3n:e4b
```

If you want the smaller E2B (2B parameter) version, you can use:
```bash
ollama run gemma-3n:e2b
```

Ollama will download the model file, which might take a few minutes depending on your internet speed. Once it's done, you'll be dropped into an interactive chat session right in your terminal!

## Step 3: Chat with the Model
That's it! You can now start interacting with Gemma 3n. Ask it questions, have it summarize text, or give it any other task. For example:
```bash
>>> Why is the sky blue?
```

## Conclusion
Congratulations! You now have a powerful, multimodal AI model running locally on your computer. With Ollama, the process is incredibly streamlined. From here, you can explore using Ollama's API to build applications on top of Gemma 3n, or try out other models from their extensive library. 