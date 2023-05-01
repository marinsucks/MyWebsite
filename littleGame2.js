// Déclaration des variables
let canvas, context;
let ballX, ballY, ballSpeedX, ballSpeedY;
let obstacleX, obstacleY, obstacleWidth, obstacleHeight, obstacleSpeed;
let score = 0;

// Initialisation du jeu
function init() {
  // Récupération du canvas
  canvas = document.getElementById("gameCanvas");
  context = canvas.getContext("2d");

  // Initialisation de la balle
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballSpeedX = 5;
  ballSpeedY = -5;

  // Initialisation de l'obstacle
  obstacleX = Math.random() * (canvas.width - 50);
  obstacleY = -50;
  obstacleWidth = 50;
  obstacleHeight = 50;
  obstacleSpeed = 5;

  // Lancement de la boucle de jeu
  setInterval(gameLoop, 30);
}

// Boucle de jeu
function gameLoop() {
  // Effacement du canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dessin de la balle
  context.beginPath();
  context.arc(ballX, ballY, 10, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();

  // Dessin de l'obstacle
  context.beginPath();
  context.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  context.fillStyle = "#FF0000";
  context.fill();
  context.closePath();

  // Déplacement de la balle
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebond sur les bords horizontaux
  if (ballX < 10 || ballX > canvas.width - 10) {
    ballSpeedX = -ballSpeedX;
  }

  // Rebond sur le bord supérieur
  if (ballY < 10) {
    ballSpeedY = -ballSpeedY;
  }

  // Rebond sur la raquette
  if (ballY > canvas.height - 30 && ballX > obstacleX && ballX < obstacleX + obstacleWidth) {
    ballSpeedY = -ballSpeedY;
    score++;
    obstacleX = Math.random() * (canvas.width - 50);
    obstacleY = -50;
  }

  // Déplacement de l'obstacle
  obstacleY += obstacleSpeed;

  // Si l'obstacle atteint le bas du canvas, on en crée un nouveau
  if (obstacleY > canvas.height) {
    obstacleX = Math.random() * (canvas.width - 50);
    obstacleY = -50;
  }

  // Affichage du score
  context.font = "20px Arial";
  context.fillStyle = "#0095DD";
  context.fillText("Score: " + score, 10, 20);
}

// Gestion des touches directionnelles
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
    ballSpeedX = -5;
  }
  else if (event.key === "ArrowRight") {
    ballSpeedX = 5;
  }
});

