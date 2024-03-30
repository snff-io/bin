import re
import argparse

def ansi_to_html(ansi_string):
    # Regular expression to match ANSI escape codes
    ansi_regex = re.compile(r'\x1b\[48;2;(\d+);(\d+);(\d+)m\x1b\[38;2;(\d+);(\d+);(\d+)m|\x1b\[0m')

    # Initialize HTML string
    html_string = ''
    row_html = ''  # HTML for current row
    nested_span_count = 0  # Track nested span count

    # Parse ANSI escape codes and generate HTML spans
    for match in ansi_regex.finditer(ansi_string):
        if match.group(0) == '\x1b[0m':
            # ANSI reset found
            if nested_span_count > 0:
                html_string += f'<div style="white-space: nowrap;">{row_html}</div>'
                row_html = ''  # Reset row HTML
                nested_span_count = 0  # Reset nested span count
            continue  # Skip to the next match

        r_bg, g_bg, b_bg, r_fg, g_fg, b_fg = map(int, match.groups())

        text = '▄'  # Use any suitable text representation here

        row_html += f'<span style="color: rgb({r_fg}, {g_fg}, {b_fg}); background-color: rgb({r_bg}, {g_bg}, {b_bg});">{text}</span>'
        nested_span_count += 1

    # If there's any remaining content after the last ANSI reset
    if nested_span_count > 0:
        html_string += f'<div style="white-space: nowrap;">{row_html}</div>'

    return html_string

def main():
    parser = argparse.ArgumentParser(description='Convert ANSI escape codes to HTML.')
    parser.add_argument('input_file', type=str, help='Input file containing ANSI escape codes')
    args = parser.parse_args()

    with open(args.input_file, 'r') as file:
        ansi_string = file.read()

    html_string = ansi_to_html(ansi_string)

    output_file = args.input_file + '.html'
    with open(output_file, 'w') as file:
        file.write(html_string)

    print(f'Conversion completed. HTML output saved to: {output_file}')

if __name__ == '__main__':
    main()

