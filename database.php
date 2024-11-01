<?php

$db_host = getenv("DB_HOST");
$db_port = getenv("DB_PORT");
$db_user = getenv("DB_USER");
$db_pass = getenv("DB_PWD");

$conn = pg_connect("host=$db_host port=$db_port dbname=genji user=$db_user password=$db_pass");
if (!$conn) {
    error_log("Connection failed: " . pg_last_error($conn));
    die("An error occurred. Please try again later.");
}
