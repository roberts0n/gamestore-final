import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Juego } from 'src/app/services/juego';
import SwiperCore, { Navigation, Pagination } from 'swiper';





SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

  nombre : string = "";
  plataforma : string = "";
  icono : string = "";
  descripcion : string = "";
  precio : string = "";
  imagen : string = "";
  id! : number;
  juego! : Juego | null;
  screenshots: string[] = [];

  constructor(private alerta : AlertserviceService,private api : ApiserviceService,private router: Router, private activedroute: ActivatedRoute,private bd : BdserviceService) { 
    this.activedroute.queryParams.subscribe(param =>{

      if(this.router.getCurrentNavigation()?.extras.state){

        this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    })
  }
  ngOnInitOLOLOLOLO() {
    this.screenshots = []; // PARA REINICIAR LAS FOTOS 
    
    this.juego = null; // PARA REINICIAR LA INFO
   this.bd.getJuegosById(this.id); 
    if (this.id) {
      this.bd.fetchJuegoById().subscribe((data) => {
        this.juego = data;
        if (this.juego) {
          this.api.getJuegoByNombre(this.juego.nombre_juego).subscribe((rawgData: any) => {
            if (rawgData.results && rawgData.results.length > 0) {
              const resultado = rawgData.results[0]; // esto toma el primer resultado que encuentra en la api
              const id_juego = resultado.id;
              // Con la id conseguida ahora si se llama al juego de la api
              this.api.getJuegoById(id_juego).subscribe((detalle: any) => {
                if (this.juego) {
                  // Aquí añadimos los nuevos datos al juego que ya TENGO(REMEMBER ESTO)
                  this.juego.metacritic = detalle.rating;
                  this.juego.fecha_lanzamiento = detalle.released;
                  //aca se guardan las fotos del juego pero en otra variable nada q ver
                  //es otra variable QUE NO ESTA EN LA CLASE DE JUEGO RECUERDATE QUE POR ESTO FALLABA AAAAAAAAAA.
                  this.api.getScreenshotsById(id_juego).subscribe((data: any)=>{
                    this.screenshots = data.results.map((screenshot: any) => screenshot.image)
                  })
                }
              });
            }
          });
        }
      });
    }
  }

  ngOnInit() {
    this.screenshots = []; // Reiniciar fotos
    this.juego = null; // Reiniciar información
  
    if (this.id) {
      // Asegurar que los datos de la base de datos estén listos antes de proceder con la API
      this.bd.getJuegosById(this.id).then(() => {
        this.bd.fetchJuegoById().subscribe((data) => {
          this.juego = data;
          if (this.juego) {
            this.api.getJuegoByNombre(this.juego.nombre_juego).subscribe((rawgData: any) => {
              if (rawgData.results && rawgData.results.length > 0) {
                const resultado = rawgData.results[0]; // primer resultado de la API RAWG
                const id_juego = resultado.id;
  
                // Ahora obtenemos los detalles y screenshots del juego desde la API RAWG
                this.api.getJuegoById(id_juego).subscribe((detalle: any) => {
                  if (this.juego) { 
                    this.juego.metacritic = detalle.rating;
                    this.juego.fecha_lanzamiento = detalle.released;
  
                    // Cargar screenshots del juego
                    this.api.getScreenshotsById(id_juego).subscribe((data: any) => {
                      this.screenshots = data.results.map((screenshot: any) => screenshot.image);
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
  }


  botonDeseo(id_juego : number){

    const id_usuario = Number(localStorage.getItem('usuarioId'));


    this.bd.InsertDeseado(id_juego,id_usuario)

  }

  async botonCompra(id_juego: number) {
    const id_usuario = Number(localStorage.getItem('usuarioId'));
    try {
      await this.bd.insertJuegosInCarro(id_usuario, id_juego); // Asegúrate de que esta función sea async
      console.log('Juego agregado al carro'); // Agrega un log para verificar que se haya ejecutado
    } catch (error) {
      console.error('Error al agregar al carro:', error);
      this.alerta.presentAlert('Error', 'No se pudo agregar al carro.');
    }
  }


  

}
