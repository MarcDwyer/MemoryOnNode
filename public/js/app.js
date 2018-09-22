/*
 * Match = When card Matches
 open show = when card is clicked
 */
let theCount = 3;
let probe = 0;
let starcounter = 0;
let seconds = 1;
let zero = 0;
let timerend = 0;
let minute = 0;
const openShow = document.getElementsByClassName('open show');
const lists = document.getElementById('decks');
const matches = document.getElementsByClassName('match');
const cards = document.getElementsByClassName('card');
const fafa = document.getElementsByClassName('fa fa');
const reload = document.getElementsByClassName('fa fa-repeat');
const ogArray = [].map.call(cards, function(el) {
  return el;
});

/* Shuffles the Array of li elements*/
const truffle = shuffle(ogArray);

reloader();
removeList();

/* Makes the refresh button refresh */
function reloader() {
  $('.restart').on('click', function() {
    location.reload();
  })
}
/* Makes the ul element empty*/
function removeList() {
  console.log('removeList running')
  $('.ul').innerHTML = '';
  addList();
}
/* Adds the new Array to the ul element */
function addList() {
  console.log('addlist running');
  for (let x = 0; x < truffle.length; x++) {
    lists.appendChild(truffle[x]);
  }

  counter();
}

const lose = document.createElement('span');
const clicklose = document.createElement('span');
/* Determines whether or not the User has won or lost */
function counter() {
  console.log('P is ' + probe);
  if (probe < 3) {
    probe++;
    editNumber();
    addclicks();
  } else {
    editNumber();
    lose.innerText += 'You lose!'
    contained.appendChild(lose);
    $(lose).css('font-size', '44px');
    setTimeout(function() {
      location.reload();
    }, 2000);
}
  }



/* Adds a Click event listener to cards */
function addclicks() {

  for (let z = 0; z < truffle.length; z++) {
    $(truffle[z]).on('click', function() {
      $(truffle[z]).addClass(' open show');
      if (openShow.length == 1) {
        timerTime();
      }
      if (openShow.length == 2) {
        match();
    }
  })
}
}

/* Looks for a match and allows user time to memorize which cards were picked (if cards didnt match) */
function match() {
  console.log('Matches running...');
  const one = openShow[0].childNodes[1];
  const two = openShow[1].childNodes[1];
  if (one.className == two.className) {
    $(one).removeClass('card open show');
    $(one).addClass('card match');
    $(two).removeClass('card open show');
    $(two).addClass('card match');
    won();
  } else {
    for (let n = 0; n < truffle.length; n++) {
      $(truffle[n]).off('click');
    }
    setTimeout(function() {
      $(openShow).removeClass(' open show');
      removeStars();
      counter();
    }, 2000)
  }
}
const winner = document.createElement('span');
const contained = document.getElementById('container');
const clickhere = document.createElement('span');
const timerBox = document.createElement('span');

/* If the cards match this is run */
function won() {
  for (let n = 0; n < truffle.length; n++) {
    $(truffle[n]).off('click');
  }
  winner.textContent += 'You Won!';
  clickhere.textContent += 'Click to Play Again!';
  timerBox.textContent = 'Won in ' + minute + ' minutes and ' + seconds + ' seconds.'
  $(winner).css('font-size', '44px');
  contained.appendChild(winner);
  contained.appendChild(clickhere);
  contained.appendChild(timerBox)
  $(winner).on('click', function() {
    $(openShow).removeClass(' open show');
    $(matches).removeClass(' match');
    $(winner).off('click');
    location.reload();
  })
}
/* Removes the Stars after each move */
function removeStars() {
  for (let x = 0; x < 2; x++) {
    sun.removeChild(sun.childNodes[0]);
  }
}
/* Tells the user how many moves they have left */
function editNumber() {
  $(mover).text(theCount);
  theCount--;

}
/* A timer I made from scratch */
function timerTime() {
  if (zero < 1) {
    if (seconds <= 60) {
      const intName = setInterval(function() {
        $('.timers').text(minute + ':' + seconds);
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minute++;
        }
        if (matches.length == 2) {
          clearInterval(intName);
        }
      if (probe > 3) {
      clearInterval(intName);
    }
      }, 1000);
    }
  }
  zero++;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
