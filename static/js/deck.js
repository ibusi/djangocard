const SUITS = ["♥","♦","♠","♣"]
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

export default class Deck {
    constructor(cards = freshDeck()){
        this.cards=cards
    }
    get numberOfCards() {
        return this.cards.length
    }

    pop(){
        //return first element of array
        return this.cards.shift()
    }

    push(card){
        //add to deck in the bottom
        this.cards.push(card)
    }
    

    shuffle() {
        // the reason thid.numberOfCards -1 is, it start counting from 0. deck is 52
        for(let i= this.numberOfCards -1; i>0;i--){
            //making newIndex which is gonna be the one who got switched with current card[i]
            //the reason i+1 is, make it back to current number it supposed to be.
            //ex)random)0.999 * 52 = 51.948  floor it then 51
            const newIndex = Math.floor(Math.random()*(i + 1))
            //preserve newIndex card on oldValue variable
            const oldValue = this.cards[newIndex]
            //switching process 1. card.newIndex change its value to card[i] 
            this.cards[newIndex] = this.cards[i]
            //switching process 2. card[i] change its value to oldValue
            this.cards[i] = oldValue
        }
    }
}




class Card {
    constructor(suit, value){
        this.suit=suit
        this.value=value
    }

    get color() {
        return this.suit === "♥" || this.suit === "♦" ? 'red' : 'black'
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}


function freshDeck(){
    // map each of suit and after that flat 1 level by flat
    return SUITS.flatMap(suit => {
        //each of suit go thorou each of value
        return VALUES.map(value=>{
            //each pair of suit and value is passed as argument to make new card object
            return new Card(suit, value)
        })
    })

}

// const pairs = [
//     "a","b","c"
// ]

// const result = pairs.flatMap(function (pair){
//     return [
//         pair
//     ]
// })

// console.log(result)

const deck = new Deck()
deck.shuffle()
console.log(deck.cards)