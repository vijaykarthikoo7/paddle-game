const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: 5,
    dy: 0
};

let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: 5,
    dy: 2
};

let ball = {
    x: canvas.width / 2 - ballSize / 2,
    y: canvas.height / 2 - ballSize / 2,
    width: ballSize,
    height: ballSize,
    speed: 4,
    dx: 4,
    dy: -4
};

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall() {
    drawRect(ball.x, ball.y, ball.width, ball.height, '#fff');
}

function drawPaddles() {
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, '#fff');
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, '#fff');
}

function update() {
    // Move left paddle
    leftPaddle.y += leftPaddle.dy;

    // Prevent paddles from going out of bounds
    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    } else if (leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.y = canvas.height - leftPaddle.height;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce ball off top and bottom walls
    if (ball.y < 0 || ball.y + ball.height > canvas.height) {
        ball.dy *= -1;
    }

    // Bounce ball off paddles
    if (ball.x < leftPaddle.x + leftPaddle.width &&
        ball.x + ball.width > leftPaddle.x &&
        ball.y < leftPaddle.y + leftPaddle.height &&
        ball.y + ball.height > leftPaddle.y) {
        ball.dx *= -1;
    }

    if (ball.x + ball.width > rightPaddle.x &&
        ball.x < rightPaddle.x + rightPaddle.width &&
        ball.y < rightPaddle.y + rightPaddle.height &&
        ball.y + ball.height > rightPaddle.y) {
        ball.dx *= -1;
    }

    // Reset ball if it goes out of bounds
    if (ball.x < 0 || ball.x + ball.width > canvas.width) {
        ball.x = canvas.width / 2 - ballSize / 2;
        ball.y = canvas.height / 2 - ballSize / 2;
        ball.dx = 4;
        ball.dy = -4;
    }

    // Move right paddle
    rightPaddle.y += rightPaddle.dy;
    if (rightPaddle.y < 0 || rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.dy *= -1;
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball and paddles
    drawBall();
    drawPaddles();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        leftPaddle.dy = -leftPaddle.speed;
    } else if (e.code === 'ArrowDown') {
        leftPaddle.dy = leftPaddle.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        leftPaddle.dy = 0;
    }
});

gameLoop();
