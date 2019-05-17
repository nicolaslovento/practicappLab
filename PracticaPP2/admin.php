<?php

include_once ("Cliente.php");
include_once ("Helado.php");

if(isset($_POST['queHago'])){

    $queHago=$_POST['queHago'];
}

if(isset($_GET['queHago'])){
    
    $queHago=$_GET['queHago'];
}


switch($queHago){
/*2.- Caso cargarCliente (POST): Recibe los siguientes datos: nombre, correo y clave, crea el
objeto de tipo CLIENTE y lo guarda en el archivo “./clientes/clientesActuales.txt” (en un renglón
distinto).*/
    case "cargarCliente":
    $nombre=$_POST['nombre'];
    $correo=$_POST['correo'];
    $clave=$_POST['clave'];

    $cliente=new Cliente($nombre,$correo,$clave);

    Cliente::GuardarEnArchivo($cliente);

    break;
/*3.- Caso validar (POST): Recibe el correo y clave, si coincide con algún registro de los cargados
en el archivo de texto, retorna el mensaje "Cliente Logueado" (con el nombre del mismo), caso
contrario, retorna "Cliente inexistente".*/
    case "validar":
    $correo=$_POST['correo'];
    $clave=$_POST['clave'];

    echo Cliente::ValidarCliente($correo,$clave);
    break;
/*4.- Caso cargarHelado(POST): Recibe un helado y lo guarda en ”heldaos/sabores.txt”.
Guardar la foto en un subdirectorio "./heladosImagen/" con el nombre del helado punto hora
minutos y segundos (Ejemplo: frutilla.102236.jpg).
Crear la clase HELADO con atributos privados: sabor, precio y foto, que implemente la interface
IVendible con el método PrecioMasIva().*/    
    case "cargarHelado":
    $sabor=$_POST['sabor'];
    $precio=$_POST['precio'];
    $foto=$_FILES['foto']['tmp_name'];
    
    $helado=new Helado($sabor,$precio,$foto);
    Helado::GuardarHelado($helado);

    break;
/*5.- Caso vender (GET): Recibe el sabor del helado y la cantidad. Si el sabor existe, retorna el
precio total a pagar (con IVA incluido) y escribe en el archivo “helados/vendidos.txt” el sabor, la
cantidad y el precio.
Si no se encuentra el sabor, retorna un mensaje informando lo acontecido.*/
    case "vender":
    
    $sabor=$_GET['sabor'];
    $cantidad=$_GET['cantidad'];
    
    echo Helado::VenderHelado($sabor,$cantidad);

    break; 
/*7.- ListadoHelados (GET): Muestra una tabla con todos los helados. Mostrando el sabor, precio e
imagen correspondiente.
Crear un nuevo método estático en la clase HELADO, que retorne un array de objetos de tipo
Helado (recuperados del archivo de texto).*/
    case "listadoHelados":
    //falta mostrar imagenes
    //echo '<img src="/heladosImagen/frutilla.145632.jpg"/>';
    echo Helado::ListadoHelados();
    break;
/*8.- Caso borrarHelados(GET): Si recibe un sabor por GET, retorna si el helado está en el archivo
o no.
Si lo recibe por POST, con el parámetro “caso” igual a "borrarHelado", se borra el helado del
archivo y se mueve la foto al subdirectorio “./heladosBorrados/”, con el nombre formado por el
sabor punto 'borrado' punto hora minutos y segundos del borrado (Ejemplo:
frutilla.borrado.105905.jpg).*/
    case "borrarHelado":

    if(isset($_GET['sabor'])){

        $sabor=$_GET['sabor'];
        echo Helado::VerificarHelado($sabor);
    }
    echo "3";
    if(isset($_POST['sabor'])){
        echo "2";
        $sabor=$_POST['sabor'];
        echo Helado::BorrarHelado($sabor);
    }

    break;

/*9.- Caso modificarHelados.php: Recibe el sabor, precio y la foto de un Helado, si existe (buscar
por sabor), se guardan los nuevos datos en el archivo de texto.
La foto anterior se elimina del subdirectorio "./heladosImagen/" y se reemplaza por la nueva (con el
nuevo nombre).
Si no se encuentra el helado a ser modificado, informar por medio de un mensaje.*/
    case "modificarHelado":
    $sabor=$_POST['sabor'];
    $precio=$_POST['precio'];
    $foto=$_FILES['foto']['tmp_name'];

    echo Helado::ModificarHelado($sabor,$precio,$foto);

    break;
}


?>