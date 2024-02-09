let turn = 0;
let step = 12;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//every possible wining ways

let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [9, 10, 11],
  [12, 13, 14],
  [15, 16, 17],
  [9, 12, 15],
  [10, 13, 16],
  [11, 14, 17],
  [9, 13, 17],
  [11, 13, 15],
  [3, 6, 9],
  [4, 7, 10],
  [5, 8, 11],
  [6, 9, 12],
  [7, 10, 13],
  [8, 11, 14],
  [3, 7, 11],
  [6, 10, 14],
  [9, 13, 17],
  [5, 7, 9],
  [8, 10, 12],
  [11, 13, 15],
];


//finde the winner function

function checkWin(val) {
  for (let rwin of win) {
    if (board[rwin[0]] == val && board[rwin[1]] == val && board[rwin[2]] == val)
      return true;
  }
  return false;
}

function puttSymbol(id) {
  let dropNum = parseInt(id);

  if (turn % 2 === 0 && board[dropNum] === 0) {
    dropNum = dropping(dropNum);
    board[dropNum] = 1;

//check if player 1 is winner or not

if (checkWin(1)) {
      setTimeout(function () {
        restartGame(1);
      }, 2000);
    }
    var el = document.getElementById(dropNum);
    let color='';
    color="red";
    addAnimation(el,color);

//add red background to the chosen cell




    turn++;
  } else if (board[dropNum] === 0) {
    dropNum = dropping(dropNum);
    board[dropNum] = 2;

//check if player 2 is winner or not

    if (checkWin(2)) {
      setTimeout(function () {
        restartGame(2);
      }, 2000);
    }

//add blue background to the chosen cell

    color="blue";
    var el = document.getElementById(dropNum);
    addAnimation(el,color);
    turn++;
  }

//if it is a draw
  if (turn === 18 && checkWin(1) === false && checkWin(2) === false) {
    setTimeout(function () {
      restartGame(0);
    },2000);
  }
}

document.getElementById('restart').onclick = reloadGame;

function reloadGame() {
  location.reload();
}


//restart the game
function restartGame(winner) {
  document.getElementById('Board').style.display = "none";
  document.getElementById('GameOver').style.display = "block";
  if (winner === 1) {
    document.getElementById('txtGameOver').innerHTML = "Player-red (01) Wins..!";
    // document.getElementById('txtGameOver').style.fontSize="30px"
  } else if (winner === 2) {
    document.getElementById('txtGameOver').innerHTML = "Player-blue (02) Wins..!";
  } else {
    document.getElementById('txtGameOver').innerHTML = "It's a draw..!";
  }
}


//this function make the moves to find the empty cell 
function dropping(column) {
  
  for (let row = column + 15; row >= column; row -= 3) {
    if (board[row] === 0) {
      return row;
    }
  }

  return column;
}

function addAnimation(el,color){
  var newDiv = document.createElement("div");
  newDiv.classList.add(`newDiv_${color}`);

  let animationId=null;
  let pos = 0;
  

 // console.log("what is el?",el.offsetTop)
 // console.log("what is el?",el.offsetLeft)

  clearInterval(animationId);
  animationId = setInterval(frame, 4);

  function frame() {
    if (pos >= el.offsetTop) {
      clearInterval(animationId);
    } 
    else {
     pos++; 
     newDiv.style.top = pos + "px"; 
     newDiv.style.left = el.offsetLeft + "px"; 
   }

  }
if(el){
  el.appendChild(newDiv);
}
}  