<?php
include_once ("Conexion.php");
include_once ("File.php");
class Auto{

    
    private $marca;
    private $patente;
    private $id;
    private $color;
    private $foto;

    public function __construct($marca,$patente,$color,$foto,$id=0)
    {
        $this->marca=$marca;
        $this->patente=$patente;
        $this->color=$color;
        $this->id=$id;
        $this->foto=$foto;
        
        
    }

    public static function InsertarUno($auto){

        $destino="./imagenes/".$auto->patente.".jpg";
        move_uploaded_file($auto->foto,$destino);
        $auto->foto=pathinfo($destino,PATHINFO_FILENAME).".jpg";

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('INSERT INTO autos (marca,color,patente,foto) VALUES (:marca,:color,:patente,:foto)');
        $sentencia->bindValue(':marca',$auto->marca,PDO::PARAM_STR);
        $sentencia->bindValue(':color',$auto->color,PDO::PARAM_STR);
        $sentencia->bindValue(':patente',$auto->patente,PDO::PARAM_STR);
        $sentencia->bindValue(':foto',$auto->foto,PDO::PARAM_STR);
        if(!$sentencia){
            echo "no se pudo cargar";
        }else{
            $sentencia->execute();
            echo "se cargo con exito";
        }
        
    }

    public static function EliminarUno($id){

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('DELETE FROM autos WHERE id=:id');
        $sentencia->bindValue(':id',$id,PDO::PARAM_STR);
        $sentencia->execute();
        if(!$sentencia){
            echo "no se pudo borrar";
        }else{
            $sentencia->execute();
            echo "se borro con exito";
        }
        
    }

    public static function Modificar($auto){

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('UPDATE autos SET marca=:marca,color=:color,patente=:patente WHERE id=:id');
        $sentencia->bindValue(':marca',$auto->marca,PDO::PARAM_STR);
        $sentencia->bindValue(':color',$auto->color,PDO::PARAM_STR);
        $sentencia->bindValue(':patente',$auto->patente,PDO::PARAM_STR);
        $sentencia->bindValue(':id',$auto->id,PDO::PARAM_INT);

        $sentencia->execute();
        
    }

    public static function MostrarUno($id){

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT * FROM autos WHERE id=:id');
        $sentencia->bindValue(':id',$id,PDO::PARAM_INT);
        $sentencia->execute();
        $auto=$sentencia->fetch();
        return $auto[0]."--".$auto[1]."--".$auto[2]."--".$auto[3]."--".$auto[4];

    }

    public static function MostrarTodos(){

        $objCon=new Conexion();
        $conexion=$objCon->GetConexion();
        $sentencia=$conexion->prepare('SELECT marca,patente,color,foto,id FROM autos');
        $sentencia->execute();
        $retorno="<table border=1><tr><th>ID</th><th>MARCA</th><th>COLOR</th><th>PATENTE</th></tr>";
        
        while($auto=$sentencia->fetch()){

            $retorno.="<tr><td>".$auto[0]."</td><td>".$auto[1]."</td><td>".$auto[2]."</td><td>".$auto[3]."</td></tr>";

        }
        $retorno.="</table>";

        return $retorno;

    }

    
    




}



?>