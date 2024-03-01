<?php
include "connection.php";
$req = "SELECT * FROM ADMIN";
$rez = $mysql->query($req);
$data = array();
$index = 0;
if (isset($rez)) {
    foreach ($rez as $row) {
        $data[$index] = [
            "id" => $row['admin_id'],
            "fname" => $row['firstname'],
            "lname" => $row['lastname'],
            "title" => $row['title'],
            "img" => $row['img']
        ];
        $index++;
    }
    $data = json_encode($data);
    echo $data;
} else {
    echo "error";
}