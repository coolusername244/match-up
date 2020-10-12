        //Sounds Class to harbour all sounds used for game
class Sounds {
    constructor() {
        this.flip = new Audio('assets/audio/flip.wav');
        this.match = new Audio('assets/audio/match.wav');
        this.victorySound = new Audio('assets/audio/victory.wav');
        this.gameOver = new Audio('assets/audio/gameover.wav');
    }
        //Functions for sound clips
    cardFlip() {
        this.flip.play();
    }
    cardMatchSound() {
        this.match.play();
    }
    win() {
        this.victorySound.play();
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
        this.cardToBeChecked = null;
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
            if(this.cardToBeChecked) {
                this.checkForMatch(card);
            } else {
                this.cardToBeChecked = card;
            }
        }
    }

    checkForMatch(card) {
        if(this.getCardValue(card) === this.getCardValue(this.cardToBeChecked))
            this.cardMatch(card, this.cardToBeChecked);
        else
            this.noMatch(card, this.cardToBeChecked);

        this.cardToBeChecked = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        this.sounds.cardMatchSound();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    noMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            this.busy = false;
        }, 1000);
    }

    getCardValue(card) {
        return card.getElementsByClassName('front-img')[0].src;
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

    victory() {
        clearInterval(this.countdown);
        
        document.getElementById('win-screen-overlay').classList.add('show-overlay');
        console.log('i was ran');
        this.sounds.win();
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
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToBeChecked;
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
    let game = new MemoryGame(90, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('show-overlay');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
