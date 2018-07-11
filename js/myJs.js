var timerId = null; //variable to store the call of timeout function

function goToGame() {
	var gameLevel = document.getElementById('gameLevel').value;

	window.location.href = 'game.html?' + gameLevel;
}

function startGame() {
    var url = window.location.search;

    var gameLevel = url.replace("?", "");

    var gameTime;

    if (gameLevel == 1) //Easy Level: 120 seconds
        gameTime = 120;
    else if (gameLevel == 2) //Normal Level: 60 seconds
        gameTime = 60;
    else if (gameLevel == 3)//Hard Level: 30 seconds
        gameTime = 5;
    else {
        alert("Invalid Level!");
        window.location.href = 'index.html';
    }


    document.getElementById('clock').innerHTML = gameTime;

    var BalloonQty = 6;

    insertBalloons(BalloonQty)

    //Printing the number of filled balloons
    document.getElementById('filledBalloons').innerHTML = BalloonQty;

    //Printing the number of blowed balloons
    document.getElementById('blowedBalloons').innerHTML = 0;

    timeCount(gameTime);

}

function insertBalloons(qty) {
    for (var i = 1; i <= qty; i++) {
        var balloon = document.createElement("img");
        balloon.src = 'media/smallFilledBalloon.png';
        balloon.className = "smallBalloon";
        balloon.onclick = function () {blow(this);};
        balloon.id = "b" + i;

        document.getElementById('gamePanel').appendChild(balloon);
    }
}

function blow(currentBalloon) {

    var balloon = document.getElementById(currentBalloon.id);

    balloon.src = "media/smallBlowedBalloon.png";
    balloon.onclick = '';
    updatePoints();
}

function timeCount(gameTime) {
    if (gameTime > 0) {
        document.getElementById('clock').innerHTML = gameTime;
        gameTime--;
        timerId = setTimeout("timeCount("+gameTime+")",1000);
    } else {
        clearTimeout(timerId);
        gameOver();
    }
}

function gameOver() {
    alert("Game Over! Try Again!");
    window.location.href = 'index.html';
}

function updatePoints() {
    var filledBalloons = parseInt(document.getElementById('filledBalloons').innerHTML);
    var blowedBalloons = parseInt(document.getElementById('blowedBalloons').innerHTML);

    filledBalloons--;
    blowedBalloons++;

    document.getElementById('filledBalloons').innerHTML = filledBalloons;
    document.getElementById('blowedBalloons').innerHTML = blowedBalloons;

    gameStatus(filledBalloons);
}

function gameStatus(filledBalloons) {
    if (filledBalloons == 0) {
        alert('Congratulations! You Win!');
        stopGame();
    }
}

function stopGame() {
    clearTimeout(timerId);
}
