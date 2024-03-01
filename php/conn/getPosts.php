<?php
session_start();
include "connection.php";
if (isset($_GET['get'])) {
    $x = $_GET['get'];
    $req1 = "SELECT * FROM post ORDER BY time_post DESC limit 2 offset " . $x;
    $req2 = "SELECT COUNT(*) as 'num' FROM POST";
    $posts = $mysql->query($req1);
    $rez3 = $mysql->query($req2);
    foreach ($rez3 as $row) {
        $num['num'] = $row['num'];
    }
    $json = array();
    $index = 0;
    foreach ($posts as $post) {
        $json[$index] = [
            "postID" => $post['post_id'],
            "img" => $post['img_location'],
            "text" => $post['text'],
            "time" => $post['time_post'],
            "numOfImgs" => countImgs($post['img_location']),
            "numOfComments" => countComments($post['post_id'])
        ];
        if ($post['user_id']) {
            $json[$index]['creatorID'] = $post['user_id'];
        } elseif ($post['admin_id']) {
            $json[$index]['creatorID'] = $post['admin_id'];
        }
        getCreatorInfo($index, $json);
        getDetermination($index, $json);
        $index++;
    }
    // $json = json_encode($json);
    // $num = json_encode($num);
    echo json_encode(array($json, $num));
} else {
    header("location: ../../myProfile.php");
}

function getCreatorInfo($index, &$json)
{
    include "connection.php";
    $id = $json[$index]['creatorID'];
    $check = substr($id, 0, 1);
    if ($check == 'a') {
        $req2 = "SELECT * FROM admin where admin_id like '$id'";
    } else {
        $req2 = "SELECT * FROM user where user_id like '$id'";
    }
    $rez2 = $mysql->query($req2);
    foreach ($rez2 as $row) {
        $json[$index]['creatorName'] = $row['firstname'];
        $json[$index]['creatorLname'] = $row['lastname'];
        if (isset($row['member'])) {
            $json[$index]['member'] = $row['member'];
        } else {
            $json[$index]['title'] = $row['title'];
        }
    }
}
function countImgs($location)
{
    $numImgs = glob($location . "/*");
    $numImgs = count($numImgs);
    return $numImgs;
}
function getDetermination($index, &$json)
{
    include "connection.php";
    $pID = $json[$index]["postID"];
    $req = "SELECT determination.mus_name,determination.mus_family, determination.potvrda, admin.firstname,admin.lastname,admin.img,admin.title FROM determination inner JOIN admin on determination.admin_id = admin.admin_id WHERE determination.post_id LIKE '$pID'";
    $rez = $mysql->query($req);
    foreach ($rez as $row) {
        $json[$index]['musName'] = $row['mus_name'];
        $json[$index]['musFamily'] = $row['mus_family'];
        $json[$index]['check'] = substr_count($row['potvrda'], 'a');
        $json[$index]['aName'] = $row['firstname'];
        $json[$index]['aLname'] = $row['lastname'];
        $json[$index]['title'] = $row['title'];
        $json[$index]['det'] = "true";
    }
}
function countComments($postID)
{
    include "connection.php";
    $req = "select count(*) as br from com where post_id like '$postID'";
    $rez = $mysql->query($req);
    foreach ($rez as $row) {
        $p = $row['br'];
    }
    return $p;
}