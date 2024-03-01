<?php
include "connection.php";
if (isset($_GET['species'])) {
    $fn = $_GET['species'];
    $req = "SELECT * from species where familyName like '$fn'";
    $rez = $mysql->query($req);
    $species = array();
    $index = 0;
    // favorite mush
    $data = file_get_contents('php://input');
    $req2 = "SELECT * FROM favoritemus where user_id like '$data'";
    if (!$data) {
        if (isset($rez)) {
            foreach ($rez as $row) {
                $species[$index] = [
                    "name" => $row['name'],
                    "mainImg" => $row['main_imgs'],
                    "season" => $row['season'],
                    "habitat" => $row['habitat_img'],
                    "substrate" => $row['substrate_img'],
                    "use" => $row['use_img'],
                ];
                $index++;
            }
            echo json_encode($species);
        } else {
            echo "no result";
        }
    } else {

        if (isset($rez)) {
            $rez2 = $mysql->query($req2);
            foreach ($rez as $row) {
                $species[$index] = [
                    "name" => $row['name'],
                    "mainImg" => $row['main_imgs'],
                    "season" => $row['season'],
                    "habitat" => $row['habitat_img'],
                    "substrate" => $row['substrate_img'],
                    "use" => $row['use_img'],
                    "favorite" => getFav($fn, $row['name'], $rez2),
                ];
                $index++;
            }
            echo json_encode($species);
        } else {
            echo "no result";
        }
    }
} else {
    header("location: ../../index.php");
}
function getFav($fn, $sp, $rez2)
{
    $ch = 0;
    foreach ($rez2 as $row) {
        if ($row['name_sp'] == $sp && $row['name_fm'] == $fn) {
            return true;
        } else {
            $ch++;
        }
        if ($ch == mysqli_num_rows($rez2)) {
            return false;
        }
    }
    if ($ch == 0) {
        return false;
    }
}