import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    noticias : any[] = [];
    stores: any[] = [];
    error: string | null = null;
    juegosRecientes: any[] = [];
    juegosProximos: any[] = [];
    searchTerm: string = '';
    busquedaRealizada: boolean = false;

    arregloJuegos : any = [{
      idJuego : '',
      nombre_juego : '',
      precio : '',
      nombre_plataforma : '',
      nombre_categoria : '',
      descripcion : '',
      imagen : ''

    }]
    juegosFiltrados : any = [{
      idJuego : '',
      nombre_juego : '',
      precio : '',
      nombre_plataforma : '',
      nombre_categoria : '',
      descripcion : '',
      imagen : ''

    }]
    arregloJuegosRandom : any = [{
      idJuego : '',
      nombre_juego : '',
      precio : '',
      nombre_plataforma : '',
      nombre_categoria : '',
      descripcion : '',
      imagen : '',
      esta_desactivado : 0

    }]

  constructor(private api : ApiserviceService,private router: Router,private menuController: MenuController,private bd : BdserviceService) {  
    this.menuController.enable(true, 'menu');
   }




   filtrarJuegos(id : number){
    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/categoria'],navigationextras);
   }
  filtroPaginaPlaystation(){
    let navigationextras : NavigationExtras = {
      state:{
        titulo : 'Plataforma: ',
        filtro : 'Playstation'
      }
    }
    this.router.navigate(['/categoria'],navigationextras)
  };

  irCategoria(id : number,titulo : string){
    let navigationextras : NavigationExtras = {
      state:{
        id : id,
        titulo : titulo
      }
    }
    this.router.navigate(['/categoria'],navigationextras)
  }

  irPlataforma(id : number,titulo : string){
    let navigationextras : NavigationExtras = {
      state:{
        id : id,
        titulo : titulo
      }
    }
    this.router.navigate(['/plataforma'],navigationextras)
  }

  verDescripcion(id : any){

    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/descripcion'],navigationextras)
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
  
    // Mostrar el término de búsqueda en la consola
    console.log('searchTerm:', searchTerm);
  
    // Si el término de búsqueda está vacío, no muestra nada
    if (searchTerm === '') {
      this.juegosFiltrados = [];
      this.busquedaRealizada = false;
       // No mostrar ningún juego
    } else {
      // Filtrar los juegos según el término de búsqueda
      this.juegosFiltrados = this.arregloJuegos.filter((juego: any) => 
        juego.nombre_juego.toLowerCase().includes(searchTerm)
      );
      this.busquedaRealizada = true;
    }
    
    // Mostrar la lista filtrada en la consola
    console.log('juegosFiltrados:', this.juegosFiltrados);
  }
  ngOnInit() {

      const limite = 6;    
      this.api.getJuegosProximos(limite).subscribe(
        data=>{
          this.juegosProximos = data;
        },
        error=>{
          this.bd.presentAlert('error al get juegos ',': '+JSON.stringify(error))
          this.error = 'No se pudo cargar la información de los juegos recientes.';
        }
      )
    this.bd.getJuegos();
    this.bd.fetchJuegos().subscribe(data=>{
      this.arregloJuegos = data;
    })
    this.bd.getJuegosRandom();
    this.bd.fetchJuegosRandom().subscribe(data=>{
      this.arregloJuegosRandom = data;
      
    })
  }

}
