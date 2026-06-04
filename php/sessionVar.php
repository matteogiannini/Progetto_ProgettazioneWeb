<?php
    session_start();

    if(isset($_SESSION['id'])){
        $response = array(
            'id'=>$_SESSION['id'],
            'logged'=>$_SESSION['logged'],
            'username'=>$_SESSION['username']
        );
    }

    else{
        $response = array(
            'logged'=>false
        );
    }


    $encoded_resp=json_encode($response);
    echo $encoded_resp;
?>

