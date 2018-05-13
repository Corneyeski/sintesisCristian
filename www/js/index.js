
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        $("#fotos").hide();
        $("#registroAlert").hide();

        $("#login").click(function(){
            register("login");
        });
        $("#registro").click(function(){
            register("registro");
        });

        $("#foto").click(evtTakePicture)
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
                        $("#fotos").show();
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
        ,destinationType: navigator.camera.DestinationType.DATA_URL
        , sourceType: navigator.camera.PictureSourceType.CAMERA});
}
function takePictureSuccess(imageData) {
    $("#myImg").attr("src", "data:image/jpeg;base64," + imageData);
}

function evtGetPicture() {
    navigator.camera.getPicture(getPictureSuccess, onFail, {
        destinationType: navigator.camera.DestinationType.FILE_URI
        , sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
}
function getPictureSuccess(imageURI) {
    $("#myImg").attr("src", imageURI);
}

function onFail() {
    $("#myImg").attr("src", imageURI);
}

app.initialize();