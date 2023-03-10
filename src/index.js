import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    let game = new Game();
    
    const startButton = document.getElementById("start-button");

    startButton.addEventListener('click', () => {
        document.getElementById('introduction').style.display = "none";
        //document.querySelector('#instructions').classList.add(hide);
        game.gameStart();
    })

    document.getElementById('restart-button').addEventListener('click', () => {
        //game = null;
        //game = new Game();
        game.restart();
        //game.gameStart();
    })

})