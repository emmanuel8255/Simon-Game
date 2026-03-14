var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var userRecentAnswer = userClickedPattern[userClickedPattern.length-1]

var gameAnswer = gamePattern [gamePattern.length - 1];

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
        
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
})

function playSound(name) {
    var sound =  new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor); 
    $("#level-title").text("Level " + level);
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
    }, 100);
}


if (started === false) {
    $(document).on("keydown", function(){
    nextSequence();
    started = true;
})}
else {
        $(document).off("keydown");
        $("#level-title").text("Level " + level);
    }

function checkAnswer() {
    
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]){
       console.log("success");
       
       if (userClickedPattern.length == gamePattern.length){
        setTimeout(() => {
        nextSequence();
       }, 1000); 
    }
    }

    else {
        console.log("wrong");

        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200); 
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver() 
    }

    function startOver() {
        started = false;
        level = 0;
        gamePattern = [];
    }
}

 