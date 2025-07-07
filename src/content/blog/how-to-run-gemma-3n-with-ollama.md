---
title: "How to Run Gemma 3n with Ollama on macOS, Windows, and Linux"
description: "A step-by-step guide to setting up and running Google's Gemma 3n models locally using Ollama. Cover installation, model pulling, and basic interactions on all major operating systems."
pubDate: 2025-06-29
lastUpdated: 2025-07-01
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "Ollama", "Local LLM", "Tutorial", "macOS", "Windows", "Linux"]
---

Running large language models on your own machine is becoming increasingly popular for reasons of privacy, offline capability, and cost-effectiveness. Google's new Gemma 3n, with its efficient architecture, is a prime candidate for local deployment. In this guide, we'll walk you through setting up and running Gemma 3n using Ollama, a powerful and easy-to-use tool for managing and running LLMs locally.

This tutorial is designed for macOS, Windows, and Linux users.

### Prerequisites

Before you start, make sure you have:
- A computer with a decent amount of RAM (8GB is a good starting point, 16GB+ is recommended for larger models).
- Administrator/sudo privileges to install software.

### Step 1: Install Ollama

Ollama simplifies the process of downloading and running models. Head over to the official website to get the installer for your operating system.

[**Download Ollama for macOS, Windows, and Linux**](https://ollama.com/download)

Follow the installation instructions provided on the site. Once installed, Ollama will run as a background service. You can verify the installation by opening your terminal (or Command Prompt/PowerShell on Windows) and running:

```bash
ollama --version
```

This should return the installed Ollama version number.

### Step 2: Download Gemma 3n Models

With Ollama installed, you can now pull Gemma 3n models directly from the Ollama library. Gemma 3n comes in several variants. The model tags usually specify the effective parameter size (`e2b` or `e4b`), the type (`it` for instruction-tuned), and the quantization level.

Open your terminal and use the `ollama pull` command. Here are a few common options:

**1. Default Model (recommended for a quick start):**
This is typically a well-balanced version.

```bash
ollama pull gemma3n
```

**2. Specific Sizes and Quantizations:**
For more control, you can specify the exact model. For example, to get the 4 billion effective parameter, instruction-tuned model:

```bash
ollama pull gemma3n:e4b-it
```

To get the smaller 2 billion effective parameter version:
```bash
ollama pull gemma3n:e2b-it
```

The download process may take some time depending on your internet connection and the model size. Ollama will show a progress bar.

### Step 3: Chat with Gemma 3n

Once the model is downloaded, you can start a conversation directly from your terminal. It's as simple as this:

```bash
ollama run gemma3n
```

If you downloaded a specific version, use its tag:
```bash
ollama run gemma3n:e4b-it
```

Ollama will load the model and present you with a `>>>` prompt. You can now chat with Gemma 3n.

**Example Interaction:**

```
>>> Tell me a joke about a pelican.

Sure! Why did the pelican get kicked out of the restaurant?
Because he had a very large bill!

>>>
```

To exit the conversation, type `/bye`.

### Step 4: (Advanced) Using the Ollama API

For developers, one of Ollama's best features is its built-in REST API, which allows you to integrate Gemma 3n into your own applications. The API server starts automatically with the Ollama service.

You can send a request using `curl` from your terminal.

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3n",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```

**Breakdown of the request:**
- `model`: The name of the model you want to use.
- `prompt`: Your input text.
- `stream`: If set to `true`, the API will stream back the response token by token. We set it to `false` here to get the full response at once.

The response will be a JSON object containing the model's output and other metadata.

### Video Guide

For a detailed video walkthrough that covers installation and using a web interface, check out this excellent tutorial:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/QEwJeU8vF7A" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

### Conclusion

Congratulations! You now have Google's powerful Gemma 3n model running locally on your machine, ready for interactive chats or integration into your development projects. This setup gives you a private, offline-first AI companion.

From here, you can explore:
- Building simple scripts that call the Ollama API.
- Experimenting with different Gemma 3n model variants to find the best performance/size trade-off for your hardware.
- Stay tuned for our next tutorials on fine-tuning and building multimodal applications with Gemma 3n! 