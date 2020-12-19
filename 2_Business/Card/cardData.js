/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

const OWNER_DEALER = 'Dealer';
const OWNER_PLAYER = 'Player';

const cardIds = ({'CardTopLeft': 'DealerLeft',
  'CardTopRight': 'DealerRight',
  'CardMidLeft': 'MiddleLeft',
  'CardMidRight': 'MiddleRight',
  'CardBottomLeft': 'PlayerLeft',
  'CardBottomRight': 'PlayerRight'});

  class Card {
    constructor(faceValue, suit, fileName) {
      this.faceValue = faceValue;
      this.suit = suit;
      if (fileName.length <= 3) {
        this.fileName = `1_UI\\PNG\\${fileName}.png`; // when we do not have qualified path (on load) for example OOB
      } else {
        this.fileName = fileName;  // when we already have qualified path - when (shuffling) for example 
      }
      this.cardOwner = null;
      this.availForPlay = true;
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

function shuffleCards(deckOOB) {
  const shuffledCards = [];
  let shuffledIndexes = [];

  shuffledIndexes = createShuffledIndex();

  for (i = 0; i < shuffledIndexes.length; i += 1) {
    shuffledCards.push(new Card(deckOOB[shuffledIndexes[i]].faceValue,
        deckOOB[shuffledIndexes[i]].suit,
        deckOOB[shuffledIndexes[i]].fileName));
    shuffledCards[i].cardOwner = getCardOwner(i);
  }
  // deckOOB.length = 0;
  return shuffledCards;
}


// eslint-disable-next-line require-jsdoc
function createShuffledIndex() {
  const orderedIndex = [];
  const shuffledIndex = [];

  // 52
  for (let i = 0; i <= 51; i++) { // load array (0 - 51)
    orderedIndex.push(i);
  }

  for (let i = 0; i <= 51; i++) { // loop the 52 elements of the array (0 - 51)
    const elmnt = Math.floor(Math.random() * (orderedIndex.length));
    shuffledIndex.push(orderedIndex[elmnt]); // push unique values
    orderedIndex.splice(elmnt, 1);
  }
  return shuffledIndex;
}
