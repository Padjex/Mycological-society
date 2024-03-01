<?php

include "connection.php";
if (isset($_GET['family'])) {
    $des = $_GET['family'];
    $req = "SELECT description from musfamily where name like '$des'";
    $rez = $mysql->query($req);
    $ch = 0;
    $sendDes;
    foreach ($rez as $row) {
        $ch++;
        $sendDes = $row['description'];
    }
    if ($ch == 1) {
        echo $sendDes;
    } else {
        echo "Још нема података за овај род.";
    }
} else {
    header("location: ../../index.php");
}