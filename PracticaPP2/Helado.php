<?php
include_once ("IVendible.php");

/*Crear la clase HELADO con atributos privados: sabor, precio y foto, que implemente la interface
IVendible con el método PrecioMasIva().*/ 


class Helado implements IVendible{


    private $sabor;
    private $precio;
    private $foto;

    public function __construct($sabor,$precio,$foto){
        $this->sabor=$sabor;
        $this->precio=$precio;
        $this->foto=$foto;
    }


    public static function PrecioMasIva($precio){
        return $precio*1.21;
    }





/*Caso cargarHelado(POST): Recibe un helado y lo guarda en ”heldaos/sabores.txt”.
Guardar la foto en un subdirectorio "./heladosImagen/" con el nombre del helado punto hora
minutos y segundos (Ejemplo: frutilla.102236.jpg).
Crear la clase HELADO con atributos privados: sabor, precio y foto, que implemente la interface
IVendible con el método PrecioMasIva().*/ 
    public static function GuardarHelado($helado){

        $ubicacion=$helado->foto;
        $destino="./heladosImagen/".$helado->sabor.".".date("His").".jpg";
        echo $ubicacion;
        move_uploaded_file($ubicacion,$destino);

        $direc=fopen("./helados/sabores.txt","a");

        if(0<fwrite($direc,$helado->sabor."-".$helado->precio."-".pathinfo($destino,PATHINFO_FILENAME).".jpg"."\r\n")){

            return true;

        }

        fclose($direc);
        return false;
    }
    


/*Caso vender (GET): Recibe el sabor del helado y la cantidad. Si el sabor existe, retorna el
precio total a pagar (con IVA incluido) y escribe en el archivo “helados/vendidos.txt” el sabor, la
cantidad y el precio.
Si no se encuentra el sabor, retorna un mensaje informando lo acontecido.*/
    public static function VenderHelado($sabor,$cantidad){

        $direc1=fopen("./helados/sabores.txt","r");

        while(!feof($direc1)){

        $heladoTexto=fgets($direc1);

        if($heladoTexto==""){
            continue;
        }

        $heladoSeparado=explode("-",$heladoTexto);

        if($heladoSeparado[0]==$sabor){
            
            $precio=Helado::PrecioMasIva(trim($heladoSeparado[1]));
            $precioTotal=$precio*$cantidad;

            $direc2=fopen("./helados/vendidos.txt","a");

                if(0<fwrite($direc2,$sabor."-".$cantidad."-".$precioTotal."\r\n")){

                    fclose($direc2);
                    return "Se vendio con exito";
                    
                }
        
        }
        }

        return "No se encontro el sabor";

    }



/*ListadoHelados (GET): Muestra una tabla con todos los helados. Mostrando el sabor, precio e
imagen correspondiente.
Crear un nuevo método estático en la clase HELADO, que retorne un array de objetos de tipo
Helado (recuperados del archivo de texto).*/
    public static function ListadoHelados(){

        $direc1=fopen("./helados/sabores.txt","r");
        $arrayHelados=array();
        while(!feof($direc1)){
            
            $heladoTexto=fgets($direc1);

            if($heladoTexto==""){
                continue;
            }

            $heladoSeparado=explode("-",$heladoTexto);
            $helado=new Helado($heladoSeparado[0],$heladoSeparado[1],trim($heladoSeparado[2]));
            array_push($arrayHelados,$helado);
        }

        $tablaHtml="<table><tr><th>Sabor</th><th>Precio</th><th>Imagen</th></tr>";

        foreach($arrayHelados as $helado){

            $tablaHtml.="<tr><td>".$helado->sabor."</td><td>".$helado->precio."</td><td><img src='".$helado->foto."' widht='100px' height='100px'></img></td></tr>";
        }

        $tablaHtml.="</table>";

        fclose($direc1);
        return $tablaHtml;
    
    }




/*Caso modificarHelados.php: Recibe el sabor, precio y la foto de un Helado, si existe (buscar
por sabor), se guardan los nuevos datos en el archivo de texto.
La foto anterior se elimina del subdirectorio "./heladosImagen/" y se reemplaza por la nueva (con el
nuevo nombre).
Si no se encuentra el helado a ser modificado, informar por medio de un mensaje.*/
    public static function ModificarHelado($sabor,$precio,$foto){

        if(Helado::VerificarHelado($sabor)=="El sabor esta"){
            
            $direc=fopen("./helados/sabores.txt","r");
            $listadoHelados="";
            
            while(!feof($direc)){

                $helado=fgets($direc);

                if($helado==""){
                    continue;
                }

                $heladoSeparado=explode("-",$helado);

                if($heladoSeparado[0]==$sabor){
                    echo "s";
                    $heladoSeparado[1]=$precio;
                    $destino="./heladosImagen/".$sabor.".".date("His").".jpg";
                    move_uploaded_file($foto,$destino);

                    unlink("C:/xampp/htdocs/PracticaParcialPRO/Programacion3/PracticaPP2/heladosImagen/".trim($heladoSeparado[2]));
                    echo $heladoSeparado[2];
                    $heladoSeparado[2]=pathinfo($destino,PATHINFO_FILENAME).".jpg";
                    echo $heladoSeparado[2];
                    $helado=$heladoSeparado[0]."-".$heladoSeparado[1]."-".$heladoSeparado[2]."\r\n";
                    
                }

                $listadoHelados.=$helado;
                
            }
            //echo $listadoHelados;
            fclose($direc);

            $direc=fopen("./helados/sabores.txt","w");

            if(0<fwrite($direc,$listadoHelados)){

                return "Se modifico correctamente..";
            }

        fclose($direc);

        }

    }



/*Caso borrarHelados(GET): Si recibe un sabor por GET, retorna si el helado está en el archivo
o no.
Si lo recibe por POST, con el parámetro “caso” igual a "borrarHelado", se borra el helado del
archivo y se mueve la foto al subdirectorio “./heladosBorrados/”, con el nombre formado por el
sabor punto 'borrado' punto hora minutos y segundos del borrado (Ejemplo:
frutilla.borrado.105905.jpg).*/
    public static function VerificarHelado($sabor){

        $direc=fopen("./helados/sabores.txt","r");

        while(!feof($direc)){

            $heladoTexto=fgets($direc);

            if($heladoTexto==""){
                continue;
            }

            $heladoSeparado=explode("-",$heladoTexto);

            if($heladoSeparado[0]==$sabor){
                
                return "El sabor esta";
            }

        }

        fclose($direc);
        return "El sabor no está..";

    }

