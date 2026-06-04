let game = document.querySelector("#GameCanvas");
let contesto = game.getContext("2d");
let canvasWidth = game.width;
let canvasHeight = game.height;
let invaderRows = 5;
let invaderCols = 11;
let invaderPaddingH = 30;
let invaderPaddingV = 15;
let leftArrow = false;
let rightArrow = false;
let invaders = [];
let invaderScale = 0.5;
let playerScale = 0.3;
let lives = 3;
let livesScale = 0.45;
let gridPositionX;
let gridPositionY;
let movedir = 1;
let moveprec = 0;
let invaderwidth;
let invaderheight;
let gridWidth;
let gridHeight;
let spacekey = false;
let proiettili = [];
let proiettiliInvader = [];
let walls = [];
let waitproiettile = false;
let iterazioniGriglia = 0;
let timerProiettiliInvader;
let lost = false;
let iterazioniMuro = 0;
let scalaMuro = 4;
let numwalls=4;
let wallWidth = 30;
let wallHeight = 10;
let level = 0;
let shootSound = new Audio ("../media/shoot.wav");
let invaderKilled = new Audio ("../media/invaderkilled.wav");
let playerExplosion = new Audio ("../media/explosion.wav");
let gameOver = new Audio ("../media/GameOver.mp3");
let levelClear = new Audio ("../media/LevelClear.mp3");
let invsound1 = new Audio ("../media/fastinvader1.wav");
let invsound2 = new Audio ("../media/fastinvader2.wav");
let invsound3 = new Audio ("../media/fastinvader3.wav");
let invsound4 = new Audio ("../media/fastinvader4.wav");
let seqsound = 0;
let actualscore = 0;
let invaderSpeed = 50;
let numkills = 0;
let logged = false;
let userID = null;
let startTS;
let duration = 0;
let durationTimer;
let animationFrame=null;
const invaderimg = new Image(); 
invaderimg.src='../images/rsz_alien1.png';
const invaderimg2 = new Image();
invaderimg2.src='../images/rsz_alien2.png';
const invaderimg3 = new Image();
invaderimg3.src='../images/rsz_alien3.png';
const playerimg = new Image();
playerimg.src='../images/rsz_player.png';
let invadermovetimer;
let playerload = false;
let inv1load = false;
let inv2load = false;
let inv3load = false;
playerimg.onload = ()=>{
    playerload=true;
    checkload();
}
invaderimg.onload = ()=>{
    inv1load=true;
    checkload();
}
invaderimg2.onload = ()=>{
    inv2load=true;
    checkload();
}
invaderimg3.onload = ()=>{
    inv3load=true;
    checkload();
}

function checkload(){
    if(inv1load && inv2load && inv3load && playerload){
        createGame();
        //Faccio partire il gioco una volta che le immagini dei giocatori sono caricate
    }
}



class Player{
    constructor(posx, posy, speed, scale){
        this.posx=posx;
        this.posy=posy;
        this.speed=speed;
        this.playerimg=playerimg;
        this.width=playerimg.width*scale;
        this.height=playerimg.height*scale;
        this.scale = scale;
    }
        
    
    

    costruisciGiocatore(){
        if(this.playerimg){
            contesto.drawImage(this.playerimg, this.posx - this.width*this.scale/2, this.posy -this.height*this.scale,this.width, this.height);
            //Costruisco il giocatore nella posizione specificata
        }
    }
    
}

class Invader{
    constructor(posx, posy, width, height, alive, speed,invimg){
        this.posx=posx;
        this.posy=posy;
        this.width=width;
        this.height=height;
        this.alive=alive;
        this.speed = speed;
        this.invaderimg=invimg;
        this.score = (invimg==invaderimg)?30*(level+1):(invimg==invaderimg2)?20*(level+1):10*(level+1);
        //Assegno ad ogni alieno il punteggio che il giocatore ottiene dalla sua uccisione

        
    }

    costruisciInvader(){
        if(this.invaderimg){
            contesto.drawImage(this.invaderimg, this.posx, this.posy,this.width, this.height);
            //Disegno l'immagine dell'alieno
        }
    }
}

