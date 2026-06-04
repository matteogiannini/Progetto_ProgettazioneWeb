<?php
            session_start();
?>

<!DOCTYPE html>
<html lang = "it">
<head>
    <Title>Statistiche</Title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel = "stylesheet" href="../css/statsStyle.css">
    <link rel = "stylesheet" href = "../css/commonStyle.css">
</head>

<body>
    <?php include '../html/gameHeader.php' ?>
    <div id = "FlexContainer">
        <div id = "StatsContainer">
            <h3>Classifica</h3>
            <div class = "InnerCont" id = "ClassCont">
                Nessuna partita giocata
            </div>
            <h3>Numero di partite</h3>
            <div class = "InnerCont" id = "NumCont">
                <img class = "InnerIMG" alt="Numero di partite" src="../images/numgames.png">
                <div class = "InnerText" id = "NumGames">Nessuna partita giocata</div>
            </div>
            <h3>Durata delle partite</h3>
            <div class = "InnerCont" id = "TimeCont">
                <div class = "InnerText" id = "TimeGames">Nessuna partita giocata</div>
                <img class = "InnerIMG" alt="Durata delle partite" src="../images/timeimg.png">
            </div>

        </div>
    </div>
    <script src = "../js/statsScript.js"></script>
</body>

</html>