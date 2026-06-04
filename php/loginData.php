<?php
    require_once("config.php");

    $username = $_POST["username"];
    $password = $_POST["password"];

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $selectQuery = "SELECT * FROM Utenti WHERE username = :username";
        $stmt = $connection->prepare($selectQuery);
        $stmt->bindParam(':username', $username);
        if ($stmt->execute()) {
            //Verifico l'esecuzione corretta della query
            if ($stmt->rowCount() == 1) {
                //Username presente nel database
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($password, $row['password'])) {
                    session_start();

                    $_SESSION['id']=$row['userID'];
                    $_SESSION['logged']=true;
                    $_SESSION['username']=$row['username'];

                    $response=array(
                        'success'=> true,
                        'errmess'=> 0
                    );
            
                    $encoded_resp=json_encode($response);
                    echo $encoded_resp;

                }
                else{
                    //Password errata
                    $response=array(
                        'success'=> false,
                        'errmess'=> 1
                    );
        
                    $encoded_resp=json_encode($response);
                    echo $encoded_resp;
                }
            }
            else{
                //Username inesistente
                $response=array(
                    'success'=> false,
                    'errmess'=> 2
                );
    
                $encoded_resp=json_encode($response);
                echo $encoded_resp;
            }    
        }
        else{
            //Query non eseguita correttamente
            $response=array(
                'success'=> false,
                'errmess'=> 13
            );
    
            $encoded_resp=json_encode($response);
            echo $encoded_resp;
        }    
    }
    else{
        //Richiesta non effettuata in post
        $response=array(
            'success'=> false,
            'errmess'=> 13
        );

        $encoded_resp=json_encode($response);
        echo $encoded_resp;
    }

    $connection=null;

?>