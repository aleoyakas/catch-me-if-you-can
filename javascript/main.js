/* Variables which will be defined set and changed later */
let gameStarted, ballPosition, ballSize, ballSpeed, timeLimit, totalTime, seconds, lives, level;

/* Constants that will be set on screen load */
const h = window.innerHeight;
const w = window.innerWidth;

/* HTML attributes assigned to variables */
let htmlInstructions = document.getElementById("instructions");
let htmlStopwatch = document.getElementById("stopwatch");
let htmlTotalTime = document.getElementById("total-time");
let htmlBallBox = document.getElementById('ball-box');
let htmlBallSpeed = document.getElementById("ball-speed");
let htmlBallSize = document.getElementById("ball-size");
let htmlLives = document.getElementById("lives");
let htmlLevel = document.getElementById("level");

const timer = () => t = setTimeout(decreaseTime, 1000);

const decreaseTime = () => {
  timer();

  seconds--;
  stopwatch.innerHTML = seconds;

  totalTime++;
  htmlTotalTime.innerHTML = totalTime;

  if (seconds == 0) {
    clearTimeout(t);
    lives--;
    if (lives === 0) {
      alert(`You didn't catch the ball in time and you're out of lives! You got to level ${level} in ${totalTime} seconds!`);
      restartGame();
    }
    else if (lives === 1) alert("You didn't catch the ball in time! You're on your last life!");
    else alert(`You didn't catch the ball in time! You have ${lives} lives left!`);
    
    levelSetup();
  }
}

const moveBall = () => {
  $("#ball-box").animate({
    top: h*Math.random() + "px",
    left: w*Math.random() + "px"
  }, ballSpeed, () => {
    if (gameStarted) {
      moveBall();
    } else {
      levelSetup();
    }
  });
};

const clickBall = () => {
  gameStarted = !gameStarted;
  if (!gameStarted) {
    clearTimeout(t);
    alert(`You caught the ball with ${seconds}s left!`);
    level++
    if (level % 2 === 1) {
      ballPosition++;
      ballSize--;
    } else ballSpeed += 5;
  } else {
    decreaseTime();
    moveBall();
    htmlInstructions.innerHTML = 'Click the ball as quickly as you can!';
  }
}

const levelSetup = () => {
  gameStarted = false;
  seconds = timeLimit;
  
  htmlInstructions.innerHTML = 'Click the ball... if you dare...';
  htmlStopwatch.innerHTML = timeLimit;
  htmlTotalTime.innerHTML = totalTime;
  htmlLives.innerHTML = lives;
  htmlLevel.innerHTML = level;
  htmlBallSize.innerHTML = ballSize;
  htmlBallSpeed.innerHTML = ballSpeed;
  
  htmlBallBox.setAttribute("style",`left: ${ballPosition}vw; top: ${ballPosition}vh; width: ${ballSize}vw; height: ${ballSize};`)
};

const restartGame = () => {
  if (window.innerWidth <= 700) {
    ballPosition = 40;
    ballSize = 20;
  } else {
    ballPosition = 45;
    ballSize = 10;
  }
  
  ballSpeed = 1000;
  totalTime = 0;
  timeLimit = 30;
  lives = 5;
  level = 1;
  levelSetup();
}

restartGame();