### **Master Prompt for PDF to Slideshow Content Conversion**

**Objective:** To convert a given PDF curriculum into a structured Markdown file (`slideshow_content.md`) that will be used to dynamically generate an interactive web-based slideshow.

**Core Task:** Your role is to act as an expert content creator. You will analyze the provided PDF, understand its structure and content, and then transcribe and reformat it into the specific Markdown schema detailed below. The final output must be clean, accurate, and adhere strictly to all formatting rules, especially for mathematical notations.

---

### **Input and Output**

*   **Input:** A PDF file containing the curriculum. (e.g., `@[path/to/your/pdf]`)
*   **Output:** A single, complete Markdown file named `slideshow_content.md`.

---

### **General Methodology**

1.  **Analyze the PDF:** Thoroughly read the entire PDF to understand its units, lessons, examples, and exercises.
2.  **Pacing:** Divide the content logically, ensuring each slide in the Markdown file represents approximately **1 to 2 pages** of the source PDF.
3.  **Transcription:** Transcribe the content accurately, paying close attention to spelling and grammar. Remove any unreadable characters (like `�`).
4.  **Structuring:** Format the transcribed content according to the strict schema defined below.

---

### **Markdown Schema Definition**

Use the following tags and structures to organize the content. Each slide is separated by `---`.

*   `# Unit: [Unit Title]`
    *   Defines the beginning of a major unit or chapter.

*   `## Lesson: [Lesson Title]`
    *   The title of the specific lesson for that slide.

*   `### Content:`
    *   The main explanatory text, definitions, and core concepts for the slide.

*   `### Example:`
    *   Used for simple, non-interactive examples.

*   `### Note:`
    *   For important remarks, hints, or side notes that should be highlighted.

*   `### Question:`
    *   The text of a question or exercise. This tag MUST be paired with an `### Answer:` tag immediately following it.

*   `### MCQ:`
    *   For multiple-choice questions. The question text and options (`a)`, `b)`, etc.) go here. This MUST be paired with an `### Answer:` tag that contains only the letter of the correct choice (e.g., `b)`).

*   `### Step-by-step:`
    *   For complex examples that should be revealed sequentially. Each step of the solution MUST be separated by its own `---`.

*   `### Image: [filename.svg]`
    *   A placeholder for a custom SVG illustration. You should propose a relevant SVG and use its intended filename here.

*   `### Page Reference: [page numbers]`
    *   The corresponding page number(s) from the source PDF.

---

### **Crucial Formatting Rules**

1.  **Mathematical Notations (Most Important):**
    *   All mathematical formulas, variables, and symbols **MUST** be formatted using **LaTeX syntax**.
    *   **Inline Math:** For symbols that appear within a sentence, use single dollar signs.
        *   *Example:* `إذا كانت $A \subseteq B$ فإن...`
    *   **Display Math:** For standalone equations that should appear on their own line, use double dollar signs.
        *   *Example:* `$$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$`
    *   **Matrices and Determinants:** This is critical. **DO NOT** use simple brackets. Use the proper LaTeX environments.
        *   **Correct:** `$$ A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} $$` for a matrix.
        *   **Correct:** `$$ |A| = \begin{vmatrix} a & b \\ c & d \end{vmatrix} $$` for a determinant.
        *   **Incorrect:** `[[a, b], [c, d]]` or `|a b|, |c d|`

2.  **SVG Illustrations:**
    *   For slides requiring a visual aid (e.g., Venn diagrams, geometric shapes, graphs), you must propose and generate a clean, professional, and relevant SVG illustration.
    *   The filename used in the `### Image:` tag must correspond to the SVG you intend to create.

---

### **Example of a Perfect Slide Structure**

`# Unit: الوحدة الرابعة: المصفوفات والمحددات`
`## Slide: 40`
`### Lesson: الحل بالطريقة المصفوفية`
`### Question:`
`**مثال:** حل الجملة التالية:`
`$ x + y = 5 $`
`$ x - y = 1 $`
`### Step-by-step:`
`**الخطوة 1: كتابة المعادلة بصيغة مصفوفة AX = B**`
`$$ A = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}, X = \begin{bmatrix} x \\ y \end{bmatrix}, B = \begin{bmatrix} 5 \\ 1 \end{bmatrix} $$`
`---
`**الخطوة 2: حساب المحدد |A|**`
`$$ |A| = (1)(-1) - (1)(1) = -2 $$`
`---
`**الخطوة 3: إيجاد معكوس المصفوفة A⁻¹**`
`$$ A^{-1} = \frac{1}{|A|} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix} = \frac{1}{-2} \begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} $$`
`---
`**الخطوة 4: حساب قيم X**`
`$$ X = A^{-1}B = \begin{bmatrix} 0.5 & 0.5 \\ 0.5 & -0.5 \end{bmatrix} \begin{bmatrix} 5 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 2 \end{bmatrix} $$`
`---
`**الحل النهائي:**`
`$$ x=3, y=2 $$`
`### Image: matrix_solution.svg`
`### Page Reference: 81-84`

---

Please begin by analyzing the provided PDF at `@[path/to/your/pdf]` and then generate the `slideshow_content.md` file according to all the rules specified above.
