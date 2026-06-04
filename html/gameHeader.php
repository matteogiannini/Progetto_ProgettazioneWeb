<header>
    <div class = "header">
        <a href = "../index.php">
            <img src="../images/Logo.png" alt="Logo" class="logo">
        </a>
        <?php
            
            if (isset($_SESSION['logged'])) {
                $elem = 
                    '<a href = "./areaPrivata.php">
                        <div id= "HeaderDiv">
                            Ciao<br>' . $_SESSION['username']. ' 
                            <img src="../images/users.png" alt="Logo cliccabile per login" id="userlogo" class="logo">
                        </div>
                    </a>';
            } 
            else {
                $elem=
                    '<a href = "./login.php">
                        <div id= "HeaderDiv">
                            Ciao,<br>accedi o registrati
                            <img src="../images/users.png" alt="Logo cliccabile per login" id="userlogo" class="logo">
                        </div>
                    </a>';
                
            }
            
            echo $elem;
        ?>
    </div>
</header>
