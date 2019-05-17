/// <reference path="producto.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this._tipo = tipo;
            _this._paisOrigen = paisOrigen;
            _this._pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToString = function () {
            return "{" + _super.prototype.ToString.call(this) + ',"tipo":"' + this._tipo + '","paisOrigen":"' + this._paisOrigen + '","pathFoto":"' + this._pathFoto + '"}';
        };
        Televisor.prototype.ToJson = function () {
            return JSON.parse(this.ToString());
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
