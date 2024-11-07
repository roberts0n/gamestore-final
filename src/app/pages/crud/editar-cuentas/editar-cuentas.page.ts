import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-editar-cuentas',
  templateUrl: './editar-cuentas.page.html',
  styleUrls: ['./editar-cuentas.page.scss'],
})
export class EditarCuentasPage implements OnInit {

  arregloUsuarios: any = [{
    idUsuario: '',
    nombre: '',
    idRol : ''

  }]

  constructor(private toastController : ToastController,private router:Router,private bd: BdserviceService) { }

  ngOnInit() {

    this.bd.adminUsuarios(); 

    this.bd.fetchUsuarios().subscribe(data=>{
      this.arregloUsuarios = data;
       /* this.bd.presentAlert('editar perfiles admin','datos : '+JSON.stringify(data));  */
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

  bloquear(id : number){
    this.bd.bloquearUsuario(id)
  }

  desbloquear(id : number){
    this.bd.desbloquearUsuario(id)


  }

  quitarAdmin(id : number){
    this.bd.revocarAdmin(id)
  }

  darAdmin(id : number){
    this.bd.darAdmin(id)
  }



}
