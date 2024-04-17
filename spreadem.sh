#!/bin/bash

# Function to calculate SHA-1 hash of a file
calculate_sha1() {
    sha1sum "$1" | cut -d ' ' -f 1
}

# Iterate through each JPEG file in the current directory
for file in *.jpeg; do
    # Extract the filename without extension
    filename="${file%.*}"

    # Exclude "_d2" from filename
    filename="${filename//_d2}"

    # Split the filename into parts using underscores
    IFS='_' read -r -a parts <<< "$filename"

    # Create directory name by joining parts and converting to lowercase
    dir_name=""
    for part in "${parts[@]}"; do
        dir_name+="${part,,}_"
    done
    dir_name="${dir_name%_}"  # Remove trailing underscore

    # Create the directory if it doesn't exist
    mkdir -p "$dir_name"

    # Calculate SHA-1 hash of the file
    sha1=$(calculate_sha1 "$file")

    # Move the file into the directory and rename it to SHA-1 hash
    mv "$file" "$dir_name/_${sha1}.jpeg"
done