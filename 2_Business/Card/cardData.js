
const OWNER_DEALER = 'Dealer';
const OWNER_PLAYER = 'Player';

const cardIds = ({'CardTopLeft': 'DealerLeft',
  'CardTopRight': 'DealerRight',
  'CardMidLeft': 'MiddleLeft',
  'CardMidRight': 'MiddleRight',
  'CardBottomLeft': 'PlayerLeft',
  'CardBottomRight': 'PlayerRight'});

  class Card {
    constructor(faceValue, suit, fileName, shuffleIndex) {
      this.faceValue = faceValue;
      this.suit = suit;
      if (fileName.length <= 3) {
        this.fileName = `1_UI\\PNG\\${fileName}.png`; // when we do not have qualified path (on load) for example OOB
      } else {
        this.fileName = fileName;  // when we already have qualified path - when (shuffling) for example 
      }
      this.shuffleIndex = shuffleIndex;
      this.cardOwner = null;
      this.played = false; // (if card has been 'played') - (is it available to 'flip')
      this.inPlay = false; // (true only while card is (in-play)) When reshuffling, do not shuffle cards that are (in-play)
     }
   }

  function getCardOwner(index) {
    return (index%2==0)?OWNER_DEALER:OWNER_PLAYER;
  }


function cardsOutOfBox() {
  const cards = [];
  // const shuffleNum = -1;

  cards.push(new Card(2, 'Two of Clubs', '2C'));
  cards.push(new Card(2, 'Two of Diamonds', '2D'));
  cards.push(new Card(2, 'Two of Hearts', '2H'));
  cards.push(new Card(2, 'Two of Spades', '2S'));

  cards.push(new Card(3, 'Three of Clubs', '3C'));
  cards.push(new Card(3, 'Three of Diamonds', '3D'));
  cards.push(new Card(3, 'Three of Hearts', '3H'));
  cards.push(new Card(3, 'Three of Spades', '3S'));

  cards.push(new Card(4, 'Four of Clubs', '4C'));
  cards.push(new Card(4, 'Four of Diamonds', '4D'));
  cards.push(new Card(4, 'Four of Hearts', '4H'));
  cards.push(new Card(4, 'Four of Spades', '4S'));

  cards.push(new Card(5, 'Five of Clubs', '5C'));
  cards.push(new Card(5, 'Five of Diamonds', '5D'));
  cards.push(new Card(5, 'Five of Hearts', '5H'));
  cards.push(new Card(5, 'Five of Spades', '5S'));

  cards.push(new Card(6, 'Six of Clubs', '6C'));
  cards.push(new Card(6, 'Six of Diamonds', '6D'));
  cards.push(new Card(6, 'Six of Hearts', '6H'));
  cards.push(new Card(6, 'Six of Spades', '6S'));

  cards.push(new Card(7, 'Seven of Clubs', '7C'));
  cards.push(new Card(7, 'Seven of Diamonds', '7D'));
  cards.push(new Card(7, 'Seven of Hearts', '7H'));
  cards.push(new Card(7, 'Seven of Spades', '7S'));

  cards.push(new Card(8, 'Eight of Clubs', '8C'));
  cards.push(new Card(8, 'Eight of Diamonds', '8D'));
  cards.push(new Card(8, 'Eight of Hearts', '8H'));
  cards.push(new Card(8, 'Eight of Spades', '8S'));

  cards.push(new Card(9, 'Nine of Clubs', '9C'));
  cards.push(new Card(9, 'Nine of Diamonds', '9D'));
  cards.push(new Card(9, 'Nine of Hearts', '9H'));
  cards.push(new Card(9, 'Nine of Spades', '9S'));

  cards.push(new Card(10, 'Ten of Clubs', '10C'));
  cards.push(new Card(10, 'Ten of Diamonds', '10D'));
  cards.push(new Card(10, 'Ten of Hearts', '10H'));
  cards.push(new Card(10, 'Ten of Spades', '10S'));

  cards.push(new Card(11, 'Jack of Clubs', 'JC'));
  cards.push(new Card(11, 'Jack of Diamonds', 'JD'));
  cards.push(new Card(11, 'Jack of Hearts', 'JH'));
  cards.push(new Card(11, 'Jack of Spades', 'JS'));

  cards.push(new Card(12, 'Queen of Clubs', 'QC'));
  cards.push(new Card(12, 'Queen of Diamonds', 'QD'));
  cards.push(new Card(12, 'Queen of Hearts', 'QH'));
  cards.push(new Card(12, 'Queen of Spades', 'QS'));

  cards.push(new Card(13, 'King of Clubs', 'KC'));
  cards.push(new Card(13, 'King of Diamonds', 'KD'));
  cards.push(new Card(13, 'King of Hearts', 'KH'));
  cards.push(new Card(13, 'King of Spades', 'KS'));

  cards.push(new Card(14, 'Ace of Clubs', 'AC'));
  cards.push(new Card(14, 'Ace of Diamonds', 'AD'));
  cards.push(new Card(14, 'Ace of Hearts', 'AH'));
  cards.push(new Card(14, 'Ace of Spades', 'AS'));


  return cards;
}
/**
 * Takes the cards passed to it and returns them (shuffled) or (mixed-up) if you please
 * @param  {} cardsToShuffle Cards to shuffle
 */
