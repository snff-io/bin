#!/bin/bash

# Function to calculate SHA-1 hash of a file
calculate_sha1() {
    sha1sum "$1" | cut -d ' ' -f 1
}

# Main script
DIRECTORY=$(basename "$PWD")
count=1

# Rename files to "tmp" and then to their SHA-1 hash values
for file in *.jpeg; do
    ext="${file##*.}"
    mv "$file" "tmp.${ext}"
    sha1=$(calculate_sha1 "tmp.${ext}")
    mv "tmp.${ext}" "_${sha1}.${ext}"
    ((count++))
done