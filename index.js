gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow", "pink", "purple","magenta","brown","violet","crimson","cyan","chocolate"];

var level = 0;
var keyStart = true;
$(document).keydown(function(e){
  if(keyStart){
    $('#level-title').text('Level '+level);
    nextSequence();
    keyStart = false;
  }
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $('#level-title').text("Level "+level);
  randomNumber = Math.floor(12*Math.random());
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour);
  animate(userChosencolour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(index){
  if(gamePattern[index]==userClickedPattern[index]){
  if(gamePattern.length == userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
  }
  else{
    $('#level-title').text('Game Over, Press Any Key to Restart');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    playSound('wrong');
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  keyStart = true;
}

function playSound(param){
  var audio = new Audio("sounds/" + param + ".mp3");
  audio.play();
}

function animate(param){
  $('#'+param).addClass("pressed");
  setTimeout(function(){
    $('#'+param).removeClass("pressed")
  },100);
}
