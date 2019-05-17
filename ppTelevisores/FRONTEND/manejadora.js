/// <reference path="Televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            var codigo = +document.getElementById('codigo').value;
            var marca = document.getElementById('marca').value;
            var precio = parseFloat(document.getElementById('precio').value);
            var tipo = document.getElementById('tipo').value;
            var pais = document.getElementById('pais').value;
            var foto = document.getElementById('foto');
            var pathFoto = document.getElementById('foto').value;
            pathFoto = (pathFoto.split("\\"))[2];
            var televisor = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            var fmData = new FormData();
            fmData.append('caso', 'agregar');
            fmData.append('cadenaJson', JSON.stringify(televisor.ToJson()));
            fmData.append('foto', foto.files[0]);
            var xmr = new XMLHttpRequest();
            xmr.open("POST", "./BACKEND/administrar.php", true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader('enctype', 'multipart/form-data');
            xmr.send(fmData);
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = JSON.parse(xmr.responseText);
                    if (retorno.TodoOK) {
                        alert("se cargo");
                    }
                    else {
                        alert("no se cargo");
                    }
                }
            };
        };
        Manejadora.MostrarTelevisores = function () {
            var xmr = new XMLHttpRequest();
            xmr.open("POST", "./BACKEND/administrar.php", true);
            //'enctype', 'multipart/form-data'
            //"content-type","application/x-www-form-urlencoded"
            xmr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmr.send("caso=traer");
            xmr.onreadystatechange = function () {
                if (xmr.status == 200 && xmr.readyState == 4) {
                    var retorno = JSON.parse(xmr.responseText);
                    var tabla = "<table border=1><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th>";
                    for (var i = 0; i < retorno.length; i++) {
                        tabla += "<tr><td>" + retorno[i].codigo + "</td><td>" + retorno[i].marca + "</td><td>" + retorno[i].precio + "</td><td><img src='./BACKEND/fotos/" + retorno[i].pathFoto + "' width=100 height=100></td></tr>";
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
                    localStorage.setItem("televisores_local_storage", retorno);
                    var comprobar = localStorage.getItem("televisores_local_storage");
                    if (comprobar != null) {
                        alert("SI se guardo en LS");
                    }
                    else {
                        alert("NO se guardo en LS");
                    }
                }
            };
        };
        /*VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. Para ello, comparará los
códigos de los televisores guardados en el LocalStorage. Si el televisor existe, se mostrará (por
consola y alert) lo acontecido. Caso contrario, agregará el nuevo televisor y se actualizará el
LocalStorage (GuardarEnLocalStorage).*/
        Manejadora.VerificarExistencia = function () {
            var codigo = +document.getElementById('codigo').value;
            var strTele;
            strTele = localStorage.getItem("televisores_local_storage");
            var televisores = JSON.parse(strTele);
            for (var i = 0; i < televisores.length; i++) {
                if (codigo == televisores[i].codigo) {
                    alert("EXISTE");
                    return true;
                }
            }
            alert("NO EXISTE");
            Manejadora.AgregarTelevisor();
            Manejadora.GuardarEnLocalStorage();
            return false;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
