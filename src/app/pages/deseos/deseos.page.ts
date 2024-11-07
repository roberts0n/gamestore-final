import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-deseos',
  templateUrl: './deseos.page.html',
  styleUrls: ['./deseos.page.scss'],
})
export class DeseosPage implements OnInit {
  juegosDeseados: any[] = [];

  constructor(private bd : BdserviceService) { }

  ngOnInit() {

    this.bd.fetchDeseados().subscribe((data)=>{
      this.juegosDeseados = data;
    })
    const idUsuario = Number(localStorage.getItem('usuarioId'));
    this.bd.getDeseados(idUsuario);

  }


  botonCompra(id_juego : number){

    const id_usuario = Number(localStorage.getItem('usuarioId'));

    this.bd.insertJuegosInCarro(id_usuario, id_juego);


  }

  botonEliminar(id_juego : number){

    const id_usuario = Number(localStorage.getItem('usuarioId'));

    this.bd.deleteDeseado(id_usuario,id_juego)

  }

}
