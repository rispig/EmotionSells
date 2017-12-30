const END_TIME = 1518483600000; // February 12, 8:00PM 2018 

function breakdownTimeLeft (timeLeft) {
    let days, hours, minutes, seconds;
    
    seconds = Math.floor(timeLeft / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;
    
    return {days, hours, minutes, seconds};
}

function zeroPad (num) {
    return num >= 10 ? `${num}` : `0${num}`;
}

function updateTimers (data) {
    if (!data) {
        document.querySelectorAll('.days').forEach(e => e.innerText = '0');
        document.querySelectorAll('.hours').forEach(e => e.innerText = '00');
        document.querySelectorAll('.minutes').forEach(e => e.innerText = '00');
        document.querySelectorAll('.seconds').forEach(e => e.innerText = '00');
    } else {
        document.querySelectorAll('.days').forEach(e => e.innerText = `${data.days}`);
        document.querySelectorAll('.hours').forEach(e => e.innerText = zeroPad(data.hours));
        document.querySelectorAll('.minutes').forEach(e => e.innerText = zeroPad(data.minutes));
        document.querySelectorAll('.seconds').forEach(e => e.innerText = zeroPad(data.seconds));
    }

    // console.log(`Time left: ${data.days} days | ${data.hours} hours | ${data.minutes} | minutes | ${data.seconds} seconds`);
}

function countdownLoop () {
    if (END_TIME - Date.now() <= 0) {
        return updateTimers();
    } 

    setTimeout(() => {
        updateTimers(breakdownTimeLeft(END_TIME - Date.now()));
        countdownLoop();
    }, 1000);
}

window.onload = () => {
    countdownLoop();
};

