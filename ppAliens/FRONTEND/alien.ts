/// <reference path="ente.ts" />

namespace Entidades{
    export class Alien extends Ente{
        private raza:string;
        private planetaOrigen:string;
        private pathFoto:string;

        public constructor(cuadrante:string,edad:number,altura:number,raza:string,planetaOrigen:string,pathFoto:string){
            super(cuadrante,edad,altura);
            this.raza=raza;
            this.planetaOrigen=planetaOrigen;
            this.pathFoto=pathFoto;
        }

        public ToString():string{
            return "{"+super.ToString()+',"raza":"'+this.raza+'","planetaOrigen":"'+this.planetaOrigen+'","pathFoto":"'+this.pathFoto+'"'+"}";
        }

        public ToJson():any{
            return JSON.parse(this.ToString());
        }
    }
}