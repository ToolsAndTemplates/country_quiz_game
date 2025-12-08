const fs = require('fs');
const path = require('path');

// Create a simple PNG using data URL approach
// This creates a globe emoji icon for the quiz game
const createSVGIcon = (size) => {
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
  return svg;
};

const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'app');

// Create SVG files
console.log('Creating SVG icons...');
fs.writeFileSync(path.join(publicDir, 'icon.svg'), createSVGIcon(512));
fs.writeFileSync(path.join(appDir, 'icon.svg'), createSVGIcon(512));
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), createSVGIcon(32));

console.log('✓ SVG icons created');
console.log('\nNext steps:');
console.log('1. Install sharp: npm install sharp --save-dev');
console.log('2. Run: node scripts/convert-icons.js');
console.log('3. Or manually convert SVG to PNG using an online tool like:');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - https://svgtopng.com/');
