
const divBoxId = 'war-divBoxId';

class warAnimation {
    constructor(message, fileName1, fileName2) {
        this.message = message;
        this.fileName1 = fileName1;
        this.fileName2 = fileName2;
    };

    playWarAnimation(){

        let divContainer = this.createElements();
        this.playAnimation();
        setTimeout(this.cleanup, 2000, divContainer);
    }

    createElements(){

        const animeLoc = document.getElementById(cardIds.CardMidLeft).getBoundingClientRect();
        let divContainer = document.createElement('div');
        let divUserMsg = document.createElement('div');
        let imgBox1 = document.createElement('img');
        let imgBox2 = document.createElement('img');
    
        imgBox1.setAttribute('src', this.fileName1);
        imgBox2.setAttribute('src', this.fileName2);

        divContainer.setAttribute('id', divBoxId);
    
        divUserMsg.innerText = this.message;
        
        divContainer.className = 'warDivBox';
        divUserMsg.className = 'warTextCentered';    
        imgBox1.classList.add('warImgLeft');
        imgBox2.classList.add('warImgRight');

        divContainer.style.left = (animeLoc.left - 4) + 'px';
    
        document.body.appendChild(divContainer);
        divContainer.appendChild(imgBox1);
        divContainer.appendChild(imgBox2);
        divContainer.appendChild(divUserMsg);

        return divContainer;
    }

    playAnimation(){

        anime({
            targets: document.getElementById(divBoxId),
            
            scale: [
                {value: 2.0, duration: 1000}
            ],
        });
    }

    cleanup(divContainer){

        document.body.removeChild(divContainer);
        divContainer = null;
    }
};
