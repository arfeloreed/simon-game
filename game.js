var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var isGameRunning = false;

// to start the game
$(document).keydown(function () {
  if (!isGameRunning) {
    nextSequence();
    isGameRunning = true;
  }
});

// check if any of the buttons is click
$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

// game flow
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    new Audio("./sounds/wrong.mp3").play();
    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// funtion for generating a random number between 0 and 3
function nextSequence() {
  userClickPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// function for playing sound
function playSound(name) {
  var chosenColorSound = new Audio("./sounds/" + name + ".mp3");
  chosenColorSound.play();
}

// function for animating pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// restarts the game if the user got it wrong
function startOver() {
  isGameRunning = false;
  level = 0;
  gamePattern = [];
}
