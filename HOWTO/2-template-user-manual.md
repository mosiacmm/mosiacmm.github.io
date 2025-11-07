
### Purpose of the Keys on Template (Front Matter)

*   **`layout`**:
    *   **Purpose:** This tells Jekyll which design (template) to use for your page or post. Different layouts can make your content look different.
    *   **Example:** `blog_details` means it will use a layout specifically designed for a detailed blog post.

*   **`title`**:
    *   **Purpose:** The main headline or name of your blog post or page. This will appear prominently on your website.
    *   **Example:** `Your Awesome Blog Post Title`

*   **`description`**:
    *   **Purpose:** A short sentence or two summarizing your content. This is super important for search engines like Google, as it often shows up below your title in search results.
    *   **Example:** `A short summary of what your blog post is about. This is good for search engines!`

*   **`author`**:
    *   **Purpose:** Information about the person who wrote the post. It's a collection of related details.
    *   **`name`**: The author's full name.
    *   **`avatar_url`**: A link to the author's profile picture.
    *   **`biography`**: A brief description of the author's background or interests.

*   **`date`**:
    *   **Purpose:** The publication date of your post. Jekyll often uses this to sort posts.
    *   **Format:** `YYYY-MM-DD` (Year-Month-Day)
    *   **Example:** `2024-01-01`

*   **`categories`**:
    *   **Purpose:** A way to group your posts into broader topics. Think of them like folders. You can have multiple categories.
    *   **Example:** `[Category One, Category Two]` (Note: they are in square brackets `[]` and separated by commas)

*   **`tags`**:
    *   **Purpose:** More specific keywords that describe your post. Think of them like labels that help people find related content. You can have many tags.
    *   **Example:** `[Tag One, Tag Two, Blog]`

*   **`pin`**:
    *   **Purpose:** If `true`, this post might stay at the top of your blog feed (like a "sticky" post). If `false`, it follows the normal sorting order.
    *   **Example:** `false`

*   **`math`**:
    *   **Purpose:** If `true`, Jekyll might enable special features to display mathematical equations properly.
    *   **Example:** `true`

*   **`mermaid`**:
    *   **Purpose:** If `true`, Jekyll might enable features to render Mermaid diagrams (which let you draw flowcharts and diagrams using text).
    *   **Example:** `true`

*   **`image`**:
    *   **Purpose:** Details about the main image associated with your post, often used as a thumbnail or social media share image.
    *   **`path`**: The location of the image file on your website.
    *   **`lqip` (Low-Quality Image Placeholder)**: A tiny, blurry version of the image that loads very quickly, giving the user something to see while the full-quality image loads. This is a technical detail for performance.
    *   **`alt`**: "Alternative text" for the image. This is important for accessibility (for people who can't see the image) and for search engines.

*   **`heroimage`**:
    *   **Purpose:** Similar to `image`, but often refers to a larger, prominent image displayed at the very top of your post, sometimes across the full width of the page. It has the same sub-keys (`path`, `lqip`, `alt`).

That's it! With this guide, you should be able to create great content for your Jekyll website.