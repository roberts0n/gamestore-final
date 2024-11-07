import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AlertController, IonicModule, MenuController } from '@ionic/angular';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule,RouterLinkWithHref,MatMenuModule,CommonModule]
})
export class HeaderComponent  implements OnInit {

  estadoRol! : boolean;

  mostrarLista = false;

  activarLista(){
    this.mostrarLista = !this.mostrarLista;
  }

  constructor(private alertController : AlertController,private menuController: MenuController,private router: Router,private bd: BdserviceService) {

   }

 /*   verificarRol(): boolean{
    const usuarioRol = localStorage.getItem('rolUsuario');

    if(usuarioRol==='1'){
      return false;
    }else{
      return true;
    }
    
   }
 */

   verificarRol() {
    const usuarioRol = localStorage.getItem('rolUsuario');
    this.estadoRol = usuarioRol === '2'; // True si es admin, false si es cliente
  }


   cerrarSesion(){
    localStorage.clear();
    this.menuController.enable(false,'menu');
    this.router.navigate(['/login']);
   }

    /* ngOnInit() {
      this.estadoRol = this.verificarRol();
      this.bd.rolCambio$.subscribe(() => {
        this.estadoRol = this.verificarRol();
      });
    }
   */


    async cerrarSesionAlert() {
      const alert = await this.alertController.create({
        header: 'Cerrar sesion',
        message: 'Quieres cerrar sesion?',
        buttons: [
          {
            text: 'Si',
            handler: () => {
              console.log('Botón "Si" presionado');
              this.cerrarSesion();
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              return;
            },
          },
        ],
      });
    
      await alert.present();
    }
  

    ngOnInit() {
      this.verificarRol();
      this.bd.rolCambio$.subscribe(() => {
        this.verificarRol(); // Actualiza el rol cuando cambia
      });
    }
  }