// let war = new warfare();
let gameDeck;
let cardDealerObj = new Card(0, '', '');
let cardPlayerObj = new Card(0, '', '');


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
    // try{
      this.flipCard(OWNER_DEALER, cardIds.CardTopLeft, cardIds.CardMidLeft);
    // }
    // catch(err) {
    //   alert(`Error occurred in GamePlay.flipDealerCard '\r\n' ${err.message}`);
    // }

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

    const cardDrawnFrmDeck = drawCardFromDeck(cardOwner);

    const cardTurning = document.createElement('IMG');

    const moveFromRect = document.getElementById(fromID).getBoundingClientRect();
    const moveToRect = document.getElementById(toID).getBoundingClientRect();

    cardTurning.setAttribute('src', cardDrawnFrmDeck.fileName);
    cardTurning.setAttribute('alt', cardDrawnFrmDeck.suit);
    cardTurning.setAttribute('id', cardDrawnFrmDeck.suit);
    cardTurning.setAttribute('data-resizeloc', toID);
    cardTurning.setAttribute('data-faceValue', cardDrawnFrmDeck.faceValue);
    cardTurning.setAttribute('data-cardowner', cardOwner);
    cardTurning.setAttribute('data-filename', cardDrawnFrmDeck.fileName);
    cardTurning.setAttribute('data-inbattle', 'yes'); // (part of the current hand) or (is currently face up in the middle of the board) or (the cards in the current battle)

    cardTurning.style.position = 'absolute';
    cardTurning.style.height = moveToRect.height + 'px';
    cardTurning.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
    cardTurning.style.left = moveFromRect.left + 'px';                  // the css transition needs a start location
    
    document.body.appendChild(cardTurning);

    cardTurning.style.transition = 'all .5s'; // A span of time (or something) needs to elapse after applying the transition property
    cardTurning.offsetHeight; // Getting .offsetHeight forces the layout engine to stop, evaluate and calculate all properties that are set, and return a value.  We're not saving a return value but instead are calling .offsetHeight to force this transition to work.

    cardTurning.style.top = (moveToRect.top + window.scrollY) + 'px';
    cardTurning.style.left = moveToRect.left + 'px';
  }
