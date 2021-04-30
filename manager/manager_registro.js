$(document).ready(function(){

    function valida_confirmacion_password(){
        if($('#registro_password').val() != $('#registro_password_confirmacion').val()){
            swal('Upps', 'Las contraseñas no coinciden, favor de verificar', 'warning');
            $('#registro_password_confirmacion').val("");
            return false;
        }else{
            registro_password = $('#registro_password').val();
            //A partir de aqui usen la nomenclatura para su ajax q mas les agrade

            //Recoleccion de datos validados
            recolector_de_informacion = "registro_nombre" + registro_nombre + 
                                        "&registro_paterno" + registro_paterno + 
                                        "&registro_materno" + registro_materno + 
                                        "&registro_fecha_nacimiento" + registro_fecha_nacimiento +
                                        "&registro_telefono" + registro_telefono +
                                        "&registro_carrera" + registro_carrera + 
                                        "&registro_mail" + registro_mail + 
                                        "&registro_password" + registro_password;

            $.ajax({

                type: 'POST',
                data: recolector_de_informacion,
                url: 'control/control_registro.php',
                success: resultado => {
                    //Dejare pendiente aqui apra trabajar en el control 1 min para copiar
                }

            });

        }
    }

    function valida_confirmacion_email(){
        //Garantizamos que mail y su confirmacion sean iguales
        //la funcion pasada ya nos esta diciendo que o esta bien o esta bien asi que esta validacion
        //es mas corta
        if($('#registro_mail').val() != $('#registro_mail_confirmacion').val()){
            //De no ser iguales, avisamos y limpiamos el campo para obligar al usuario a reingresar el mail
            swal('Upps', 'Los emails no coinciden, favor de verificar', 'warning');
            $('#registro_mail_confirmacion').val(""); // limpiamos el control
            return false;// paramos el flujo 
        }else{
            // al ser iguales
            registro_mail = $('#registro_mail').val();//guardo el valor del primer mail
            valida_confirmacion_password();//invoco siguiente validacion
        }
    }

    function valida_construcción_email(){
        cadena = s('#registro_mail').val();//lectura del control HTML
        //RegExp para validar construccion de email (no es mia, la encontré pero aplica muy bien)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(cadena)){
            //De ser positiva nos lanzamos a la siguiente validacion
            valida_confirmacion_email();
        }else{
            //de ser negativa avisamos
            swal('Upps', 'Ingresa un email valido por favor', 'warning');
            return false;
        }
    }

    function valida_seleccion_carrera(){
        carrera=$('#registro_carrera').val();
        carrera=carrera.toUpperCase();
        if(carrera == 'SIS' || carrera == 'IND' || carrera == 'GES'){
            registro_carrera = carrera;
            valida_construcción_email();
        }
    }

    function valida_telefono(){
        telefono = $('#registro_telefono').val();
        telefono = parseInt(telefono);
        if(telefono < 0){
            swal('Alerta en el telefono', 'No existen numeros de telefono NEGATIVOS', 'warning');
            return false;
        }else{
            telefono = telefono.toString();
            if(telefono.length > 10){
                swal('Alerta en el telefono', 
                    'No debes de tener más de 10 digitos\n'+
                    'Recuerda que en la zona metropolitana los nueros inician con 55 o 56\n'+
                    'Ejemplo: 5511509700', 
                    'warning');
                return false;
            }else if(telefono.length < 10){
                swal('Alerta en el telefono', 
                    'No debes de tener menos de 10 digitos\n'+
                    'Recuerda que en la zona metropolitana los nueros inician con 55 o 56\n'+
                    'Ejemplo: 5511509700', 
                    'warning');
                return false;
            }else{
                registro_telefono = $('#registro_telefono').val();
                valida_seleccion_carrera();
            }
        }
    }

    function valida_fecha_nacimiento(){
        if($('#registro_fecha_nacimiento').val() != ""){
            fecha_ingresada =  $('#registro_fecha_nacimiento').val().split("-");
            edad = 2021 - fecha_ingresada[0];
            if(edad < 16){
                swal('Alerta en fecha de nacimiento', 'La fecha no es valida: Eres muy joven', 'warning');
                return false;
            }else if (edad > 99){
                swal('Alerta en fecha de nacimiento', 'La fecha no es valida: Eres muy viejo', 'warning');
                return false;
            }else{
                registro_fecha_nacimiento = $('#registro_fecha_nacimiento').val();
                valida_telefono();
            }
        }
    }

    function valida_construccion_alfabetica(){
        cadena = $('#registro_nombre').val();

        regexp1 = /[^\w\s]/gi;
        regexp2 = /[^A-Z\s]/gi;    

        resultado1 = cadena.match(regexp1);
        resultado2 = cadena.match(regexp2);

        if(resultado1 != null || resultado2 != null){
            if(resultado1 == null){
                resultado1 = "";
            }
            if(resultado2 == null){
                resultado2 = "";
            }

            swal('Alerta en el nombre...', 'Los siguientes caracteres no son validos:\n\n'+
                resultado2 + resultado1, 'warning');

            return false;

        }else{

            registro_nombre = $('#registro_nombre').val();
            registro_nombre = registro_nombre.trim();
            registro_nombre = registro_nombre.toUpperCase();

            cadena = $('#registro_paterno').val();
            
            resultado1 = cadena.match(regexp1);
            resultado2 = cadena.match(regexp2); 

            if(resultado1 != null || resultado2 != null){
                if(resultado1 == null){
                    resultado1 = "";
                }
                if(resultado2 == null){
                    resultado2 = "";
                }
    
                swal('Alerta en el apellido paterno...', 'Los siguientes caracteres no son validos:\n\n'+
                 resultado2 + resultado1, 'warning');
    
                return false;
    
            }else{

                registro_paterno = $('#registro_paterno').val();
                registro_paterno = registro_nombre.trim();
                registro_paterno = registro_nombre.toUpperCase();

                cadena = $('#registro_materno').val();

                resultado1 = cadena.match(regexp1);
                resultado2 = cadena.match(regexp2);

                if(resultado1 != null || resultado2 != null){
                    if(resultado1 == null){
                        resultado1 = "";
                    }
                    if(resultado2 == null){
                        resultado2 = "";
                    }
        
                    swal('Alerta en el apellido materno...', 'Los siguientes caracteres no son validos:\n\n'+
                    resultado2 + resultado1, 'warning');
        
                    return false;
                
                }else{

                    registro_materno = $('#registro_materno').val();
                    registro_materno = registro_nombre.trim();
                    registro_materno = registro_nombre.toUpperCase();

                    //alert("Textos listos");
                    valida_fecha_nacimiento();
                }

            }

        }   
         

    }

    function valida_vacios(){
        if($('#registro_nombre').val() ==""){
            swal('Upps', 'Ingresa tu "nombre" por favor', 'warning');
            return false;
        }else if($('#registro_paterno').val()==""){
            swal('Upps', 'Ingresa tu "apellido paterno" por favor', 'warning');
            return false;
        }else if($('#registro_materno').val()==""){
            swal('Upps', 'Ingresa tu "apellido materno" por favor', 'warning');
            return false;
        }else if($('#registro_fecha_nacimiento').val()==""){
            swal('Upps', 'Ingresa tu "fecha de nacimiento" por favor', 'warning');
            return false;
        }else if($('#registro_telefono').val()==""){
            swal('Upps', 'Ingresa tu "telefono" por favor', 'warning');
            return false;
        }else if($('#registro_carrera').val()==""){
            swal('Upps', 'Selecciona tu carrera por favor', 'warning');
            return false;
        }else if($('#registro_mail').val()==""){
            swal('Upps', 'Ingresa tu "mail" por favor', 'warning');
            return false;
        }else if($('#registro_password').val()==""){
            swal('Upps', 'Ingresa tu "password" por favor', 'warning');
            return false;
        }else if($('#registro_password_confirmacion').val()==""){
            swal('Upps', 'Ingresa tu "confirmacion de password" por favor', 'warning');
            return false;
        }else{
            //swal('Yeah', 'Todos los campos tienen algun valor', 'success');
            valida_construccion_alfabetica();
        }
    }

    $('#btn_registro_usuario').click(function(){
        valida_vacios();
    });

});