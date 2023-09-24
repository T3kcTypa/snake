const playBoard = document.querySelector(".play__board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high__score");

let foodX, foodY;
let snakeX = 3, snakeY = 4;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high__score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Food Position random 0 - 10 value
const  changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 10) + 1;
    foodY = Math.floor(Math.random() * 10) + 1;
}

handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game is Over. Please press OK to start again!");
    location.reload();
}

// Change direction by key 
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowDown" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowRight" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1; 
    }
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>`;
    
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
    
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high__score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody [i - 1];
    }

    snakeBody[0] = [snakeY, snakeX];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 10 || snakeY <= 0 || snakeY > 10 ) {
        gameOver = true;
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval (initGame, 125);
document.addEventListener("keydown", changeDirection);