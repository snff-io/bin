DIRECTORY=$(basename "$PWD"); count=1; for file in *.jpeg; do ext="${file##*.}"; mv "$file" "${DIRECTORY}_${count}.${ext}"; ((count++)); done