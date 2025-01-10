from PIL import Image
import numpy as np
import argparse


def multiply(
    img_path: str,
    color: tuple[int, int, int],
    output_path: str
) -> None:
    img = Image.open(img_path).convert("RGB")

    color_array = np.zeros((img.height, img.width, 3), dtype=np.float32)
    color_array[:, :] = color

    multiplied_img = (np.array(img) / 255) * (color_array / 255) * 255
    multiplied_img = np.clip(multiplied_img, 0, 255).astype(np.uint8)
    Image.fromarray(multiplied_img).save(output_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Multiply the color of an image.")
    parser.add_argument("img_path", type=str, help="The path to the image.")
    parser.add_argument("color", type=str, help="The RGB values of the color. (e.g. #00FF00)", default="#00FF00")
    parser.add_argument("output_path", type=str, help="The path to save the output image.", default="output.png")
    args = parser.parse_args()
    hex_ = args.color.replace("#", "").strip()
    color = tuple(int(hex_[i:i+2], 16) for i in (0, 2, 4))

    multiply(args.img_path, color, args.output_path)
