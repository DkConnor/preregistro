
$(document).ready(function(){

    let nombre;
    let contrasenia;

    $('#btn_sesion').click(function(){

        nombre = $('#nombre').val();
        contrasenia = $('#password').val();

        recolector = "bandera_nombre=" + nombre + 
                     "&bandera_contrasenia=" + contrasenia;

        $.ajax({
            type: 'POST',
            data: recolector,
            url: './control/control_login.php',
            success: function(r){
                console.log(r);
            }
        });

    });
});