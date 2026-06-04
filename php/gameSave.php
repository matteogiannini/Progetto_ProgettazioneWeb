<?php
    require_once("config.php");
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $jsonData = file_get_contents('php://input');
        $data = json_decode($jsonData, true);
        
        $userID = $data['userID'];
        $score = $data['score'];
        $duration = $data['duration'];
        $timestamp = $data['datetime'];
        $levelreached = $data['level'];
        $usrreq=$data['req'];
        if($usrreq==="GameSave"){
            $queryInsert = "INSERT INTO partite (userid, score, duration, timestamp, level) VALUES (:userid, :score, :duration, :timestamp, :level)";
            $stmt = $connection->prepare($queryInsert);
            $stmt->bindParam(':userid', $userID);
            $stmt->bindParam(':score', $score);
            $stmt->bindParam(':duration', $duration);
            $stmt->bindParam(':timestamp', $timestamp);
            $stmt->bindParam(':level', $levelreached);
            if ($stmt->execute()) {
                echo "Inserimento successfull";
            }
            else{
                echo "Error";
            }
        }
        else{
            echo "Error";
        }   
    }
    else{
        echo "Error";
    }
    
   

    $connection=null;





?>