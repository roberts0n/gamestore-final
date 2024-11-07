import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {

  constructor(private toastController : ToastController,private alertController : AlertController) { }


  async presentToast(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'top',
      cssClass: 'toast-posicion'
    });

    await toast.present();
  }

  async presentAlert(titulo: string,mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  
  
}



