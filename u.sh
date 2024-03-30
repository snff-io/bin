#!/bin/bash

# Check if filename is provided as an argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 <filename>"
  exit 1
fi

filename="$1"

# Check if file exists
if [ ! -f "$filename" ]; then
  echo "File not found: $filename"
  exit 1
fi

# Sort the file and count duplicate lines
sorted_file=$(sort "$filename" | uniq -d)

# Check if there are duplicate lines
if [ -z "$sorted_file" ]; then
  echo "No duplicate lines found in $filename"
else
  echo "Duplicate lines found in $filename:"
  echo "$sorted_file"
fi
