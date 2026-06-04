<?php

    require_once("config.php");
    session_start();

    //Recupero le variabili di sessione
    $userid = $_SESSION['id'];
    $req = $_POST['tor'];
    

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        if($req === 'userStats'){ 
            //Richiesta partite effettuate dall'utente
            $numquery = "SELECT COUNT(*) as numgames FROM partite P WHERE P.userid=:userid";
            $numgamesprep = $connection->prepare($numquery);
            $numgamesprep->bindParam(':userid',$userid);
            $success=$numgamesprep->execute();
            $result=$numgamesprep->fetch(PDO::FETCH_ASSOC);
            $numgames = $result['numgames'];
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $mqp->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $matchesquery = "SELECT score, duration, timestamp, level FROM partite P WHERE P.userid=:userid ORDER BY P.gameid DESC LIMIT 20";
            $mqp = $connection->prepare($matchesquery);
            $mqp->bindParam(':userid',$userid);
            $success=$mqp->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $mqp->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $rows = array();
            

            //Inserisco tutte le righe all'interno dell'array associativo
            $rows = $mqp->fetchAll(PDO::FETCH_ASSOC);

            $response = array(
                'success' => true,
                'numRows' => $numgames,
                'result' => $rows
            );

            $json_response=json_encode($response);

            echo $json_response;
        }
        else if($req === 'userPosition'){
            //Recupero il punteggio massimo realizzato dall'utente
            $queryMAX = "SELECT MAX(score) AS max_punteggio FROM partite P WHERE P.userid = :userid";
            $maxprep = $connection->prepare($queryMAX);
            $maxprep->bindParam(':userid', $userid);
            $success=$maxprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $maxprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result=$maxprep->fetch(PDO::FETCH_ASSOC);
            $maxScore = $result['max_punteggio'];
            //Recupero la posizione in classifica dell'utente
            $queryPos = "SELECT userid AS user, MAX(score) AS highest_score
                        FROM partite P
                        GROUP BY userid
                        ORDER BY highest_score DESC";
            $posprep = $connection->prepare($queryPos);
            $success=$posprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $posprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $rows = $posprep->fetchAll(PDO::FETCH_ASSOC);
            $position = null;
            //Ciclo di tutto l'array in cui mantengo per ogni posizione indice e contenuto della riga
            foreach ($rows as $index => $row) {
                if ($row['user'] == $userid) {
                    $position = $index +1;
                    break;
                }
            }
            $response = array(
                'success' => true,
                'max' => $maxScore,
                'result' => $position
            );

            $json_response=json_encode($response);
            echo $json_response;
        }
        else if ($req === 'generalStats'){
            //Recupero il punteggio medio
            $queryAVGScore = "SELECT AVG(score) AS punteggiomedio FROM partite P WHERE P.userid = :userid";
            $AVGscoreprep = $connection->prepare($queryAVGScore);
            $AVGscoreprep->bindParam(':userid', $userid);
            $success=$AVGscoreprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $AVGscoreprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $AVGscoreprep->fetch(PDO::FETCH_ASSOC);
            $AVGScore = $result['punteggiomedio'];
            //Recupero la somma della durata di tutte le partite
            $queryDurata = "SELECT SUM(duration) AS sommadur FROM partite P WHERE P.userid= :userid";
            $Durprep = $connection->prepare($queryDurata);
            $Durprep->bindParam(':userid',$userid);
            $success=$Durprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $Durprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $Durprep->fetch(PDO::FETCH_ASSOC);
            $dur = $result['sommadur'];

            //Recupero la durata media delle partite
            $queryAVGDurata = "SELECT AVG(duration) AS duratamedia FROM partite P WHERE P.userid = :userid";
            $AVGdurprep = $connection->prepare($queryAVGDurata);
            $AVGdurprep->bindParam(':userid',$userid);
            $success=$AVGdurprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $AVGdurprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $AVGdurprep->fetch(PDO::FETCH_ASSOC);
            $AVGdur = $result['duratamedia'];

            //Recupero il livello a cui l'utente si è fermato più frequentemente
            $MFLevelquery = "SELECT level
                    FROM partite P
                    WHERE P.userid = :userid
                    GROUP BY P.level
                    ORDER BY COUNT(*) DESC
                    LIMIT 1";
            $MFLprep = $connection->prepare($MFLevelquery);
            $MFLprep->bindParam(':userid',$userid);
            $success=$MFLprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $MFLprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $MFLprep->fetch(PDO::FETCH_ASSOC);
            $MFL = $result['level'];

            //Recupero il livello massimo raggiunto dall'utente
            $MAXLevquery = "SELECT MAX(level) as maxlev FROM partite P WHERE P.userid=:userid";
            $MAXLevprep = $connection->prepare($MAXLevquery);
            $MAXLevprep->bindParam(':userid',$userid);
            $success=$MAXLevprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $MAXLevprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $MAXLevprep->fetch(PDO::FETCH_ASSOC);
            $MAXLev = $result['maxlev'];

            $response = array(
                'success' => true,
                'avg' => $AVGScore,
                'dur' => $dur,
                'avgdur' => $AVGdur,
                'maxlev' => $MAXLev,
                'mfl' => $MFL
            );
            
            $json_response=json_encode($response);
            echo $json_response;

        }
        else{
            //Richiesta non riconosciuta dal server
            echo "Richiesta non accettata dal server";
            die;
        }
    }
    else{
        //Richiesta non effettuata in POST e quindi non autorizzata
        echo "Richiesta non di tipo POST";
        die;
    }