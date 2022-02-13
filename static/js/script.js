import Deck from "./deck.js";

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")
const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

let playerDeck, computerDeck, inRound, stop

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    //in case number of cards is 51 or some odd, i can split nearly even for two by using Math.ceil
    //Math.ceil bring up to nearest positive side num. ex)1.09 => 2 , -1.99 => -1
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    //.slice(begining, endPoint) both index but endPoint is exclusive because originally it is set to length
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    //slice takes first callback as index 0, so 2nd callback can be length
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

    inRound = false
    stop = false


    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerHTML = ""

    upDateDeckCount()
}

window.addEventListener('beforeunload', function () {
    fetch(`http://127.0.0.1:8000/api/resultdelete/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    })
    console.log('beforeunload');
})

let round = 1

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    let winner = ''

    if (playerCard.value > computerCard.value) {
        winner = 'player'
    } else if (computerCard.value > playerCard.value) {
        winner = 'computer'
    } else {
        winner = 'draw'
    }


    let playerCardPass = `suit: ${playerCard.suit},value: ${playerCard.value}`
    let computerCardPass = `suit: ${computerCard.suit},value: ${computerCard.value}`

    var url = 'http://127.0.0.1:8000/api/resultcreate/'

    round = round.toString()

    const content = { 'round': round, 'playerCard': playerCardPass, 'computerCard': computerCardPass, 'winner': winner }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(content)
    })

    round = parseInt(round)
    round += 1



    //append chile element to follow classes in html
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    upDateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "You lose!!"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You win!!"
        stop = true
    }
}


function upDateDeckCount() {
    computerDeckElement.innerHTML = computerDeck.numberOfCards
    playerDeckElement.innerHTML = playerDeck.numberOfCards
}

//for user win

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}