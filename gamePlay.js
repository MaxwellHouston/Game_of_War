// GamePlay

import{deck} from './deckBuilder.js';
let playerDeck = [];
let computerDeck = [];
let table = [];
let player3 = [];
let computer3 = [];
let tiePot = [];
let drawButton = document.getElementById('draw-button');
let resetButton = document.getElementById('reset-button');
let playerCounter = document.getElementById('pc');
let computerCounter = document.getElementById('oc');
let textBox = document.getElementById('game-text');
let playerTieOne = document.getElementById('your-card-one');
let playerTieTwo = document.getElementById('your-card-two');
let playerTieThree = document.getElementById('your-card-three');
let computerTieOne = document.getElementById('opp-card-one');
let computerTieTwo = document.getElementById('opp-card-two');
let computerTieThree = document.getElementById('opp-card-three');
let yourPlay = document.getElementById('your-play');
let oppPlay = document.getElementById('opp-play');



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

//Tie game code
const tiePlay = () =>{
    
    player3 = playerDeck.splice(0,3);
    computer3 = computerDeck.splice(0,3);
    updateText('');
    playerTieThree.style.backgroundImage = `url("${player3[2].img}")`;
    computerTieThree.style.backgroundImage = `url("${computer3[2].img}")`;

    if(player3[2].number > computer3[2].number){
        updateText(`${textBox.innerText}  Your ${player3[2].name} beats the computer's ${computer3[2].name}!
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
        drawButton.removeEventListener('click',tiePlay);
        drawButton.addEventListener('click', playPhase);
    
    }
    else if (player3[2].number < computer3[2].number){
        updateText(`${textBox.innerText}   Your ${player3[2].name} loses to the computer's ${computer3[2].name}!
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
        drawButton.removeEventListener('click',tiePlay);
        drawButton.addEventListener('click', playPhase);                  
    }
    else{
        updateText(`${textBox.innerText}   Your ${player3[2].name} ties to the computer's ${computer3[2].name}!
        Draw again!`);
        //adds the played cards to a pot
        for(let i = 0; i < player3.length; i++){
            tiePot.push(player3[i]);
            tiePot.push(computer3[i]);
        }
    }
}
// Game play phase
const playPhase = () =>{
    clearTie();
    endGame();
    drawPhase();
    yourPlay.style.backgroundImage = `url("${table[0].img}")`;
    oppPlay.style.backgroundImage = `url("${table[1].img}")`;
    if(table[0].number > table[1].number){
    updateText(`Your ${table[0].name} beats the computer's ${table[1].name}!`);
    playerDeck.push(table[0]);
    playerDeck.push(table[1]);
    table.splice(0,2);

    }
    else if( table[0].number < table[1].number){
    updateText(`Your ${table[0].name} loses to the computer's ${table[1].name}!`);
    computerDeck.push(table[0]);
    computerDeck.push(table[1]);
    table.splice(0,2);
   
    } 
    else{
    updateText(`Your ${table[0].name} ties the computer's ${table[1].name}! Now
    each player puts three cards facedown and turns the last one up. Press Draw`);
    drawButton.removeEventListener('click', playPhase);
    drawButton.addEventListener('click', tieDraw);
    }
    
    playerCounter.innerHTML = `${playerDeck.length}`;
    computerCounter.innerHTML = `${computerDeck.length}`;
}

const reset = () => {
    playerDeck = [];
    computerDeck = [];
    table = [];
    player3 = [];
    computer3 = [];
    tiePot = [];
    shuffleDeck(deck);
    splitDeck(deck);
    playerCounter.innerHTML = `${playerDeck.length}`;
    computerCounter.innerHTML = `${computerDeck.length}`;
    playerTieOne.style.display = 'none';
    computerTieOne.style.display = 'none';
    playerTieTwo.style.display = 'none';
    computerTieTwo.style.display = 'none';
    playerTieThree.style.display = 'none';
    computerTieThree.style.display = 'none';
    yourPlay.style.backgroundImage = '';
    oppPlay.style.backgroundImage = '';
    updateText('');
}

const updateText = (input) => {
    textBox.innerHTML= `${input}`
}

const tieDraw = () => {
    playerTieOne.style.display = 'block';
    computerTieOne.style.display = 'block';
    playerTieTwo.style.display = 'block';
    computerTieTwo.style.display = 'block';
    playerTieThree.style.display = 'block';
    computerTieThree.style.display = 'block';
    drawButton.removeEventListener('click', tieDraw);
    drawButton.addEventListener('click', tiePlay);
}

const clearTie = () => {
    playerTieThree.style.backgroundImage = '';
    computerTieThree.style.backgroundImage = '';
    playerTieOne.style.display = 'none';
    computerTieOne.style.display = 'none';
    playerTieTwo.style.display = 'none';
    computerTieTwo.style.display = 'none';
    playerTieThree.style.display = 'none';
    computerTieThree.style.display = 'none';
}

const endGame = () => {
    if(playerDeck.length === 0) {
        console.log('You Win!')
    }
    else if(computerDeck.length === 0) {
        console.log('You lose')
    }
}


drawButton.addEventListener('click',playPhase);
resetButton.addEventListener('click', reset);











