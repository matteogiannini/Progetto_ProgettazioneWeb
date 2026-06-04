let scoreContainer = document.querySelectorAll(".TabContainer")[0];
let privateCont = document.querySelector("#statscont")

document.querySelector("#logoutbut").addEventListener("click",()=>{
    window.location.href="../php/logout.php";
});

getPartite();


function getPartite (){
    let reqType = 'userStats';
    var senddata = new FormData();
    let jsonText;
    let resultArray;
    senddata.append('tor', reqType);
    fetch('../php/userStats.php',{
        method: 'POST',
        body: senddata
    })
    .then(response=>{
        return response.text();
    })
    .then(text=>{
        jsonText = JSON.parse(text);
        resultArray = jsonText.result;
        
    })
    .then(()=>{
        //Controllo se ci sono stati errori nel recupero dei risultati
        if(jsonText['success']==true){
            creaTabella (jsonText['numRows'],resultArray);
        }
        else{
            console.error("Errore nel recupero delle partite giocate: "+jsonText['errinfo']);
        }
        
    }  
    )
    .catch(error => {
        console.error('Errore nella fetch delle partite:', error);
    });
}

function creaTabella(numrows,resultArray){
    if(numrows==0){
        scoreContainer.textContent="Non hai ancora effettuato alcuna partita :(";
        return;
    }
    else{
        let playedDiv = document.createElement('div');
        playedDiv.textContent = "Hai giocato "+numrows+" parite in totale."
        playedDiv.textContent+=(numrows>20)?" Nella tabella puoi visualizzare le ultime 20 partite giocate.":""; 
        playedDiv.setAttribute("class","tableExplain");
        scoreContainer.appendChild(playedDiv);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerTS = document.createElement('th');
        const headerDur = document.createElement('th');
        const headerScore = document.createElement('th');
        const headerLev = document.createElement('th');
        headerTS.textContent = "Data ed Ora";
        headerDur.textContent = "Durata";
        headerScore.textContent = "Punteggio";
        headerLev.textContent = "Livello Raggiunto";
        headerRow.appendChild(headerTS);
        headerRow.appendChild(headerDur);
        headerRow.appendChild(headerScore);
        headerRow.appendChild(headerLev);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 
        let tbody = document.createElement('tbody');
        resultArray.forEach(row => {
        let tableRow = document.createElement('tr');
        ['timestamp', 'duration', 'score', 'level'].forEach(key => {
            let tableCell = document.createElement('td');
            tableCell.textContent = row[key];
            tableRow.appendChild(tableCell);
        });
        tbody.appendChild(tableRow);
        });
        table.appendChild(tbody);

        
        scoreContainer.appendChild(table);
        getPosizioneClassifica();
    }
}

function getPosizioneClassifica(){
    //Recupero la posizione del giocatore nella classifica globale dal server
    let reqType = 'userPosition';
    let senddata = new FormData();
    let max;
    senddata.append('tor', reqType);
    let jsonText;
    let querySuccess;
    let pos;
    fetch('../php/userStats.php',{
        method: 'POST',
        body: senddata
    })
    .then(response=>{
        return response.text();
    })
    .then(text=>{
        jsonText = JSON.parse(text);
        pos = jsonText['result'];
        querySuccess = jsonText['success'];
        max = jsonText['max'];
    })
    .then(()=>{
        if(querySuccess){
            let h2 = document.createElement("h2");
            h2.textContent="La tua posizione in classifica";
            privateCont.appendChild(h2);
            let divPos = document.createElement("div");
            divPos.setAttribute("class","textCont");
            divPos.textContent="Il tuo record \u00E8 di " + max+ " punti. Attualmente sei nella posizione "+ pos + " della classifica.";
            if(pos==1){
                divPos.textContent=divPos.textContent+" Complimenti :D";
            }
            else{
                divPos.textContent=divPos.textContent+" Puoi fare di meglio :/";
            }
            privateCont.appendChild(divPos);
        }
        else{
            console.error("Errore nel recupero dei dettagli sulla classifica: "+jsonText['errinfo']);
        }
        getStats();
    })
    .catch(error => {
        console.error('Errore nella fetch dei dettagli sulla classifica:', error);
    });
}

function getStats(){
    let reqType = 'generalStats';
    let senddata = new FormData();
    let max;
    senddata.append('tor', reqType);
    let jsonText;
    let querySuccess;
    let avgscore;
    let avgdur;
    let dur;
    let mfl;
    let maxlev;
    fetch('../php/userStats.php',{
        method: 'POST',
        body: senddata
    })
    .then(response=>{
        return response.text();
    })
    .then(text=>{
        jsonText = JSON.parse(text);
        querySuccess = jsonText['success'];
        avgscore = jsonText['avg'];
        avgscore = Math.floor(avgscore);
        avgdur = jsonText['avgdur'];
        avgdur = Math.floor(avgdur);
        dur = jsonText['dur'];
        mfl = jsonText['mfl'];
        maxlev = jsonText['maxlev'];
    })
    .then(()=>{
        if(querySuccess){
            let h2 = document.createElement("h2");
            h2.textContent="Alcune statistiche sulle tue partite";
            privateCont.appendChild(h2);
            let divstats = document.createElement("div");
            divstats.textContent = "In media hai totalizzato un punteggio di " + avgscore + ".";
            divstats.innerHTML += "<br>Complessivamente hai giocato per " +costruisciStringa(dur)+" per una media di " + costruisciStringa(avgdur) + " per partita";
            divstats.innerHTML += "<br>Il massimo livello che hai raggiunto \u00E8 stato il "+maxlev+". Il più delle volte ti sei fermato al livello "+mfl+".";
            privateCont.appendChild(divstats);
        }
        else{
            console.error("Errore nel recupero delle partite giocate: "+jsonText['errinfo']);
        }
    })
    .catch(error => {
        console.error('Errore nella fetch dei dettagli della durata:', error);
    });
}


function costruisciStringa(durata){
    durata=Math.floor(durata);
    let ore = Math.floor(durata / 3600);
    let minuti = Math.floor((durata % 3600) / 60);
    let secondi = durata % 60;

    let stringa = (ore>0)?""+ore+((ore>1)?" ore, ":" ora, "):"";
    stringa+=(minuti>0)?""+minuti+((minuti>1)?" minuti e ":" minuto e "):"";
    stringa+=secondi+((secondi==1)?" secondo":" secondi");
    return stringa;
}