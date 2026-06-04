<?php
            session_start();
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <title>Space Invaders</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/gameStyle.css">
    <link rel = "stylesheet" href = "../css/commonStyle.css">
</head>


<body>
    <?php include '../html/gameHeader.php' ?>
    <div id ="GameContainer">
        <?php
            require_once("../php/config.php");
            $queryMax = "SELECT score FROM partite ORDER BY score DESC LIMIT 1";
            $result=$connection->query($queryMax);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $highscore = $row['score'];
            echo '<div id = "Score" class="scoreDiv">Score: 0</div><div class="scoreDiv"> High Score: '.$highscore. ' </div><div class="scoreDiv" id = "DurDiv">Duration: 0s</div>';
            $connection=null;
           
        ?>
        
        <canvas width="1500" height="1000" id = "GameCanvas"> </canvas>
    </div>
    
    <script src="../js/gameLogic.js"></script>
</body>

</html>


