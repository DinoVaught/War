
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

  for (i = 0; i < shuffledCards.length; i += 1) {
    if (document.getElementById(shuffledCards[i].suit) != null) {
      const targetElement = document.getElementById(shuffledCards[i].suit);
      switch (targetElement.dataset.resizeloc) {
        case cardIds.CardMidLeft:
          resize.moveElement(shuffledCards[i].suit, cardIds.CardMidLeft);
          break;

        case cardIds.CardMidRight:
          resize.moveElement(shuffledCards[i].suit, cardIds.CardMidRight);
          break;

        case cardIds.CardTopRight:
          resize.moveElement(shuffledCards[i].suit, cardIds.CardTopRight);
          break;

        case cardIds.CardBottomLeft:
          resize.moveElement(shuffledCards[i].suit, cardIds.CardBottomLeft);
          break;          

        default:
          break;
      }
    }
  }
}

function flipPlayerCard() {
  
  if (playerCardEnabled == false) {return;}  // Player's must wait until dealer's turn is over
  playerCardEnabled = false;  
  if (gameObj.handWinnerDeclared == false) {return;}

  gameObj.handWinnerDeclared = false;
  gameObj.flipPlayerCard();

  // card transitions (in flipPlayerCard) are set to .5 seconds  cardFlipping.style.transition = 'all .5s';
  setTimeout(setBoardForNextHand, animeDelay); // this gives the animation (in flipPlayerCard) time to complete
}
 
function setBoardForNextHand(){

  if (gameObj.currentHandIsWar() == true) {
    gameObj.declareWar();
    gameObj.warPlayerOnClickCard(true);
    // setTimeout - for declareWar anime then . . .
    // Play the flipping of WAR Cards from dealer 

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
  setTimeout(flipDealerCard, animeDelay); // this gives the animation (in allocateWinnerPoints) time to complete
}

function flipDealerCard(){
    gameObj.flipDealerCard();
    playerCardEnabled = true;
}

function flipWarDealerCards(){
  gameObj.flipDealerCard();
  playerCardEnabled = true;
}

function flipDealerCardWar(){
  gameObj.flipDealerCard(5);
  playerCardEnabled = true;
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
