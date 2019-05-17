/// <reference path="alien.ts" />

namespace RecuperatorioPrimerParcial{

    export class Manejadora{

        public static AgregarAlien(){
            
            let cuadrante=(<HTMLInputElement>document.getElementById('cuadrante')).value;
            let edad=+(<HTMLInputElement>document.getElementById('edad')).value;
            let altura=parseFloat((<HTMLInputElement>document.getElementById('altura')).value);
            let raza=(<HTMLInputElement>document.getElementById('raza')).value;
            let paisOrigen=(<HTMLInputElement>document.getElementById('cboPlaneta')).value;
            let foto:any=(<HTMLInputElement>document.getElementById('foto'));
            let pathFoto=(<HTMLInputElement>document.getElementById('foto')).value;
            pathFoto=(pathFoto.split("\\"))[2];//tomo nombre de la foto

            let alien=new Entidades.Alien(cuadrante,edad,altura,raza,paisOrigen,pathFoto);
            
            let fmData:FormData=new FormData();
            if(localStorage.getItem('modificar')=='si'){
                fmData.append('caso','modificar');
            }else{
                fmData.append('caso','agregar');
            }
            
            fmData.append('cadenaJson',JSON.stringify(alien.ToJson()));
            fmData.append('foto',foto.files[0]);

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.open("POST","./BACKEND/administrar.php",true);
            xmr.setRequestHeader('enctype', 'multipart/form-data');
            xmr.send(fmData);

            xmr.onreadystatechange=()=>{

                if(xmr.status==200 && xmr.readyState==4){

                    let retorno=JSON.parse(xmr.responseText);
                    //alert(JSON.stringify(retorno));
                    if(localStorage.getItem('modificar')=='si'){
                    if(retorno.TodoOK){
                        alert("se modifico");
                        (<HTMLInputElement>document.getElementById('imgFoto')).src="./BACKEND/fotos/"+pathFoto;
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                        localStorage.setItem('modificar','no');
                        (<HTMLInputElement>document.getElementById('btn-agregar')).value="Agregar";
                        (<HTMLInputElement>document.getElementById('cuadrante')).disabled=false;
                        
                    }else{
                        alert("no se modifico");
                        console.log("no se modifico");
                        (<HTMLInputElement>document.getElementById('btn-agregar')).value="Agregar";
                        
                    }
                    }else{
                        
                            if(retorno.TodoOK){
                                alert("se agrego");
                            }else{
                                alert("no se pudo agregar");
                            }
                        }
                    }
                    
                    
                }
            }



        

