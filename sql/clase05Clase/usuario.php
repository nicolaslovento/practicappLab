<?php

class Usuario{

    public $id;
    public $correo;
    //public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public static $base='localhost';
    private static $user='root';
    private static $clave='';


    public function __construct($id,$correo,$clave,$nombre,$apellido,$perfil){

        $this->id=$id;
        $this->correo=$correo;
        $this->clave=$clave;
        $this->nombre=$nombre;
        $this->apellido=$apellido;
        $this->perfil=$perfil;
        


    }

    //metodo estatico establecer conexion

    public static function EstablecerConexion(){

        $conexion = @mysql_connect($base, $user, $clave);

        if(!$conexion)
        {
            echo "No se pudo conectar..";
        }
        
        return $conexion;
    }

    public static function CerrarConexion($conexion){//falta

        
        mysql_close($conexion);
    }

    public static function Traer($id){

        $conexion=Usuario::EstablecerConexion();
        
        $sql = "SELECT * FROM usuarios WHERE $id" ;

        $rs = mysql_db_query($base, $sql);

        //$row = mysql_fetch_object($rs);
        $row=mysql_fetch_array($rs);

        var_dump($row);

        //$retorno=new Usuario($row[0])

        Usuario::CerrarConexion($conexion);

      }

      public static function TraerTodos(){

        $conexion=Usuario::EstablecerConexion();
        
        $sql = "SELECT * FROM usuarios" ;

        $rs = mysql_db_query($base, $sql);
        $arrayUsuarios=array();
        //$row = mysql_fetch_object($rs);
        $flag=0;
        if($row=mysql_fetch_array($rs)){

            return "SI";
        }else{
            return "NULL";
        }

        
        //$retorno=new Usuario($row[0])

        Usuario::CerrarConexion($conexion);


      }

      //metodo para eliminar sin parametros no estatico devuelve un booleano
      //metodo para agregar Agregar($obj) -> bool estatico

      //metodo para modificar (todo menos el id) Modificar($obj) ->bool 
     /* public static function TraerTodos(){

        $conexion=Usuario::EstablecerConexion();
        
        $sql = "SELECT * FROM usuarios" ;

        $rs = mysql_db_query($base, $sql);
        $arrayUsuarios=array();
        //$row = mysql_fetch_object($rs);
        $flag=0;
        if($row=mysql_fetch_object($rs)){

            return "SI";
        }else{
            return "NULL";
        }

        
        //$retorno=new Usuario($row[0])

        Usuario::CerrarConexion($conexion);


      }*/



}






?>