<?php
include "connection.php";
if (isset($_GET['fn'])) {
    $fn = $_GET['fn'];
    $sn = $_GET['sn'];
    $req = "SELECT * FROM musspecies where name like '$sn' and familyName like '$fn'";
    $rez = $mysql->query($req);
    if (isset($rez)) {
        foreach ($rez as $row) {
            $data = [
                "about" => $row['about'],
                "taxonomy" => $row['taxonomy'],
                "etymology" => $row['etymology'],
                "cap" => $row['cap'],
                "cap_img" => $row['cap_img'],
                "gills" => $row['gills'],
                "gills_img" => $row['gills_img'],
                "stem" => $row['stem'],
                "stem_img" => $row['stem_img'],
                "spores" => $row['spores'],
                "spores_img" => $row['spores_img'],
                "taste" => $row['taste'],
                "habitat" => $row['habitat'],
                "season" => $row['season'],
                "similarSp" => $row['similarSp'],
                "main_imgs" => $row['main_imgs'],
                "musSection" => $row['musSection'],
                "musSection_img" => $row['musSection_img']
            ];
        }
        $data = json_encode($data);
        echo $data;
    } else {
        echo "error";
    }
} else {
    header("location: ../../library.php");
}