
let cardsOOB = [];
let shuffledCards = [];
cardsOOB = cardsOutOfBox();
shuffledCards = shuffleCards(cardsOOB);
cardsOOB.length = 0;
let gameObj; //  = new GamePlay(shuffledCards);
let flipNextDealerCard = false;
const timerDelay = 1200;
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

  if (playerCardEnabled == false) {return;}
  playerCardEnabled = false
  if (gameObj.handWinnerDeclared == false) {return;}
  // 1 - 2 = player card  transed to pot
  // 3 - 6 = pot cards    transed to winner
  // 7 - 8 = dealer card  transed to pot
  gameObj.handWinnerDeclared = false;
  gameObj.flipPlayerCard();

  setTimeout(flipPlayerCardDelayed, timerDelay); // this gives the animation (in flipPlayerCard) time to complete

}

    /**
    * This function / timer is invoked by setInterval.
    * It determines the current status of (game play). 
    * . . . It checks to see if 'two cards' or a 'full set' of ('in play' or 'face up') cards exist on the board.
    * if a 'full set' of cards exists, that 'set' of cards is processed or evaluated and the winner is awarded the point.
    */ 
function flipPlayerCardDelayed(){

  console.log('flipPlayerCardDelayed');

  if (gameObj.currentHandIsWar() == true) {
    gameObj.declareWar();
    return;
  }
  
  gameObj.allocateWinnerPoints();

  document.getElementById('UserTip').innerText = `Dealer: ${gameObj.dealerScore} player: ${gameObj.playerScore}`;
  flipNextDealerCard = true;
  setTimeout(flipDealerCard, timerDelay); // this gives the animation (in allocateWinnerPoints) time to complete
  


}

function flipDealerCard(){
  
  console.log('flipDealerCard');

  if (flipNextDealerCard == true) {

    flipNextDealerCard = false;
    gameObj.flipDealerCard();
    playerCardEnabled = true;
  }
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