        public static MostrarAliens(){

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            xmr.open("POST","./BACKEND/administrar.php",true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmr.send("caso=traer");
            let eliminar:string;
            let modificar:string;
            xmr.onreadystatechange=()=>{
                if(xmr.status==200 && xmr.readyState==4){
                    let retorno:any=<any>JSON.parse(xmr.responseText);

                    let tabla="<table border=1><th>CUADRANTE</th><th>EDAD</th><th>RAZA</th><th>FOTO</th><th>ACCIONES</th>"
                    for(let i=0;i<retorno.length;i++){

                        eliminar="<button onclick='RecuperatorioPrimerParcial.Manejadora.EliminarAlien("+JSON.stringify(retorno[i])+")'>Eliminar </button>";
                        modificar="<button onclick='RecuperatorioPrimerParcial.Manejadora.ModificarAlien("+JSON.stringify(retorno[i])+")'>Modificar </button>";
                        tabla+="<tr><td>"+retorno[i].cuadrante+"</td><td>"+retorno[i].edad+"</td><td>"+retorno[i].raza+"</td><td><img src='./BACKEND/fotos/"+retorno[i].pathFoto+"' width=100 height=100></td><td>"+eliminar+modificar+"</td></tr>";
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

                    localStorage.setItem("aliens_local_storage",retorno);
                    let comprobar=localStorage.getItem("aliens_local_storage");
                    if(comprobar!=null){
                        alert("Se guardo en LocalStorage");
                    }else{
                        alert("No se guardo en LocalStorage");
                    }
                }
            }
                
        }

        public static VerificarExistencia(){

            let cuadrante=(<HTMLInputElement>document.getElementById('cuadrante')).value;
            let raza=(<HTMLInputElement>document.getElementById('raza')).value;
            let strTele:any;
            strTele=localStorage.getItem("aliens_local_storage");
            
            let aliens:any=<any>JSON.parse(strTele);
            
            for(let i=0;i<aliens.length;i++){

                if(cuadrante==aliens[i].cuadrante && raza==aliens[i].raza){
                    alert("EXISTE");
                    return true;
                }
            }
            alert("NO EXISTE");
            Manejadora.AgregarAlien();
            Manejadora.GuardarEnLocalStorage();
            

            return false;

        }

        public static ObtenerAliensPorCuadrante() : void {
            let auxContador : Array<number> = new Array<number>();
            let auxLocalStorage : any = "";

            if(localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = (<string>localStorage.getItem("aliens_local_storage"));
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);

                let auxJson : any = (<any> JSON.parse(auxLocalStorage));
                
                for(let alien of auxJson) {
                    if(auxContador[alien.planetaOrigen] === undefined) {
                        auxContador[alien.planetaOrigen]=0;
                    }
                    auxContador[alien.planetaOrigen]++;
                }
                
                //console.log(auxContador);

                let auxMax : any = undefined;
                let auxMin : any = undefined;

                for (let planeta in auxContador) {
                    if(auxMax === undefined && auxMin === undefined) {
                        auxMax = auxContador[planeta];
                        auxMin = auxContador[planeta];
                    }

                    let cantAliens= auxContador[planeta];
                    //console.log(planeta, cantAliens);

                    if(auxMax < cantAliens) {
                        auxMax = cantAliens;
                        console.log("Cambio el maximo");
                    }
                    if(auxMin>cantAliens) {
                        auxMin = cantAliens;
                        console.log("Cambio el minimo");
                    }
                }

                let planetasMax = new Array<string>();
                let planetasMin = new Array<string>();

                for (let planeta in auxContador) {
                    if(auxContador[planeta] == auxMax) {
                        planetasMax.push(planeta);
                    }
                    else if (auxContador[planeta] == auxMin) {
                        planetasMin.push(planeta);
                    }
                }
                //console.log(planetasMax +"\nCambio a min\n"+ planetasMin);

                let mensaje : string = "El/Los planetas con mas aliens son ";
                if(planetasMax.length > 0) {
                    for(let planeta of planetasMax) {
                        mensaje+="\n-"+planeta;
                    }
                    mensaje+="\nCon "+auxMax;
                    console.log(mensaje);
                }

                if(planetasMin.length > 0) {
                    mensaje= "El/Los planetas con menos aliens son ";
                    for(let planeta of planetasMin) {
                        mensaje+="\n-"+planeta;
                    }
                    mensaje+="\nCon "+auxMin;
                    console.log(mensaje);
                }
            } 
        }

        public static EliminarAlien(obj:any){

            let xmr:XMLHttpRequest=new XMLHttpRequest();
            xmr.open("POST","./BACKEND/administrar.php",true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmr.send("caso=eliminar&cadenaJson="+JSON.stringify(obj));

            
            xmr.onreadystatechange=()=>{
                if(xmr.status==200 && xmr.readyState==4){
                    
                    let retorno=JSON.parse(xmr.responseText);
                    if(retorno.TodoOK){
                        alert("Se borro");
                    }else{
                        alert("No se borro");
                    }

                 }
            }
                
        }

        public static ModificarAlien(obj:any){

            (<HTMLInputElement>document.getElementById('cuadrante')).value=obj.cuadrante;
            (<HTMLInputElement>document.getElementById('cuadrante')).disabled=true;
            (<HTMLInputElement>document.getElementById('edad')).value=obj.edad;
            (<HTMLInputElement>document.getElementById('altura')).value=obj.altura;
            (<HTMLInputElement>document.getElementById('raza')).value=obj.raza;
            (<HTMLInputElement>document.getElementById('cboPlaneta')).value=obj.paisOrigen;
            (<HTMLInputElement>document.getElementById('imgFoto')).src="./BACKEND/fotos/"+obj.pathFoto;
            
            localStorage.setItem('modificar','si');
            (<HTMLInputElement>document.getElementById('btn-agregar')).value="Modificar";
            
        }
                
        




    }
}