    public static function BorrarHelado($sabor){
        
        if(Helado::VerificarHelado($sabor)=="El sabor esta"){
            /*se borra el helado del
            archivo y se mueve la foto al subdirectorio “./heladosBorrados/”, con el nombre formado por el
            sabor punto 'borrado' punto hora minutos y segundos del borrado (Ejemplo:
            frutilla.borrado.105905.jpg).*/
            
        
            $direc=fopen("./helados/sabores.txt","r");
            $listadoHelados="";
            echo "si";
            while(!feof($direc)){

                $helado=fgets($direc);

                if($helado==""){
                    continue;
                }

                $heladoSeparado=explode("-",$helado);

                if($heladoSeparado[0]==$sabor){
                    $destino="./heladosBorrados/".$heladoSeparado[0].".borrado.".date("His").".jpg";
                    $ubicacion="C:\\xampp\htdocs\\PracticaParcialPRO\Programacion3\PracticaPP2\heladosImagen\\".trim($heladoSeparado[2]);
                    rename($ubicacion,$destino);
                    continue;
                }

                $listadoHelados.=$helado;
                
            }
            fclose($direc);

        $direc=fopen("./helados/sabores.txt","w");

        if(0<fwrite($direc,$listadoHelados)){

            return "Se borro correctamente..";
        }

        fclose($direc);
        }else{
        return "No se encontro el sabor de helado..";
        }  
        
    }

}

?>