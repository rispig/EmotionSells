const END_TIME = 1518562800000; // February 13, 6:00PM 2018

function breakdownTimeLeft(timeLeft) {
  let hours;
  let minutes;
  let seconds;

  seconds = Math.floor(timeLeft / 1000);
  minutes = Math.floor(seconds / 60);
  seconds %= 60;
  hours = Math.floor(minutes / 60);
  minutes %= 60;
  const days = Math.floor(hours / 24);
  hours %= 24;

  return {
    days, hours, minutes, seconds,
  };
}

function zeroPad(num) {
  return num >= 10 ? `${num}` : `0${num}`;
}

function updateTimers(data) {
  if (!data) {
    document.querySelectorAll('.days').forEach((e) => { e.innerText = '0'; });
    document.querySelectorAll('.hours').forEach((e) => { e.innerText = '00'; });
    document.querySelectorAll('.minutes').forEach((e) => { e.innerText = '00'; });
    document.querySelectorAll('.seconds').forEach((e) => { e.innerText = '00'; });
  } else {
    document.querySelectorAll('.days').forEach((e) => { e.innerText = `${data.days}`; });
    document.querySelectorAll('.hours').forEach((e) => { e.innerText = zeroPad(data.hours); });
    document.querySelectorAll('.minutes').forEach((e) => { e.innerText = zeroPad(data.minutes); });
    document.querySelectorAll('.seconds').forEach((e) => { e.innerText = zeroPad(data.seconds); });
  }
}

function countdownLoop() {
  if (END_TIME - Date.now() <= 0) {
    return updateTimers();
  }

  return setTimeout(() => {
    updateTimers(breakdownTimeLeft(END_TIME - Date.now()));
    countdownLoop();
  }, 1000);
}

document.addEventListener('DOMContentLoaded', countdownLoop, false);
