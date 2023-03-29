
// Obtener el canvas y su contexto
const canvas = document.getElementById('juevo');
const ctx = canvas.getContext('2d');

// Declarar las variables del juego
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 5;

let paddle1Y = canvas.height / 2 - 50;
let paddle2Y = canvas.height / 2 - 50;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

let showingWinScreen = false;

// Función para dibujar el canvas
function draw() {
  // Dibujar el fondo
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (showingWinScreen) {
    // Dibujar la pantalla de victoria
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('You Lose!', canvas.width / 2 - 40, canvas.height / 2 - 30);
    ctx.fillText('Click to continue', canvas.width / 2 - 70, canvas.height / 2 + 10);
    return;
  }

  // Dibujar la red
  drawNet();

  // Dibujar la pelota
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Mover la pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Verificar las colisiones con las paredes
  if (ballX <= 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;
      resetBall();
    }
  }
  if (ballX >= canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      resetBall();
    }
  }
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
// Verificar si un jugador ganó
if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
    }
    
    // Dibujar la raqueta del jugador 1
    drawRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    
    // Dibujar la raqueta del jugador 2 (computadora)
    drawRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    
    // Actualizar la posición de la raqueta del jugador 2 (computadora)
    computerMovement();
    
    // Dibujar las puntuaciones
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 30);
    ctx.fillText(player2Score, canvas.width * 3 / 4, 30);
    }
    
    // Función para dibujar un rectángulo
    function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    }
    
    // Función para dibujar la red
    function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
    }
    
    // Función para resetear la pelota después de un punto
    function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
    }
    
    // Función para mover la raqueta del jugador 1 con el mouse
    function handleMouseClick(event) {
    if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
    }
    }
    
    function handleMouseMove(event) {
    let relativeY = event.clientY - canvas.offsetTop;
    paddle1Y = relativeY - PADDLE_HEIGHT / 2;
    }
    
    // Función para controlar el movimiento de la raqueta del jugador 2 (computadora)
    function computerMovement() {
    let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
    if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
    }
    }
    
    // Función para actualizar y dibujar el juego cada frame
    function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
    }
    
    // Iniciar el juego
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    gameLoop();  