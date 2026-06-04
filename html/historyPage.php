<?php
            session_start();
?>

<!DOCTYPE html>
<html lang="it">



<head>
    <Title>Storia</Title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel = "stylesheet" href="../css/historyStyle.css">
    <link rel = "stylesheet" href = "../css/commonStyle.css">
</head>



<body>
<?php include '../html/gameHeader.php' ?>
    <div id = "FlexContainer">
        <div id = "StoryCont">
            <h3>Storia del Gioco</h3>
            <div class = "cont">
                <p>
                    Space Invaders è un videogioco arcade rilasciato da Taito nel 1978. È stato sviluppato da Tomohiro Nishikado, che fu ispirato dal videogioco "Breakout", dal romanzo "La guerra dei mondi" e dal film "Star Wars". Space Invaders è stato il precursore dei moderni video game ed ha favorito l’espansione dell’industria dei videogiochi a livello globale.
                </p>
                <img src ="../images/developer.webp" alt="Tomohiro Nishikado">
            </div>
            <div class="cont">
                <img src ="../images/release.png" alt="Logo + Press Start">
                <p>
                    Nei piani originali di realizzazione del gioco gli sviluppatori avevano in mente di porre dei soldati al posto degli alieni. Quest’idea venne però abbandonata in quanto non si volle far passare il messaggio che sparare agli umani fosse giusto.
                </p>
            </div>
            <div class="cont">
                <p>
                    Nel 1980 Space Invaders ricevette la licenza per l’utilizzo negli Stati Uniti. Fu quindi rilasciato nella versione per i cabinati arcade a monete, per Atari 2600 e per Nintendo Entertainment System (NES). Durante il suo periodo di vita, il videogioco ha generato più di 500 milioni di dollari di guadagno.
                </p>
                <img src ="../images/atari.jpg" alt="Copertina del gioco nella versione Atari">
            </div>
            <div class="cont">
                <img src ="../images/evolution.jpg" alt="Copertina del gioco nella versione DS">
                <p>
                    Space Invaders è stato rilasciato successivamente in versioni aggiornate per diverse piattaforme. I sequel hanno aggiunto potenziamenti e nuove dinamiche di gioco al gioco originale.
                </p>
            </div>
            

            
            <h3>Fun Facts</h3>
            <div class = "cont" id = "facts">
                <p>
                    In Giappone il gioco divenne talmente popolare tanto da creare un problema di carenza di monete. Per questo motivo fu necessario quadruplicare le riserve di Yen. Furono inoltre aperte intere sale giochi dedicate a questo videogame.
                    <br><br>Per avere monete a sufficienza per giocare si registrarono anche alcuni furti da parte di giovani sia ai propri genitori che alle casse dei negozi.
                    <br><br>Space Invaders, insieme a Pac-Man e Pong, condivide la fama di essere uno dei giochi arcade più duplicati, contraffatti e hackerati.
                </p>
                <img src = "../images/arcaderoom.jpg" alt="Sala giochi dedicata a Space Invaders">
            </div>
                
            
        </div> 
    </div>
</body>
</html>