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

class MemoryGame {
    constructor(time, cards) {
        this.cardsArray = cards;
        this.time = time;
        this.timeRemaining = time;
        this.clock = document.getElementById('time-remaining');
        this.totalClicks = document.getElementById('clicks');
        this.sounds = new Sounds();
    }
    startGame() {
        this.cardToMatch = null;
        this.clickCounter = 0;
        this.timeRemaining = this.time;
        this.matchedCards = [];
        this.busy = true;
        this.shuffleDeck();
    }

    flipCard(card) {
        if (this.canCardBeFlipped(card)) {
            this.sounds.cardFlip();
            this.clickCounter++;
            this.totalClicks.innerHTML = this.clickCounter;
            card.classList.add('flipped');
        }
    }
        //reference shuffle function    
    shuffleDeck() {
        this.cardsArray.sort((a, b) => 0.5 - Math.random());
        console.log('i ran');

        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            this.cardsArray[rand].style.order = i;
            this.cardsArray[i].style.order = rand;
            console.log('i was executed');
        }
    }

    canCardBeFlipped(card) {
        return true;
    } 
}

    //
function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let overlays = Array.from(document.getElementsByClassName('overlay'));
    let game = new MemoryGame(90, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('show-overlay');
            game.startGame();
        })
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}