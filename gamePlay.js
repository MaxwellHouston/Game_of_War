// GamePlay

const {deck} = require('./deckBuilder.js');
const playerDeck = [];
const computerDeck = [];
const table = [];
let tieStatus = true;
let player3 = [];
let computer3 = [];

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



const tiePlay = () =>{
    player3 = playerDeck.splice(0,3);
    computer3 = computerDeck.splice(0,3);
    if(player3[2].number > computer3[2].number){
        console.log(`Your ${player3[2].name} beats the computer's ${computer3[2].name}!
        That's a good haul!`);
      tieStatus = 'player'
    }
    else if (player3[2].number < computer3[2].number){
        console.log(`Your ${player3[2].name} loses to the computer's ${computer3[2].name}!
        That's a big loss!`); 
        tieStatus = 'computer'
        
    }
    else{
        console.log(`Your ${player3[2].name} ties to the computer's ${computer3[2].name}!
        Let's up the ante!`)
        tieStatus = false;
    }

}
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
    console.log(`Your ${table[0].name} ties the computer's ${table[1].name}! Now
    each player puts three cards facedown and turns the last one up. Good luck!`);
    }  
}

const trial = () =>{
    tiePlay();
    if(tieStatus==='player'){
        for(let i = 0; i < player3.length; i++){
            playerDeck.push(player3[i]);
            playerDeck.push(computer3[i]);
        }
        playerDeck.push(table[0]);
        playerDeck.push(table[1]);
        table.splice(0,2);
    }
    else if ( tieStatus==='computer'){
        for(let i = 0; i < player3.length; i++){
            computerDeck.push(player3[i]);
            computerDeck.push(computer3[i]);
        }
        computerDeck.push(table[0]);
        computerDeck.push(table[1]);
        table.splice(0,2);   
    }
    else if ( tieStatus===false){
        trial()
    }
}
console.log(playerDeck.length)
        console.log(computerDeck.length)
trial()
        console.log(playerDeck.length)
        console.log(computerDeck.length)
      
