// Deck Builder

//Const Arrays
const suits = ['ace','two','three','four','five','six','seven','eight','nine', 'ten', 'jack','queen','king']
const deck = [];


// puts together the deck of cards
const deckCompiler = (_name,_number,_suit) => {
  return {
    _name,
    _number,
    _suit,
    get name () {
      return this._name
    },
    get number () {
      return this._number
    },
    get suit () {
      return this._suit
    }
  }
}
const populateDeck = () => {
  for(i=0; i<=12; i++){
    let spades = suits[i] + ' of spades';
    let hearts = suits[i]+' of hearts';
    let diamonds = suits[i]+' of diamonds';
    let clubs = suits[i]+' of clubs';
    let value = i+1
    deck.push(deckCompiler(spades,value,'spades'));
    deck.push(deckCompiler(hearts,value,'hearts'));
    deck.push(deckCompiler(diamonds,value,'diamonds'));
    deck.push(deckCompiler(clubs,value,'clubs'));
  }
}
populateDeck();


module.exports.deck = deck;



