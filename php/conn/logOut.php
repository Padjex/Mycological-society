<?php
session_start();
if ($_GET['logOut'] == true) {
    session_destroy();
}