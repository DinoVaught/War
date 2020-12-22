
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
    gameObj.flipDealerCard();

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

function turnDealerCard(){
  gameObj.flipDealerCard();
  playerCardEnabled = true;
}

function turnPlayerCard() {
  
  if (playerCardEnabled == false) {return;}  // Player's must wait until dealer's turn is over
  if (gameObj.handWinnerDeclared == false) {return;}


  playerCardEnabled = false;
  gameObj.flipPlayerCard();

  // card transitions (in flipPlayerCard) are set to .5 seconds  cardFlipping.style.transition = 'all .5s';
  setTimeout(setBoardForNextHand, animeDelay); // this gives the animation (in flipPlayerCard) time to complete
}
 
function setBoardForNextHand(){

  if (gameObj.currentHandIsWar() == true) {
    gameObj.declareWar();
    
    // setTimeout - for declareWar anime then . . .
    // Play the flipping of WAR Cards from dealer 
    setTimeout(flipDealerCardWar, 2500); // this gives the animation (in allocateWinnerPoints) time to complete
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

// function flipWarDealerCards(){
//   gameObj.flipDealerCard();
//   playerCardEnabled = true;
// }

function flipDealerCardWar(){
  const delay = 750;
  gameObj.flipDealerWarCards(1);
  setTimeout(gameObj.flipDealerWarCards, (delay), 2);
  setTimeout(gameObj.flipDealerWarCards, (delay * 2), 3); 
  setTimeout(gameObj.onClickRedirectElement, (delay * 2.1), true);
  // gameObj.flipDealerWarCards(v);
  playerCardEnabled = false;
}


function CalCal() {
  alert('hello');
}

function wasteTime(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// window.addEventListener('transitionend', transitionEndCount);
window.addEventListener('resize', browserResized);
window.addEventListener('load', pageLoad);
