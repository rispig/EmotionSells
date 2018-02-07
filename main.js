var END_TIME = 1518570000000;
var PRICE_CHANGE = 1518116400000;
var FIRST_BONUS = 1518188100000;
var SECOND_BONUS = 1518274800000;
var THIRD_BONUS = 1518411600000;


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
  // if (END_TIME - Date.now() <= -2 * 60 * 60 * 1000) {
  //   location.href="https://getuplift.co/cro-training";
  //   return;
  // }
  if (END_TIME - Date.now() <= 0) {
    return updateTimers();
  }
  
  if (PRICE_CHANGE - Date.now() <= 0) {
    var p = document.querySelectorAll('.pricing.first-24h');
    for (var i=0; i< p.length; i++) {
      var e = p[i];
      e.style.display = "none";
    }

    var p2 = document.querySelectorAll('.pricing.after-24h');
    for (var i=0; i< p2.length; i++) {
      var e = p2[i];
      e.style.display = "";
    }
  }

  if (FIRST_BONUS - Date.now() <= 0 && THIRD_BONUS - Date.now() > 0) {
    var b1 = document.querySelectorAll('.bonus-a');
    for (var i=0; i< b1.length; i++) {
      var e = b1[i];
      e.style.display = "";
    }
  }

  if (SECOND_BONUS - Date.now() <= 0 && THIRD_BONUS - Date.now() > 0) {
    var b2 = document.querySelectorAll('.bonus-b');
    for (var i=0; i< b2.length; i++) {
      var e = b2[i];
      e.style.display = "";
    }
  }

  if (THIRD_BONUS - Date.now() <= 0) {
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