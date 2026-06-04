let body = document.querySelector("body");
let classificaCont = document.querySelector("#ClassCont");
let gamesCont = document.querySelector("#NumGames");
let timeCont = document.querySelector("#TimeGames");

body.onload = ()=>{
    getClassifica();
}

function getClassifica(){
    //Inizio costruendo la leaderboard. Se non ci sono partite non costruisco nemmeno le statistiche generali
    let reqType = 'leaderboard';
    var senddata = new FormData();
    let jsonText;
    let resultArray;
    senddata.append('tor', reqType);
    fetch('../php/getStats.php',{
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
        if(jsonText['success']==true){
            creaTabella (jsonText['numRows'],resultArray);
            getPartite();
            getTimeStats();
        }
        else{
            console.error("Errore nel recupero della classifica");
        }
        
    }  
    )
    .catch(error => {
        console.error('Errore nella fetch delle partite:', error);
    });
}


function creaTabella(numrows,resultArray){
    if(numrows!=0){
        classificaCont.textContent="";
        let tabClassifica = document.createElement("table");
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        let headerPos = document.createElement('th');
        let headerUN = document.createElement('th');
        let headerScore = document.createElement('th');
        let headerLev = document.createElement('th');
        headerPos.textContent = "Posizione";
        headerUN.textContent = "Username";
        headerScore.textContent = "Punteggio Massimo";
        headerLev.textContent = "Livello Raggiunto";
        headerRow.appendChild(headerPos);
        headerRow.appendChild(headerUN);
        headerRow.appendChild(headerScore);
        headerRow.appendChild(headerLev);
        thead.appendChild(headerRow);
        tabClassifica.appendChild(thead);

        // Creo le righe della tabella utilizzando l'array associativo passato da PHP
        let tbody = document.createElement('tbody');
        let keys = ['username', 'maxscore', 'maxlev'];

        for (let i = 0; i < resultArray.length; i++) {
        let row = resultArray[i];
        let tableRow = document.createElement('tr');

        for (let j = 0; j < keys.length; j++) {
            let key = keys[j];
            let dataCell = document.createElement('td');

            if (key === 'username') {
            //Se la chiave è username aggiungo il campo della posizione a sinistra
            let positionCell = document.createElement('td');
            positionCell.textContent = i + 1; 
            tableRow.appendChild(positionCell);
            dataCell.textContent = row[key]; 
            } else {
            dataCell.textContent = row[key];
            }

            tableRow.appendChild(dataCell);
        }

        tbody.appendChild(tableRow);
        }
        tabClassifica.appendChild(tbody);

        // Append the table to the container element
        classificaCont.appendChild(tabClassifica);
    }
}

function getPartite(){
    //Richiedo al server le statistiche sul numero di partite giocate
    let reqType = 'numstats';
    var senddata = new FormData();
    let jsonText;
    let resultArray;
    senddata.append('tor', reqType);
    fetch('../php/getStats.php',{
        method: 'POST',
        body: senddata
    })
    .then(response=>{
        return response.text();
    })
    .then(text=>{
        jsonText = JSON.parse(text);
        resultArray = jsonText;
    })
    .then(()=>{
        if(resultArray['success']==true){
            if(resultArray['numgames']>0){
                gamesCont.textContent="In totale gli utenti iscritti hanno giocato "+resultArray['numgames']+" partite, per una media di "+resultArray['avggames']+" partite per utente.";
                gamesCont.innerHTML+="<br>L'utente che ha giocato più partite \u00E8 stato "+resultArray['maxgamesun']+" per un totale di "+resultArray['maxgames']+" partite.";
            }
        }
        else{
            console.error("Errore nel recupero delle statistiche sul numero delle partite")
        }
    }  
    )
    .catch(error => {
        console.error('Errore nella fetch delle partite:', error);
    });
}

function getTimeStats(){
    //Richiedo al server le statistiche sulla durata delle partite
    let reqType = 'timestats';
    var senddata = new FormData();
    let jsonText;
    let resultArray;
    senddata.append('tor', reqType);
    fetch('../php/getStats.php',{
        method: 'POST',
        body: senddata
    })
    .then(response=>{
        return response.text();
    })
    .then(text=>{
        jsonText = JSON.parse(text);
        resultArray = jsonText;
    })
    .then(()=>{
        if(resultArray['success']==true){
            timeCont.textContent="In totale gli utenti iscritti hanno giocato per "+costruisciStringa(resultArray['totdur'])+", per una media di "+costruisciStringa(resultArray['avgdur'])+" per utente.";
            timeCont.innerHTML+="<br>L'utente che ha giocato più a lungo \u00E8 stato "+resultArray['maxdurun']+" che ha giocato per "+costruisciStringa(resultArray['maxdur'])+".";
        }
        else{
            console.error("Errore nel recupero delle statistiche sul tempo delle partite");
        }
    })
    .catch(error => {
        console.error('Errore nella fetch delle partite:', error);
    });

}

function costruisciStringa(durata){
    //Costruisco la stringa da visualizzare in modo da avere qualcosa di più leggibile della durata in secondi
    durata=Math.floor(durata);
    let ore = Math.floor(durata / 3600);
    let minuti = Math.floor((durata % 3600) / 60);
    let secondi = durata % 60;

    let stringa = (ore>0)?""+ore+((ore>1)?" ore, ":" ora, "):"";
    stringa+=(minuti>0)?""+minuti+((minuti>1)?" minuti e ":" minuto e "):"";
    stringa+=secondi+((secondi==1)?" secondo":" secondi");
    return stringa;
}

