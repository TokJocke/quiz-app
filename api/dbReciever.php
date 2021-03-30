<?php

try {
    
    if (isset($_SERVER["REQUEST_METHOD"])) { //IF SERVER
        require("../api/dbRepo.php");
 
    
        if ($_SERVER["REQUEST_METHOD"] == "GET") { //IF METHOD = GET
            if(isset($_GET["result"])) {
                $db = new dbRepo();
                echo json_encode($db->fetchUserScore($_GET["result"]));  
 
                /* echo json_encode("asdsd"); */
 
            }
            else {
                $db = new dbRepo();
                echo json_encode($db->getDb());
            }
            
       
        }
        else if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $playerInfo = json_decode($_POST["playerInfo"]);
            

            $db = new dbRepo();
            echo json_encode($db->insertIntoDb($playerInfo[1], $playerInfo[0]));   //mata in highscore från avslutat spel
          
        } 
    }
}
catch (Exception $e) { // om error har felmeddelande
    http_response_code($e->getCode());
    echo json_encode(array("status" => $e->getCode(), "Message" => $e->getMessage()));
}