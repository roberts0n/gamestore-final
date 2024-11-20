import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {

  password: string = "";
  codigo : string = "";
  codigoReal! : string;
  correo! : string;

  constructor(private alerta : AlertserviceService,private bd : BdserviceService,private router:Router,private alertcontroller: AlertController,private toastController: ToastController,private menuController: MenuController) { }

  ngOnInit() {
    this.codigoReal = "";
    this.codigoReal= String(localStorage.getItem('codigoRecuperacion'));
  }
  

  verificarLogin(correo : string){

    /*  console.log(`Usuario ingresado: ${this.usuario}`);
     console.log(`Contraseña ingresada: ${this.password}`);
     console.log(`Usuario admin: ${this.usuarioAdmin}`);
     console.log(`Contraseña admin: ${this.passwordAdmin}`);
    */
 
     if (this.password.trim()===""){
        this.alerta.presentToast('No puedes dejar campos vacios. Intenta nuevamente')
        return;
    };

    if (this.password.length<=8){
      this.alerta.presentToast('la contraseña debe tener mas de 8 caracteres. Intenta nuevamente')
      return;
    }

    const formatoPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
    if(!formatoPassword.test(this.password)){
      this.alerta.presentToast('La contraseña debe contener como minimo una mayuscula,un numero y un simbolo. Intenta nuevamente')
      return;
    }
 
     this.bd.updatePasswordRecuperacion(correo,this.password) 
     this.router.navigate(['/login']);
   };

   async cambioClave(correo : string){
    const alerta = await this.alertcontroller.create({
      header: 'Cambiar contraseña',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Nueva contraseña',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirma la contraseña',
        },
      ],
      buttons: [{
        text : 'Aceptar',
        handler: data =>{
          if (data.password === data.confirmPassword){
            this.password = data.password;
            this.verificarLogin(correo);
            
          }else{
            this.alerta.presentToast('Las claves no coinciden')
          }
        }
      }]
    });
    await alerta.present();
  };

  comprobarCodigo(){

    if ( this.codigo===""){
      this.alerta.presentToast('No puedes dejar campos vacios')

      return;
  };
    
    if(this.codigo===this.codigoReal){
      this.correo = String(localStorage.getItem('correoRecuperacion'));
      /* this.cambioClave(this.correo); */
      this.router.navigate(['/recuperar-clave-final']);
      this.alerta.presentToast('Codigo ingresado correctamente!')
    }
    else{
      this.alerta.presentToast('Codigo ingresado no coincide')
      return;
    }
  };


}
