let war = new warfare();
let gameDeck;
class GamePlay {
  constructor(shuffledDeck) {
    gameDeck = shuffledDeck;
    // this.animationRunning = false;
    this.handWinnerDeclared = true;
    this.dealerScore = 0;
    this.playerScore = 0;
    this.isWar = false;
    // intervaleId = setInterval(this.evalCardsInPlay, 2000);
  }
  flipDealerCard() {
    try{
      this.flipCard(OWNER_DEALER, cardIds.CardTopLeft, cardIds.CardMidLeft);
    }
    catch(err) {
      alert(`Error occurred in GamePlay.flipDealerCard '\r\n' ${err.message}`);
    }

  }

  flipPlayerCard() {
    try{
      this.flipCard(OWNER_PLAYER, cardIds.CardBottomRight, cardIds.CardMidRight);
    }
    catch(err) {
      alert(`Error occurred in GamePlay.flipDealerCard '\r\n' ${err.message}`);
    }
  }

  flipCard(cardOwner, fromID, toID) {
    const cardObj = gameDeck.find((cardIdx) => cardIdx.cardOwner == cardOwner && cardIdx.availForPlay == true);
    
    // this also changes this.gameDeck[x].availForPlay to = false
    // this.animationRunning = true;

    cardObj.availForPlay = false;

    const cardFlipping = document.createElement('IMG');

    const moveToRect = document.getElementById(toID).getBoundingClientRect();
    const moveFromRect = document.getElementById(fromID).getBoundingClientRect();

    cardFlipping.setAttribute('src', cardObj.fileName);
    cardFlipping.setAttribute('alt', cardObj.suit);
    cardFlipping.setAttribute('id', cardObj.suit);
    cardFlipping.setAttribute('data-resizeloc', toID);
    cardFlipping.setAttribute('data-faceValue', cardObj.faceValue);
    cardFlipping.setAttribute('data-owner', cardOwner);
    cardFlipping.setAttribute('data-filename', cardObj.fileName);
    cardFlipping.setAttribute('data-inplay', 'yes');

    cardFlipping.style.position = 'absolute';
    cardFlipping.style.height = moveToRect.height + 'px';
    cardFlipping.style.top = (moveFromRect.top - window.scrollY) + 'px'; // set (start) .top - the css transition needs a start location
    cardFlipping.style.left = moveFromRect.left + 'px'; // set (start) .left - the css transition needs a start location
    document.getElementsByTagName('body')[0].appendChild(cardFlipping);

    cardFlipping.style.transition = 'all .5s'; // A span of time (or something) needs to elapse after applying the transition property
    cardFlipping.offsetHeight; // Getting .offsetHeight forces the layout engine to stop, evaluate and calculate all properties that are set, and return a value.  We're not saving a return value but instead are calling .offsetHeight to force this transition to work.

    cardFlipping.style.top = (moveToRect.top + window.scrollY) + 'px';
    cardFlipping.style.left = moveToRect.left + 'px';
  }
/**
 * This method looks for a (full set) of cards that are face up on the game board.
 * In this context a (full set) of (in play cards) consists of 2 cards.
 * @param {Card} dealerCardObj Card object - dealer's card details.
 * @param {Card} playerCardObj Card object - player's card details.
 * @returns {boolean} returns true of a (full set) of (in play) cards are on the board.
 */ 
  fullSetCardsOnBoard(dealerCardObj, playerCardObj) {

    let count = 0;
    const imgs = document.getElementsByTagName('img');

    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].dataset.inplay == 'yes') {
        
        switch (imgs[i].dataset.owner) {
          case undefined:
            break;
          case OWNER_DEALER:
            dealerCardObj.cardOwner = imgs[i].dataset.owner;
            dealerCardObj.suit = imgs[i].id;
            dealerCardObj.faceValue = imgs[i].dataset.facevalue;
            dealerCardObj.fileName = imgs[i].dataset.filename;
            count++;
            break;
          case OWNER_PLAYER:
            playerCardObj.cardOwner = imgs[i].dataset.owner;
            playerCardObj.suit = imgs[i].id;
            playerCardObj.faceValue = imgs[i].dataset.facevalue;
            playerCardObj.fileName = imgs[i].dataset.filename;
            count++;
            break;
        }

      }
    }
    return (count == 2); // returns true or false
  }

  /**
   * This function evaluates the full set of (cards on the board), the cards that are currently (in play).
   * It assigns the winner of the current hand the point for this hand and gives winner the (prize card).
   * @param {Card} cardDealerObj Card object - assigned to the winner, moved to winner's discard pile and flagged as (out of play).
   * @param {Card} cardPlayerObj Card object - assigned to the winner, moved to winner's discard pile and flagged as (out of play).
   */ 
  allocateWinnerPoints(cardDealerObj, cardPlayerObj) {

    let elmntMvr = new elementMover();
    // this.animationRunning = true;

    if (0 == 0) {
    // if (parseInt(cardDealerObj.faceValue) == parseInt(cardPlayerObj.faceValue)) {
      // War!
      this.isWar = true;
      war = new warfare();
      war.initializeWar(cardDealerObj.fileName, cardPlayerObj.fileName);

      
    } else {
      this.isWar = false;
      
      if (parseInt(cardDealerObj.faceValue) > parseInt(cardPlayerObj.faceValue)) {
        // dealer wins
        this.dealerScore += 1;
        elmntMvr.moveElement(cardDealerObj.suit, cardIds.CardTopRight);
        elmntMvr.moveElement(cardPlayerObj.suit, cardIds.CardTopRight);
        document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
        document.getElementById(cardPlayerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
        document.getElementById(cardDealerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);
        document.getElementById(cardPlayerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);

      } else {
        // player wins
        this.playerScore += 1;
        elmntMvr.moveElement(cardDealerObj.suit, cardIds.CardBottomLeft);
        elmntMvr.moveElement(cardPlayerObj.suit, cardIds.CardBottomLeft);
        document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
        document.getElementById(cardPlayerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
        document.getElementById(cardDealerObj.suit).setAttribute('data-cardowner', OWNER_PLAYER);
        document.getElementById(cardPlayerObj.suit).setAttribute('data-cardowner', OWNER_PLAYER);
      }
    }
    document.getElementById(cardDealerObj.suit).setAttribute('data-inplay', 'no');
    document.getElementById(cardPlayerObj.suit).setAttribute('data-inplay', 'no');
    this.handWinnerDeclared = true;
  }

}