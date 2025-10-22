#!/usr/bin/env python3
"""
Azure ML GPU Arcana Texture Renderer for Cathedral of Circuits
Generates 4096x4096 base textures for all 33 Arcana using GPU acceleration
"""

import os
import json
import argparse
import logging
from datetime import datetime
from pathlib import Path
import torch
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import requests
from azure.storage.blob import BlobServiceClient
try:
    from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
    DIFFUSERS_AVAILABLE = True
except ImportError:
    DIFFUSERS_AVAILABLE = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ArcanaTextureRenderer:
    def __init__(self, output_dir="artifacts/base_textures", resolution=4096):
        self.output_dir = Path(output_dir)
        self.resolution = resolution
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Azure Storage setup
        self.blob_service_client = BlobServiceClient.from_connection_string(
            os.getenv('AZURE_STORAGE_CONNECTION_STRING')
        )
        self.container_name = os.getenv('AZURE_CONTAINER_NAME', 'cathedral-datasets')

        # Load Arcana data
        self.arcana_data = self.load_arcana_data()

        # Initialize Stable Diffusion (if GPU available)
        self.use_gpu = torch.cuda.is_available()
        if self.use_gpu:
            self.pipe = StableDiffusionPipeline.from_pretrained(
                "CompVis/stable-diffusion-v1-4",
                torch_dtype=torch.float16,
            )
            self.pipe.scheduler = DPMSolverMultistepScheduler.from_config(self.pipe.scheduler.config)
            self.pipe = self.pipe.to("cuda")
            logger.info("GPU acceleration enabled for texture generation")
        else:
            logger.warning("GPU not available - using CPU rendering only")

    def load_arcana_data(self):
        """Load the complete Arcana dataset"""
        try:
            with open('data/complete-arcana-profiles.json', 'r') as f:
                data = json.load(f)
            return data['arcana_faculty_profiles']['major_arcana']
        except FileNotFoundError:
            logger.error("Arcana data file not found")
            return {}

    def generate_procedural_texture(self, arcana_key, arcana_data):
        """Generate a procedural texture based on Arcana properties"""
        # Create base image
        img = Image.new('RGB', (self.resolution, self.resolution), color='black')
        draw = ImageDraw.Draw(img)

        # Get Arcana properties
        arcana = arcana_data.get(arcana_key, {})
        element = arcana.get('element', 'Spirit').lower()
        number = arcana.get('number', 0)

        # Color mapping based on element
        color_map = {
            'fire': [(255, 100, 0), (255, 200, 0), (255, 50, 0)],
            'water': [(0, 100, 255), (0, 200, 255), (0, 50, 255)],
            'air': [(200, 200, 200), (255, 255, 255), (150, 150, 150)],
            'earth': [(100, 50, 0), (50, 100, 0), (150, 100, 50)],
            'spirit': [(100, 0, 100), (200, 0, 200), (50, 0, 50)]
        }

        colors = color_map.get(element, color_map['spirit'])

        # Generate sacred geometry patterns
        center_x, center_y = self.resolution // 2, self.resolution // 2
        max_radius = min(center_x, center_y) * 0.8

        # Draw multiple layers of sacred geometry
        for layer in range(3):
            radius = max_radius * (0.3 + layer * 0.3)
            alpha = int(255 * (0.8 - layer * 0.2))

            # Draw circles
            for angle in range(0, 360, 30):
                x = center_x + int(radius * np.cos(np.radians(angle)))
                y = center_y + int(radius * np.sin(np.radians(angle)))

                # Draw radial lines
                draw.line(
                    [(center_x, center_y), (x, y)],
                    fill=colors[0] + (alpha,),
                    width=max(1, self.resolution // 200)
                )

        # Add central symbol
        self.draw_central_symbol(draw, center_x, center_y, arcana, colors[1])

        return img

    def draw_central_symbol(self, draw, x, y, arcana, color):
        """Draw the central symbol for the Arcana"""
        symbol_size = self.resolution // 20

        # Simple geometric symbols based on Arcana
        if arcana.get('hebrew_path') == 'Aleph':
            # Circle for The Fool
            draw.ellipse(
                [(x - symbol_size, y - symbol_size),
                 (x + symbol_size, y + symbol_size)],
                fill=color + (180,)
            )
        elif arcana.get('hebrew_path') == 'Beth':
            # Square for The Magician
            draw.rectangle(
                [(x - symbol_size, y - symbol_size),
                 (x + symbol_size, y + symbol_size)],
                fill=color + (180,)
            )
        else:
            # Default: Star
            points = []
            for i in range(5):
                angle = i * 72 - 90
                px = x + int(symbol_size * np.cos(np.radians(angle)))
                py = y + int(symbol_size * np.sin(np.radians(angle)))
                points.extend([px, py])

            draw.polygon(points, fill=color + (180,))

    def generate_ai_texture(self, arcana_key, arcana_data):
        """Generate AI-enhanced texture using Stable Diffusion"""
        if not self.use_gpu:
            logger.warning("GPU not available - falling back to procedural generation")
            return self.generate_procedural_texture(arcana_key, arcana_data)

        try:
            # Create detailed prompt based on Arcana
            arcana = arcana_data.get(arcana_key, {})
            element = arcana.get('element', 'Spirit').lower()
            name = arcana.get('name', 'Unknown Arcana').replace('The ', '')

            prompt = f"""
            Mystical sacred geometry pattern for {name} tarot card,
            {element} element theme, highly detailed, symmetrical,
            illuminated manuscript style, golden ratio proportions,
            ethereal, divine, spiritual, museum quality,
            ultra high resolution, sharp details, sacred art
            """

            negative_prompt = """
            ugly, deformed, noisy, blurry, low quality, modern,
            cartoon, anime, realistic, photographic, text, letters
            """

            # Generate image
            image = self.pipe(
                prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=50,
                guidance_scale=7.5,
                width=self.resolution,
                height=self.resolution
            ).images[0]

            return image

        except Exception as e:
            logger.error(f"AI generation failed: {e}")
            return self.generate_procedural_texture(arcana_key, arcana_data)

    def save_and_upload_texture(self, img, arcana_key, arcana_data):
        """Save texture locally and upload to Azure Blob Storage"""
        try:
            # Save locally
            arcana_dir = self.output_dir / arcana_key
            arcana_dir.mkdir(exist_ok=True)

            texture_path = arcana_dir / "texture_master.png"
            img.save(texture_path, "PNG", quality=95)

            # Create thumbnail
            thumbnail_size = (512, 512)
            thumbnail = img.resize(thumbnail_size, Image.Resampling.LANCZOS)
            thumbnail.save(arcana_dir / "texture_thumbnail.png", "PNG", quality=85)

            # Create metadata
            metadata = {
                "arcana": arcana_key,
                "name": arcana_data.get(arcana_key, {}).get('name', 'Unknown'),
                "element": arcana_data.get(arcana_key, {}).get('element', 'Unknown'),
                "resolution": f"{self.resolution}x{self.resolution}",
                "generated_at": datetime.now().isoformat(),
                "generator": "Azure ML GPU" if self.use_gpu else "CPU Procedural",
                "file_size": texture_path.stat().st_size,
                "format": "PNG"
            }

            with open(arcana_dir / "metadata.json", 'w') as f:
                json.dump(metadata, f, indent=2)

            # Upload to Azure Blob Storage
            blob_client = self.blob_service_client.get_blob_client(
                container=self.container_name,
                blob=f"base_textures/{arcana_key}/texture_master.png"
            )

            with open(texture_path, 'rb') as data:
                blob_client.upload_blob(data, overwrite=True)

            logger.info(f"✅ Texture saved and uploaded: {arcana_key}")

        except Exception as e:
            logger.error(f"❌ Failed to save/upload texture for {arcana_key}: {e}")

    def render_all_arcana(self):
        """Render textures for all Arcana"""
        logger.info("🎨 Starting Arcana texture generation...")

        for arcana_key in self.arcana_data.keys():
            logger.info(f"🔮 Processing {arcana_key}...")

            # Generate texture
            texture = self.generate_ai_texture(arcana_key, self.arcana_data)

            # Save and upload
            self.save_and_upload_texture(texture, arcana_key, self.arcana_data)

        logger.info("🎉 All Arcana textures generated!")

    def render_single_arcana(self, arcana_key):
        """Render texture for a single Arcana"""
        if arcana_key not in self.arcana_data:
            logger.error(f"❌ Arcana {arcana_key} not found")
            return

        logger.info(f"🔮 Processing single Arcana: {arcana_key}")

        # Generate texture
        texture = self.generate_ai_texture(arcana_key, self.arcana_data)

        # Save and upload
        self.save_and_upload_texture(texture, arcana_key, self.arcana_data)

        logger.info(f"✅ Single Arcana texture completed: {arcana_key}")

def main():
    parser = argparse.ArgumentParser(description='Render Arcana textures using Azure ML GPU')
    parser.add_argument('--arcana', type=str, help='Specific Arcana to render (e.g., 0_fool)')
    parser.add_argument('--resolution', type=int, default=4096, help='Texture resolution (default: 4096)')
    parser.add_argument('--output', type=str, default='artifacts/base_textures', help='Output directory')

    args = parser.parse_args()

    renderer = ArcanaTextureRenderer(args.output, args.resolution)

    if args.arcana:
        renderer.render_single_arcana(args.arcana)
    else:
        renderer.render_all_arcana()

if __name__ == "__main__":
    main()
