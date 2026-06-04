<?php
    require_once("config.php");

    $req = $_POST['tor'];

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        if($req==='leaderboard'){
            $scorequery = "SELECT U.username AS username, MAX(P.score) AS maxscore, MAX(P.level) AS maxlev 
                        FROM partite P 
                        INNER JOIN Utenti U 
                        ON P.userid=U.userID 
                        GROUP BY U.username
                        ORDER BY maxscore DESC
                        LIMIT 3";
            $scorequeryprep = $connection->prepare($scorequery);
            $success=$scorequeryprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $scorequeryprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $rows = array();
            $rows=$scorequeryprep->fetchAll(PDO::FETCH_ASSOC);
            $numrows = count($rows);

            $response = array(
                'success' => true,
                'numRows' => count($rows),
                'result' => $rows
            );

            $json_response=json_encode($response);

            echo $json_response;
        }
        else if($req==='numstats'){
           $numgames = "SELECT COUNT(*) as numgames FROM partite P";
           $numgamesprep = $connection->prepare($numgames);
           $success=$numgamesprep->execute();
           if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $numgamesprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
           $result = $numgamesprep->fetch(PDO::FETCH_ASSOC);
           $numgames = $result['numgames'];

           $AVGPlayer = "SELECT FLOOR(COUNT(*)/COUNT(DISTINCT userid)) AS avggames
                        FROM partite P";
           $AVGprep = $connection->prepare($AVGPlayer);
           $success=$AVGprep->execute();
           if(!$success){
            $response = array(
                'success' => false,
                'errinfo' => $AVGprep->errorInfo()
            );

            $json_response=json_encode($response);

            echo $json_response;
            die;
            }
           $result = $AVGprep->fetch(PDO::FETCH_ASSOC);
           $avggames = $result['avggames'];
           
           $maxgames = "SELECT U.username as user, COUNT(*) AS games_played
                        FROM partite P
                        INNER JOIN Utenti U
                        ON P.userid=U.userID
                        GROUP BY P.userid
                        ORDER BY games_played DESC
                        LIMIT 1";
            $maxprep = $connection->prepare($maxgames);
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
            $result = $maxprep->fetch(PDO::FETCH_ASSOC);
            $maxgamesUN = $result['user'];
            $maxgames = $result['games_played'];

            $response = array(
                'success'=>true,
                'numgames'=>$numgames,
                'avggames'=>$avggames,
                'maxgamesun'=>$maxgamesUN,
                'maxgames'=>$maxgames
            );

            $json_response=json_encode($response);

            echo $json_response;
            
        }
        else if($req==='timestats'){
            $totquery = "SELECT SUM(duration) AS totdur FROM partite P";
            $totprep = $connection->prepare($totquery);
            $success=$totprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $totprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $totprep->fetch(PDO::FETCH_ASSOC);
            $totdur = $result['totdur'];

            $avgdur = "SELECT AVG(duration) AS avgdur FROM partite P";
            $avgprep = $connection->prepare($avgdur);
            $success=$avgprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $avgprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $avgprep->fetch(PDO::FETCH_ASSOC);
            $avgdur = $result['avgdur'];

            $maxdur = "SELECT U.username as user, SUM(P.duration) AS maxdur
                        FROM partite P
                        INNER JOIN Utenti U
                        ON P.userid=U.userID
                        GROUP BY P.userid
                        ORDER BY duration DESC
                        LIMIT 1";
            $maxdurprep = $connection->prepare($maxdur);
            $success=$maxdurprep->execute();
            if(!$success){
                $response = array(
                    'success' => false,
                    'errinfo' => $maxdurprep->errorInfo()
                );
    
                $json_response=json_encode($response);
    
                echo $json_response;
                die;
            }
            $result = $maxdurprep->fetch(PDO::FETCH_ASSOC);
            $maxdur = $result['maxdur'];
            $maxdurUN = $result['user'];

            $response = array(
                'success'=>true,
                'totdur'=>$totdur,
                'avgdur'=>$avgdur,
                'maxdur'=>$maxdur,
                'maxdurun'=>$maxdurUN
            );

            $json_response=json_encode($response);

            echo $json_response;

        }
        else{
            echo "Richiesta non accettata dal server";
            die;
        }
    }
    else{
        echo "Richiesta non di tipo POST";
        die;
    }






?>