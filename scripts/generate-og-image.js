const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

// Create a new image with a gradient background
sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 0, g: 99, b: 255, alpha: 1 }
  }
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="${width}" height="${height}">
          <style>
            .title { fill: white; font-size: 60px; font-family: Arial; font-weight: bold; }
            .subtitle { fill: white; font-size: 30px; font-family: Arial; }
          </style>
          <text x="50%" y="40%" text-anchor="middle" class="title">Better Write Prompt</text>
          <text x="50%" y="55%" text-anchor="middle" class="subtitle">AI Prompt Enhancement Tool</text>
        </svg>`
      ),
      top: 0,
      left: 0,
    }
  ])
  .png()
  .toFile(path.join(__dirname, '../public/og-image.png'))
  .then(() => {
    console.log('OG image generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating OG image:', err);
  }); 