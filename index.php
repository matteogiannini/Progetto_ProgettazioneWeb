

<!DOCTYPE html>
<html lang = "it">
<head>
    <Title>Space Invaders: Homepage</Title>
    <link rel="icon" href="./images/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel = "stylesheet" href="css/homeStyle.css">
    <link rel = "stylesheet" href = "css/commonStyle.css">
</head>

<body>
    <header>
        <div class = "header">
            <a href = "./index.php">
                <img src="images/Logo.png" alt="Logo" class="logo">
            </a>
            <?php
                session_start();

                if (isset($_SESSION['logged'])) {
                    $elem = 
                        '<a href = "./html/areaPrivata.php">
                            <div id= "HeaderDiv">
                                Ciao<br>' . $_SESSION['username']. ' 
                                <img src="images/users.png" alt="Logo cliccabile per login" id="userlogo" class="logo">
                            </div>
                        </a>';
                } 
                else {
                    $elem=
                        '<a href = "./html/login.php">
                            <div id= "HeaderDiv">
                                Ciao,<br>accedi o registrati
                                <img src="images/users.png" alt="Logo cliccabile per login" id="userlogo" class="logo">
                            </div>
                        </a>';
                    
                }
                
                echo $elem;
            ?>
        </div>
    </header>
    <div id = "FlexContainer">
        <button type = "button" id ="PlayBut" class="HomeBut fullsize">
            <img src="images/PlayLogo.png" alt="Inizio gioco">
            GIOCA
        </button>
        <div id = "HSCont">
            <button type = "button" id ="ApriGuida" class="HomeBut halfsize">
                <img src="images/GuideLogo.png" alt="Apertura guida">
                GUIDA
            </button>
            <button type = "button" id ="ApriStoria" class="HomeBut halfsize">
                <img src="images/historyLogo.png" alt = "Apertura storia">
                STORIA
            </button>
        </div>
        <button type = "button" id ="ApriStat" class="HomeBut fullsize">
            <img src="images/statsLogo.png" alt ="Apertura statiche">
            STATISTICHE
        </button>
        <script src="js/homeScript.js"></script>
    </div>
    
    
</body>
</html>