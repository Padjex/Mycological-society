<?php
session_start();
include "connection.php";
if ($_GET['com'] == 'get') {
    $idP = file_get_contents("php://input");
    $req = "SELECT * FROM com  where post_ID like '$idP' ORDER BY time";
    $data = $mysql->query($req);
    $comm = array();
    $index = 0;
    $hmtlElement = '';
    if (isset($data)) {
        foreach ($data as $row) {
            $comm[$index] = [
                'text' => $row['text'],
                'comID' => $row['comment_id']
            ];
            if ($row['user_id']) {
                $comm[$index]['uID'] = $row['user_id'];
            } elseif ($row['admin_id']) {
                $comm[$index]['aID'] = $row['admin_id'];
            }
            getInfoUser($index, $comm);
            $index++;
        }
        echo json_encode($comm);
    }
} elseif ($_GET['com'] == 'add') {
    if (isset($_SESSION['adminID']) or isset($_SESSION['userID'])) {
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $text = $data['text'];
        $pID = $data['pid'];
        $uID = isset($_SESSION['userID']) ? $_SESSION['userID'] : $_SESSION['adminID'];
        $rID = isset($_SESSION['userID']) ? 'user_id' : 'admin_id';
        $req = "INSERT INTO com (post_id,$rID,text) values ('$pID','$uID','$text')";
        if ($mysql->query($req) === true) {
            $req2 = "SELECT MAX(comment_id) as maxID from com";
            $rez2 = $mysql->query($req2);
            foreach ($rez2 as $row) {
                $maxId = $row['maxID'];
            }
            echo $maxId;
        } else {
            echo 'error';
        }
    } else {
        header("location: ../../library.php");
    }
} elseif ($_GET['com'] == 'del') {
    if (isset($_SESSION['adminID']) or isset($_SESSION['userID'])) {
        $data = file_get_contents("php://input");
        $req = "DELETE FROM com where comment_id like '$data'";
        if ($mysql->query($req)) {
            echo "success";
        } else {
            echo $mysql->error;
        }
    } else {
        header("location: ../../library.php");
    }
}
function getInfoUser($index, &$comm)
{
    include "connection.php";
    // echo $data['aID'];
    if (isset($comm[$index]['uID'])) {
        $id = $comm[$index]['uID'];
        $req2 = "SELECT firstname,lastname,member from user where user_id like '$id'";
    } elseif (isset($comm[$index]['aID'])) {
        $id = $comm[$index]['aID'];
        $req2 = "SELECT firstname,lastname,title, img from admin where admin_id like '$id'";
    }
    $commInfo = $mysql->query($req2);
    foreach ($commInfo as $row) {
        $comm[$index]['creatorName'] = $row['firstname'];
        $comm[$index]['creatorLname'] = $row['lastname'];
        if (isset($row['member'])) {
            $comm[$index]['title'] = $row['member'];
        } else {
            $comm[$index]['title'] = $row['title'];
            $comm[$index]['img'] = $row['img'];
        }
    }
}