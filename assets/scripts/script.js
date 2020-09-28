$('.card').addClass('flipped');





class SoundSetup {
    constructor() {
        this.flip = new Audio('assets/audio/flip.wav');
        this.match = new Audio('assets/audio/match.wav');
        this.win = new Audio('assets/audio/win.mp3');
        this.gameOver = new Audio('assets/audio/gameover.wav');
    }
    cardFlip() {
        this.flip.play();
    }
    cardMatch() {
        this.match.play();
    }
    win() {
        this.win.play();
    }
    gameOver() {
        this.gameOver.play();
    }
}

