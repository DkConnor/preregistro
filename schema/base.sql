create table if not exists usuario(
    id_usuario int not null auto_increment primary key,
    nombre_usuario varchar(45) not null,
    paterno_usuario varchar(45) not null,
    materno_usuario varchar(45) not null,
    fecha_nacimiento_usuario date not null,
    telefono_usuario varchar(45) not null,
    carrera_usuario varchar(45) not null,
    mail_usuario varchar(45) not null,
    password_usuario varchar(45) not null,
    subio_archivos int default 0,
    dda_autorizo int default 0,
    rf_autorizo int default 0,
    habilitar_examen int default 0,
    calificacion_usuario int default 0,
    rol int not null default 0

)ENGINE=InnoDB;