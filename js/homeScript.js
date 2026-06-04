let playButton = document.querySelector("#PlayBut");

playButton.addEventListener("click",e=>{
    let logged;
    fetch('php/sessionVar.php',{
        method: "post"
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        let parsed = JSON.parse(text);
        logged=parsed['logged'];
    })
    .then(()=>{
        if(logged){
            window.location.href = "html/gioco.php";
        }
        else{
            generatePopup();
        }
    })
    .catch(function(error) {
        console.log('Error occurred during fetch request:', error);
        window.alert("Errore del server");
        return;
    });
    
})

function generatePopup(){
    let pagebody = document.querySelector("body");
    let popup = document.createElement("div");
    popup.setAttribute("id","loginReminder");
    let textCont = document.createElement("div");
    textCont.textContent="Non hai effettuato il login";
    textCont.setAttribute("id","textCont");
    let butcont = document.createElement("div");
    let guestButt = document.createElement("button");
    guestButt.setAttribute("class","noLog");
    guestButt.textContent="GIOCA COME OSPITE";
    let logButt = document.createElement("button");
    logButt.setAttribute("class","noLog");
    logButt.textContent="EFFETTUA IL LOGIN";
    logButt.onclick = ()=>{
        window.location.href = "html/login.php"
    }
    guestButt.onclick = ()=>{
        window.location.href = "html/gioco.php"
    }
    butcont.appendChild(logButt);
    butcont.appendChild(guestButt);
    butcont.setAttribute("id","buttonCont");
    popup.appendChild(textCont);
    popup.appendChild(butcont);
    pagebody.appendChild(popup);
}

document.querySelector("#ApriGuida").addEventListener("click",()=>{
    window.location.href = 'html/gameGuide.html';
})


document.querySelector("#ApriStat").addEventListener("click",()=>{
    window.location.href = 'html/generalStats.php';
})

document.querySelector("#ApriStoria").addEventListener("click",()=>{
    window.location.href = 'html/historyPage.php';
})