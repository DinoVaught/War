
class shuffleAnimation {
    constructor(animeWho) {
        this.animeWho = animeWho;
        if (this.animeWho == OWNER_DEALER) {
            this.animeFrom = cardIds.CardTopRight;
            this.animeTo = cardIds.CardTopLeft;
        } else { // OWNER_PLAYER
            this.animeFrom = cardIds.CardBottomLeft;
            this.animeTo = cardIds.CardBottomRight;
        }
        this.totalDelay = 0;
        this.fromRect = 0;
        this.toRect = 0;
        // moveFromRect = document.getElementById(cardIds.CardTopLeft).getBoundingClientRect();
    }

    playShuffleAnime(){

        this.fromRect = document.getElementById(this.animeFrom).getBoundingClientRect();
        this.toRect = document.getElementById(this.animeTo).getBoundingClientRect();
        let transX = this.toRect.left - this.fromRect.left;

        const elmnts = document.getElementsByTagName('img');
        let delay = 80;
        let delayMultiplier = 1;

        for (let i = 0; i < elmnts.length; i++) {
            if (elmnts[i].dataset.resizeloc == this.animeFrom) {
                
                this.totalDelay = (delay * delayMultiplier);
                this.playAnimation(elmnts[i], (delay * delayMultiplier), transX);
                delayMultiplier += 1;
            }
        }
        this.totalDelay = this.totalDelay + (delayMultiplier + 100);
    }

    playAnimation(targetEl, delayVal, transX){

        anime({

            targets: targetEl,
            
            rotateX: '1turn',
            translateX: transX,
            duration: 100,
            delay: delayVal,
         
        });
    }



}