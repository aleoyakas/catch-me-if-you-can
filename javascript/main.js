let gameStarted = false;
let seconds, minutes, hours, t;

const timer = () => t = setTimeout(increaseTime, 1000);

const increaseTime = () => {
  timer();  
  seconds++;  
  stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);  
}

const gameSetup = () => {
  $("#instructions").html('Click the ball... if you dare...');
  document.getElementById("stopwatch").innerHTML = "00:00:00";
  seconds = 0; minutes = 0; hours = 0;
  
  document.getElementById('ball-box').style.left = "45vw";
  document.getElementById('ball-box').style.top = "45vh";
  document.getElementById('ball-box').style.width = "10vw";
  document.getElementById('ball-box').style.height = "10vh";
};

const moveBall = () => {
  const h = window.innerHeight;
  const w = window.innerWidth;
  $("#ball-box").animate({
    top: h*Math.random() + "px",
    left: w*Math.random() + "px"
  }, "slow", () => {
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
    alert(`It took you ${timeTaken} to catch the ball!`);
  } else {
    increaseTime();
    moveBall();
    $("#instructions").html('Click the ball as quickly as you can!');
  }
}

gameSetup();