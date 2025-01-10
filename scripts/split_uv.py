from PIL import Image
import os


TILE_SIZE = 16

def split_image(img_path: str, output_dir: str) -> None:
    img = Image.open(img_path)
    width, height = img.size
    assert width == height, "Image must be square"

    os.makedirs(output_dir, exist_ok=True)

    for y in range(0, height, TILE_SIZE):
        for x in range(0, width, TILE_SIZE):
            tile = img.crop((y, x, y + TILE_SIZE, x + TILE_SIZE))
            tile.save(os.path.join(output_dir, f"{x//TILE_SIZE}_{y//TILE_SIZE}.png"))


if __name__ == "__main__":
    img_path = input("Enter the image path: ").strip()
    output_dir = input("Enter the output directory. Default is 'output': ").strip() or "output"
    split_image(img_path, output_dir)
