#!/bin/bash

if [[ $1 == "--help" || $1 == "-h" ]]; then
    echo "Usage: $0 <file>          encode file"
    echo "Usage: $0 --decode <file> decode file"
    exit 1
fi

decode=false
file=$1

if [[ $1 == "-d" || $1 == "--decode" ]]; then
    decode=true
    file=$2
fi

if [[ ! -f $file ]]; then
    echo "File not found: $file"
    exit 1
fi

if $decode; then
    node ~/scr/base91decode.js $file
else
    node ~/scr/base91encode.js $file
fi

exit 0
