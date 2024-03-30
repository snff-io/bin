import sys
import os
from PIL import Image

def jpeg_to_png(input_dir, output_dir):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # List all JPEG files in the input directory
    jpeg_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.jpeg') or f.lower().endswith('.jpg')]

    for jpeg_file in jpeg_files:
        # Open each JPEG image
        with Image.open(os.path.join(input_dir, jpeg_file)) as img:
            # Construct the output file path with the same name and .png extension
            output_file = os.path.join(output_dir, os.path.splitext(jpeg_file)[0] + '.png')
            # Convert and save the image as PNG
            img.save(output_file, 'PNG')
            print(f"Converted {jpeg_file} to PNG: {output_file}")

if __name__ == "__main__":
    # Check if correct number of arguments are provided
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_directory> <output_directory>")
        sys.exit(1)

    input_directory = sys.argv[1]
    output_directory = sys.argv[2]

    jpeg_to_png(input_directory, output_directory)