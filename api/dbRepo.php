<?php
require("../api/dbhandler.php");

class dbRepo {
    function __construct() {
      $this->db = new Database();
}


    function getDb() {
        $result = $this->db->fetchQuery("SELECT * FROM user ORDER BY highscore DESC LIMIT 3");
        $userArray = $this->createList($result);
        return $userArray;
    }

    function createList($array) {
        $userArray = array();
        foreach ($array as $item) { 
            array_push($userArray, $item);
        }
        return $userArray;
    }

    function insertIntoDb($name, $highscore) {
        $query = ('INSERT INTO user (name, highscore) VALUES (:name, :highscore)');

        $entity = array(':name' => $name, ':highscore' => $highscore);

        $this->db->runQuery($query, $entity);

        return "success";
    }
 
    function fetchUserScore($name) {
        $userScore = $this->db->fetchQuery("
        SELECT highscore, name 
        FROM user 
        WHERE name = '$name'
        ORDER BY userId 
        DESC LIMIT 1");

        return $userScore;
    }
 







}

