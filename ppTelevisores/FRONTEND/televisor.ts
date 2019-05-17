/// <reference path="producto.ts" />

namespace Entidades{
    export class Televisor extends Producto{

        private _tipo:string;
        private _paisOrigen:string;
        private _pathFoto:string;

        public constructor(codigo:number,marca:string,precio:number,tipo:string,paisOrigen:string,pathFoto:string){

            super(codigo,marca,precio);
            this._tipo=tipo;
            this._paisOrigen=paisOrigen;
            this._pathFoto=pathFoto;
        }

        public ToString(){

            return "{"+super.ToString()+',"tipo":"'+this._tipo+'","paisOrigen":"'+this._paisOrigen+'","pathFoto":"'+this._pathFoto+'"}';
        }

        public ToJson(){
            return JSON.parse(this.ToString());
        }



       
    }
}