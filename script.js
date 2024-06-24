let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStopwatch() {
  startTime = new Date().getTime();
  tInterval = setInterval(getShowTime, 10); // update every 10 milliseconds
  running = true;
  startStopBtn.innerText = 'Pause';
}

function pauseStopwatch() {
  clearInterval(tInterval);
  running = false;
  startStopBtn.innerText = 'Start';
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  startStopBtn.innerText = 'Start';
  display.innerText = '00:00:00.0';
  laps.innerHTML = '';
  lapCounter = 0;
}

function lapStopwatch() {
  if (running) {
    lapCounter++;
    const lapTime = display.innerText;
    const lapElement = document.createElement('li');
    lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapElement);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 100);

  display.innerText = 
    (hours < 10 ? '0' + hours : hours) + ':' +
    (minutes < 10 ? '0' + minutes : minutes) + ':' +
    (seconds < 10 ? '0' + seconds : seconds) + '.' +
    milliseconds;
}

startStopBtn.addEventListener('click', function() {
  if (!running) {
    startStopwatch();
  } else {
    pauseStopwatch();
  }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
