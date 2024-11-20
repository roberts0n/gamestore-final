export class Usuario {
    /*  idUsuario!: number;
     email! : string;
     nombre! : string;
     edad? : number;
     imagen? : string; */

    constructor(
        public idUsuario: number,
        public email : string,
        public nombre : string,
        public id_rol : number,
        public edad? : number,
        public imagen? : any,
        public esta_bloqueado? : boolean
    ){}
     
}
