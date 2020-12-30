
let cardsOOB = [];
let shuffledCards = [];
cardsOOB = cardsOutOfBox();
shuffledCards = shuffleCards(cardsOOB);
cardsOOB.length = 0;
let gameObj; //  = new GamePlay(shuffledCards);
const animeDelay = 1200;
let playerCardEnabled = true;

function pageLoad() {

  
  document.getElementsByTagName('img')[0].id = cardIds.CardTopLeft;
  document.getElementsByTagName('img')[1].id = cardIds.CardTopRight;
  document.getElementsByTagName('img')[2].id = cardIds.CardMidLeft;
  document.getElementsByTagName('img')[3].id = cardIds.CardMidRight;
  document.getElementsByTagName('img')[4].id = cardIds.CardBottomLeft;
  document.getElementsByTagName('img')[5].id = cardIds.CardBottomRight;

  document.getElementById(cardIds.CardTopLeft).style.visibility = 'hidden';
  document.getElementById(cardIds.CardTopRight).style.visibility = 'hidden';
  document.getElementById(cardIds.CardMidRight).style.visibility = 'hidden';
  document.getElementById(cardIds.CardBottomLeft).style.visibility = 'hidden';
  document.getElementById(cardIds.CardBottomRight).style.visibility = 'hidden';
}

function dealCards() {
  document.getElementById('dealBtn').style.visibility = 'hidden';
  document.getElementById(cardIds.CardMidLeft).style.visibility = 'hidden';
  //  play (dealing animation) here
  document.getElementById(cardIds.CardTopLeft).style.visibility = 'visible';
  document.getElementById(cardIds.CardBottomRight).style.visibility = 'visible';

  gameObj = new GamePlay(shuffledCards);
  flipDealerCard();

  document.getElementById('UserTip').innerText = 'Click your top card to play';

}
function browserResized() {
  const resize = new elementMover;
  const targetElmnts = document.getElementsByTagName('img');

  for (let i = 0; i < targetElmnts.length; i += 1) {
    if (targetElmnts[i].dataset.resizeloc != undefined) {
      resize.moveElement(targetElmnts[i].id, targetElmnts[i].dataset.resizeloc);
    }
  }
}
function turnDealerCardCallBack() {
  turnDealerCard(true);
}
function turnDealerCard(skipValidation){

  if (skipValidation != true) {
    if (playerHasCards(OWNER_DEALER) == false) {
      //  OWNER_DEALER is out of cards, OWNER_DEALER loses, game over 
      console.log(`${OWNER_PLAYER} wins , game over`);
    }
    if (cardsNeedShuffle(OWNER_DEALER) == true) {
      const shuffleObj = new shuffleAnimation(OWNER_DEALER);
      shuffleObj.playShuffleAnime();    
  
      setTimeout(ShufflePartOfDeck, (shuffleObj.totalDelay + 400), gameDeck, OWNER_DEALER);
      setTimeout(turnDealerCardCallBack, (shuffleObj.totalDelay + 700));
      return;
    }
  } 
  flipDealerCard();
  playerCardEnabled = true;

}

function turnPlayerCardCallBack() {
  turnPlayerCard(true);
}
function turnPlayerCard(skipValidation) {
  
  if (skipValidation != true) {
    if (playerHasCards(OWNER_PLAYER) == false) {
      //  OWNER_PLAYER is out of cards, OWNER_PLAYER loses, game over 
      console.log(`${OWNER_DEALER} wins , game over`);
    }
    if (cardsNeedShuffle(OWNER_PLAYER) == true) {
      const shuffleObj = new shuffleAnimation(OWNER_PLAYER);
      shuffleObj.playShuffleAnime();    
  
      setTimeout(ShufflePartOfDeck, (shuffleObj.totalDelay + 400), gameDeck, OWNER_PLAYER);
      setTimeout(turnPlayerCardCallBack, (shuffleObj.totalDelay + 700));
      return;
    }
  } 


  if (playerCardEnabled == false) {return;}  // Player's must wait until dealer's turn is over
  if (gameObj.handWinnerDeclared == false) {return;}


  playerCardEnabled = false;
  flipPlayerCard();

  // card transitions (in flipPlayerCard) are set to .5 seconds  cardFlipping.style.transition = 'all .5s';
  setTimeout(setBoardForNextHand, animeDelay); // this gives the animation (in flipPlayerCard) time to complete
}
 
function setBoardForNextHand(){

  if (gameObj.currentHandIsWar() == true) {
    declareWar();
    // setTimeout - for declareWar anime then . . .
    // Play the flipping of WAR Cards from dealer 
    setTimeout(turnDealerCardsWar, 2500); // this gives the animation (in allocateWinnerPoints) time to complete

    // 1) Set game environment for war.
    //       * Place another card (face down exclusively used for war)
    //         on top of bottom right card.
    //            - remove this card from DOM after the war is over . . .
    // 
    // 
    // Flow will shift to the onClicks of this new (face down card)
    

    return;
  }
  
  gameObj.determineWinner();

  // card transitions (in determineWinner) are set to .5 seconds
  setTimeout(turnDealerCard, animeDelay); // this gives the animation (in allocateWinnerPoints) time to complete
}

function turnDealerCardsWar(){
  const delay = 750;
 
  gameObj.flipWarCard(OWNER_DEALER, 1); // **
  setTimeout(gameObj.flipWarCard, delay, OWNER_DEALER, 2); // **
  setTimeout(gameObj.flipWarCard, (delay * 2), OWNER_DEALER, 3); // **
  setTimeout(onClickRedirectElement, (delay * 2.1), true);
  setTimeout(flipDealerCard, (delay * 3), 4);
  playerCardEnabled = false;
}


function turnPlayerCardWar() {

  if (leftOffset.playerWarCardEnabled == false) {return;}
   

  if (leftOffset.playerWarCardCount < 3) {
    gameObj.flipWarCard(OWNER_PLAYER, leftOffset.PlayerCardCount());
  } else {
    leftOffset.playerWarCardEnabled = false;
    flipPlayerCard(leftOffset.PlayerCardCount());
  }
}


function wasteTime(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function debug(){

  for (i = 0; i < shuffledCards.length; i += 1) {
    if (shuffledCards[i].cardOwner == OWNER_DEALER) {
      if (i > 3 ) {
        shuffledCards[i].played = true;
        // shuffledCards[i].played = true;
      }
    }
  }
  
}

// window.addEventListener('transitionend', transitionEndCount);
window.addEventListener('resize', browserResized);
window.addEventListener('load', pageLoad);
