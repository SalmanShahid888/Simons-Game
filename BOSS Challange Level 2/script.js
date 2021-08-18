var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var counter = 0
var started = false
//FUNCTION to ANIMATE USER CLICKS

function animatePress(currentColor) {
  $('.' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed')
  }, 100)
}

// Generates Random Squence Number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  userClickedPattern = []
  counter++
  $('#level-title').text('Level ' + counter)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $('.' + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  $.ready(playSound(randomChosenColor))
}
//Plays Sound on Button Clicks
function playSound(name) {
  var audio = new Audio('/sounds/' + name + '.mp3')
  audio.play()
}

//Generates a CLICKED Button ID and PUSHES it in the Array
$('.btn').click(function () {
  $('.btn').attr('id')
  var userChosenColour = $(this).attr('id')

  userClickedPattern.push(userChosenColour)
  animatePress(userChosenColour)
  playSound(userChosenColour)

  checkAnswer(userClickedPattern.length - 1)
})

//Detects The KeyPressed at the start of the game

$('body').keypress(function (event) {
  console.log(event.key)
  if ((!started)) {
    $('#level-title').text('Press A Key to Start')
    nextSequence()
    started = true
  }
})

// GAME LOGIC
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('Success')

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    console.log('Failed')
    $('h1').text('Game Over, Press Any Key to Restart')
    var aud = new Audio('/sounds/wrong.mp3')
    $('body').addClass('game-over')
    setTimeout(function () {
      aud.play()
      $('body').removeClass('game-over')
    }, 200)
    startOver()
  }
}
// Restart Game
function startOver() {
  gamePattern = []
  started = false
  counter = 0
}
