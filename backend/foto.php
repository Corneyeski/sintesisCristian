<?php
header('Access-Control-Allow-Origin: *');
//$q = intval($_GET['q']);

$con = mysqli_connect('localhost','id5735804_alan','1hermano','id5735804_sintesis');
//$con = mysqli_connect('localhost','root','','sintesis');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

//echo get_included_files();

//print_r($_FILES);
$new_image_name = "YEAH.jpg";
move_uploaded_file($_FILES["file"]["tmp_name"], "/storage/ssd4/804/5735804/public_html/fotos/".$new_image_name);

//mysqli_select_db($con,"sintesis");
mysqli_select_db($con,"id5735804_sintesis");

mysqli_close($con);