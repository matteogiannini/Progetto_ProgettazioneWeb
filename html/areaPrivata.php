<?php
session_start();
if(!isset($_SESSION['logged']) || $_SESSION['logged']!==true){
    header("location: login.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang = "it">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/privateAreaStyle.css">
    <link rel = "stylesheet" href = "../css/commonStyle.css">
    <title>Area Privata</title>
</head>

<body>
    <div id = "FlexContainer">
        <div id = "PrivateContainer">
            <div class = "innerflex" id="contrcont">
                <img id = "playerimg" alt = "Immagine del giocatore" src = "../images/PlayerIcon.png">
                <h2>Area Privata</h2>
                <?php
                echo "Ciao ". $_SESSION["username"];
                ?>
                <button type = "button" id = "logoutbut">Esci</button>
                
            </div>
            <div class="innerflex" id="statscont">
                <h2>
                    Partite Giocate
                </h2>
                <div class = "TabContainer"></div>
            </div>
        </div>
    </div>
    <script src="../js/privateAreaScript.js"></script>
</body>
</html>