class Projectile{
    constructor(posx, posy,speed, active){
        this.width = 4; 
        this.height = 30;
        this.posx = posx-this.width/2;
        this.posy = posy;
        this.speed = speed;
        this.active=active;
    }

    costruisciProiettile(){

        if(this.active){
            //Se il proiettile è attivo allora lo disegno come un rettangolo bianco
            contesto.fillRect(this.posx, this.posy-this.height, this.width, this.height);
            
        
            contesto.fillStyle = "white";
            
            
            
        }
        
        
    }

}

class Wall{
    constructor(posx, posy, width,height, shots){
        this.posx = posx;
        this.posy = posy;
        this.width=width;
        this.height=height;
        this.shots = shots;
    }

    costruisciMuro(){
        contesto.fillRect(this.posx+(5*this.shots),this.posy, this.width, this.height);
        //Costruisco il muro in modo che possa essere rimpicciolito quando è colpito dal giocatore oppure dagli alieni
        contesto.fillStyle="white";
    }
    aggiornaWidth(){
        this.width=wallWidth*scalaMuro-10*this.shots*scalaMuro;
        //Rimpicciolisco di 10 unità per volta moltiplicato per la scala del muro la dimensione del muro quando viene colpito
    }
}

//Dichiaro la variabile giocatore
let giocatore;

function updateGame(){
    animationFrame=requestAnimationFrame(updateGame);
    updateplayer();
    generaMuro();
    generaProiettile();
    generaProiettileInvader();
    costruisciGriglia();
    checkSovrapposizione();
    //Funzione che gestisce l'aggiornamento della dinamica del gioco. requestAnimationFrame permette la ripetizione delle funzioni specificate ad 
    //ogni frame.
}


function createTS(){
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    startTS = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    //Funzione che mi permette di creare la stringa rappresentante il timestamp della partita. Uso padStart per far sì che tutti i campi
    //Abbiano la lunghezza giusta riempiendoli di 0 nel caso in cui siano più corti.
}

function aggiornaDurata(){
    durationTimer = setInterval(()=>{
        duration++;
        let durDiv = document.querySelector("#DurDiv");
        durDiv.textContent="Duration: "+duration+"s";
    },1000)
    //Aggiorno il div contenente la durata della partita in alto
}

function createGame(){
    giocatore = new Player(canvasWidth/2,canvasHeight-2*playerimg.height*livesScale,10,1);
    //Creo il giocatore posizionandolo a metà del canvas in larghezza e gli assegno una posizione verticale tale da poter
    //visualizzare le vite
    createTS();
    //Creo il TimeStamp di inizio della partita
    aggiornaDurata();
    //Faccio partire il cronometro della parita in alto
    invaderwidth = invaderimg.width*invaderScale;
    invaderheight = invaderimg.height*invaderScale;
    gridWidth = invaderCols * (invaderwidth + invaderPaddingH) -invaderPaddingH;
    gridHeight = invaderRows * (invaderheight + invaderPaddingV) -invaderPaddingV;
    let centerH = (canvasWidth-gridWidth)/2;
    gridPositionX = centerH; 
    gridPositionY = 0;
    //Creo la griglia e la posiziono al centro dello schermo
    invadermovetimer=setInterval(()=>{
        updateGriglia();
    },(500-40*level));
    //Aggiorno periodicamente la posizione della griglia. Il periodo di aggiornamento varia in base al livello
    //ed in particolare aumenta di velocità con l'aumentare del livello
    updateGame();
    //Faccio parire la funzione che si occupa di gestire l'AnimationFrame per aggiornare il gioco
}




