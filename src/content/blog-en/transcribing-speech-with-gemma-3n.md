---
title: "From Audio to Text: Transcribing Speech with Gemma 3n"
description: "Learn how to use Gemma 3n's native multimodal capabilities to transcribe audio files into text. This tutorial covers the setup and provides a Python code example using the `mlx-vlm` library."
pubDate: 2025-06-29
lastUpdated: 2025-07-01
draft: false
lang: "en"
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "Multimodal", "Audio Transcription", "Python", "MLX", "Tutorial"]
---

Gemma 3n isn't just for text. Its true power lies in its native multimodal capabilities, allowing it to understand and process various inputs, including audio. This is a game-changer for on-device AI applications.

In this tutorial, we will explore how to use Gemma 3n for one of the most common audio tasks: speech-to-text transcription. We'll use the `mlx-vlm` library, which is optimized for Apple Silicon, to demonstrate this powerful feature.

### Why Multimodal Matters

Before we dive in, let's appreciate why this is so exciting. A single, efficient model that can handle text, audio, and images opens up a new world of possibilities for developers, from creating voice-controlled applications to building tools that can "see" and "hear" the world around them—all while prioritizing user privacy by running on-device.

### Step 1: Setting Up Your Environment

This guide focuses on using the `mlx-vlm` library on a Mac with Apple Silicon, as it provides excellent, optimized performance for Gemma 3n's multimodal features.

First, you'll need to have Python and `pip` installed. We recommend using a virtual environment to keep your project dependencies organized.

```bash
# Create a new directory for your project
mkdir gemma-audio-test && cd gemma-audio-test

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate
```

Next, install the required library. The `mlx-vlm` package will handle the model download and inference for us.

```bash
pip install mlx-vlm
```

### Step 2: Preparing Your Audio File

You'll need an audio file to transcribe. For this example, let's assume you have a short speech segment saved as `my-speech.wav`. WAV format is a good choice for this task.

If you don't have one, you can easily record a short clip using QuickTime Player or any other audio recording software on your Mac.

### Step 3: Writing the Transcription Script

Now, let's write a simple Python script to load the Gemma 3n model and transcribe our audio file. Create a file named `transcribe.py`:

```python
import mlx.core as mx
from mlx_vlm import load

# Load the Gemma 3n model. This will download the model weights on the first run.
# Note: The model is several gigabytes, so the first run may take a while.
model, processor = load("gg-hf-gm/gemma-3n-E4B-it")

# Prepare the prompt and the audio file for the model.
# The prompt guides the model on the task it needs to perform.
prompt = "Transcribe the following speech segment in English:"
audio_file = "my-speech.wav"

# Generate the transcription
response = model.generate(
    audio=audio_file,
    prompt=prompt,
    max_tokens=256,
    temp=0.0 # Use a temperature of 0.0 for factual tasks like transcription
)

# Print the result
print(f"Transcription:\n{response}")

```

### Step 4: Running the Script

With your `transcribe.py` script and `my-speech.wav` audio file in the same directory, run the script from your terminal:

```bash
python transcribe.py
```

The first time you run this, `mlx-vlm` will download the Gemma 3n model, which can be quite large (around 15GB for the `E4B-it` version). Please be patient. Subsequent runs will be much faster as the model will be cached locally.

Once the model is loaded and inference is complete, you should see the transcription of your audio file printed to the console!

### Video Guide

While this tutorial focuses on the on-device capabilities with MLX, the underlying technology for audio understanding is shared with Google's broader family of models. This video provides an excellent overview of using Python to generate text from audio with Gemini, which showcases similar concepts.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/L3qAzagAtCs" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

### Conclusion

You've just successfully used Gemma 3n's multimodal capabilities to convert speech to text. This is just the beginning. You can adapt this script to build more complex applications, such as a local voice assistant, a meeting transcription tool, or an accessibility app.

Stay tuned for more tutorials where we'll explore Gemma 3n's other multimodal features, including image understanding! 