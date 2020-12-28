// let war = new warfare();
let gameDeck;
let cardDealerObj = new Card(0, '', '');
let cardPlayerObj = new Card(0, '', '');

let dealerScore = 0;
let playerScore = 0;

var leftOffset = {
  'numPxls': 15,
  'playerWarCardCount': 0,
  'TotalCardCount': 0,
  'playerWarCardEnabled': true

};
leftOffset.DealerOffset = function (multiplier) {
  return (leftOffset.numPxls * multiplier) * -1;
};
leftOffset.PlayerOffset = function (multiplier) {
  return (leftOffset.numPxls * multiplier);
};
leftOffset.PlayerCardCount = function () {
  leftOffset.playerWarCardCount += 1;
  return (leftOffset.playerWarCardCount);
};


class GamePlay {
  constructor(shuffledDeck) {
    gameDeck = shuffledDeck;
    this.handWinnerDeclared = true;
    this.isWar = false;

  }

  
  /**
   * This function evaluates the full set of (cards on the board), the cards that are currently (in play).
   * It assigns the winner of the current hand the point for this hand and gives winner the (prize card).
   * @param {Card} cardDealerObj Card object - assigned to the winner, moved to winner's discard pile and flagged as (out of play).
   * @param {Card} cardPlayerObj Card object - assigned to the winner, moved to winner's discard pile and flagged as (out of play).
   */ 
  determineWinner() {

    loadCardObjectsFromDOM()

    let elmntMvr = new elementMover();

    if (parseInt(cardDealerObj.faceValue) > parseInt(cardPlayerObj.faceValue)) {
      // dealer wins
      dealerScore += 1;
      elmntMvr.moveElement(cardDealerObj.suit, cardIds.CardTopRight);
      elmntMvr.moveElement(cardPlayerObj.suit, cardIds.CardTopRight);
      document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-resizeloc', cardIds.CardTopRight);
      document.getElementById(cardDealerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);
      document.getElementById(cardPlayerObj.suit).setAttribute('data-cardowner', OWNER_DEALER);
      gameDeck.find((cardIdx) => cardIdx.suit == cardPlayerObj.suit).cardOwner = OWNER_DEALER; // player card to dealer

    } else {
      // player wins
      playerScore += 1;
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
    // cardDealerObj.cardFlipped = false;
    // cardPlayerObj.cardFlipped = false;

    this.handWinnerDeclared = true;
    document.getElementById('UserTip').innerText = `Dealer: ${dealerScore} player: ${playerScore}`;
  }
  currentHandIsWar() {

    // return true;
    loadCardObjectsFromDOM();
    return (parseInt(cardDealerObj.faceValue) == parseInt(cardPlayerObj.faceValue));
  }

    flipWarCard(cardOwner, multiplier) {

      let moveFromRect;
      let moveToRect;
      let resizeLocation;
      let lOffset; 
      let dealerCardFromDeck = new Card(0, '', '');
      if (cardOwner == OWNER_DEALER) {
        moveFromRect = document.getElementById(cardIds.CardTopLeft).getBoundingClientRect();
        moveToRect = document.getElementById(cardIds.CardMidLeft).getBoundingClientRect();
        resizeLocation = cardIds.CardMidLeft;
        lOffset = leftOffset.DealerOffset(multiplier);
        dealerCardFromDeck = drawCardFromDeck(OWNER_DEALER);
      } else {
        moveFromRect = document.getElementById(cardIds.CardBottomRight).getBoundingClientRect();
        moveToRect = document.getElementById(cardIds.CardMidRight).getBoundingClientRect();
        resizeLocation = cardIds.CardMidRight;
        lOffset = leftOffset.PlayerOffset(multiplier);
        dealerCardFromDeck = drawCardFromDeck(OWNER_PLAYER);
      }

    const faceDown = document.createElement('IMG');
    const faceUp = document.createElement('IMG');


    faceDown.setAttribute('src', '1_UI\\PNG\\gray_back.png');
    faceDown.setAttribute('id', 'WAR_CARD_FACE_DOWN' + cardOwner + multiplier);
    faceDown.setAttribute('data-resizeloc', resizeLocation);
    faceDown.setAttribute('data-loc_offset', lOffset); // target these properties when removing these cards from DOM
    faceDown.setAttribute('data-inbattle', 'war');

    faceUp.setAttribute('src', dealerCardFromDeck.fileName);
    faceUp.setAttribute('id', dealerCardFromDeck.suit);
    faceUp.setAttribute('data-resizeloc', resizeLocation);
    faceUp.setAttribute('data-loc_offset', lOffset); // target these properties when removing these cards from DOM
    faceUp.setAttribute('data-cardowner', cardOwner);
    faceUp.setAttribute('data-inbattle', 'war');

    faceDown.style.position = 'absolute';
    faceDown.style.height = moveToRect.height + 'px';
    faceDown.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
    faceDown.style.left = moveFromRect.left + 'px'; 


    faceUp.style.position = 'absolute';
    faceUp.style.height = moveToRect.height + 'px';
    faceUp.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
    faceUp.style.left = moveFromRect.left + 'px'; 
    faceUp.style.visibility = 'hidden';


    document.body.appendChild(faceDown);
    document.body.appendChild(faceUp);

    faceDown.style.transition = 'all .5s'; 
    faceDown.offsetHeight; // Getting .offsetHeight-layout engine reevaluate
    faceDown.style.top = (moveToRect.top + window.scrollY) + 'px';
    faceDown.style.left = (moveToRect.left + lOffset) + 'px'; // this is (+) so the resize logic will work correctly

    faceUp.style.transition = 'all .5s'; 
    faceUp.offsetHeight; // Getting .offsetHeight-layout engine reevaluate
    faceUp.style.top = (moveToRect.top + window.scrollY) + 'px';
    faceUp.style.left = (moveToRect.left + lOffset) + 'px'; // this is (+) so the resize logic will work correctly
    
  }

}


function onClickRedirectElement(addCard){

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
    cardToAdd.addEventListener('click', turnPlayerCardWar);
    cardToAdd.onclick = function() {'Main.turnPlayerCardWar()'};
    // document.getElementById(cardDealerObj.suit).setAttribute('data-resizeloc', cardIds.CardBottomLeft);
    

  } else {
    // remove card
    document.body.removeChild(document.getElementById(PLAYER_CLICK_CARD_ID));
  }
}


