export class Juego {

    constructor(
        public id_juego : number,
        public nombre_juego : string,
        public precio : number,
        public nombre_plataforma : string,
        public nombre_categoria : string,
        public descripcion : string,
        public imagen : any,
        public id_plataforma? : number,
        public id_categoria? : number,
        public metacritic?: number, // Nuevos campos opcionales
        public fecha_lanzamiento?: string,
        public esta_desactivado? : boolean
    ){}
}
