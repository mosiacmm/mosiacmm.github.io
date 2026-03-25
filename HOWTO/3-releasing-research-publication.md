

## User Manual: Modifying Research Publications YML File

This guide will walk you through the process of adding or updating entries in the `_data\research_publications.yml` file. This file stores information about your research publications, including titles, authors, release dates, download links, images, and abstracts.

**Important Note:** Always make a backup of your `research_publications.yml` file before making any changes.

---

#### Section 1: Understanding the YML Structure

Each publication entry in the YML file follows a specific structure:

```yaml
- title: "Title of the Publication"
  author: "Author Name(s)"
  release_date: "YYYY-MM-DD"
  google_drive_link: "Public Google Drive Link to PDF"
  image: "/../../assets/img/research_publications/image_folder_name/image_file_name.png"
  abstract: "A brief summary or abstract of the publication."
```

*   **`-` (Hyphen):** Each new publication entry must start with a hyphen, indicating a new list item.
*   **`title:`**: The full title of the publication, enclosed in double quotes.
*   **`author:`**: The name(s) of the author or organization, enclosed in double quotes.
*   **`release_date:`**: The publication date in `YYYY-MM-DD` format, enclosed in double quotes.
*   **`google_drive_link:`**: The direct public link to the publication's PDF file on Google Drive, enclosed in double quotes. **Ensure this link is public so users can download it.**
*   **`image:`**: The relative path to the publication's cover image. This path must be accurate.
*   **`abstract:`**: A concise summary or abstract of the publication, enclosed in double quotes.

---

#### Section 2: Adding a New Publication

Follow these steps to add a new research publication:

1.  **Open the YML File:** Open your `research_publications.yml` file using a text editor (e.g., VS Code, Sublime Text, Notepad++).

2.  **Navigate to the End:** Scroll to the very end of the file.

3.  **Add a New Entry:** Copy and paste the following template, ensuring it starts with a hyphen on a new line, and then indent the subsequent lines correctly (usually two spaces per level of indentation).

    ```yaml
    - title: "New Publication Title Here"
      author: "New Author Name"
      release_date: "YYYY-MM-DD"
      google_drive_link: "YOUR_PUBLIC_GOOGLE_DRIVE_LINK_HERE"
      image: "/../../assets/img/research_publications/your_image_folder_name/your_image_file_name.png"
      abstract: "A brief abstract for your new publication goes here."
    ```

4.  **Upload Your Image:**
    *   Go to the `assets/img/research_publications/` folder on your website's file structure.
    *   **Create a New Folder:** It's recommended to create a new subfolder within `research_publications/` specifically for your publication's images. For example, if your title is "My Great Research", create a folder named `my_great_research`.
    *   Upload your publication's cover image (e.g., `my_great_research_cover.png`) into this new folder.
    *   **Important:** The image name and folder name in the `image:` path **must exactly match** what you uploaded.

5.  **Obtain a Public Google Drive Link:**
    *   Upload your publication's PDF to Google Drive.
    *   Right-click on the PDF file and select "Share."
    *   Change the access from "Restricted" to "Anyone with the link."
    *   Copy the generated shareable link.
    *   **Crucial:** Test this link in an incognito browser window to ensure it's publicly accessible without requiring a Google account login.

6.  **Fill in the Details:** Replace the placeholder information in the YML file with your publication's actual details:
    *   **`title:`**: Enter the full title.
    *   **`author:`**: Enter the author(s).
    *   **`release_date:`**: Enter the date in `YYYY-MM-DD` format.
    *   **`google_drive_link:`**: Paste the public Google Drive link you obtained.
    *   **`image:`**: Update the path to reflect your new image's location and name. For example: `"/../../assets/img/research_publications/my_great_research/my_great_research_cover.png"`
    *   **`abstract:`**: Paste or type the publication's abstract.

7.  **Save the File:** Save your `research_publications.yml` file.

8.  **Test Your Changes:** Deploy or view your website locally to ensure the new publication appears correctly and all links/images are working.

---

#### Section 3: Modifying an Existing Publication

To update details for an existing publication:

1.  **Open the YML File:** Open your `research_publications.yml` file.
2.  **Locate the Entry:** Find the publication entry you wish to modify by its `title:`.
3.  **Edit Details:** Make the necessary changes to any of the fields (`title`, `author`, `release_date`, `google_drive_link`, `image`, `abstract`).
    *   Remember to update the `google_drive_link` if the file has changed or if the public link needs to be re-generated.
    *   If you're changing the image, follow **Step 4 from Section 2** (Upload Your Image) to ensure the new image is in the correct location and the `image:` path is updated accordingly.
4.  **Save the File:** Save your `research_publications.yml` file.
5.  **Test Your Changes:** Verify the updates on your website.

---

#### Section 4: Deleting a Publication

To remove a publication:

1.  **Open the YML File:** Open your `research_publications.yml` file.
2.  **Locate the Entry:** Find the publication entry you wish to remove.
3.  **Delete the Entire Block:** Delete the hyphen (`-`) and all subsequent lines belonging to that specific publication entry, up until the next hyphen for the subsequent entry, or the end of the file.
4.  **Save the File:** Save your `research_publications.yml` file.
5.  **Test Your Changes:** Verify the publication has been removed from your website.

---

#### Example of a Correctly Formatted Entry

Here's an example of how a correctly filled-out entry should look:
```yaml
- title: "The History of Widget Manufacturing"
  author: "Dr. Jane Doe"
  release_date: "2023-11-01"
  google_drive_link: "https://drive.google.com/file/d/1aB2cD3eF4g5hI6jK7lM8nO9pQ0rS1tU2/view?usp=drive_link"
  image: "/../../assets/img/research_publications/the_history_of_widget_manufacturing/widget_manufacturing_cover.jpg"
  abstract: "This groundbreaking report explores the origins and evolution of widget manufacturing techniques from the industrial revolution to modern times, analyzing key technological advancements and market shifts."
```
`

If you would like a visual representation of how to locate and copy a public Google Drive link, I can generate an image for that!