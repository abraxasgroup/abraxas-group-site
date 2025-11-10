// Neon Runner mini-game for Abraxas
// This script powers an endless runner game with simple physics.
// The player jumps to avoid obstacles and earns points over time.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
let W, H;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  W = canvas.width = window.innerWidth * DPR;
  H = canvas.height = window.innerHeight * DPR;
}
window.addEventListener('resize', resize);
resize();

// Ground reference function
const ground = () => H - 120 * DPR;

// Player object
const player = {
  x: 80 * DPR,
  y: 0,
  w: 40 * DPR,
  h: 40 * DPR,
  vy: 0,
  onGround: false
};

const GRAVITY = 0.6 * DPR;
const JUMP_V = -12 * DPR;
const obstacles = [];
let score = 0;

function spawnObstacle() {
  const w = 30 * DPR + Math.random() * 60 * DPR;
  const h = 40 * DPR + Math.random() * 80 * DPR;
  obstacles.push({ x: W + 60 * DPR, y: ground() - h, w, h, v: (4 + Math.random() * 4) * DPR });
}
setInterval(spawnObstacle, 1200);

function resetGame() {
  obstacles.length = 0;
  score = 0;
  player.x = 80 * DPR;
  player.y = ground() - player.h;
  player.vy = 0;
  player.onGround = true;
  document.getElementById('gameScore').textContent = score;
}

canvas.addEventListener('pointerdown', () => {
  if (player.onGround) {
    player.vy = JUMP_V;
    player.onGround = false;
  }
});
document.getElementById('restartBtn').addEventListener('click', resetGame);

function update() {
  // Apply gravity
  player.vy += GRAVITY;
  player.y += player.vy;
  if (player.y + player.h >= ground()) {
    player.y = ground() - player.h;
    player.vy = 0;
    player.onGround = true;
  }
  // Move obstacles and check for points
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const o = obstacles[i];
    o.x -= o.v;
    if (o.x + o.w < 0) {
      obstacles.splice(i, 1);
      score++;
      document.getElementById('gameScore').textContent = score;
    }
    // Collision detection
    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      resetGame();
    }
  }
}

function draw() {
  // Clear canvas
  ctx.fillStyle = '#050708';
  ctx.fillRect(0, 0, W, H);
  // Draw grid lines for motion effect
  const gy = ground();
  ctx.strokeStyle = 'rgba(0,255,160,0.35)';
  ctx.lineWidth = 1 * DPR;
  for (let x = 0; x < W; x += 60 * DPR) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = gy; y < H; y += 40 * DPR) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  // Draw ground line
  ctx.strokeStyle = 'rgba(214,248,68,0.5)';
  ctx.lineWidth = 2 * DPR;
  ctx.beginPath();
  ctx.moveTo(0, gy);
  ctx.lineTo(W, gy);
  ctx.stroke();
  // Draw player
  ctx.fillStyle = '#D6F844';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  // Draw obstacles
  ctx.fillStyle = '#00ffa0';
  for (const o of obstacles) {
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
resetGame();
loop();