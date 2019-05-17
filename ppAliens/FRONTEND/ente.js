var Entidades;
(function (Entidades) {
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this.altura = altura;
            this.edad = edad;
            this.cuadrante = cuadrante;
        }
        Ente.prototype.ToString = function () {
            return '"cuadrante":"' + this.cuadrante + '","edad":' + this.edad + ',"altura":' + this.altura;
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
