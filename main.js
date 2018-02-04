var END_TIME = 1518562800000; // February 13, 6:00PM 2018

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
  if (END_TIME - Date.now() <= 0) {
    return updateTimers();
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