function shuffleCards(cardsToShuffle, owner) {
  const shuffledCards = [];
  let shuffledIndexes = [];

  shuffledIndexes = getShuffledIndex(cardsToShuffle.length);

  for (i = 0; i < shuffledIndexes.length; i += 1) {
    shuffledCards.push(new Card(cardsToShuffle[shuffledIndexes[i]].faceValue,
                                cardsToShuffle[shuffledIndexes[i]].suit,
                                cardsToShuffle[shuffledIndexes[i]].fileName,
                                cardsToShuffle[shuffledIndexes[i]].shuffleIndex));
    if (owner == undefined) { 
      shuffledCards[i].cardOwner = getCardOwner(i); 
    } else {
      shuffledCards[i].cardOwner = owner; 
    }
    
  }
  return shuffledCards;
}
/**
 * creates a 1 dimension array (of shuffled integers). 
 * @param  {} numIndexes this number determines the count or number of elements to put in to the return array 
 */
function getShuffledIndex(numIndexes) {
  const orderedIndex = [];
  const shuffledIndex = [];

  for (let i = 0; i <= (numIndexes -1); i++) { // load array (0 - 51)
    orderedIndex.push(i);
  }

  for (let i = 0; i <= (numIndexes -1); i++) { // loop the 52 elements of the array (0 - 51)
    const elmnt = Math.floor(Math.random() * (orderedIndex.length));
    shuffledIndex.push(orderedIndex[elmnt]); // push unique values
    orderedIndex.splice(elmnt, 1);
  }
  return shuffledIndex;
}
/**
 * Receives the full deck (cards for both players), and shuffles cards for one player or the other
 * @param  {} mainDeck Full deck of (in-game) cards - 52 cards
 * @param  {} owner The (dealer or player) who's cards need to be shuffled
 */
function ShufflePartOfDeck(mainDeck, owner) {
  let partialDeck = [];
  
  console.log('ShufflePartOfDeck!!!');
  
  for (let i = 0; i <= (mainDeck.length - 1); i++) {

    // this loop collects all the target cards (cards to be shuffled) from the game-deck
    if (mainDeck[i].cardOwner == owner && mainDeck[i].inPlay == false && 
                                          mainDeck[i].played == true) {
      partialDeck.push(new Card(mainDeck[i].faceValue, 
                                mainDeck[i].suit, 
                                mainDeck[i].fileName, i));
      mainDeck[i].faceValue = null;
      mainDeck[i].suit = null;
      mainDeck[i].fileName  = null;

      partialDeck[(partialDeck.length -1)].cardOwner = owner;
    }
  }

  partialDeck = shuffleCards(partialDeck, owner); // shuffle target cards

  // this loop inserts the shuffled cards back in to the game-deck
  for (let i = 0; i <= (partialDeck.length) -1; i++) {
    mainDeck[partialDeck[i].shuffleIndex].faceValue = partialDeck[i].faceValue;
    mainDeck[partialDeck[i].shuffleIndex].suit = partialDeck[i].suit;
    mainDeck[partialDeck[i].shuffleIndex].fileName  = partialDeck[i].fileName;
    mainDeck[partialDeck[i].shuffleIndex].played  = false;
    mainDeck[partialDeck[i].shuffleIndex].inPlay  = false;
    if (document.getElementById(partialDeck[i].suit)  != null) { // is card is in DOM
      document.body.removeChild(document.getElementById(partialDeck[i].suit));
    }
  }
  console.log(`${mainDeck[i].cardOwner} ${mainDeck[i].suit} `);
}
