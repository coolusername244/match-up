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
    gameEnd() {
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
        setTimeout(() => {
            this.shuffleDeck();
            this.countdown = this.startTimer();
            this.busy = false;
        }, 500);
        this.resetCards();
        this.clock.innerHTML = this.time;
        this.totalClicks.innerHTML = this.clickCounter;
    }

    resetCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('flipped');
        });
    }

    flipCard(card) {
        if (this.canCardBeFlipped(card)) {
            this.sounds.cardFlip();
            this.clickCounter++;
            this.totalClicks.innerHTML = this.clickCounter;
            card.classList.add('flipped');
        }
    }

    startTimer() {
        return setInterval(() => {
            this.timeRemaining--;
            this.clock.innerHTML = this.timeRemaining;
            if(this.timeRemaining === 0) 
                this.gameOver();
            }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        this.sounds.gameEnd();
        document.getElementById('game-over-screen-overlay').classList.add('show-overlay');
    }
        //reference shuffle function    
    shuffleDeck() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            this.cardsArray[rand].style.order = i;
            this.cardsArray[i].style.order = rand;
        }
    }

    canCardBeFlipped(card) {
        return true;
    } 
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let overlays = Array.from(document.getElementsByClassName('overlay'));
    let game = new MemoryGame(3, cards);

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
