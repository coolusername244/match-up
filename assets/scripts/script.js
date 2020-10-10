
        //Sounds Class to harbour all sounds used for game
class Sounds {
    constructor() {
        this.flip = new Audio('assets/audio/flip.wav');
        this.match = new Audio('assets/audio/match.wav');
        this.win = new Audio('assets/audio/win.mp3');
        this.gameOver = new Audio('assets/audio/gameover.wav');
    }
        //Functions for sound clips
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

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
    //
function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            
        });
    });
}