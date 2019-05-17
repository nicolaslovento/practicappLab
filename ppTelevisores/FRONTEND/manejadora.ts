/// <reference path="Televisor.ts" />

namespace PrimerParcial{

    export class Manejadora{

        public static AgregarTelevisor(){
            let codigo=+(<HTMLInputElement>document.getElementById('codigo')).value;
            let marca=(<HTMLInputElement>document.getElementById('marca')).value;
            let precio=parseFloat((<HTMLInputElement>document.getElementById('precio')).value);
            let tipo=(<HTMLInputElement>document.getElementById('tipo')).value;
            let pais=(<HTMLInputElement>document.getElementById('pais')).value;
            let foto:any=(<HTMLInputElement>document.getElementById("foto"));
            let pathFoto=(<HTMLInputElement>document.getElementById("foto")).value;
            pathFoto=(pathFoto.split("\\"))[2];

            let televisor=new Entidades.Televisor(codigo,marca,precio,tipo,pais,pathFoto);
            let fmData:FormData=new FormData();
            fmData.append('caso','agregar');
            fmData.append('cadenaJson',JSON.stringify(televisor.ToJson()));
            fmData.append('foto',foto.files[0]);

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            xmr.open("POST","./BACKEND/administrar.php",true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader('enctype', 'multipart/form-data');
            xmr.send(fmData);

            xmr.onreadystatechange=()=>{
                if(xmr.status==200 && xmr.readyState==4){
                    let retorno=JSON.parse(xmr.responseText);
                    if(retorno.TodoOK){
                        alert("se cargo");
                    }else{
                        alert("no se cargo");
                    }
                }
            }
                
        }

        public static MostrarTelevisores(){

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            xmr.open("POST","./BACKEND/administrar.php",true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmr.send("caso=traer");

            xmr.onreadystatechange=()=>{
                if(xmr.status==200 && xmr.readyState==4){
                    let retorno:any=<any>JSON.parse(xmr.responseText);

                    let tabla="<table border=1><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th>"
                    for(let i=0;i<retorno.length;i++){

                        tabla+="<tr><td>"+retorno[i].codigo+"</td><td>"+retorno[i].marca+"</td><td>"+retorno[i].precio+"</td><td><img src='./BACKEND/fotos/"+retorno[i].pathFoto+"' width=100 height=100></td></tr>";
                    }

                    tabla+="</table>";

                    
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=tabla;
                    
                }
            }
                
        }

        public static GuardarEnLocalStorage(){

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            xmr.open("POST","./BACKEND/administrar.php",true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmr.send("caso=traer");

            xmr.onreadystatechange=()=>{
                if(xmr.status==200 && xmr.readyState==4){
                    let retorno:string=xmr.responseText;

                    localStorage.setItem("televisores_local_storage",retorno);
                    let comprobar=localStorage.getItem("televisores_local_storage");
                    if(comprobar!=null){
                        alert("SI se guardo en LS");
                    }else{
                        alert("NO se guardo en LS");
                    }
                }
            }
                
        }

        /*VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. Para ello, comparará los
códigos de los televisores guardados en el LocalStorage. Si el televisor existe, se mostrará (por
consola y alert) lo acontecido. Caso contrario, agregará el nuevo televisor y se actualizará el
LocalStorage (GuardarEnLocalStorage).*/

        public static VerificarExistencia(){

            let codigo=+(<HTMLInputElement>document.getElementById('codigo')).value;
            let strTele:any;
            strTele=localStorage.getItem("televisores_local_storage");
            
            let televisores:any=<any>JSON.parse(strTele);
            
            for(let i=0;i<televisores.length;i++){

                if(codigo==televisores[i].codigo){
                    alert("EXISTE");
                    return true;
                }
            }
            alert("NO EXISTE");
            Manejadora.AgregarTelevisor();
            Manejadora.GuardarEnLocalStorage();
            

            return false;

            }
        


    }
}