function costruisciGriglia (){ 
    let invaderwidth = invaderimg.width*invaderScale;
    let invaderheight = invaderimg.height*invaderScale;
    if(iterazioniGriglia==0){
        //Se è la prima iterazione vado a porre gli invader appena creati in un array che li raccoglie
        for (let i=0; i<invaderRows; i++){
            for(let j=0; j<invaderCols; j++){
                let invaderX = gridPositionX + j * (invaderwidth+ invaderPaddingH);
                let invaderY = gridPositionY + i * (invaderheight + invaderPaddingV);
                let invader = new Invader(invaderX, invaderY, invaderwidth, invaderheight, true,0.1, (i==0)?invaderimg:(i==1||i==2)?invaderimg2:invaderimg3);
                //Creo i nuovi invader essendo la prima iterazione ed assegno l'immagine giusta ad ogni riga 
                invader.costruisciInvader();
                invaders.push(invader);
            }
        }
        iterazioniGriglia++;
        
    }
    
    else{
        for(let i=0; i<invaderRows; i++){
            for(let j=0; j<invaderCols; j++){
                if(invaders[i*invaderCols+j].alive==true){
                    invaders[i*invaderCols+j].posx = gridPositionX + j * (invaderwidth+ invaderPaddingH);
                    invaders[i*invaderCols+j].posy = gridPositionY + i * (invaderheight + invaderPaddingV);
                    invaders[i*invaderCols+j].costruisciInvader();
                    //Per le iterazioni successive mi occupo solo di costruire gli invader nella posizione giusta separandoli da
                    //un padding verticale ed orizzontale specificato
                }
                
            }
        }
    }    
}



function costruisciVite(){
    for(let i=0; i<lives; i++){
        let life = new Player(playerimg.width*livesScale/2 + i*(playerimg.width*livesScale+40),canvasHeight-playerimg.height*livesScale/2,0,livesScale);
        life.costruisciGiocatore();
        //Costruisco le 3 vite presenti in fondo allo schermo. Per semplicità, dato che sto utilizzando la stessa immagine del player utilizzo il costruttore della stessa
        //classe
    }
}



function updateplayer(){
    if(lost==true){
        return;
    }
    contesto.clearRect(0, 0, game.width, game.height);
    //Mi permette, ad ogni frame, di fare un clear dell'intero canvas in modo da poter ricostruire ogni volta il gioco aggiornato
    giocatore.costruisciGiocatore();
    costruisciVite();
    updatePosition();
}



function updateGriglia(){
    if(lost==true){
        return;
        //Mi fermo nel caso in cui il gioco sia finito.
    }
    
    let speed = invaderSpeed;
    gridPositionX += speed*movedir;
    //Aggiorno la posizione della griglia
    costruisciGriglia();
    //Costruisco la griglia con la posizione aggiornata
    switch (seqsound){
        case 0:{
            invsound1.play();
            break;
        }
        case 1:{
            invsound2.play();
            break;
        }
        case 2:{
            invsound3.play();
            break;
        }
        case 3:{
            invsound4.play();
            break;
        }
    }
    seqsound=((seqsound+1)%4);
    //Riproduco un suono diverso per ogni spostamento degli invader come nel gioco originale.
    let maxdx=0;
    let minsx=0;
    let minpos=0;
    let maxpos=0;
    for(let i=0; i<invaderRows; i++){
        for(let j=0; j<invaderCols; j++){
            if(invaders[i*invaderCols+j].alive){
                if(j>maxdx){
                    maxdx=j;
                    maxpos = invaders[i*invaderCols+j].posx+invaders[i*invaderCols+j].width;
                }
            }
        }
    }
    //Determino l'invader che occupa la posizione più a destra. Questo mi serve per far muovere dinamicamente la griglia.
    //In particolare, se una colonna di invader a destra viene uccisa mi permette di far spostare la griglia a destra e farle toccare il contorno
    //Dello schermo di gioco in ogni condizione
    let found = false;
    for(let j=0; j<invaderCols; j++){
        for(let i=0; i<invaderRows; i++){
            if(invaders[i*invaderCols+j].alive){
                found=true;
                minsx=j;
                minpos= invaders[i*invaderCols+j].posx;
                break;
            }
        }
        if(found){
            break;
        }
    }
    //Faccio la stessa cosa per la parte sinistra della griglia in modo da permettere ogni volta lo spostamento della griglia completamente anche a sinistra
    if (maxpos+2*movedir*invaderSpeed>= canvasWidth){
        movedir=-1;
        gridPositionY+=40;
    }
    else if (minpos+2*movedir*invaderSpeed <= 0){
        movedir=1;
        gridPositionY+=40;
    }
    //Gestisco lo spostamento della griglia in verticale. In particolare faccio spostare la griglia in verticale di 40 pixel quando gli alieni toccano la parte sinistra o destra dello 
    //schermo. Ovviemente viene tenuto di conto dell'uccisione di una o più colonne complete a sinistra o destra tramite le funzioni viste in precedenza.
}

