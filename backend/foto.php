<?php
header('Access-Control-Allow-Origin: *');
session_start();
//$q = intval($_GET['q']);

$con = mysqli_connect('localhost','id5735804_alan','1hermano','id5735804_sintesis');
//$con = mysqli_connect('localhost','root','','sintesis');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

//echo get_included_files();

//print_r($_FILES);

//echo $_POST['value1'];

$new_image_name = $_POST['value1'].".jpg";
$url = "/storage/ssd4/804/5735804/public_html/fotos/".$new_image_name;
move_uploaded_file($_FILES["file"]["tmp_name"], $url);

//mysqli_select_db($con,"sintesis");
mysqli_select_db($con,"id5735804_sintesis");

echo $_SESSION['id'];

$sqlInsert="INSERT INTO `foto` (`id`, `usuario`, `tag`, `nombre`, `url`) VALUES(NULL,". $_SESSION['id'] .",'".$_POST['value2']."','".$_POST['value1']."','".$url."')";
$result = mysqli_query($con,$sqlInsert);

echo $result;

mysqli_close($con);