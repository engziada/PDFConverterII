import sys
import re

def check_md_file(md_filename):
    with open(md_filename, 'r', encoding='utf-8') as f:
        content = f.read()

    slides = [slide.strip() for slide in content.split('---') if slide.strip()]
    errors = []
    expected_slide_num = 1

    for idx, slide in enumerate(slides):
        lines = slide.splitlines()
        # Check for unreadable characters
        if any('�' in line for line in lines):
            errors.append(f"Slide {idx+1}: Unreadable character '�' found.")

        # Check for required tags at the start
        if not lines or not lines[0].startswith('# Unit:'):
            errors.append(f"Slide {idx+1}: Missing or incorrect '# Unit:' tag at the top.")
        if len(lines) < 2 or not re.match(r'## Slide: ?(\d+)', lines[1]):
            errors.append(f"Slide {idx+1}: Missing or incorrect '## Slide:' tag as second line.")
        else:
            # Check slide number sequence
            m = re.match(r'## Slide: ?(\d+)', lines[1])
            slide_num = int(m.group(1))
            if slide_num != expected_slide_num:
                errors.append(f"Slide {idx+1}: Slide number out of sequence (expected {expected_slide_num}, found {slide_num}).")
            expected_slide_num += 1

        # Check for LaTeX math formatting
        math_inline = re.findall(r'\$[^$]+\$', slide)
        math_display = re.findall(r'\$\$[^$]+\$\$', slide)
        for m in math_inline + math_display:
            if '[[[' in m or ']]]' in m or '[' in m and ']' in m and not m.startswith('$'):
                errors.append(f"Slide {idx+1}: Possible incorrect math formatting: {m}")

        # Check for required tags (at least one of Content, Example, Note, Question, MCQ, Step-by-step, Image, Page Reference)
        required_tags = [
            '### Content:', '### Example:', '### Note:', '### Question:',
            '### MCQ:', '### Step-by-step:', '### Image:', '### Page Reference:'
        ]
        if not any(tag in slide for tag in required_tags):
            errors.append(f"Slide {idx+1}: No required content tags found.")

        # If Question or MCQ, ensure Answer follows immediately
        for tag in ['### Question:', '### MCQ:']:
            if tag in slide:
                tag_idx = lines.index([l for l in lines if tag in l][0])
                if tag_idx+1 >= len(lines) or not lines[tag_idx+1].startswith('### Answer:'):
                    errors.append(f"Slide {idx+1}: '{tag}' not immediately followed by '### Answer:'.")

    # Final report
    if errors:
        print(f"Validation failed for {md_filename}:")
        for err in errors:
            print(" -", err)
        sys.exit(1)
    else:
        print(f"{md_filename} passed all validation checks.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python md_validator.py <markdown_file>")
        sys.exit(1)
    check_md_file(sys.argv[1])