<?php
    try{
        $connectionString = "mysql:host=127.0.0.1;dbname=giannini_615729";
        $user = "root";
        $password = "";

        $connection = new PDO($connectionString, $user, $password);
    }
    catch (PDOException $e){
        
        die("Connection error: " . $e->getMessage());
    }

?>