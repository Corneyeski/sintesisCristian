var email = "";

$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $("#register-submit").click(register);

});

function register() {

    console.log("llega " + $("#name").val() +" "+ $("#email").val() +" " + $("#empresa").val())

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType:'application/json',
        url: "http://localhost:8080/newuser",
        data: {
            name: $("#name").val(),
            email: $("#email").val(),
            empresa: $("#empresa").val()
        },
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {

        }
    });
}

function checkEmail() {
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType:"text/plain",
        url: "http://localhost:8080/checkemail/"+email,
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {

        }
    });
}