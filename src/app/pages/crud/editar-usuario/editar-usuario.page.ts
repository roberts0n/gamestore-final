import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  email: string ="";
  usuario: string ="";
  password: string ="";


  constructor(private router:Router,private alertcontroller: AlertController,private toastController: ToastController,private menuController: MenuController) { }

  ngOnInit() {
  }

  async alertaError(mensaje:string){
    const alerta = await this.alertcontroller.create({
      header: 'Error al registrarse',
      message: mensaje,
      buttons: ['Aceptar']
    });
    
    await alerta.present();
  }
  async alertaRegistro(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

  editarUsuario(){


    if( !this.email|| !this.usuario|| !this.password){
      this.alertaError('No puedes dejar campos vacios')
      return;
    };


    const formatoEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formatoEmail.test(this.email)){
      this.alertaError('Correo invalido.')
      return;
    };

    if (this.password.length<=8){
      this.alertaError('la contraseña debe tener mas de 8 caracteres.')
      return;
    }

     this.router.navigate(['/editar-cuentas']);
     this.alertaRegistro('Usuario editado con exito!')



  }


}
