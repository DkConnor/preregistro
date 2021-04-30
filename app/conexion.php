<?php

    function conexion(){
        //                     server        user   pass    base
        $conexion = new mysqli('localhost', 'root', '', 'preregistro');

        if($conexion->connect_errno){
            echo 'Error en la conexion'.$conexion->connect_error;
        }

        $conexion->set_charset("utf8");

        return $conexion;// 1 min para copiar
    }

?>