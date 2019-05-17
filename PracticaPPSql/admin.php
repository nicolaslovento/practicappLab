<?php

include_once ("./clases/Autos.php");
$queHago=$_POST["accion"];

switch($queHago){

    case "insertarUno":
    $marca=$_POST["marca"];
    $color=$_POST["color"];
    $patente=$_POST["patente"];
    $foto=$_FILES["foto"]["tmp_name"];

    $auto=new Auto($marca,$patente,$color,$foto);
   

    echo Auto::InsertarUno($auto);
    

    break;

    case "mostrarUno":
    $id=$_POST["id"];

    echo Auto::MostrarUno($id);

    break;

    case "mostrarTodos":
    
    echo Auto::MostrarTodos();

    break;
   
    case "eliminarUno":
    $id=$_POST["id"];
    echo Auto::EliminarUno($id);

    break;

    case "modificar":
    $id=$_POST["id"];
    $marca=$_POST["marca"];
    $color=$_POST["color"];
    $patente=$_POST["patente"];

    $auto=new Auto($id,$marca,$patente,$color);

    echo Auto::Modificar($auto);

    break;









}

?>