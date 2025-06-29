---
title: "Fine-tuning Gemma 3n: A Deep Dive with Unsloth"
description: "An advanced tutorial on fine-tuning Gemma 3n models using the Unsloth library for maximum performance and memory efficiency. Learn how to adapt Gemma 3n to specific tasks on consumer hardware."
pubDate: 2025-06-29
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "Fine-tuning", "Unsloth", "LoRA", "Advanced", "Tutorial"]
---

While running pre-trained Gemma 3n models is powerful, the real magic happens when you adapt them to your specific domain or task. This process, known as fine-tuning, can dramatically improve performance on specialized datasets. However, fine-tuning large models has traditionally been resource-intensive.

Enter Unsloth. Unsloth is a revolutionary library that makes fine-tuning up to 2-5x faster while using 50-80% less memory, with no loss in accuracy. This makes it possible to fine-tune models like Gemma 3n on free Google Colab notebooks or consumer-grade GPUs.

In this deep dive, we'll walk through the concepts and code needed to fine-tune Gemma 3n using Unsloth and the Hugging Face ecosystem.

### Key Concepts

*   **Fine-tuning:** The process of taking a pre-trained model and continuing to train it on a smaller, task-specific dataset.
*   **PEFT (Parameter-Efficient Fine-Tuning):** Techniques that only update a small subset of the model's parameters, drastically reducing memory and computational requirements.
*   **LoRA (Low-Rank Adaptation):** The most popular PEFT method. It freezes the original model weights and injects small, trainable "adapter" layers. We train only these adapters.
*   **Unsloth:** A library that provides highly optimized kernels (low-level GPU code) and integrates seamlessly with Hugging Face's `transformers`, `peft`, and `trl` libraries to accelerate the fine-tuning process.

### Step 1: Setting Up the Environment (Google Colab)

The easiest way to start is with a free Google Colab notebook, which provides a T4 GPU. The following code will install all necessary libraries.

```python
# Install necessary libraries
!pip install "unsloth[colab-ampere] @ git+https://github.com/unslothai/unsloth.git"
!pip install "git+https://github.com/huggingface/transformers.git"
!pip install "git+https://github.com/huggingface/peft.git"
!pip install "git+https://github.com/huggingface/accelerate.git"
!pip install "git+https://github.com/huggingface/trl.git"
!pip install "git+https://github.com/huggingface/datasets.git"
```

### Step 2: Loading the Model and Tokenizer with Unsloth

We'll use Unsloth's `FastLanguageModel` to load Gemma 3n. This special wrapper automatically applies Unsloth's performance optimizations.

```python
from unsloth import FastLanguageModel
import torch

# Model options: unsloth/gemma-3n-e4b-it-bnb-4bit
model_name = "unsloth/gemma-3n-e4b-it-bnb-4bit"

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = model_name,
    max_seq_length = 2048,
    dtype = None, # Autodetect
    load_in_4bit = True,
)
```

Here, `load_in_4bit=True` is the key. It loads the model with its weights quantized to 4-bit precision, which is what drastically reduces the memory footprint.

### Step 3: Configuring LoRA Adapters

Now, we add the LoRA adapters to the model. Unsloth makes this easy.

```python
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # LoRA rank
    lora_alpha = 32,
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",],
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = True,
    random_state = 42,
)
```
We are telling Unsloth to add LoRA adapters to all the key attention and feed-forward layers of the model.

### Step 4: Preparing Your Dataset

For this example, we'll use a simple dataset for turning instructions into JSON. You can replace this with any dataset that has a `text` column.

```python
from datasets import load_dataset

# A simple dataset for demonstration
alpaca_prompt = """Below is an instruction that describes a task. Write a response that appropriately completes the request.

### Instruction:
{}

### Response:
{}"""

def formatting_prompts_func(examples):
    instructions = examples["instruction"]
    outputs      = examples["output"]
    texts = []
    for instruction, output in zip(instructions, outputs):
        text = alpaca_prompt.format(instruction, output)
        texts.append(text)
    return { "text" : texts, }

# Load and format the dataset
dataset = load_dataset("yahma/alpaca-cleaned", split = "train")
dataset = dataset.map(formatting_prompts_func, batched = True,)
```

### Step 5: Training the Model

We use the `SFTTrainer` (Supervised Fine-tuning Trainer) from the `trl` library, which works perfectly with our Unsloth-prepared model.

```python
from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = 2048,
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60, # A short training run for demonstration
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 42,
        output_dir = "outputs",
    ),
)

trainer.train()
```

### Video Guide

For a more in-depth explanation of fine-tuning with Unsloth, including helpful analysis, watch this video:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
    <iframe 
        src="https://www.youtube.com/embed/pWZfufhF45o" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>

### Conclusion

You have now successfully fine-tuned Gemma 3n on a custom task! This process, made incredibly efficient by Unsloth, allows you to create highly specialized models for your own needs. You can now save your trained LoRA adapters or merge them into the base model for deployment.

This is a foundational skill for any advanced AI developer, and mastering it opens the door to a new level of application development. 