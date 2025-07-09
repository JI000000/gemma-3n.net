---
title: "Generating SVGs with Gemma 3n"
description: "Learn how to use Gemma 3n to generate scalable vector graphics (SVG) code. From simple shapes to complex illustrations, discover the power of AI-driven design."
pubDate: 2025-06-29
lastUpdated: 2025-07-01
author: "Gemma-3n.net Team"
tags: ["Gemma 3n", "SVG", "Image Generation", "Code Generation", "Creative AI", "Tutorial"]
draft: false
lang: "en"
---

One of the most creative and fun applications of a powerful language model like Gemma 3n is generating not just text, but structured code that has a visual output. Scalable Vector Graphics (SVGs) are perfect for this, as they are just XML-based text files that describe an image.

This means you can ask Gemma 3n to "draw" something, and it can write the SVG code for you!

### Why Generate SVGs with an LLM?

-   **Rapid Prototyping:** Quickly create icons, logos, or simple illustrations from a text description.
-   **Dynamic Graphics:** Programmatically generate charts, diagrams, or other data visualizations.
-   **Creative Exploration:** Experiment with generative art by giving abstract or unusual prompts.
-   **No Graphics Software Needed:** All you need is a text editor and a web browser to see your creations.

### Step 1: Setting Up Your Tool

For this task, you don't need a complex Python environment. Any tool that lets you chat with Gemma 3n will work, including:
-   **Ollama** (via the command line)
-   **LM Studio** (via the GUI)
-   A custom Python script calling a local API

We'll use the Ollama command line interface for this example because it's simple and effective. Make sure you have a Gemma 3n model pulled (e.g., `ollama pull gemma3n`).

### Step 2: Crafting the Perfect Prompt

The key to getting good SVGs is a clear and specific prompt. You need to tell the model exactly what you want it to do: **generate SVG code**.

**A good prompt structure:**
`"Generate the SVG code for [your image description]. The SVG should have a size of [width]x[height]. [Add any other constraints, like colors, shapes, etc.]."`

**Example Prompts:**
-   "Generate the SVG code for a simple, smiling sun icon. The SVG should be 100x100 pixels."
-   "Write the SVG markup for a red circle inside a blue square. The total size should be 200x200."
-   "Create the SVG code for a basic bar chart with three bars of different heights and colors."

### Step 3: Generating the SVG Code

Let's use our "smiling sun" prompt with Ollama in the terminal.

1.  Start a chat with Gemma 3n:
    ```bash
    ollama run gemma3n
    ```

2.  Enter your prompt:
    ```
    >>> Generate the SVG code for a simple, smiling sun icon. The SVG should be 100x100 pixels.
    ```

3.  Gemma 3n will respond with a block of SVG code. It should look something like this:

    ```xml
    Certainly! Here is the SVG code for a simple, smiling sun icon:

    ```svg
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#FFD700" stroke="#FDB813" stroke-width="2"/>
      <circle cx="38" cy="45" r="3" fill="black"/>
      <circle cx="62" cy="45" r="3" fill="black"/>
      <path d="M 35 60 A 15 15 0 0 0 65 60" stroke="black" stroke-width="2" fill="none"/>
    </svg>
    ```
    ```

### Step 4: Viewing Your SVG

This is the fun part!
1.  Copy the SVG code block that the model generated (just the part from `<svg...` to `</svg>`).
2.  Create a new file on your computer named `sun.svg`.
3.  Paste the code into this file and save it.
4.  Open the `sun.svg` file with any modern web browser (like Chrome, Firefox, or Safari).

You should see your generated image!

![A simple smiling sun icon, as an SVG might render it.](https://i.imgur.com/3flhY5V.png)

### Step 5: Iterating and Modifying

The first result might not be perfect. The power of this process is in iteration. You can ask the model to modify the SVG:

-   `"Okay, can you make the sun's rays by adding yellow lines radiating from the center?"`
-   `"Make the smile wider."`
-   `"Change the background color to a light sky blue."`

The model can then provide you with an updated block of SVG code to try.

### Conclusion

Generating SVGs is a fantastic way to witness the creative and logical power of Gemma 3n. It's a practical example of how language models can be used as powerful assistants in design and development workflows. This technique bridges the gap between natural language ideas and tangible visual output, opening up exciting possibilities for developers and creators. 