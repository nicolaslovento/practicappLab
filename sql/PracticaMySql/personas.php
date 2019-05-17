<?php
require_once("persona.php");

$opcion=$_POST["accion"];

switch($opcion){

    case "1":
    //INGRESAR UNA PERSONA
        $nombre=$_POST['nombre'];
        $apellido=$_POST['apellido'];
        $edad=$_POST['edad'];

        $obj=new Persona($nombre,$apellido,$edad);

        $conexion=Persona::EstablecerConexion();

        if($conexion){

            if(Persona::IngresarPersona($obj)!=false){

                echo "1";

            }else{

                echo "0";
            }
        }else{

            echo "0";
        }
        
        Persona::CerrarConexion($conexion);

    break;

    case "2":
    //MOSTRAR UNA PERSONA POR ID
        $id=$_POST['id'];

        $conexion=Persona::EstablecerConexion();

        echo Persona::MostrarPersona($id);
        
        Persona::CerrarConexion($conexion);

    break;

    case "3":

        $conexion=Persona::EstablecerConexion();

        echo Persona::MostrarTodos();
        
        Persona::CerrarConexion($conexion);


    break;

    case "4":
    $id=$_POST['id'];
    $conexion=Persona::EstablecerConexion();

    echo Persona::BorrarPersona($id);
    
    Persona::CerrarConexion($conexion);

    break;





}


?>