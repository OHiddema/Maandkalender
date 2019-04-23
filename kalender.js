// returns the number of days in the month
Date.prototype.monthDays = function () {
  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
  return d.getDate();
};

// returns alternative day of the week,
// where Mon = 0, Tue = 1, ... Sun = 6, instead of Sun = 0, Mon = 1, ... Sat = 6
Date.prototype.alt_getDay = function () {
  return (this.getDay() + 6) % 7;
};

// Now
var d = new Date();
fillScreen();

function fillScreen() {
  var myTr, myTd, myBody, maandTitel, myTable, loopDate;

  var dagenM = d.monthDays();
  var d0 = new Date(d.getFullYear(), d.getMonth(), 1);
  var d1 = new Date(d.getFullYear(), d.getMonth(), dagenM);

  maandTitel = document.getElementById('maandTitel');
  maandTitel.innerText = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  myTable = document.getElementById('myTable');
  myBody = document.getElementById('myBody');
  myBody.remove();
  myBody = document.createElement('tbody');
  myBody.setAttribute('id', 'myBody');
  myTable.appendChild(myBody);
  myTr = document.createElement('tr');
  myBody.appendChild(myTr);

  for (let i = -d0.alt_getDay() + 1; i <= dagenM + (6 - d1.alt_getDay()); i++) {
    myTd = document.createElement('td');
    loopDate = new Date(d0.getFullYear(), d0.getMonth(), i);
    myTd.innerText = loopDate.getDate();
    if (loopDate.getMonth() != d0.getMonth()) {
      myTd.style.color = 'lightgrey';
    }
    if (loopDate.getFullYear() == new Date().getFullYear() &&
        loopDate.getMonth() == new Date().getMonth() &&
        loopDate.getDate() == new Date().getDate()) {
      myTd.style.color = 'white';
      myTd.style.backgroundColor = 'black';
    }
    myTr.appendChild(myTd);
    if ((i + d0.alt_getDay()) % 7 == 0) {
      myTr = document.createElement('tr');
      myBody.appendChild(myTr);
    }
  }
}

function monthPlus() {
  if (d.getMonth() == 11) {
    d = new Date(d.getFullYear() + 1, 0, 1);
  } else {
    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  }
  fillScreen();
}

function monthMin() {
  if (d.getMonth() == 1) {
    d = new Date(d.getFullYear() - 1, 11, 1);
  } else {
    d = new Date(d.getFullYear(), d.getMonth() - 1, 1);
  }
  fillScreen();
}