#!/bin/bash

# Get the current directory
CURRENT_DIR=$(pwd)

# Create subdirectories 1-9 if they don't exist
for i in {1..9}; do
    if [ ! -d "$CURRENT_DIR/$i" ]; then
        mkdir -p "$CURRENT_DIR/$i"
    fi
done

# Start feh to display images and move them to corresponding directories
feh --draw-filename --sort mtime \
    --action1 'mv %F "1/"' \
    --action2 'mv %F "2/"' \
    --action3 'mv %F "3/"' \
    --action4 'mv %F "4/"' \
    --action5 'mv %F "5/"' \
    --action6 'mv %F "6/"' \
    --action7 'mv %F "7/"' \
    --action8 'mv %F "8/"' \
    --action9 'mv %F "9/"' \
    