const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const createSVGBuffer = (size) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ee7752;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#e73c7e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#23a6d5;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad)"/>

  <!-- Globe icon -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Outer circle -->
    <circle cx="0" cy="0" r="${size * 0.35}" fill="none" stroke="white" stroke-width="${size * 0.04}"/>

    <!-- Vertical line -->
    <line x1="0" y1="${-size * 0.35}" x2="0" y2="${size * 0.35}" stroke="white" stroke-width="${size * 0.04}"/>

    <!-- Horizontal line -->
    <line x1="${-size * 0.35}" y1="0" x2="${size * 0.35}" y2="0" stroke="white" stroke-width="${size * 0.04}"/>

    <!-- Curved lines for continents -->
    <path d="M ${-size * 0.35} 0 Q ${-size * 0.2} ${-size * 0.25} 0 ${-size * 0.35}"
          fill="none" stroke="white" stroke-width="${size * 0.04}"/>
    <path d="M 0 ${-size * 0.35} Q ${size * 0.2} ${-size * 0.25} ${size * 0.35} 0"
          fill="none" stroke="white" stroke-width="${size * 0.04}"/>
    <path d="M ${size * 0.35} 0 Q ${size * 0.2} ${size * 0.25} 0 ${size * 0.35}"
          fill="none" stroke="white" stroke-width="${size * 0.04}"/>
    <path d="M 0 ${size * 0.35} Q ${-size * 0.2} ${size * 0.25} ${-size * 0.35} 0"
          fill="none" stroke="white" stroke-width="${size * 0.04}"/>
  </g>
</svg>`;
  return Buffer.from(svg);
};

const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'app');

async function generateIcons() {
  console.log('Generating PNG icons from SVG...\n');

  const sizes = [
    { size: 16, name: 'favicon-16x16.png', dir: publicDir },
    { size: 32, name: 'favicon-32x32.png', dir: publicDir },
    { size: 180, name: 'apple-touch-icon.png', dir: publicDir },
    { size: 192, name: 'icon-192.png', dir: publicDir },
    { size: 512, name: 'icon-512.png', dir: publicDir },
    { size: 512, name: 'icon.png', dir: appDir },
    { size: 180, name: 'apple-icon.png', dir: appDir },
  ];

  for (const { size, name, dir } of sizes) {
    try {
      const svgBuffer = createSVGBuffer(size);
      const outputPath = path.join(dir, name);

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Created ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to create ${name}:`, error.message);
    }
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
