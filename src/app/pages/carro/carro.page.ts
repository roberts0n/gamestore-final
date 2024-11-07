import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.page.html',
  styleUrls: ['./carro.page.scss'],
})
export class CarroPage implements OnInit {
  juegosCarro: any[] = [];
  totalCarro! : number;
  id_usuario! : number;

  constructor(private bd : BdserviceService) { }

  ngOnInit() {

    this.bd.fetchTotal().subscribe((data)=>{
      this.totalCarro = data;
    })

    this.id_usuario = Number(localStorage.getItem('usuarioId'));
    const idUsuario = Number(localStorage.getItem('usuarioId'));
    this.bd.getTotal(idUsuario);
    this.bd.getJuegosCarro(idUsuario);
    this.bd.fetchCarro().subscribe((data)=>{
      this.juegosCarro = data;
    })
  }



  async botonCompra(){

    this.bd.comprarJuegos(this.id_usuario);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Compra realizada',
          body: `Gracias por tu compra! El total de tu compra es $${this.totalCarro}. Presiona aqui para ver tus juegos en tu perfil!`,
          schedule: { at: new Date(Date.now() + 1000) }, // 1 segundo después
          /* sound: null, */ // Puedes agregar un sonido si lo deseas
          extra: {
            id: 1, // Puedes pasar datos extra
          },
        },
      ],
    });
    
   /*  this.alertaBoton('Juegos comprados con exito!') */

  }

  botonEliminar(id_juego : number){

    this.bd.eliminarJuegoCarro(this.id_usuario,id_juego);

  }

}