function checkSovrapposizione(){
    if(lost==true){
        return;
    }
    //Gestisco la sovrapposizione della griglia degli invader con i muri. In particolare, ho pensato di eliminare completamente un muro
    //nel momento in cui questo viene toccato da un invader. La funzione gestisce i casi della sovrapposizione nei casi in cui la griglia 
    //si sposti verso destra o sinistra come indicato
    for(let i=0; i<invaderRows; i++){
        for(let j=0; j<invaderCols; j++){
            if(invaders[i*invaderCols+j].alive){
                for(let q=0; q<walls.length; q++){
                    if((invaders[i*invaderCols+j].posx+invaders[i*invaderCols+j].width >= walls[q].posx) && invaders[i*invaderCols+j].posx <= (walls[q].posx+walls[q].width) && (invaders[i*invaderCols+j].posy+invaders[i*invaderCols+j].height)>=(walls[q].posy)){
                        walls[q].shots=3;
                        walls[q].aggiornaWidth();
                        //Condizione verificata quando la griglia si sta spostando verso destra
                    }
                    else if((invaders[i*invaderCols+j].posx <= walls[q].posx+walls[q].width) && (invaders[i*invaderCols+j].posx+invaders[i*invaderCols+j].width >= walls[q].posx) && (invaders[i*invaderCols+j].posy+invaders[i*invaderCols+j].height)>=(walls[q].posy)){
                        walls[q].shots=3;
                        walls[q].aggiornaWidth();
                        //Condizione verificata quando la griglia si sta spostando verso sinistra
                    }
                }
                if(invaders[i*invaderCols+j].posy+invaders[i*invaderCols+j].height>=giocatore.posy){
                    lost=true;
                        setTimeout(()=>{
                            lossMessage();
                        },500)
                    //Il gioco termina nel caso in cui un invader vada sotto al giocatore. In questo caso il giocatore non perde solo una vita ma le perde tutte.
                }
                if((invaders[i*invaderCols+j].posx >= giocatore.posx-giocatore.width/2) && invaders[i*invaderCols+j].posx <= (giocatore.posx+giocatore.width/2) && (invaders[i*invaderCols+j].posy+invaders[i*invaderCols+j].height)>=(giocatore.posy-giocatore.height/2)){
                    lost=true;
                        setTimeout(()=>{
                            lossMessage();
                        },500)
                    //Condizione verificata quando l'invader tocca il sotto del giocatore. In particolare il giocatore perde se viene toccato direttamente da un invader
                }      
                else if((invaders[i*invaderCols+j].posx >= giocatore.posx-giocatore.width/10) && invaders[i*invaderCols+j].posx <= (giocatore.posx+giocatore.width/10) && (invaders[i*invaderCols+j].posy+invaders[i*invaderCols+j].height)>=(giocatore.posy-giocatore.height)){
                    lost=true;
                        setTimeout(()=>{
                            lossMessage();
                        },500)
                    //Condizione verificata quando l'invader tocca la parte superiore del giocatore. Ho voluto raffinare la condizione di sopra in quanto l'immagine del giocatore ha una forma strana e 
                    //a volte la condizione sopra non era precisissima.
                }   
            }  
        }
    }
}




