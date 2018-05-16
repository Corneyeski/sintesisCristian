
var imgSrc = ""

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        $("#afterLogin").hide();
        $("#registroAlert").hide();
        $("#fotos").hide();
        $("#misFotos").hide();

        $("#login").click(function(){
            register("login");
        });
        $("#registro").click(function(){
            register("registro");
        });

        $("#foto").click(evtTakePicture);
        $("#guardarPic").click(savePic);
        $("#descartarPic").click(discardPic);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
    }
};

function register(whatToDo) {

    if($("#email").val() != "" && $("#password").val() != "") {

        console.log($("#email").val() + " ----- " + $("#password").val() + " --------- " + whatToDo)

        $.ajax({
            type: "POST",
            dataType: "html",
            jsonp: "callback",
            url: "http://alansintesis.000webhostapp.com/login.php",
            //url: "http://localhost/sintesisPHP/login.php",
            data: {
                do: whatToDo,
                email: $("#email").val(),
                password: $("#password").val()
            },
            beforeSend: function () {
                console.log("ENVIA")
            },
            success: function (respJSON) {
                console.log(respJSON)
                $("#registroAlert").hide();
                if(whatToDo == "login"){
                    if (respJSON == "true"){
                        //window.location = "main.html"
                        $("#loginWindow").hide();
                        $("#afterLogin").show();
                    }
                }else if(respJSON == "false"){
                    $("#registroAlert").show();
                }
            }
        });
    }
}
function evtTakePicture() {
    navigator.camera.getPicture(takePictureSuccess, onFail, {quality: 100
        , saveToPhotoAlbum: true
        ,destinationType: navigator.camera.DestinationType.FILE_URI
        , sourceType: navigator.camera.PictureSourceType.CAMERA});
}
function takePictureSuccess(imageData) {
    $("#myImg").attr("src", imageData);
    $("#fotos").show();
    imgSrc = imageData

    //TODO CODIGO PARA SUBIRLA FUNCIONA
    /*var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageData, "http://alansintesis.000webhostapp.com/foto.php", win, fail, options);*/
}

function win(r) {
    console.log("alta correcta..")
    console.log(r)
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

function onFail() {
    $("#myImg").attr("src", imageURI);
}

function savePic(){
    if($("#namePic").val() != "" && $("#tagsPic").val() != "") {
        options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imgSrc.substr(imgSrc.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = new Object();
        params.value1 = $("#namePic").val();
        params.value2 = $("#tagsPic").val();

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imgSrc, "http://alansintesis.000webhostapp.com/foto.php", win, fail, options);
    }else{
        alert("Tienes que introducir un nombre y un tag!")
    }
}

function discardPic(){
    $("#myImg").attr("src","");
    $("#fotos").hide();
}

app.initialize();