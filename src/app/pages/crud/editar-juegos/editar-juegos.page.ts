import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-editar-juegos',
  templateUrl: './editar-juegos.page.html',
  styleUrls: ['./editar-juegos.page.scss'],
})
export class EditarJuegosPage implements OnInit {

  arregloJuegos : any = [{
    idJuego : '',
    nombre_juego : '',
    precio : '',
    nombre_plataforma : '',
    nombre_categoria : '',
    descripcion : '',
    imagen : ''

  }]

  constructor(private toastController : ToastController,private router:Router,private bd : BdserviceService) { }

  
  ngOnInit() {

    this.bd.getJuegos();

    this.bd.fetchJuegos().subscribe(data=>{
      this.arregloJuegos = data;
    })
  }

  async alertaBoton(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

  botonEliminar(id : number){


    this.bd.deleteJuego(id)
  }


  irEditar(id : number){


    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/editar'], navigationextras).then(success => {
      console.log('Navegación exitosa:', success);
    }).catch(error => {
      console.error('Error en la navegación:', error);
    });
  }


}