function generaProiettile(){ 
    if(lost==true){
        return;
    }
    if(spacekey==true && waitproiettile==false){
        waitproiettile=true;
        //Ho impostato un timeout di attesa per lo sparo dei proiettili in modo da permettere anche la pressione prolungata della barra
        //spaziatrice
        setTimeout(()=>{
                waitproiettile=false;
        },300)
        let newProiettile = new Projectile(giocatore.posx, (giocatore.posy-giocatore.height), -20,true);
        //Genero un proiettile con velocità assegnata e lo inserisco in un vettore di proiettili per semplificarne la gestione.
        //Una volta che il proiettile viene generato alla pressione dello spazio viene anche riprodotto un suono.
        proiettili.push(newProiettile);
        shootSound.play();
    }
    proiettili.forEach(proiettile=>{
        proiettile.costruisciProiettile();
        //Costruisco il proiettile usando il costruttore della classe
    })
    aggiornaProiettile();
    //Aggiorno la posizione del proiettile nello schermo
}

function sovrapposizioneProiettili(){
    //Ho implementato il caso in cui un proiettile di un invader ed un proiettile del giocatore si sovrappongono. In questo caso
    //in particolare i due proiettili vengono cancellati dallo schermo.
    for(let i=0; i<proiettili.length; i++){
        if(proiettili[i].active==true){
            for(let q=0; q<proiettiliInvader.length; q++){
                if(proiettiliInvader[q].active==true){
                    if((proiettili[i].posx+proiettili[i].width>=proiettiliInvader[q].posx && proiettili[i].posx<=proiettiliInvader[q].posx+proiettiliInvader[q].width)&&proiettiliInvader[q].posy+proiettiliInvader[q].height>=proiettili[i].posy){
                        proiettili[i].active=false;
                        proiettiliInvader[q].active=false;
                    }
                }    
            }
        }
    }
}


function aggiornaProiettile(){
    sovrapposizioneProiettili();
    //Controllo per ogni frame se il player ha colpito un proiettile di un invader
    for(let i=0; i<proiettili.length; i++){
        if(proiettili[i].active){
            proiettili[i].posy+=proiettili[i].speed;
            //aggiorno la posizione del proiettile
        }
        if(proiettili[i].posy<=proiettili[i].height){
            proiettili[i].active=false;
            //Controllo se il proiettile esce fuori dallo schermo
        }
        if(proiettili[i].active){
            for(let q=0; q<walls.length;q++){
                if(walls[q].shots!=3){
                    if(proiettili[i].posy<=walls[q].posy+walls[q].height && (proiettili[i].posx+proiettili[i].width>=walls[q].posx && proiettili[i].posx<=(walls[q].posx+walls[q].width))){
                        proiettili[i].active=false;
                        walls[q].shots++;
                        walls[q].aggiornaWidth();
                        break;
                        //Controllo se il proiettile del player ha colpito uno dei muri
                    }
                }
                
            }
            for(let k=0; k<invaderRows; k++ ){
                for(let j=0; j<invaderCols; j++){
                    if(invaders[k*invaderCols+j].alive==true){
                        if(((proiettili[i].posx+proiettili[i].width >= invaders[k*invaderCols+j].posx)&&(proiettili[i].posx<=invaders[k*invaderCols+j].posx+invaders[k*invaderCols+j].width))){
                            if((proiettili[i].posy<=invaders[k*invaderCols+j].posy+invaders[k*invaderCols+j].height)&&(proiettili[i].posy+proiettili[i].height>=invaders[k*invaderCols+j].posy)){
                                //i due if mi servono per controllare che il proiettile sia posizionato dentro l'invader sia in altezza che in larghezza
                                invaders[k*invaderCols+j].alive=false;
                                proiettili[i].active=false;
                                invaderKilled.play();
                                actualscore+=invaders[k*invaderCols+j].score;
                                aggiornaScore();
                                numkills++;
                                speedIncrease();
                                //Aggiorno il numero di invader uccisi e aggiorno la velocità del gioco mano a mano che le uccisioni da parte dell'utente aumentano
                                let win = true;
                                for(let q = 0; q<invaders.length; q++){
                                    if(invaders[q].alive==true){
                                        win=false;
                                        break;
                                    }
                                }
                                if(win==true){
                                    lost=true;
                                    setTimeout(()=>{
                                        winMessage();
                                    },200)
                                    //Controllo se ho vinto (quindi se ho ucciso tutti gli invaders)
                                }
                            }
                        }
                    } 
                }
            }
        } 
    }
}



