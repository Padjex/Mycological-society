<?php
session_start();
include "connection.php";
if (isset($_SESSION['adminID'])) {
    if ($_GET['det'] == "fam") {
        $req1 = "SELECT name from musfamily";
        $rez1 = $mysql->query($req1);
        $fnames = array();
        $index1 = 0;
        foreach ($rez1 as $row) {
            $fnames[$index1] = $row;
            $index1++;
        }
        $req2 = "SELECT familyName, name from musspecies";
        $rez2 = $mysql->query($req2);
        $snames = array();
        $index2 = 0;
        foreach ($rez2 as $row) {
            $snames[$index2] = [
                'fn' => $row["familyName"],
                'sn' => $row['name']
            ];
            $index2++;
        }
        echo json_encode(array($fnames, $snames));
    } elseif ($_GET['det'] == 'set') {
        $data = file_get_contents("php://input");
        $data = json_decode($data, true);
        $adminid = $_SESSION["adminID"];
        $fn = $data['fn'];
        $sn = $data['sn'];
        $postID = $data['pID'];

        $req3 = "INSERT into determination (admin_id,mus_family,mus_name,post_id) values ('$adminid','$fn','$sn','$postID')";
        $rez3 = $mysql->query($req3);
        if ($rez3 === true) {
            echo "success";
        } else {
            echo $mysql->error;
        }
    } elseif ($_GET['det'] == "confirm") {
        $data = file_get_contents("php://input");
        $req4 = "SELECT admin_id,potvrda from determination where post_id like '$data'";
        $rez4 = $mysql->query($req4);
        foreach ($rez4 as $row) {
            $adminID = $row['admin_id'];
            $confirm = $row['potvrda'];
        }
        if ($adminID == $_SESSION['adminID']) {
            $pos = strpos(strval($confirm), strval($_SESSION['adminID']));
            echo "error1";
        } else {
            $p = strpos(strval($confirm), strval($_SESSION['adminID']));
            // null and 0 is the equal when use ==,  and strpos return null when first string in null?
            if ($p == null && $p !== 0) {
                if ($confirm != null) {
                    $confirm = $confirm . ',' . $_SESSION['adminID'];
                } else {
                    $confirm = $_SESSION['adminID'];
                }
                $req5 = "UPDATE determination set potvrda = '$confirm' where post_id like '$data'";
                $rez5 = $mysql->query($req5);
                if ($rez5) {
                    echo 'success';
                } else {
                    echo "error";
                }
            } else {
                echo "error2";
            }
        }
    } else {
        echo "error";
    }
} else {
    header("location: ../../library.php");
}