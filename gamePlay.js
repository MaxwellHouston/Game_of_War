// GamePlay

const {deck} = require('./deckBuilder.js');
const playerDeck = [];
const computerDeck = [];
const table = [];

// Shuffles the deck
const shuffleDeck = (array) =>{
    for(let i = array.length-1; i > 0; i-- ){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleDeck(deck)


// Splits the deck into two hands
const splitDeck = (shuffledDeck) =>{
    let counter = 0;
    for(const cards of shuffledDeck){
        counter ++;
        if(counter%2===0){
            playerDeck.push(cards);
        }
        else{
            computerDeck.push(cards);
        }
    }
} 
splitDeck(deck);


// Draws one card from each deck and puts them on the table
const drawPhase = () =>{
    table.push(playerDeck.shift());
    table.push(computerDeck.shift());
}
drawPhase();

console.log(table);

const playPhase = () =>{
    if(table[0].number > table[1].number){
    console.log(`Your ${table[0].name} beats the computer's ${table[1].name}!`);
    playerDeck.push(table[0]);
    playerDeck.push(table[1]);
    table.splice(0,2);
    }
    else if( table[0].number < table[1].number){
    console.log(`Your ${table[0].name} loses to the computer's ${table[1].name}!`);
    computerDeck.push(table[0]);
    computerDeck.push(table[1]);
    table.splice(0,2);
    } 
    else{
    console.log(`Your ${table[0].name} ties the computer's ${table[1].name}!`);
    playerDeck.push(table[0]);
    computerDeck.push(table[1]);
    table.splice(0,2);
    }  
}
playPhase();
console.log(table);
console.log(playerDeck.length);
console.log(computerDeck.length);

console.log('Your last two cards')
console.log(playerDeck[playerDeck.length-1])
console.log(playerDeck[playerDeck.length-2])

console.log('their last two cards')
console.log(computerDeck[computerDeck.length-1])

console.log(computerDeck[computerDeck.length-2])

