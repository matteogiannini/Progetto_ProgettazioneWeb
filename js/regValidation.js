let form = document.querySelector(".formContainer");
let formSub=document.querySelector("form");
let formUser = form.querySelector("#username");
let formMail = form.querySelector("#email");
let formPW = form.querySelector("#password");
let formPWC = form.querySelector("#passwordconfirm");
let submitButton = document.querySelector("#submitbutton");
let switchButton = document.querySelector("#switchbut");
let responseErrCode;
let responseStat;

switchButton.addEventListener("click",()=>{
    window.location.href="login.php";
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
    if(!validateEmail()){
        generaMessaggio(2);
        formMail.style.border="solid 5px #c4351f";
        correct=false;
    }
    if(!validatePassword()){
        generaMessaggio(3);
        formPW.style.border="solid 5px #c4351f";
        correct=false;
    }
    if(!checkCorrispondenza()){
        generaMessaggio(4);
        formPWC.style.border="solid 5px #c4351f";
        correct=false;
    }

    if(correct){
        sendData(formSub);
        //Se i parametri sono corretti invio i dati del form al server
    }
    
    
})

function sendData(form){
    fetch("../php/registerData.php",{
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
                //Username già esistente
                generaMessaggio(5);
                formUser.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==2){
                //Mail già esistente
                generaMessaggio(6);
                formMail.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==3){
                //Username non rispetta il pattern lato server
                generaMessaggio(1);
                formUser.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==4){
                //Mail non rispetta il pattern lato server
                generaMessaggio(2);
                formMail.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==5){
                //Password non rispetta il pattern lato server
                generaMessaggio(3);
                formPW.style.border="solid 5px #c4351f";
            }
            else if(responseErrCode==13){
                //Errore generico
                generaMessaggio(13);
            }

        }
        else{
            //Registrazione avvenuta con successo
            let pagebody = document.querySelector("body");
            let popup = document.createElement("div");
            popup.setAttribute("class","formContainer");
            popup.textContent="Registrazione avvenuta con successo, redirezione alla pagina di login...";
            pagebody.appendChild(popup);
            setTimeout(()=>{
                window.location.href = "login.php";
            },2000)

        }
    })
}

function validateUsername(){
    let unReg = /^.{1,30}$/;
    let insertedUn = formUser.value;

    if(unReg.test(insertedUn)){
        return true;
    }
    else{
        return false;
    }
}

function validateEmail(){
    let emReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let insertedMail = formMail.value;

    if(emReg.test(insertedMail)){
        return true;
        
    }
    else{
        return false;
        
    }
}

function validatePassword(){
    let pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    let insertedPW = formPW.value;

    if (pwReg.test(insertedPW)){
        return true;
    }
    else{
        return false;
    }
}

function checkCorrispondenza(){
    //Verifica corrispondenza delle password
    let insertedPW=formPW.value;
    let insertedPWConfirm = formPWC.value;

    if(insertedPW===insertedPWConfirm){
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
            let message="L'email inserita è errata";
            appendiPopup(message,formMail);
            break;
        }
        case 3:{
            let message="La password deve contenere almeno 8 caratteri di cui almeno una lettera maiuscola, una lettera minuscola e un carattere speciale tra !@#$%^&*()\-_=+{};:,<.>";
            appendiPopup(message,formPW);
            break;
        }
        case 4:{
            let message="Le password non corrispondono";
            appendiPopup(message,formPWC);
            break;
        }
        case 5:{
            let message="Username già esistente";
            appendiPopup(message,formUser);
            break;
        }
        case 6:{
            let message="email già esistente";
            appendiPopup(message,formMail);
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
    //Generazione popup di errore e colore dell'eventuale campo errato
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