function generaMuro(){
    if(lost==true){
        return;
    }
    
    let wallSpace = (canvasWidth-numwalls*wallWidth*scalaMuro)/(1+numwalls);
    //Mi permette di lasciare lo stesso spazio tra un muro e l'altro
    if(iterazioniMuro==0){
        for(let i=0; i<numwalls; i++){
            let posx = wallSpace + i*(wallWidth*scalaMuro+wallSpace);
            let posy = (giocatore.posy-giocatore.height-100); 
            
            let newMuro = new Wall(posx,posy,wallWidth*scalaMuro,wallHeight*scalaMuro,0);
            walls.push(newMuro);
            
        }
        iterazioniMuro++;
    }
    walls.forEach(muro=>{
        //Costruisce tutti i muri che non sono stati distrutti completamente per ogni frame di gioco
        muro.costruisciMuro();
    })
    
}


function generaProiettileInvader(){
    if(lost==true){
        return;
    }
    intervalSparo(1500-100*level);
    proiettiliInvader.forEach(proiettileinvader=>{
        proiettileinvader.costruisciProiettile();
    })
    aggiornaProiettileInvader();
}

function aggiornaProiettileInvader(){
    for(let i=0; i<proiettiliInvader.length; i++){
        if(proiettiliInvader[i].active){
            proiettiliInvader[i].posy+=proiettiliInvader[i].speed;
            //Aggiorna la posizione dei proiettili lanciati dagli invader
        }
        if(proiettiliInvader[i].posy>=giocatore.posy){
            proiettiliInvader[i].active=false;
            //Elimino i proiettili lanciati dagli invader una volta che hanno "superato" il giocatore in altezza
        }
        if(proiettiliInvader[i].active){
            for(let q=0; q<walls.length;q++){
                if(walls[q].shots!=3){
                    if(proiettiliInvader[i].posy+proiettiliInvader[i].height>=walls[q].posy && (proiettiliInvader[i].posx+proiettiliInvader[i].width>=walls[q].posx && proiettiliInvader[i].posx<=(walls[q].posx+walls[q].width))){
                        proiettiliInvader[i].active=false;
                        walls[q].shots++;
                        walls[q].aggiornaWidth();
                        break;
                        //Controllo se il proiettile lanciato dall'invader ha colpito il muro e in caso affermativo ne aggiorno la grandezza
                    }   
                } 
            }
            
            for(let k=0; k<invaderRows; k++ ){
                for(let j=0; j<invaderCols; j++){
                    if(proiettiliInvader[i].active && (proiettiliInvader[i].posx+proiettiliInvader[i].width >= giocatore.posx-giocatore.width/2) && proiettiliInvader[i].posx <= (giocatore.posx+giocatore.width/2) && proiettiliInvader[i].posy>=(giocatore.posy-giocatore.height/2)){
                        if(!lost){
                            proiettiliInvader[i].active=false;
                            lives--;
                            if(lives==0){
                                //Diminuisco le vite di una e nel caso siano finite il gioco termina
                                lost=true;
                                playerExplosion.play();
                                setTimeout(()=>{
                                    lossMessage();
                                },500)                
                            }
                            break;            
                        }             
                    }
                    else if(proiettiliInvader[i].active && (proiettiliInvader[i].posx+proiettiliInvader[i].width >= giocatore.posx-giocatore.width/10) && proiettiliInvader[i].posx <= (giocatore.posx+giocatore.width/10) && proiettiliInvader[i].posy>=(giocatore.posy-giocatore.height)){
                        //Faccio lo stesso if di prima ma con coordinate diverse in modo da adattare meglio il controllo alla forma dell'immagine del giocatore
                        if(!lost){
                            proiettiliInvader[i].active=false;
                            lives--;
                            if(lives==0){
                                lost=true;
                                playerExplosion.play();
                                setTimeout(()=>{
                                    lossMessage();
                                },500)
                            }
                            break;                
                        }
                    }
                }
            }
        }
        
    }
}

