<?php
header('Access-Control-Allow-Origin: *');
//$q = intval($_GET['q']);

$con = mysqli_connect('localhost','id5735804_alan','1hermano','id5735804_sintesis');
//$con = mysqli_connect('localhost','root','','sintesis');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}
$email = $_POST['email'];
$password = $_POST['password'];
$do = $_POST['do'];
$check = false;

//mysqli_select_db($con,"sintesis");
mysqli_select_db($con,"id5735804_sintesis");

if( $do == "registro"){
    
    $sql= "SELECT * FROM usuario where email ='" . $email."'";
    $result = mysqli_query($con,$sql);
    
    if(mysqli_num_rows($result) > 0){
        $check = true;
        echo $check ? 'true' : 'false';
        
    }else {
        if($check == false){
            $sqlInsert="INSERT INTO `usuario` (`id`, `email`, `password`) VALUES(NULL,'".$email."','".$password."')";
            $result = mysqli_query($con,$sqlInsert);
        }
        echo $check ? 'true' : 'false';
    }
}else{
    $sql="SELECT * FROM usuario WHERE email ='" . $email."' and password ='".$password."'";
    $result = mysqli_query($con,$sql);
    
    if(mysqli_num_rows($result) > 0){
        $check = true;
    }
    echo $check ? 'true' : 'false';
}

mysqli_close($con);