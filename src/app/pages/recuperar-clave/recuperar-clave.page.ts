import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {

  email: string = "";
  emailAdmin : string = "admin@gmail.com";

  constructor(private router:Router,private bd : BdserviceService,private alerta : AlertserviceService) { }

  ngOnInit() {
  }

  comprobarEmail(){
  
  if( !this.email){
    this.alerta.presentToast('No puedes dejar campos vacios!')
    return;
  };

  const formatoEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!formatoEmail.test(this.email)){
    this.alerta.presentToast('Correo invalido!')
    return;
  };


  this.bd.checkCorreo(this.email)
  .then((resultado)=>{
    if(resultado.existe){
      this.alerta.presentAlert('Cambio de contraseña','Se ha enviado un codigo a tu correo!')
      this.router.navigate(['cambio-clave'])
    }
    else{
      this.alerta.presentToast('Correo no existe!')
    }
  }).catch((error) => {
        console.error(error);
      });

  


  };

}
