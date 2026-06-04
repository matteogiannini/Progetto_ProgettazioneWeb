<?php
            session_start();
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <title>Pagina di Registrazione</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="icon" href="../images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/loginStyle.css">
    <link rel = "stylesheet" href = "../css/commonStyle.css">
</head>


<body>
    <?php include '../html/gameHeader.php' ?>
    <div class="formContainer" id="regForm">
        <form action="registerData.php" method="post">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div>
                <label for="passwordconfirm">Conferma Password:</label>
                <input type="password" id="passwordconfirm" name="passwordconfirm" required>
            </div>
            <div>
                <button type="submit" id="submitbutton">REGISTRATI</button>
            </div>
            <div id="SwitchScreen">
                Hai già un account?
                <button type="button" id="switchbut">LOGIN</button>
            </div>
        </form>
        <script src="../js/regValidation.js"></script>
    </div> 

</body>