namespace Opciones{

    export function MostrarIngreso(){

        (<HTMLDivElement>document.getElementById("div_mostrarIngreso")).style.display="block";
        (<HTMLDivElement>document.getElementById("div_MostrarIngresoId")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_MostrarTodos")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_Borrar")).style.display="none";
    }

    export function MostrarUno(){

        (<HTMLDivElement>document.getElementById("div_MostrarIngresoId")).style.display="block";
        (<HTMLDivElement>document.getElementById("div_mostrarIngreso")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_MostrarTodos")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_Borrar")).style.display="none";
        

    }

    export function MostrarTodos(){

        (<HTMLDivElement>document.getElementById("div_MostrarTodos")).style.display="block";
        (<HTMLDivElement>document.getElementById("div_MostrarIngresoId")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_mostrarIngreso")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_Borrar")).style.display="none";
        MostrarTodas();
    }

    export function Borrar(){

        (<HTMLDivElement>document.getElementById("div_MostrarTodos")).style.display="block";
        MostrarTodas();
        (<HTMLDivElement>document.getElementById("div_Borrar")).style.display="block";
        (<HTMLDivElement>document.getElementById("div_mostrarIngreso")).style.display="none";
        (<HTMLDivElement>document.getElementById("div_MostrarIngresoId")).style.display="none";
        
        

    }




}

function  MostrarTodas(){

    let peticion=new XMLHttpRequest();

    peticion.open("POST","personas.php",true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("accion=3");

    peticion.onreadystatechange=()=>{

        if(peticion.status==200 && peticion.readyState==4){

            (<HTMLDivElement>document.getElementById("div_MostrarTodos")).innerHTML=peticion.responseText;
        }

    }
}

namespace Persona{

    export function Borrar(){

        let id=(<HTMLInputElement>document.getElementById("idBorrar")).value;
        
        let flag=0;
        let peticion=new XMLHttpRequest();
        let url="accion=2&id="+id;
        peticion.open("POST","personas.php",true);
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        peticion.send(url);//Primero muestro
        alert(peticion.responseText);
        /*peticion.onreadystatechange=()=>{

                if(peticion.status==200 && peticion.readyState==4){

                    if(peticion.responseText.length>5){

                    
                    flag=1;
                    }else{
                        alert("No se encontró el ID "+id);
                        
                    }
                }*/
                if(flag==1){
                        peticion.open("GET","personas.php?accion=4&id="+id,true);
                        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        
                        if(confirm("Seguro que desea borrar esta persona? si/no")){

                        peticion.send();
            
                        alert("se borro");
                                   
                
                        }
                
                
                }
        }
    }
        
               
        
        
            


        
    
           


    export function MostrarUno(){

        let id=(<HTMLInputElement>document.getElementById("id")).value;
        

        let peticion=new XMLHttpRequest();

        peticion.open("POST","personas.php",true);
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        peticion.send("accion=2&id="+id);

        peticion.onreadystatechange=()=>{

            if(peticion.status==200 && peticion.readyState==4){

                if(peticion.responseText.length>5){

                   alert(peticion.responseText);

                }else{
                    alert("No se encontró el ID "+id);
                }
            }

        }
    }

    

    export function Ingresar(){

        let nombre=(<HTMLInputElement>document.getElementById("nombre")).value;
        let apellido=(<HTMLInputElement>document.getElementById("apellido")).value;
        let edad=(<HTMLInputElement>document.getElementById("edad")).value;

        let peticion=new XMLHttpRequest();

        peticion.open("POST","personas.php",true);
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        peticion.send("accion=1&nombre="+nombre+"&apellido="+apellido+"&edad="+edad);

        peticion.onreadystatechange=()=>{

            if(peticion.status==200 && peticion.readyState==4){

                if(peticion.responseText=="1"){

                    alert("Se cargo con exito");
                    (<HTMLDivElement>document.getElementById("div_mostrarIngreso")).style.display="none";

                }else{
                    alert("No se pudo cargar");
                }
            }

        }
    }



}