<?php
    require_once("config.php");

    $email = $_POST["email"];
    $username = $_POST["username"];
    $clearpassword = $_POST["password"];
    $password = password_hash($clearpassword,PASSWORD_DEFAULT);
    $succeded = true;
    $patternUSER = '/^.{1,30}$/';
    $patternMAIL = '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/';
    $patternPW = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/';
    //Effettuo la stessa validazione eseguita anche lato client
    
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        if(!preg_match($patternUSER, $username)){
            //Username non rispetta il pattern
            $response=array(
                'success'=> false,
                'errmess'=> 3
            );

            $encoded_resp=json_encode($response);
            echo $encoded_resp;
            $succeded = false;
            die;
        }

        if(!preg_match($patternMAIL, $email)){
            //Mail non rispetta il pattern
            $response=array(
                'success'=> false,
                'errmess'=> 4
            );

            $encoded_resp=json_encode($response);
            echo $encoded_resp;
            $succeded = false;
            die;
        }

        if(!preg_match($patternPW, $password)){
            //Password non rispetta il pattern
            $response=array(
                'success'=> false,
                'errmess'=> 5
            );

            $encoded_resp=json_encode($response);
            echo $encoded_resp;
            $succeded = false;
            die;
        }


        $queryUsername = "SELECT * FROM utenti U WHERE U.username = :username";
        $stmt = $connection->prepare($queryUsername);
        $stmt->bindParam(':username', $username);
        if ($stmt->execute()) {
            if ($stmt->rowCount() >= 1) {
                //Username già esistente
                $response=array(
                    'success'=> false,
                    'errmess'=> 1
                );

                $encoded_resp=json_encode($response);
                echo $encoded_resp;
                $succeded = false;
                die;
            }
        }
        else{
            //Errore "generico 13": errore nella query
            $response=array(
                'success'=> false,
                'errmess'=> 13
            );

            $encoded_resp=json_encode($response);
            echo $encoded_resp;
            $succeded = false;
            die;
        }

        $queryEmail = "SELECT * FROM utenti U WHERE U.email = :email";
        $stmt = $connection->prepare($queryEmail);
        $stmt->bindParam(':email', $email);
        if ($stmt->execute()) {
            if ($stmt->rowCount() >= 1) {
                //Mail già esistente
                $response=array(
                    'success'=> false,
                    'errmess'=> 2
                );

                $encoded_resp=json_encode($response);
                echo $encoded_resp;
                $succeded = false;
                die;
            }
        }
        else{
            //Errore nell'esecuzione della query
            $response=array(
                'success'=> false,
                'errmess'=> 13
            );

            $encoded_resp=json_encode($response);
            echo $encoded_resp;
            $succeded = false;
            die;
        }
        
        if($succeded ==true){
            $queryInsert = "INSERT INTO utenti (email, username, password) VALUES (:email, :username, :password)";
            $stmt = $connection->prepare($queryInsert);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);
            if ($stmt->execute()) {
                //Utente registrato correttamente nel DB
                $response=array(
                    'success'=> true,
                    'errmess'=> 0
                );
        
                $encoded_resp=json_encode($response);
                echo $encoded_resp;
            }
            else{
                $response=array(
                    'success'=> false,
                    'errmess'=> 13
                );
        
                $encoded_resp=json_encode($response);
                echo $encoded_resp;
                $succeded = false;
                die;
            }
        }
    }
    else{
        $response=array(
            'success'=> false,
            'errmess'=> 13
        );

        $encoded_resp=json_encode($response);
        echo $encoded_resp;
        $succeded = false;
        die;
    }
    
?>