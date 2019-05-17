namespace Entidades{
    export class Ente{
        private cuadrante:string;
        private edad:number;
        private altura:number;

        public constructor(cuadrante:string,edad:number,altura:number){

            this.altura=altura;
            this.edad=edad;
            this.cuadrante=cuadrante;
        }

        public ToString(){
            return '"cuadrante":"'+this.cuadrante+'","edad":'+this.edad+',"altura":'+this.altura;
        }
    }
}