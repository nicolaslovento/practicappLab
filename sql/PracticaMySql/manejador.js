"use strict";
exports.__esModule = true;
var Opciones;
(function (Opciones) {
    function MostrarIngreso() {
        document.getElementById("div_mostrarIngreso").style.display = "block";
        document.getElementById("div_MostrarIngresoId").style.display = "none";
        document.getElementById("div_MostrarTodos").style.display = "none";
        document.getElementById("div_Borrar").style.display = "none";
    }
    Opciones.MostrarIngreso = MostrarIngreso;
    function MostrarUno() {
        document.getElementById("div_MostrarIngresoId").style.display = "block";
        document.getElementById("div_mostrarIngreso").style.display = "none";
        document.getElementById("div_MostrarTodos").style.display = "none";
        document.getElementById("div_Borrar").style.display = "none";
    }
    Opciones.MostrarUno = MostrarUno;
    function MostrarTodos() {
        document.getElementById("div_MostrarTodos").style.display = "block";
        document.getElementById("div_MostrarIngresoId").style.display = "none";
        document.getElementById("div_mostrarIngreso").style.display = "none";
        document.getElementById("div_Borrar").style.display = "none";
        MostrarTodas();
    }
    Opciones.MostrarTodos = MostrarTodos;
    function Borrar() {
        document.getElementById("div_MostrarTodos").style.display = "block";
        MostrarTodas();
        document.getElementById("div_Borrar").style.display = "block";
        document.getElementById("div_mostrarIngreso").style.display = "none";
        document.getElementById("div_MostrarIngresoId").style.display = "none";
    }
    Opciones.Borrar = Borrar;
})(Opciones || (Opciones = {}));
function MostrarTodas() {
    var peticion = new XMLHttpRequest();
    peticion.open("POST", "personas.php", true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("accion=3");
    peticion.onreadystatechange = function () {
        if (peticion.status == 200 && peticion.readyState == 4) {
            document.getElementById("div_MostrarTodos").innerHTML = peticion.responseText;
        }
    };
}
var Persona;
(function (Persona) {
    function Borrar() {
        var id = document.getElementById("idBorrar").value;
        var flag = 0;
        var peticion = new XMLHttpRequest();
        var url = "accion=2&id=" + id;
        peticion.open("POST", "personas.php", true);
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        peticion.send(url); //Primero muestro
        alert(peticion.responseText);
        /*peticion.onreadystatechange=()=>{

                if(peticion.status==200 && peticion.readyState==4){

                    if(peticion.responseText.length>5){

                    
                    flag=1;
                    }else{
                        alert("No se encontró el ID "+id);
                        
                    }
                }*/
        if (flag == 1) {
            peticion.open("GET", "personas.php?accion=4&id=" + id, true);
            peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (confirm("Seguro que desea borrar esta persona? si/no")) {
                peticion.send();
                alert("se borro");
            }
        }
    }
    Persona.Borrar = Borrar;
})(Persona || (Persona = {}));
function MostrarUno() {
    var id = document.getElementById("id").value;
    var peticion = new XMLHttpRequest();
    peticion.open("POST", "personas.php", true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("accion=2&id=" + id);
    peticion.onreadystatechange = function () {
        if (peticion.status == 200 && peticion.readyState == 4) {
            if (peticion.responseText.length > 5) {
                alert(peticion.responseText);
            }
            else {
                alert("No se encontró el ID " + id);
            }
        }
    };
}
exports.MostrarUno = MostrarUno;
function Ingresar() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var peticion = new XMLHttpRequest();
    peticion.open("POST", "personas.php", true);
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    peticion.send("accion=1&nombre=" + nombre + "&apellido=" + apellido + "&edad=" + edad);
    peticion.onreadystatechange = function () {
        if (peticion.status == 200 && peticion.readyState == 4) {
            if (peticion.responseText == "1") {
                alert("Se cargo con exito");
                document.getElementById("div_mostrarIngreso").style.display = "none";
            }
            else {
                alert("No se pudo cargar");
            }
        }
    };
}
exports.Ingresar = Ingresar;
