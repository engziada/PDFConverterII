# Interactive Markdown Slideshow

This project transforms a structured Markdown file into a fully interactive, polished, and feature-rich web-based slideshow. It is designed for educational content, particularly for subjects involving mathematical notations and interactive exercises.

## Features

- **Dynamic & Configurable:** The entire slideshow is generated dynamically.
    - **Content:** Driven by `slideshow_content.md`.
    - **Configuration:** Key details like the course title, logo text, and copyright notice are managed in `config.json` for easy customization.
- **Rich Formatting:**
    - Utilizes **Marked.js** to parse Markdown for text styling (bold, italics, lists).
    - Utilizes **MathJax** for rendering beautiful and accurate LaTeX mathematical notations, including complex matrices and equations.
- **Full Interactivity:**
    - **Interactive MCQs:** Clickable options with instant correct/incorrect feedback.
    - **Step-by-Step Examples:** Complex problems can be revealed one step at a time with smooth animations.
    - **Show/Hide Answers:** Standard questions feature a toggleable answer section.
- **Custom Illustrations:** All visual content is represented by clean, relevant, and self-contained SVG images stored locally.
- **Polished User Interface:**
    - **Search Functionality:** Instantly filter lessons in the sidebar by keyword, with matching text highlighted.
    - **Light & Dark Modes:** Switch between themes to reduce eye strain. Your preference is saved automatically.
    - **Keyboard Navigation:** Use the left and right arrow keys to navigate slides.
    - **Save & Resume:** The slideshow automatically saves your progress and prompts you to resume where you left off.
    - **Intro & Closure Pages:** Provides a complete, professional structure to the presentation.
    - **Print-Friendly Version:** A dedicated print stylesheet allows you to create a clean PDF or paper copy of the entire curriculum.

## How to Use

### Running the Slideshow

Because web browsers have security restrictions that prevent JavaScript from loading local files directly, you need to run a simple local web server to view the slideshow.

1.  **Open a terminal** or command prompt in the root directory of this project (`/PDFConverterII/`).
2.  **Run the following command**. Python is required, which you likely already have installed.
    ```bash
    python -m http.server
    ```
3.  You will see a message like `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...`.
4.  **Open your web browser** and navigate to the following address:
    [http://localhost:8000/slideshow.html](http://localhost:8000/slideshow.html)

The slideshow will now be running.

### Modifying Content

Modifying the content is simple:

- **Configuration:** Edit the `config.json` file to change the course title, logo text, etc.
- **Slides:** Edit the `slideshow_content.md` file. Follow the structure defined in `prompt_template.md` to add or change slides.

After saving your changes, simply **refresh the browser tab** to see the updates instantly.

## File Structure

- `slideshow.html`: The main application file. It contains the basic HTML structure and links to the CSS and JavaScript.
- `style.css`: Contains all the styling rules for the application.
- `script.js`: Contains all the application logic for interactivity and rendering.
- `print.css`: Contains the styling rules for the print-friendly version.
- `config.json`: A configuration file for easy customization of titles and other text.
- `slideshow_content.md`: The core curriculum content, written in a specific Markdown format.
- `prompt_template.md`: A master prompt for generating new content from PDFs.
- `/images/`: A directory containing all the custom SVG illustrations used in the slides.