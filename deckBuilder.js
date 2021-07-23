// Deck Builder

//Const Arrays
const suits = ['two','three','four','five','six','seven','eight','nine', 'ten', 'jack','queen','king','ace'];
const numbers = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
const deck = [];


// puts together the deck of cards
const deckCompiler = (_name,_number,_suit,_img) => {
  return {
    _name,
    _number,
    _suit,
    _img,
    get name () {
      return this._name
    },
    get number () {
      return this._number
    },
    get suit () {
      return this._suit
    },
    get img () {
      return this._img
    }
  }
}
const populateDeck = () => {
  for(let i=0; i<=12; i++){
    let spades = suits[i] + ' of spades';
    let hearts = suits[i]+' of hearts';
    let diamonds = suits[i]+' of diamonds';
    let clubs = suits[i]+' of clubs';
    let value = i+2;
    let spadeImg = `./images/deck/${numbers[i]}S.png`;
    let clubImg = `./images/deck/${numbers[i]}C.png`;
    let heartImg = `./images/deck/${numbers[i]}H.png`;
    let diamondImg = `./images/deck/${numbers[i]}D.png`
    deck.push(deckCompiler(spades,value,'spades',spadeImg));
    deck.push(deckCompiler(hearts,value,'hearts', heartImg));
    deck.push(deckCompiler(diamonds,value,'diamonds', diamondImg));
    deck.push(deckCompiler(clubs,value,'clubs', clubImg));
  }
}
populateDeck();

console.log(deck[50])
export {deck};



