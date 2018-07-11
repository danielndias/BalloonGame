

function startGame() {
	var gameLevel = document.getElementById('gameLevel').value;

	window.location.href = 'game.html?' + gameLevel;
}