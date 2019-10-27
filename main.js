let gameStarted, ballPosition, ballSize, ballSpeed, timeLimit, seconds, lives, level;

const restartGame = () => {
  if (window.innerWidth <= 700) {
    ballPosition = 40;
    ballSize = 20;
  } else {
    ballPosition = 45;
    ballSize = 10;
  }
  
  ballSpeed = 1000;
  timeLimit = 30;
  lives = 5;
  level = 1;
  gameSetup();
}

const timer = () => t = setTimeout(increaseTime, 1000);

const increaseTime = () => {
  timer();  
  seconds--;  
  stopwatch.textContent = seconds;
  if (stopwatch.textContent == 00) {
    clearTimeout(t);
    lives--;
    if (lives === 0) {
      alert(`You didn't catch the ball in time and you're out of lives! You got to level ${level}`);
      restartGame();
    }
    else if (lives === 1) alert("You didn't catch the ball in time! You're on your last life!");
    else alert(`You didn't catch the ball in time! You have ${lives} lives left!`);
    
    gameSetup();
  }
}

const gameSetup = () => {
  gameStarted = false;
  
  document.getElementById("instructions").innerHTML = 'Click the ball... if you dare...';
  document.getElementById("stopwatch").innerHTML = timeLimit;
  seconds = timeLimit;
  document.getElementById("lives").innerHTML = lives;
  document.getElementById("level").innerHTML = level;
  document.getElementById("ball-size").innerHTML = ballSize;
  document.getElementById("ball-speed").innerHTML = ballSpeed;
  
  document.getElementById('ball-box').style.left = `${ballPosition}vw`;
  document.getElementById('ball-box').style.top = `${ballPosition}vh`;
  document.getElementById('ball-box').style.width = `${ballSize}vw`;
  document.getElementById('ball-box').style.height = `${ballSize}vh`;
};

const randomRgbValue = () => Math.floor(Math.random()*256);

const moveBall = () => {
  const h = window.innerHeight;
  const w = window.innerWidth;
  $("#ball-box").animate({
    top: h*Math.random() + "px",
    left: w*Math.random() + "px"
  }, ballSpeed, () => {
    if (gameStarted) {
      moveBall();
    } else {
      gameSetup();
    }
  });
};

const clickBall = () => {
  gameStarted = !gameStarted;
  if (!gameStarted) {
    clearTimeout(t);
    let timeTaken = document.getElementById("stopwatch").innerHTML;
    alert(`You caught the ball with ${timeTaken}s left!`);
    level++
    if (level % 2 === 1) {
      ballPosition++;
      ballSize--;
    } else ballSpeed = ballSpeed + 5;
  } else {
    increaseTime();
    moveBall();
    $("#instructions").html('Click the ball as quickly as you can!');
  }
}

restartGame();