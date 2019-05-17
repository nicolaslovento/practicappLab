<?php

class Persona{

public $nombre;
public $apellido;
public $edad;
public $id;
public static $host='localhost';
public static $user="root";
public static $clave='';
public static $base="personas";

public function __construct($nombre,$apellido,$edad)
{
    $this->nombre=$nombre;
    $this->apellido=$apellido;
    $this->edad=$edad;
}

public function ToString(){

    return "Nombre: ".$this->nombre." Apellido: ".$this->apellido." Edad: ".$this->edad;
}

public static function BorrarPersona($id){

    $consulta="DELETE FROM persona WHERE id=".$id;
    
    $rs=mysql_db_query(Persona::$base,$consulta);
    
    return $rs;
}

public static function MostrarTodos(){

    $consulta="SELECT * FROM persona ";
    
    $rs=mysql_db_query(Persona::$base,$consulta);

    if($rs){

        //$row = mysql_fetch_object($rs);//Devuelve como objeto y lo accedo con ->
        $retorno="<table border='1'>
        <caption border='1'>
        <b>Listado de personas ingresadas</b>
        </caption>
        <tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Edad</th></tr>";
        while($row = mysql_fetch_object($rs)){

        $retorno.="<tr><td>$row->id</td><td>$row->nombre</td><td>$row->apellido</td><td>$row->edad</td></tr>";

        }

        $retorno.="</table>";

        return $retorno;
            
    }else{
        return "No hay datos cargados.";
    }
    
}



public static function MostrarPersona($id){

    $consulta="SELECT nombre,apellido,edad FROM persona WHERE id=".$id;
    
    $rs=mysql_db_query(Persona::$base,$consulta);

    if($rs){

        $row = mysql_fetch_object($rs);//Devuelve como objeto y lo accedo con ->

        if($row!=false){

            $obj=new Persona($row->nombre,$row->apellido,$row->edad);
            return $obj->ToString();

        }else{
            return "0";
        }
    }else{
        return "0";
    }

}

public static function IngresarPersona($p){

    $consulta="INSERT INTO persona (nombre,apellido,edad) VALUES ('$p->nombre','$p->apellido','$p->edad')";
    //echo $consulta;
    $rs=mysql_db_query(Persona::$base,$consulta);

    return $rs;
}

public static function EstablecerConexion(){
    
    $conexion=mysql_connect(Persona::$host,Persona::$user,Persona::$clave);
    //true si establecio, false si no.
    return $conexion;

}

public static function CerrarConexion($conexion){

    $conexionCerrada=mysql_close($conexion);
    //true si cerro bien.
    return $conexionCerrada;

}


}



?>