namespace Entidades{
    export class Producto{
        private _codigo:number;
        private _marca:string;
        private _precio:number;

        public constructor(codigo:number,marca:string,precio:number){
            this._codigo=codigo;
            this._marca=marca;
            this._precio=precio;
        }

        public ToString(){
            return '"codigo":'+this._codigo+',"marca":"'+this._marca+'","precio":'+this._precio;
        }
    }
}