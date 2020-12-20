class warfare {

    initializeWar(dealerPath, playerPath){

        let warAnime = new warAnimation('WAR!', dealerPath, playerPath);
        warAnime.playWarAnimation();        
        warAnime = null;

    }
}