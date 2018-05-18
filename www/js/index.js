
var imgSrc = "";
var myPics = false;

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        $("#afterLogin").hide();
        $("#registroAlert").hide();
        $("#fotos").hide();
        $("#misFotos").hide();
        $("#searchByTag").hide();

        $("#login").click(function(){
            register("login");
        });
        $("#registro").click(function(){
            register("registro");
        });

        $("#foto").click(evtTakePicture);
        $("#guardarPic").click(savePic);
        $("#descartarPic").click(discardPic);
        $("#callMisFotos").click(mypicturesShowHide);
        $("#search").click(findByTags);
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

        myPics = false;

        options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imgSrc.substr(imgSrc.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = new Object();
        params.value1 = $("#namePic").val();
        params.value2 = $("#tagsPic").val();
        params.do = "new";

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

function mypicturesShowHide(){
    if($("#misFotos").is(":visible") == false){
        if(myPics == false){
            getMyPictures();
        }else{
            $("#misFotos").show();
        }
    }else{
        $("#misFotos").hide();
    }
}

function getMyPictures(){
    myPics = true;

    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: "http://alansintesis.000webhostapp.com/foto.php",
        //url: "http://localhost/sintesisPHP/login.php",
        data: {
            do: "my"
        },
        beforeSend: function () {
            console.log("SOLICITUD DE MIS FOTOS")
        },
        success: function (respJSON) {
            console.log(respJSON);

            var fotos = JSON.parse(respJSON);

            console.log(fotos);

            for (var i in fotos) {

                console.log(fotos[i])

                var del = $("<div class='btn btn-danger' title='" + fotos[i].id + "'>ELIMINAR</div>");
                del.click(delFoto);

                var dg = $("<div class='row'></div>")

                var pic = $("<div class='col-6'>" +
                    "<img style='width: 100%; height: 100%' title='" + fotos[i].nombre + "' src='" + fotos[i].url + "'>" +
                    "</div>");
                var pic2 = $("<div class='col-6'>" + fotos[i].tags + "</div>");
                pic2.append(del)

                dg.append(pic, pic2);

                //$("#misFotos").append(del);
                $("#misFotos").append(dg);
            }
            $("#misFotos").show();
        }
    });
}

function findByTags(){
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: "http://alansintesis.000webhostapp.com/foto.php",
        //url: "http://localhost/sintesisPHP/login.php",
        data: {
            do: "tags",
            search: $("#findTags").val()
        },
        beforeSend: function () {
            console.log("SOLICITUD DE FOTOS POR TAGS")
        },
        success: function (respJSON) {
            console.log(respJSON);

            if (respJSON != "empty") {

                var fotos = JSON.parse(respJSON);

                console.log(fotos);

                for (var i in fotos) {

                    var pic = "<div class='col-6'>" +
                        "<img style='width: 100%; height: 100%' title='" + fotos[i].nombre + "' src='" + fotos[i].url + "'>" +
                        "</div><br>" + fotos[i].tags;

                    $("#searchByTag").append(pic);
                }
                $("#searchByTag").show();
            }
        }
    });
}

function delFoto(){
    console.log("entra")

    var id = this.getAttribute("title");

    console.log(id);

    $(this).parent("div").parent("div").remove()

    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: "http://alansintesis.000webhostapp.com/foto.php",
        data: {
            do: "delete",
            id: id
        },
        beforeSend: function () {
            console.log("SOLICITUD DE BORRAR FOTO")
        },
        success: function (respJSON) {
            console.log("deleted")
        }
    });
}

app.initialize();