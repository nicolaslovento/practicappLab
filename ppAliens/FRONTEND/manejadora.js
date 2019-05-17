/// <reference path="alien.ts" />
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function () {
            var cuadrante = document.getElementById('cuadrante').value;
            var edad = +document.getElementById('edad').value;
            var altura = parseFloat(document.getElementById('altura').value);
            var raza = document.getElementById('raza').value;
            var paisOrigen = document.getElementById('cboPlaneta').value;
            var foto = document.getElementById('foto');
            var pathFoto = document.getElementById('foto').value;
            pathFoto = (pathFoto.split("\\"))[2]; //tomo nombre de la foto
            var alien = new Entidades.Alien(cuadrante, edad, altura, raza, paisOrigen, pathFoto);
            var fmData = new FormData();
            if (localStorage.getItem('modificar') == 'si') {
                fmData.append('caso', 'modificar');
            }
            else {
                fmData.append('caso', 'agregar');
            }
            fmData.append('cadenaJson', JSON.stringify(alien.ToJson()));
            fmData.append('foto', foto.files[0]);
            var xmr = new XMLHttpRequest();
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.open("POST", "./BACKEND/administrar.php", true);
            xmr.setRequestHeader('enctype', 'multipart/form-data');
            xmr.send(fmData);
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = JSON.parse(xmr.responseText);
                    //alert(JSON.stringify(retorno));
                    if (localStorage.getItem('modificar') == 'si') {
                        if (retorno.TodoOK) {
                            alert("se modifico");
                            document.getElementById('imgFoto').src = "./BACKEND/fotos/" + pathFoto;
                            Manejadora.GuardarEnLocalStorage();
                            Manejadora.MostrarAliens();
                            localStorage.setItem('modificar', 'no');
                            document.getElementById('btn-agregar').value = "Agregar";
                            document.getElementById('cuadrante').disabled = false;
                        }
                        else {
                            alert("no se modifico");
                            console.log("no se modifico");
                            document.getElementById('btn-agregar').value = "Agregar";
                        }
                    }
                    else {
                        if (retorno.TodoOK) {
                            alert("se agrego");
                        }
                        else {
                            alert("no se pudo agregar");
                        }
                    }
                }
            };
        };
        Manejadora.MostrarAliens = function () {
            var xmr = new XMLHttpRequest();
            xmr.open("POST", "./BACKEND/administrar.php", true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmr.send("caso=traer");
            var eliminar;
            var modificar;
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = JSON.parse(xmr.responseText);
                    var tabla = "<table border=1><th>CUADRANTE</th><th>EDAD</th><th>RAZA</th><th>FOTO</th><th>ACCIONES</th>";
                    for (var i = 0; i < retorno.length; i++) {
                        eliminar = "<button onclick='RecuperatorioPrimerParcial.Manejadora.EliminarAlien(" + JSON.stringify(retorno[i]) + ")'>Eliminar </button>";
                        modificar = "<button onclick='RecuperatorioPrimerParcial.Manejadora.ModificarAlien(" + JSON.stringify(retorno[i]) + ")'>Modificar </button>";
                        tabla += "<tr><td>" + retorno[i].cuadrante + "</td><td>" + retorno[i].edad + "</td><td>" + retorno[i].raza + "</td><td><img src='./BACKEND/fotos/" + retorno[i].pathFoto + "' width=100 height=100></td><td>" + eliminar + modificar + "</td></tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xmr = new XMLHttpRequest();
            xmr.open("POST", "./BACKEND/administrar.php", true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmr.send("caso=traer");
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = xmr.responseText;
                    localStorage.setItem("aliens_local_storage", retorno);
                    var comprobar = localStorage.getItem("aliens_local_storage");
                    if (comprobar != null) {
                        alert("Se guardo en LocalStorage");
                    }
                    else {
                        alert("No se guardo en LocalStorage");
                    }
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var cuadrante = document.getElementById('cuadrante').value;
            var raza = document.getElementById('raza').value;
            var strTele;
            strTele = localStorage.getItem("aliens_local_storage");
            var aliens = JSON.parse(strTele);
            for (var i = 0; i < aliens.length; i++) {
                if (cuadrante == aliens[i].cuadrante && raza == aliens[i].raza) {
                    alert("EXISTE");
                    return true;
                }
            }
            alert("NO EXISTE");
            Manejadora.AgregarAlien();
            Manejadora.GuardarEnLocalStorage();
            return false;
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var auxContador = new Array();
            var auxLocalStorage = "";
            if (localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = localStorage.getItem("aliens_local_storage");
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);
                var auxJson = JSON.parse(auxLocalStorage);
                for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
                    var alien = auxJson_1[_i];
                    if (auxContador[alien.planetaOrigen] === undefined) {
                        auxContador[alien.planetaOrigen] = 0;
                    }
                    auxContador[alien.planetaOrigen]++;
                }
                //console.log(auxContador);
                var auxMax = undefined;
                var auxMin = undefined;
                for (var planeta in auxContador) {
                    if (auxMax === undefined && auxMin === undefined) {
                        auxMax = auxContador[planeta];
                        auxMin = auxContador[planeta];
                    }
                    var cantAliens = auxContador[planeta];
                    //console.log(planeta, cantAliens);
                    if (auxMax < cantAliens) {
                        auxMax = cantAliens;
                        console.log("Cambio el maximo");
                    }
                    if (auxMin > cantAliens) {
                        auxMin = cantAliens;
                        console.log("Cambio el minimo");
                    }
                }
                var planetasMax = new Array();
                var planetasMin = new Array();
                for (var planeta in auxContador) {
                    if (auxContador[planeta] == auxMax) {
                        planetasMax.push(planeta);
                    }
                    else if (auxContador[planeta] == auxMin) {
                        planetasMin.push(planeta);
                    }
                }
                //console.log(planetasMax +"\nCambio a min\n"+ planetasMin);
                var mensaje = "El/Los planetas con mas aliens son ";
                if (planetasMax.length > 0) {
                    for (var _a = 0, planetasMax_1 = planetasMax; _a < planetasMax_1.length; _a++) {
                        var planeta = planetasMax_1[_a];
                        mensaje += "\n-" + planeta;
                    }
                    mensaje += "\nCon " + auxMax;
                    console.log(mensaje);
                }
                if (planetasMin.length > 0) {
                    mensaje = "El/Los planetas con menos aliens son ";
                    for (var _b = 0, planetasMin_1 = planetasMin; _b < planetasMin_1.length; _b++) {
                        var planeta = planetasMin_1[_b];
                        mensaje += "\n-" + planeta;
                    }
                    mensaje += "\nCon " + auxMin;
                    console.log(mensaje);
                }
            }
        };
        Manejadora.EliminarAlien = function (obj) {
            var xmr = new XMLHttpRequest();
            xmr.open("POST", "./BACKEND/administrar.php", true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmr.send("caso=eliminar&cadenaJson=" + JSON.stringify(obj));
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = JSON.parse(xmr.responseText);
                    if (retorno.TodoOK) {
                        alert("Se borro");
                    }
                    else {
                        alert("No se borro");
                    }
                }
            };
        };
        Manejadora.ModificarAlien = function (obj) {
            document.getElementById('cuadrante').value = obj.cuadrante;
            document.getElementById('cuadrante').disabled = true;
            document.getElementById('edad').value = obj.edad;
            document.getElementById('altura').value = obj.altura;
            document.getElementById('raza').value = obj.raza;
            document.getElementById('cboPlaneta').value = obj.paisOrigen;
            document.getElementById('imgFoto').src = "./BACKEND/fotos/" + obj.pathFoto;
            localStorage.setItem('modificar', 'si');
            document.getElementById('btn-agregar').value = "Modificar";
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
