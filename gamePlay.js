// GamePlay

const {deck} = require('./deckBuilder.js');
let playerDeck = [];
let computerDeck = [];
let table = [];
let tieStatus ;
let player3 = [];
let computer3 = [];
let tiePot = [];

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

// Game play phase
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
//Tie game code
const tiePlay = () =>{
    
    player3 = playerDeck.splice(0,3);
    computer3 = computerDeck.splice(0,3);

    if(player3[2].number > computer3[2].number){
        console.log(`Your ${player3[2].name} beats the computer's ${computer3[2].name}!
        That's a good haul!`);
        //Adding winnings to your deck
        for(let i = 0; i < player3.length; i++){
            playerDeck.push(player3[i]);
            playerDeck.push(computer3[i]);
           
        }
        if(tiePot.length!==0){
            for(let x = 0; x < tiePot.length; x++){
                playerDeck.push(tiePot[x]);
            }
        }
        playerDeck.push(table[0]);
        playerDeck.push(table[1]);
        //Clearing the table
        table.splice(0,2);
        tiePot.splice(0,tiePot.length);
        player3.splice(0,player3.length);
        computer3.splice(0,computer3.length);
    
    }
    else if (player3[2].number < computer3[2].number){
        console.log(`Your ${player3[2].name} loses to the computer's ${computer3[2].name}!
        That's a big loss!`);
        // Adding winnings to computers deck
        for(let j = 0; j < player3.length; j++){
            computerDeck.push(player3[j]);
            computerDeck.push(computer3[j]);
        }
        if(tiePot.length!==0){
            for(let y = 0; y < tiePot.length; y++){
                computerDeck.push(tiePot[y]);
            }
        }
        computerDeck.push(table[0]);
        computerDeck.push(table[1]);
        //Clearing the table
        table.splice(0,2);   
        player3.splice(0,player3.length);
        computer3.splice(0,computer3.length);
        tiePot.splice(0,tiePot.length);
        
    }
    else{
        console.log(`Your ${player3[2].name} ties to the computer's ${computer3[2].name}!
        Let's up the ante!`);
        //adds the played cards to a pot
        for(let i = 0; i < player3.length; i++){
            tiePot.push(player3[i]);
            tiePot.push(computer3[i]);
        }
        //Reruns tie procedure
        tiePlay();
    }

}





        console.log(playerDeck.length)
        console.log(computerDeck.length)
        tiePlay()
        console.log(playerDeck.length)
        console.log(computerDeck.length)
        console.log(tiePot.length)
