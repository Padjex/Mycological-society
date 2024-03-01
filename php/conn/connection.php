<?php
$mysql = new mysqli("localhost", "root", "", "mycologydb");
if ($mysql->connect_error) {
    die("Конекција није успела, покушајте поново.");
}