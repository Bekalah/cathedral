"""PNG export utility for sacred geometries and fractals.

Saves rendered numpy arrays as PNG files for use in Godot, web apps, or other consumers.
"""
from pathlib import Path
from typing import Optional
import sys

# Pillow for PNG writing
try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install pillow")
    sys.exit(1)

import numpy as np


def export_to_png(
    rgb_array: np.ndarray,
    output_path: Path,
    title: Optional[str] = None,
) -> Path:
    """
    Export a rendered RGB array to PNG.
    
    Args:
        rgb_array: numpy array with shape (H, W, 3) and dtype uint8
        output_path: Path where PNG should be written
        title: Optional title metadata
    
    Returns:
        Path to the written file
    """
    if rgb_array.ndim != 3 or rgb_array.shape[2] != 3:
        raise ValueError(f"Expected (H, W, 3) array, got {rgb_array.shape}")
    
    img = Image.fromarray(rgb_array, mode="RGB")
    
    # Add metadata if title provided
    if title:
        from PIL import PngImagePlugin
        meta = PngImagePlugin.PngInfo()
        meta.add_text("Title", title)
        img.save(output_path, "PNG", pnginfo=meta)
    else:
        img.save(output_path, "PNG")
    
    return output_path
