<?php
/*1.- Crear la clase CLIENTE con atributos (nombre, correo y clave), un método de instancia
ToString() y un método de clase GuardarEnArchivo(Cliente).

3.- Caso validar (POST): Recibe el correo y clave, si coincide con algún registro de los cargados
en el archivo de texto, retorna el mensaje "Cliente Logueado" (con el nombre del mismo), caso
contrario, retorna "Cliente inexistente".*/

class Cliente{

    public $nombre;
    public $correo;
    public $clave;

    public function __construct($nombre,$correo,$clave)
    {
        $this->nombre=$nombre;
        $this->correo=$correo;
        $this->clave=$clave;
    }
    
    public function ToString(){

        return $this->nombre."-".$this->correo."-".$this->clave;
    }

    public static function GuardarEnArchivo($cliente){

        $direc=fopen("./clientes/clientesActuales.txt","a");

        if(0<fwrite($direc,$cliente->ToString()."\r\n")){

            return true;

        }

        fclose($direc);
        return false;


    }

    public static function ValidarCliente($correo,$clave){

        $direc=fopen("./clientes/clientesActuales.txt","r");

        while(!feof($direc)){

            $clienteTexto=fgets($direc);

            if($clienteTexto==""){
                continue;
            }

            $clienteSeparado=explode("-",$clienteTexto);

            if($clienteSeparado[1]==$correo && trim($clienteSeparado[2])==$clave){
                
                return "Cliente logueado (".$clienteSeparado[0].")";
            }

        }

        fclose($direc);
        return "Cliente inexistente";

    }


}


?>