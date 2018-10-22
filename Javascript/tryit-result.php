<?php
header("X-XSS-Protection: 0");

$code = '';

if (isset($_POST['code'])) {
    $code = $_POST['code'];
}

echo $code;
?>