function intervalSparo (intsparo){
    if(!timerProiettiliInvader){
        timerProiettiliInvader = setInterval(()=>{
            let aliveInvaders = invaders.filter(invader => invader.alive);
            aliveInvaders.sort((a, b) => 0.5 - Math.random());
            let randomInvader=aliveInvaders[0];
            //Scelgo un invader casuale da far sparare
            let startingX = (randomInvader.posx+randomInvader.width/2);
            let startingY = (randomInvader.posy+randomInvader.height);
            let proiettileInvader = new Projectile(startingX,startingY,10,true);
            proiettiliInvader.push(proiettileInvader);
            //Assegno una posizione di partenza a ciascun proiettile e lo inserisco nel vettore con tutti i proiettili
        },intsparo)
    }
}

function aggiornaScore (){
    let scorediv = document.querySelector("#Score");
    let string = "Score: " + actualscore;
    scorediv.textContent = string;
}

function speedIncrease(){
    //Definisco alcuni intervalli di numero di uccisioni per poter aumentare la velocità degli invader
    switch (numkills){
        case 10:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(450-40*level));
            break;
        }
        case 20:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(400-40*level));
            break;
        }
        case 30:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(350-40*level));
            break;
        }
        case 40:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(300-40*level));
            break;
        }
        case 50:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(250-40*level));
            break;
        }
        case 54:{
            clearInterval(invadermovetimer);
            invadermovetimer=setInterval(()=>{
                updateGriglia();
            },(200-40*level));
            break;
        }
    }
}



function avanzaLivello(){
    level++;
    numkills=0;
    lost=false;
    iterazioniGriglia=0;
    iterazioniMuro=0;
    invaders = [];
    proiettili = [];
    walls=[];
    proiettiliInvader=[];
    createGame();
    //Permette di passare ad un livello successivo aumentando la velocità del gioco
}



addEventListener("keydown", e=>{
    //Controllo la pressione dei tasti freccia e della barra spaziatrice
    if(e.key=="ArrowLeft"){
        leftArrow=true;
    }
    else if(e.key=="ArrowRight"){
        rightArrow=true;
    }
    else if (e.key==" "){
        spacekey = true;
    }
})



addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft"){
        leftArrow=false;
    }
    else if(e.key==="ArrowRight"){
        rightArrow=false;
    }
    else if(e.key==" "){
        spacekey=false;
    }
})

function lossMessage(){
    cancelAnimationFrame(animationFrame);
    clearInterval(durationTimer);
    clearInterval(timerProiettiliInvader);
    gameOver.play();
    let divCont = document.querySelector("#GameContainer");
    let divBlu = document.createElement("div");
    let divPerso = document.createElement("div");
    let divPersoBG = document.createElement("div");
    divPerso.setAttribute("class","lossMSG");
    divPersoBG.setAttribute("class","lossMSGBG");
    divBlu.setAttribute("class", "blu");
    divPerso.textContent="GAME OVER";
    divPersoBG.textContent="GAME OVER";
    divCont.appendChild(divPerso);
    divCont.appendChild(divPersoBG);
    let set =0;
    let bgchange = setInterval(()=>{
        if(set==0){
            divPersoBG.style.color="#EB2D2E";
            set=1;
        }
        else{
            divPersoBG.style.color="#FCE930";
            set=0;
        }
    },300);
    let playBut = document.createElement("button");
    let quitBut = document.createElement("button");
    let butCont = document.createElement("div");
    butCont.setAttribute("id","gameButCont");
    playBut.textContent = "Play Again";
    quitBut.textContent = "Quit";
    playBut.setAttribute("class","gameBut");
    quitBut.setAttribute("class", "gameBut");
    playBut.setAttribute("id","playBut");
    quitBut.setAttribute("id","quitBut");
    setTimeout(()=>{
        divCont.appendChild(divBlu);
        butCont.appendChild(playBut);
        butCont.appendChild(quitBut);
        divCont.appendChild(butCont);
    },2000)
    playBut.onclick=()=>{
        gameSave(1);
    }
    quitBut.onclick=()=>{
        gameSave(2);
    }
    //Creo un popup da appendere alla schermata di gioco nel caso in cui il gioco termini e gestisco la chiamata alla funzione
    //di salvataggio del gioco


}

