let form = document.querySelector(".formContainer");
let formSub=document.querySelector("form");
let formUser = form.querySelector("#username");
let formPW = form.querySelector("#password");
submitButton=form.querySelector("#submitbutton");
let registerBut = document.querySelector("#switchbut");
let responseErrCode;
let responseStat;

registerBut.addEventListener("click",()=>{
    window.location.href = "register.php"
})

submitButton.addEventListener("click",e=>{
    e.preventDefault();
    let correct = true;
    //Validazione nome utente: non può essere più lungo di 50 caratteri
    if(!validateUsername()){
        generaMessaggio(1);
        formUser.style.border="solid 5px #c4351f";
        correct = false;
    }
    if(!validatePassword()){
        generaMessaggio(2);
        formPW.style.border="solid 5px #c4351f";
        correct = false;
    }

    if(correct){
        sendData(formSub);
    }
   

})

function sendData(form){
    fetch("../php/loginData.php",{
        method: "post",
        body: new FormData(form)
    }).then((response)=>{
        return response.text();
    }).then((text)=>{
        let parsed = JSON.parse(text);
        responseStat=parsed['success'];
        responseErrCode=parsed['errmess'];
    }).then(()=>{
        if(!responseStat){
            if(responseErrCode==1){
                generaMessaggio(3);
                formPW.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==2){
                generaMessaggio(4);
                formUser.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==3){
                generaMessaggio(5);
            }
        }
        else{
            //Login avvenuto con successo: visualizzo messaggio a schermo e reindirizzo dopo pochi secondi
            let pagebody = document.querySelector("body");
            let popup = document.createElement("div");
            popup.setAttribute("class","formContainer");
            popup.textContent="Login avvenuto con successo, benvenuto";
            pagebody.appendChild(popup);
            setTimeout(()=>{
                window.location.href = "areaPrivata.php";
            },2000)
        }
    })
}

function validateUsername(){
    //Valido l'username: mi basta porre la lunghezza tra 1 e 30 caratteri
    let unReg = /^.{1,30}$/;
    let insertedUn = formUser.value;

    if(unReg.test(insertedUn)){
        return true;
    }
    else{
        return false;
    }
}

function validatePassword(){
    //Valido la password: Deve contenere almeno una maiuscola, una minuscola, un numero ed un carattere speciale tra quelli specificati
    let pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    let insertedPW = formPW.value;

    if (pwReg.test(insertedPW)){
        return true;
    }
    else{
        return false;
    }
}

function generaMessaggio(error){
    switch(error){
        case 1:{
            let message="L'username deve essere lungo al massimo 30 caratteri";
            appendiPopup(message,formUser);
            break;
        }
        case 2:{
            let message="La password deve contenere almeno 8 caratteri di cui almeno una lettera maiuscola, una lettera minuscola e un carattere speciale tra !@#$%^&*()\-_=+{};:,<.>";
            appendiPopup(message,formPW);
            break;
        }
        case 3:{
            let message="Password errata";
            appendiPopup(message,formPW);
            break;
        }
        case 4:{
            let message="Username inesistente";
            appendiPopup(message,formUser);
            break;
        }
        case 13:{
            let message ="Errore del server";
            appendiPopup(message,null);
            break;
        }
    }
}



function appendiPopup(mess,field){
    //Genero il popup di errore e coloro l'eventuale campo che presenta un errore
    let pagebody = document.querySelector("body");
    let popup = document.createElement("div");
    popup.setAttribute("class","formContainer");
    popup.setAttribute("id","logError");
    let messDiv = document.createElement("div");
    messDiv.textContent=mess;
    let closebutton = document.createElement("button");
    closebutton.setAttribute("type","button");
    closebutton.setAttribute("id","closepopup");
    closebutton.textContent="CHIUDI";
    popup.appendChild(messDiv);
    popup.appendChild(closebutton);
    pagebody.appendChild(popup);

    closebutton.addEventListener("click", ()=>{
        popup.remove();
        if(field){
            field.style.border="solid 5px #FCE930";
        }
    })

}