const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let tail = [];
let snakeLength = 150; // Even longer for smoother trail

let current = { x: mouse.x, y: mouse.y };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ultra slow follow
  current.x += (mouse.x - current.x) * 0.02; // Super slow
  current.y += (mouse.y - current.y) * 0.02;

  tail.push({ x: current.x, y: current.y });

  if (tail.length > snakeLength) tail.shift();

  for (let i = 0; i < tail.length - 1; i++) {
    let p1 = tail[i];
    let p2 = tail[i + 1];
    ctx.strokeStyle = `hsl(${i * 3}, 100%, 50%)`; // Smooth rainbow
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