function winMessage(){
    cancelAnimationFrame(animationFrame);
    clearInterval(durationTimer);
    clearInterval(invadermovetimer);
    clearInterval(timerProiettiliInvader);
    timerProiettiliInvader = null;
    levelClear.play();
    let divCont = document.querySelector("#GameContainer");
    let divBlu = document.createElement("div");
    let divWin = document.createElement("div");
    let divWinBG = document.createElement("div");
    divWin.setAttribute("class","lossMSG");
    divWinBG.setAttribute("class","winMSGBG");
    divBlu.setAttribute("class", "blu");
    divWin.textContent="LEVEL CLEAR";
    divWinBG.textContent="LEVEL CLEAR";
    divCont.appendChild(divWin);
    divCont.appendChild(divWinBG);
    let nextLevBut = document.createElement("button");
    let quitBut = document.createElement("button");
    let butCont = document.createElement("div");
    butCont.setAttribute("id","gameButCont");
    nextLevBut.textContent = "Next Level";
    quitBut.textContent = "Quit";
    nextLevBut.setAttribute("class","gameBut");
    quitBut.setAttribute("class", "gameBut");
    nextLevBut.setAttribute("id","playBut");
    quitBut.setAttribute("id","quitBut");
    setTimeout(()=>{
        divCont.appendChild(divBlu);
        butCont.appendChild(nextLevBut);
        butCont.appendChild(quitBut);
        divCont.appendChild(butCont);
    },2000)
    let set =0;
    let bgchange = setInterval(()=>{
        if(set==0){
            divWinBG.style.color="#2ace59";
            set=1;
        }
        else{
            divWinBG.style.color="#1bb3cd";
            set=0;
        }
    },300);
    nextLevBut.onclick=()=>{
        divWin.remove();
        divWinBG.remove();
        divBlu.remove();
        butCont.remove();
        avanzaLivello();
    }
    quitBut.onclick=()=>{
        gameSave(3);
    }
    //Gestisco l'avanzamento del livello
    

}




function updatePosition (){
    if (leftArrow && giocatore.posx > (giocatore.width/2)) {
        giocatore.posx -= giocatore.speed;
    } else if (rightArrow && giocatore.posx < (game.width - giocatore.width / 2)) {
        giocatore.posx += giocatore.speed;
    }
    //Gestisco lo spostamento del player
}



function gameSave(action){
    //Raccolgo le informazioni del gioco e poi le invio al server se l'utente è loggato. Se non lo è allora i dati di gioco non vengono salvati
    let gameInformations = {
        score: actualscore,
        datetime: startTS,
        duration: duration,
        level: level+1,
        userID:null,
        req:"GameSave"
    }
    fetch('../php/sessionVar.php',{
        method: "post"
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        let parsed = JSON.parse(text);
        logged=parsed['logged'];
        if(parsed['logged']){
            gameInformations.userID=parsed['id'];
        }
        
    })
    .then(()=>{
        if(logged){
            let jsonData = JSON.stringify(gameInformations);
            fetch('../php/gameSave.php',{
                method: "POST",
                body: jsonData
            })
            .then((response)=>{
                if(response.text=="Error"){
                    console.error("Errore nel salvataggio della partita");
                }
            })
            .then(()=>{
                switch(action){
                    case 1:{
                        location.reload();
                        break;
                    }
                    case 2:{
                        window.location.href="../index.php";
                        break;
                    }
                    case 3:{
                        window.location.href="../index.php";
                    }
                }
            })
            .catch(e=>{
                console.error("Errore nel salvataggio della partita: " + e);
            })
        }
        else{
            //Nel caso in cui non sono loggato posso tornare alla home o proseguire nel caso io abbia superato il livello ma i dati non vengono salvati
            switch(action){
                case 1:{
                    location.reload();
                    break;
                }
                case 2:{
                    window.location.href="../index.php";
                    break;
                }
                case 3:{
                    window.location.href="../index.php";
                }
            }
        }
    })
    .catch(e=>{
        console.error("Errore nel recupero delle variabili di sessione: " + e);
        //Errore interno al server, la partita non viene salvata
    })
}
