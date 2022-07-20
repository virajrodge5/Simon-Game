var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).click(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
// Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
// Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");

    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {
  // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  // use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
// Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Create a new function called startOver().
function startOver() {
// Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
