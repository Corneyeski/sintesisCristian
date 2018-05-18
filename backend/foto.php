<?php
header('Access-Control-Allow-Origin: *');
session_start();
//$q = intval($_GET['q']);

$con = mysqli_connect('localhost','id5735804_alan','1hermano','id5735804_sintesis');
//$con = mysqli_connect('localhost','root','','sintesis');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}
mysqli_select_db($con,"id5735804_sintesis");
//mysqli_select_db($con,"sintesis");

if($_POST['do'] == "new"){
    $new_image_name = $_POST['value1'].".jpg";
    $url = "http://alansintesis.000webhostapp.com/fotos/".$new_image_name;
    $urlToSave = "/storage/ssd4/804/5735804/public_html/fotos/".$new_image_name;
    move_uploaded_file($_FILES["file"]["tmp_name"], $urlToSave);


    echo $_SESSION['id'];

    $sqlInsert="INSERT INTO `foto` (`id`, `usuario`, `tag`, `nombre`, `url`) VALUES(NULL,". $_SESSION['id'] .",'".$_POST['value2']."','".$_POST['value1']."','".$url."')";
    $result = mysqli_query($con,$sqlInsert);

}else if($_POST['do'] == "my"){

    $sqlInsert="SELECT * FROM `foto` WHERE usuario = ".$_SESSION['id'];
    $result = mysqli_query($con,$sqlInsert);

    if(mysqli_num_rows($result) > 0){

        $results = [];

        while($row = $result->fetch_assoc()) {

            $foto = [
              "id" => $row["id"],
              "url" => $row["url"],
              "tags" => $row["tag"],
              "nombre" => $row["nombre"]
            ];

            array_push($results, $foto);
        }

        echo json_encode($results);

    }  else {
        echo "empty o falla";
    }
}else if($_POST['do'] == "tags"){
    $sqlInsert="SELECT * FROM `foto` WHERE tag LIKE '".$_POST['search']."'";
    $result = mysqli_query($con,$sqlInsert);

    if(mysqli_num_rows($result) > 0){

        $results = [];

        while($row = $result->fetch_assoc()) {

            $foto = [
              "url" => $row["url"],
              "tags" => $row["tag"],
              "nombre" => $row["nombre"]
            ];
            array_push($results, $foto);
        }

        echo json_encode($results);

    }  else {
        echo "empty";
    }
}else if($_POST['do'] == "delete"){

    $sqlInsert="DELETE FROM `foto` WHERE id LIKE ".$_POST['id'];
    $result = mysqli_query($con,$sqlInsert);

}
mysqli_close($con);