## How to Write Markdown for Jekyll: A Simple Guide

Jekyll uses Markdown to help you write content for your website, like blog posts or pages. Markdown is a simple way to format text so it looks good on the web without needing to know complex code.

မြန်မာဘာသာဖြင့် လေ့လာနိုင်သော Link https://devint.saturngod.net/book/5.html

### The Special Part: Front Matter

At the very top of every Jekyll Markdown file, you'll see something called "Front Matter." This is like a small instruction card for Jekyll. It tells Jekyll important things about your page or post, like its title, who wrote it, and when it was published.

The Front Matter is always enclosed between two sets of three hyphens (`---`):

```
---
# This is where your instructions go
---
```

After the second `---`, you write your actual content using Markdown.

### Basic Markdown You'll Use Often

Here are some common ways to format your text:

*   **Headings:** Use `#` for headings. More `#` signs mean smaller headings.
    ```
    # This is a big heading (H1)
    ## This is a sub-heading (H2)
    ### This is an even smaller heading (H3)
    ```

*   **Bold Text:** Wrap text with two asterisks `**` or two underscores `__`.
    ```
    This is **bold text**.
    This is __also bold text__.
    ```

*   **Italic Text:** Wrap text with one asterisk `*` or one underscore `_`.
    ```
    This is *italic text*.
    This is _also italic text_.
    ```

*   **Lists:**
    *   **Unordered List (bullets):** Use hyphens `-`, asterisks `*`, or plus signs `+`.
        ```
        - Item one
        - Item two
            * Sub-item one
            * Sub-item two
        ```
    *   **Ordered List (numbers):** Just use numbers followed by a period.
        ```
        1. First item
        2. Second item
        3. Third item
        ```

*   **Links:**
    ```
    [Text you want to link](https://www.example.com)
    ```

*   **Images:**
    ```
    ![Description of image](https://www.example.com/image.jpg)
    ```

*   **Code Blocks:** If you want to show code, use three backticks `` ``` `` before and after your code. You can also specify the language for highlighting.
    ````
    ```python
    print("Hello, Jekyll!")
    ```
    ````

*   **Paragraphs:** Just type your text. Press enter twice to start a new paragraph.

---

## Jekyll Markdown Template Explained

Here's an example template using the format  provided, with explanations for each key.

```
---
layout: blog_details
title: Your Awesome Blog Post Title
description: A short summary of what your blog post is about. This is good for search engines!
author:
  name : Your Name Here
  avatar_url: https://example.com/your-avatar.jpg
  biography: A short bio about yourself, highlighting your expertise or interests.
date: 2024-01-01
categories: [Category One, Category Two]
tags: [Tag One, Tag Two, Blog]
pin: false
math: true
mermaid: true
image:
  path: /assets/img/blog/posts/your-post-image.jpg
  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
  alt: A descriptive text for your main post image.
heroimage:
  path: https://images.unsplash.com/photo-1593642532781-039d5607386c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
  alt: A descriptive text for your hero image (if different).
---

# My First Blog Post

Welcome to my first blog post on Jekyll!

This is where you'll write all your awesome content using **Markdown**.

You can add lists:
*   Item one
*   Item two

Or maybe some code:

```javascript
console.log("Hello, Jekyll!");
```



## Upload Your Image
    *   Go to the `assets/img/blog/` folder on your website's file structure.
    *   **Create a New Folder:** It's recommended to create a new subfolder within `blog/` specifically for your publication's images. For example, if your blog title is "My Great Research", create a folder named `my_great_research`.
    *   Upload your publication's cover image (e.g., `my_great_research_cover.png`) into this new folder.
    *   **Important:** The image name and folder name in the `image:` path **must exactly match** what you uploaded.
