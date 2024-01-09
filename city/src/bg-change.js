// Define your initial list of background colors
const initialColors = [
          "#004B72",
          "#1C238D",
          "#320090",
          "#51009D",
          "#67008C",
          "#73006F",
          "#7D004E",
          "#7C0010",
          "#9E2D00",
          "#A45400",
          "#9D7900",
          "#004B72"
      ];

// Function to interpolate colors
function interpolateColors(color1, color2, steps) {
  const interpolate = (val1, val2, factor) => val1 + (val2 - val1) * factor;

  const result = [];
  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    const interpolatedColor = `rgb(${interpolate(color1[0], color2[0], factor)}, ${interpolate(color1[1], color2[1], factor)}, ${interpolate(color1[2], color2[2], factor)})`;
    result.push(interpolatedColor);
  }

  return result;
}

// Interpolate additional colors and update the backgroundColors array
const newColors = [];
for (let i = 0; i < initialColors.length - 1; i++) {
  const currentColor = hexToRgb(initialColors[i]);
  const nextColor = hexToRgb(initialColors[i + 1]);
  newColors.push(initialColors[i], ...interpolateColors(currentColor, nextColor, 4));
}
newColors.push(initialColors[initialColors.length - 1]);

// Set the initial background colors
const backgroundColors = newColors;

// Get the current background color index
let currentColorIndex = backgroundColors.indexOf(document.documentElement.style.getPropertyValue('--r-background-color'));

// Function to update background color
function updateBackgroundColor() {
  // Increment the color index or loop back to the beginning
  currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;

  // Set the new background color
  document.documentElement.style.setProperty('--r-background-color', backgroundColors[currentColorIndex]);
}

// Hook into reveal.js events to trigger color update
Reveal.addEventListener('slidechanged', updateBackgroundColor);

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
