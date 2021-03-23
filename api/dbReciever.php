<?php

try {
    
    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../api/dbRepo.php");
 
    
        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
            
            $db = new dbRepo();
            echo json_encode($db->getDb());
       
        }
        else if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $name = $_POST["nameInput"];

             $db = new dbRepo();
             $db->insertIntoDb($name, 1950);   //mata in highscore från avslutat spel
             echo json_encode("success");  
            
        } 
    }
}
catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}