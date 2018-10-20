var END_TIME = 1540951200000;
var PRICE_CHANGE = 1518116400000;
var FIRST_BONUS_ON = 1540353600000;
var FIRST_BONUS_OFF = 1540494000000;
var SECOND_BONUS_ON = 1540648800000;
var SECOND_BONUS_OFF = 1540785600000;
var THIRD_BONUS_ON = 1540819800000;
var THIRD_BONUS_OFF = 1540951200000;

function breakdownTimeLeft(timeLeft) {
  var hours;
  var minutes;
  var seconds;

  seconds = Math.floor(timeLeft / 1000);
  minutes = Math.floor(seconds / 60);
  seconds %= 60;
  hours = Math.floor(minutes / 60);
  minutes %= 60;
  var days = Math.floor(hours / 24);
  hours %= 24;

  return {
    days: days, hours: hours, minutes: minutes, seconds: seconds,
  };
}


function zeroPad(num) {
  var str =  num >= 10 ? num.toString() : "0" + num;

  return str;
}

function updateTimers(data) {
  if (!data) {
    var d = document.querySelectorAll('.days');
    for (var i=0; i< d.length; i++) {
      var e = d[i];
      e.innerText = '0'; 
    }

    var h = document.querySelectorAll('.hours');
    for (var i=0; i< h.length; i++) {
      var e = h[i];
      e.innerText = '00';
    }

    var m = document.querySelectorAll('.minutes');
    for (var i=0; i< m.length; i++) {
      var e = m[i];
      e.innerText = '00';
    }
    
    var s = document.querySelectorAll('.seconds');
    for (var i=0; i< s.length; i++) {
      var e = s[i];
      e.innerText = '00';
    }
  } else {
    var d = document.querySelectorAll('.days');
    for (var i=0; i< d.length; i++) {
      var e = d[i];
      e.innerText = data.days.toString(); 
    }

    var h = document.querySelectorAll('.hours');
    for (var i=0; i< h.length; i++) {
      var e = h[i];
      e.innerText = zeroPad(data.hours); 
    }

    var m = document.querySelectorAll('.minutes');
    for (var i=0; i< m.length; i++) {
      var e = m[i];
      e.innerText = zeroPad(data.minutes); 
    }
    
    var s = document.querySelectorAll('.seconds');
    for (var i=0; i< s.length; i++) {
      var e = s[i];
      e.innerText = zeroPad(data.seconds); 
    }
  }
}

function countdownLoop() {
  if (END_TIME <= Date.now()) {
      return updateTimers();
  }

  if (Date.now() >= FIRST_BONUS_ON && Date.now() <= FIRST_BONUS_OFF) {
    var b1 = document.querySelectorAll('.bonus-a');
    for (var i=0; i< b1.length; i++) {
      var e = b1[i];
      e.style.display = "";
    }
  }

  if (Date.now() >= SECOND_BONUS_ON && Date.now() <= SECOND_BONUS_OFF) {
    var b2 = document.querySelectorAll('.bonus-b');
    for (var i=0; i< b2.length; i++) {
      var e = b2[i];
      e.style.display = "";
    }
  }

  if (Date.now() >= THIRD_BONUS_ON && Date.now() <= THIRD_BONUS_OFF) {
    var b3 = document.querySelectorAll('.bonus-c');
    for (var i=0; i< b3.length; i++) {
      var e = b3[i];
      e.style.display = "";
    }
  }

  return setTimeout(function timeout() {
    updateTimers(breakdownTimeLeft(END_TIME - Date.now()));
    countdownLoop();  
  }, 1000);
}


function init() {
  if (document.readyState !== 'loading') {
    countdownLoop();
  } else {
    setTimeout(init, 100);
  }
}

init();