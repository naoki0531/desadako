<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

echo json_encode($request->time . 'でサーバー打刻しました！');