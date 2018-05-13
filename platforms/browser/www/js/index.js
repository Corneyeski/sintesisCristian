
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
            //url: "http://alansintesis.000webhostapp.com/login.php",
            url: "http://localhost/sintesisPHP/login.php",
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

app.initialize();