/**
 * This method looks for a (full set) of cards that are face up on the game board.
 * In this context a (full set) of (in play cards) consists of 2 cards.
 * @param {Card} cardDealerObj Card object - dealer's card details.
 * @param {Card} cardPlayerObj Card object - player's card details.
 * @returns {boolean} returns true of a (full set) of (in play) cards are on the board.
 */ 
function loadCardObjectsFromDOM(loadWarCards) {

  let count = 0;
  const imgs = document.getElementsByTagName('img');

  for (let i = 0; i < imgs.length; i++) {
    if (loadWarCards == undefined) {
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
    } else {
      if (imgs[i].dataset.resolve_war_card == 'yes') {
      
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

  }
  return (count == 2); // returns true or false
}


function declareWar(loadWarCards){
  // let cardDealerObj = new Card(0, '', '');
  // let cardPlayerObj = new Card(0, '', '');
  loadCardObjectsFromDOM(loadWarCards);
  
  leftOffset.playerWarCardCount = 0;
  let warAnime = new warAnimation('WAR!', cardDealerObj.fileName, cardPlayerObj.fileName);
  warAnime.playWarAnimation();        
  warAnime = null;
}


function flipCard(cardOwner, fromID, toID, multiplier) {

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
  cardTurning.setAttribute('data-inbattle', 'yes'); // data-inbattle = ('yes' 2 card battle ), ('war' = war) ('no' not in battle or war)

  cardTurning.style.position = 'absolute';
  cardTurning.style.height = moveToRect.height + 'px';
  cardTurning.style.top = (moveFromRect.top - window.scrollY) + 'px'; // the css transition needs a start location
  cardTurning.style.left = moveFromRect.left + 'px';                  // the css transition needs a start location
  
  document.body.appendChild(cardTurning);

  cardTurning.style.transition = 'all .5s'; // A span of time (or something) needs to elapse after applying the transition property
  cardTurning.offsetHeight; // Getting .offsetHeight forces the layout engine to stop, evaluate and calculate all properties that are set, and return a value.  We're not saving a return value but instead are calling .offsetHeight to force this transition to work.

  cardTurning.style.top = (moveToRect.top + window.scrollY) + 'px';
  if (multiplier == undefined) {
    cardTurning.style.left = moveToRect.left + 'px';
  } else {
    // if we have a multiplier we know this is a (war card)
    // war-flow only comes here when the 4th or last, faceup card is being turned
    cardTurning.setAttribute('data-resolve_war_card', 'yes');
    if (cardOwner == OWNER_DEALER) {
      cardTurning.style.left = (moveToRect.left + leftOffset.DealerOffset(multiplier)) + 'px';
      cardTurning.setAttribute('data-loc_offset', leftOffset.DealerOffset(multiplier)); 
    } else {
      cardTurning.style.left = (moveToRect.left + leftOffset.PlayerOffset(multiplier)) + 'px';
      cardTurning.setAttribute('data-loc_offset', leftOffset.PlayerOffset(multiplier));
    }
    leftOffset.TotalCardCount += 1;
    if (leftOffset.TotalCardCount == 2) {
      leftOffset.TotalCardCount = 0;
      setTimeout(evalWar, 1000);
    }
  }
}


function flipDealerCard(offsetFactor) {
  // try{
    flipCard(OWNER_DEALER, cardIds.CardTopLeft, cardIds.CardMidLeft, offsetFactor);
  // }
  // catch(err) {
  //   alert(`Error occurred in GamePlay.flipDealerCard '\r\n' ${err.message}`);
  // }

}

function flipPlayerCard(offsetFactor) {
  try{
    flipCard(OWNER_PLAYER, cardIds.CardBottomRight, cardIds.CardMidRight, offsetFactor);
  }
  catch(err) {
    alert(`Error occurred in GamePlay.flipDealerCard '\r\n' ${err.message}`);
  }
}

function evalWar() {


  let moveToRect;
  let resizeLoc;
  let victor = warWinner();
  switch (victor) {

    case 'WAR':
      declareWar(true);
      setTimeout(turnDealerCardsWar, 2500); 
      leftOffset.playerWarCardEnabled = true;
      onClickRedirectElement(false);
      return;

    case OWNER_DEALER:
      moveToRect = document.getElementById(cardIds.CardTopRight).getBoundingClientRect();
      resizeLoc = cardIds.CardTopRight;
      break;
    case OWNER_PLAYER:
      moveToRect = document.getElementById(cardIds.CardBottomLeft).getBoundingClientRect();
      resizeLoc = cardIds.CardBottomLeft;
      break;
  }
  const warElmnts = document.getElementsByTagName('IMG');
  
  for (let i = 0; i < warElmnts.length; i += 1) {
    
    if (warElmnts[i].dataset.inbattle == 'yes' || warElmnts[i].dataset.inbattle == 'war') {
      
      anime({ 
        targets:  warElmnts[i],
        rotateY: '1turn',
        duration: 500,
      });
      warElmnts[i].setAttribute('data-resizeloc', resizeLoc);
      warElmnts[i].setAttribute('data-loc_offset', 'undefined');
      warElmnts[i].setAttribute('data-inbattle', 'no');
      warElmnts[i].style.visibility = 'visible';
      warElmnts[i].style.top = moveToRect.top + 'px';
      warElmnts[i].style.left = moveToRect.left + 'px';
      if (warElmnts[i].id.indexOf('WAR_CARD_FACE_DOWN') == -1) {
        if (victor == OWNER_DEALER) {
          dealerScore += 1;
        } else {
          playerScore += 1;
        }
      }
    }
  }
  setTimeout(removeWarFaceDown, (3000));
  document.getElementById('UserTip').innerText = `Dealer: ${dealerScore} player: ${playerScore}`;
}

function removeWarFaceDown(){
  const warElmnts = document.getElementsByTagName('IMG');
  for (let i = 0; i < warElmnts.length; i += 1) {
    if (warElmnts[i].id.indexOf('WAR_CARD_FACE_DOWN') > -1) {
      document.body.removeChild(warElmnts[i]);
    }
  }
}

function warWinner() {

  const imgs = document.getElementsByTagName('img');

  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].dataset.resolve_war_card == 'yes') {
      
      switch (imgs[i].dataset.cardowner) {
        case undefined:
          break;
        case OWNER_DEALER:
          cardDealerObj.cardOwner = imgs[i].dataset.cardowner;
          cardDealerObj.suit = imgs[i].id;
          cardDealerObj.faceValue = imgs[i].dataset.facevalue;
          cardDealerObj.fileName = imgs[i].dataset.filename;
          break;
        case OWNER_PLAYER:
          cardPlayerObj.cardOwner = imgs[i].dataset.cardowner;
          cardPlayerObj.suit = imgs[i].id;
          cardPlayerObj.faceValue = imgs[i].dataset.facevalue;
          cardPlayerObj.fileName = imgs[i].dataset.filename;
          break;
      }
    }
  }
  // return winner
  if (cardDealerObj.faceValue == cardPlayerObj.faceValue) {
    return 'WAR';
  } 

  if (parseInt(cardDealerObj.faceValue) > parseInt(cardPlayerObj.faceValue)) {

    document.getElementById(cardDealerObj.suit).style.zIndex = 50000;
    return OWNER_DEALER;
  } else {
    document.getElementById(cardPlayerObj.suit).style.zIndex = 50000;
    return OWNER_PLAYER;
  }


}

// function setZ_OrderWarWinCard(owner) {

//   data-cardowner="Dealer"
//   data-resolve_war_card="yes"

// }

function drawCardFromDeck (cardOwner) {
  const retCard = gameDeck.find((cardIdx) => cardIdx.cardOwner == cardOwner && cardIdx.cardFlipped == false);
  retCard.cardFlipped = true; // sets gameDeck[x].cardFlipped = true
  return retCard;
}