/**
 * This method looks for a (full set) of cards that are face up on the game board.
 * In this context a (full set) of (in play cards) consists of 2 cards.
 * @param {Card} cardDealerObj Card object - dealer's card details.
 * @param {Card} cardPlayerObj Card object - player's card details.
 * @returns {boolean} returns true of a (full set) of (in play) cards are on the board.
 */ 
  loadCardObjectsFromDOM() {

    let count = 0;
    const imgs = document.getElementsByTagName('img');

    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].dataset.inbattle == 'yes') {
        
        switch (imgs[i].dataset.cardowner) {
          case undefined:
            break;
          case OWNER_DEALER:
            cardDealerObj.cardOwner = imgs[i].dataset.cardowner;
            cardDealerObj.suit = imgs[i].id;
            cardDealerObj.faceValue = imgs[i].dataset.facevalue;
            cardDealerObj.fileName = imgs[i].dataset.filename;
            count++;
            break;
          case OWNER_PLAYER:
            cardPlayerObj.cardOwner = imgs[i].dataset.cardowner;
            cardPlayerObj.suit = imgs[i].id;
            cardPlayerObj.faceValue = imgs[i].dataset.facevalue;
            cardPlayerObj.fileName = imgs[i].dataset.filename;
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
  determineWinner() {

    this.loadCardObjectsFromDOM()

    let elmntMvr = new elementMover();

    if (parseInt(cardDealerObj.faceValue) > parseInt(cardPlayerObj.faceValue)) {
      // dealer wins
      this.dealerScore += 1;
      elmntMvr.moveElement(cardDealerObj.suit, cardIds.CardTopRight);
      elmntMvr.moveElement(cardPlayerObj.suit, cardIds.CardTopRight);
      document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
      document.getElementById(cardDealerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);
      gameDeck.find((cardIdx) => cardIdx.suit == cardPlayerObj.suit).cardOwner = OWNER_DEALER; // player card to dealer

    } else {
      // player wins
      this.playerScore += 1;
      elmntMvr.moveElement(cardDealerObj.suit, cardIds.CardBottomLeft);
      elmntMvr.moveElement(cardPlayerObj.suit, cardIds.CardBottomLeft);
      document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
      document.getElementById(cardDealerObj.suit).setAttribute('data-cardowner', OWNER_PLAYER);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-cardowner', OWNER_PLAYER);
      gameDeck.find((cardIdx) => cardIdx.suit == cardDealerObj.suit).cardOwner = OWNER_PLAYER; // dealer card to player
    }
    // flag 'DOM elements': cards not (in battle)
    document.getElementById(cardDealerObj.suit).setAttribute('data-inbattle', 'no');
    document.getElementById(cardPlayerObj.suit).setAttribute('data-inbattle', 'no');

    this.handWinnerDeclared = true;
    document.getElementById('UserTip').innerText = `Dealer: ${this.dealerScore} player: ${this.playerScore}`;
  }
  currentHandIsWar() {

    return true;
    this.loadCardObjectsFromDOM();
    return (parseInt(cardDealerObj.faceValue) == parseInt(cardPlayerObj.faceValue));
  }
  declareWar(){
    // let cardDealerObj = new Card(0, '', '');
    // let cardPlayerObj = new Card(0, '', '');
    this.loadCardObjectsFromDOM()
    // war = new warfare();
    // war.initializeWar(cardDealerObj.fileName, cardPlayerObj.fileName);
    // let warAnime = new warAnimation('WAR!', cardDealerObj.fileName, cardPlayerObj.fileName);
    let warAnime = new warAnimation('WAR!', cardDealerObj.fileName, cardPlayerObj.fileName);
    warAnime.playWarAnimation();        
    warAnime = null;
  }

  flipDealerWarCard(offsetFactor) {

    const leftOffset = (15 * offsetFactor) * -1;

    const moveFromRect = document.getElementById(cardIds.CardTopLeft).getBoundingClientRect();
    const moveToRect = document.getElementById(cardIds.CardMidLeft).getBoundingClientRect();

    const dealerFaceBack = document.createElement('IMG');
    const dealerFaceUp = document.createElement('IMG');

    let dealerCardFromDeck = new Card(0, '', '');
    dealerCardFromDeck = drawCardFromDeck(OWNER_DEALER);

    dealerFaceBack.setAttribute('src', '1_UI\\PNG\\gray_back.png');
    dealerFaceBack.setAttribute('id', 'WAR_CARD_FACE_DOWN');
    dealerFaceBack.setAttribute('data-resizeloc', cardIds.CardMidLeft);
    dealerFaceBack.setAttribute('data-loc_offset', leftOffset); // target these properties when removing these cards from DOM

    dealerFaceUp.setAttribute('src', dealerCardFromDeck.fileName);
    dealerFaceUp.setAttribute('id', dealerCardFromDeck.suit);
    dealerFaceUp.setAttribute('data-resizeloc', cardIds.CardMidLeft);
    dealerFaceUp.setAttribute('data-loc_offset', leftOffset); // target these properties when removing these cards from DOM
    dealerFaceUp.setAttribute('data-cardowner', OWNER_DEALER); 

    dealerFaceBack.style.position = 'absolute';
    dealerFaceBack.style.height = moveToRect.height + 'px';
    dealerFaceBack.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
    dealerFaceBack.style.left = moveFromRect.left + 'px'; 
    // the css transition needs a start location

    dealerFaceUp.style.position = 'absolute';
    dealerFaceUp.style.height = moveToRect.height + 'px';
    dealerFaceUp.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
    dealerFaceUp.style.left = moveFromRect.left + 'px'; 
    dealerFaceUp.style.visibility = 'hidden';


    document.body.appendChild(dealerFaceBack);
    document.body.appendChild(dealerFaceUp);

    dealerFaceBack.style.transition = 'all .5s'; 
    dealerFaceBack.offsetHeight; // Getting .offsetHeight-layout engine reevaluate
    dealerFaceBack.style.top = (moveToRect.top + window.scrollY) + 'px';
    dealerFaceBack.style.left = (moveToRect.left + leftOffset) + 'px'; // this is (+) so the resize logic will work correctly

    dealerFaceUp.style.transition = 'all .5s'; 
    dealerFaceUp.offsetHeight; // Getting .offsetHeight-layout engine reevaluate
    dealerFaceUp.style.top = (moveToRect.top + window.scrollY) + 'px';
    dealerFaceUp.style.left = (moveToRect.left + leftOffset) + 'px'; // this is (+) so the resize logic will work correctly


  }

  onClickRedirectElement(addCard){

    const PLAYER_CLICK_CARD_ID = 'PLAYER_CLICK_CARD_ID_e9FNI9OyNz';
    
    if (addCard == true) {
      const cardToAdd = document.createElement('IMG');
      cardToAdd.setAttribute('src', '1_UI\\PNG\\red_back.png');
      cardToAdd.setAttribute('alt', '1_UI\\PNG\\red_back.png');
      cardToAdd.setAttribute('id', PLAYER_CLICK_CARD_ID);
      cardToAdd.setAttribute('data-resizeloc', cardIds.CardBottomRight);
      cardToAdd.style.position = 'absolute';
      cardToAdd.style.height = document.getElementById(cardIds.CardBottomRight).getBoundingClientRect().height + 'px';
      cardToAdd.style.top = document.getElementById(cardIds.CardBottomRight).getBoundingClientRect().top + 'px';
      cardToAdd.style.left = document.getElementById(cardIds.CardBottomRight).getBoundingClientRect().left + 'px';
      document.body.appendChild(cardToAdd);
      cardToAdd.addEventListener('click', CalCal);
      cardToAdd.onclick = function() {'Main.CalCal()'};
      // document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
      

    } else {
      // remove card
    }
  }
}

function drawCardFromDeck (cardOwner) {
  const retCard = gameDeck.find((cardIdx) => cardIdx.cardOwner == cardOwner && cardIdx.cardFlipped == false);
  retCard.cardFlipped = true; // sets gameDeck[x].cardFlipped = true
  return retCard;
}