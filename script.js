// Handle start ritual button
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const gameArea = document.getElementById("gameArea");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    intro.style.display = "none";
    gameArea.style.display = "block";
  });
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let blocks = [];
const blockSize = 20;

// Add or remove blocks with click
canvas.addEventListener("click", (e) => {
  const x = Math.floor(e.offsetX / blockSize) * blockSize;
  const y = Math.floor(e.offsetY / blockSize) * blockSize;

  const existing = blocks.find(b => b.x === x && b.y === y);

  if (existing) {
    // Destroy block — rage release
    blocks = blocks.filter(b => b !== existing);
    rageEffect();
  } else {
    // Place block — creation in chaos
    blocks.push({ x, y, color: randomColor() });
    pulseEffect();
  }

  drawBlocks();
});

// Draw all blocks
function drawBlocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let b of blocks) {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, blockSize, blockSize);
  }
}

// Egyptian palette
function randomColor() {
  const colors = [
    "#d2b48c", // sand
    "#c2a676", // stone
    "#b8860b", // dark gold
    "#e5c07b", // light gold
    "#7f674f"  // aged rock
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Rage color flash
function rageEffect() {
  document.body.style.background = `linear-gradient(180deg, hsl(${Math.random() * 40 + 30}, 80%, 40%), #7a4b1d)`;
  setTimeout(() => {
    document.body.style.background = "linear-gradient(180deg, #d6a760, #7a4b1d)";
  }, 300);
}

// Subtle pulse for placing blocks
function pulseEffect() {
  canvas.style.transform = "scale(1.03)";
  setTimeout(() => (canvas.style.transform = "scale(1)"), 100);
}

drawBlocks();
