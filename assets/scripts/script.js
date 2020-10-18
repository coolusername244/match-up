//Sounds class to harbour all the sounds used in game.
class Sounds {                                          
    constructor() {
        this.flip = new Audio('assets/audio/flip.wav');                 
        this.match = new Audio('assets/audio/match.wav');
        this.victorySound = new Audio('assets/audio/victory.wav');
        this.gameOver = new Audio('assets/audio/gameover.wav');
    }

//Functions that play the sounds listed above. 
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

//The objects below ( before the startGame() ) are only called once, when the page is initially loaded.
class MemoryGame {
    constructor(time, cards) {
        this.cardsArray = cards;
        this.time = time;
        this.timeRemaining = time;
        this.clock = document.getElementById('time-remaining');
        this.totalClicks = document.getElementById('clicks');
        this.sounds = new Sounds();
    }
//When a new game is started, startGame() will be called, resetting the gameboard (removing flipped class/resetting click counter and timer etc.).
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
// The flipCard() funciton is checking to see if the card can be flipped - if it can, play the flip sound, raise the total amount of clicks
//by 1, add the CSS class 'flipped'.
    flipCard(card) {
        if (this.canCardBeFlipped(card)) {
            this.sounds.cardFlip();
            this.clickCounter++;
            this.totalClicks.innerHTML = this.clickCounter;
            card.classList.add('flipped');
//Checking to see if you flipping card1 or card 2.
            if(this.cardToBeChecked) {
                this.checkForMatch(card);
            } else {
                this.cardToBeChecked = card;
            }
        }
    }
//This function is checking to see if the card IMG src's are the same; 
//If it is, execute cardMatch().
    checkForMatch(card) {
        if(this.getCardValue(card) === this.getCardValue(this.cardToBeChecked))
            this.cardMatch(card, this.cardToBeChecked);
        else
//if it isnt, execute noMatch().
            this.noMatch(card, this.cardToBeChecked);

        this.cardToBeChecked = null;
    }

//Once the cards have been matched, they are pushed to the matchedCards Array.
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        this.sounds.cardMatchSound();
//if the matchedCards array matches the length of the cardsArray (12), the victory function is called.
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

//If the second card you click does not match the first one, noMatch() will be called - removing the 
//CSS class 'flipped' and will give the user 1 second to visualise what the card values were.
    noMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            this.busy = false;
        }, 1000);
    }

//This function is retrieving the value of the card (what we wish to be compared)
//As the only thing unique about the cards is the img src, thats where is has been directed to look.
    getCardValue(card) {
        return card.getElementsByClassName('front-img')[0].src;
    }

//The startTimer() function is reducing the value of the timer by 1 every second, once the timer reaches
//0, the game over function will be executed. 
    startTimer() {
        return setInterval(() => {
            this.timeRemaining--;
            this.clock.innerHTML = this.timeRemaining;
            if(this.timeRemaining === 0) 
                this.gameOver();
            }, 1000);
    }

//The game board is deactivated upon loss by the CSS class 'show-overlay' being added.
//The function to play the game over sound is also executed here.
    gameOver() {
        clearInterval(this.countdown);
        this.sounds.gameEnd();
        document.getElementById('game-over-screen-overlay').classList.add('show-overlay');
    }

//The game board is deactivated upon loss by the CSS class 'show-overlay' being added.
//The function to play the victory sound is also executed here.
    victory() {
        clearInterval(this.countdown);
        
        document.getElementById('win-screen-overlay').classList.add('show-overlay');
        this.sounds.win();
    }

//To shuffle the deck, i have used the Fisher-Yates shuffle algorytm
    shuffleDeck() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1));
            this.cardsArray[rand].style.order = i;
            this.cardsArray[i].style.order = rand;
        }
    }

//This function is checking if the card can be flipped - if all of the conditions return false, the function will return true, allowing 
//the card to be flipped.
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
    let game = new MemoryGame(60, cards);

//Adding a click event listener to each of the overlays to result in a new game being started.
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('show-overlay');
            game.startGame();
        });
    });

//Adding a click event listener to each of the div elements with the class 'card' to enable them to be flipped when clicked. 
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}