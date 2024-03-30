import os
import curses

def list_files(directory):
    return [filename for filename in os.listdir(directory) if filename.isprintable()]


def preview_file(filename):
    with open(filename, 'r') as file:
        content = file.read()
    return content

def display_files(stdscr, directory):
    stdscr.clear()
    files = list_files(directory)
    curses.init_pair(1, curses.COLOR_CYAN, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_GREEN, curses.COLOR_BLACK)
    selected_index = 0

    while True:
        stdscr.clear()
        height, width = stdscr.getmaxyx()
        for idx, file in enumerate(files):
            file_color = curses.color_pair(1)
            if idx == selected_index:
                file_color = curses.color_pair(2) | curses.A_BOLD
            # Print the filename before adding it to the screen for debugging
            try:
                print(f"Adding filename: {file}")
                stdscr.addstr(idx, 0, file, file_color)
            except Exception as e:
                print(f"Error adding filename: {e}")

        preview_filename = files[selected_index]
        preview_content = preview_file(os.path.join(directory, preview_filename))
        stdscr.addstr(height - 10, 0, preview_content)

        stdscr.refresh()
        key = stdscr.getch()

        if key == curses.KEY_UP:
            selected_index = max(0, selected_index - 1)
        elif key == curses.KEY_DOWN:
            selected_index = min(len(files) - 1, selected_index + 1)
        elif key == curses.KEY_ENTER or key == 10:
            break


def main(stdscr):
    curses.curs_set(0)
    stdscr.clear()
    stdscr.addstr(0, 0, "Enter directory path:")
    stdscr.refresh()
    curses.echo()
    directory = stdscr.getstr(1, 0).decode('utf-8')
    curses.noecho()
    display_files(stdscr, directory)

if __name__ == "__main__":
    curses.wrapper(main)
