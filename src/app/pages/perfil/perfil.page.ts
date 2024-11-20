import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/usuario';
import { customAlphabet } from 'nanoid';
import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario!: Usuario | null;
  juegosCompra: any[] = [];
  /* clave: string = ''; */
  /* mostrarClave = false; */



  constructor(private bd : BdserviceService,private alerta : AlertserviceService) { }

  ngOnInit(
  ) {


   /*  this.obtenerUsuario(); */

   /*  this.bd.usuario$.subscribe(usuario => {
      this.usuario = usuario;
    }); */

    this.bd.fetchUsuario().subscribe((data)=>{
      this.usuario = data;
    })

    this.bd.fetchCompras().subscribe((data)=>{
      this.juegosCompra = data;
    })

    const idString = localStorage.getItem('usuarioId');
    const id2 = idString ? parseInt(idString,10) : 0;
    const idNumber = Number(idString);
    if (idString) {
      const idNumber = Number(idString);
      /* this.bd.presentAlert('perfil', 'El id que guarda el localStorage: ' + idNumber); */
      this.bd.getUsuario(idNumber);
      this.bd.getJuegosComprados(idNumber);
  } else {
      this.alerta.presentAlert('perfil','No se encontró el usuarioId en localStorage');
  }

   /*  this.bd.presentAlert('perfil','el id que guarda el localStorage :' + idNumber)
    this.bd.getUsuario(idNumber);
     */

  }

  mostrarClave(juego: any) {
    juego.mostrarClave = !juego.mostrarClave;
  }

  async copiarClave(clave: string) {
    try {
      // Copiar la clave al portapapeles
      await Clipboard.write({
        string: clave
      });

      // Mostrar alerta confirmando que se copió la clave
      this.alerta.presentToast('Clave copiada al portapapeles!');
    } catch (err) {
      // Si hay un error, mostrar un mensaje de error
      this.alerta.presentAlert('Error', 'No se pudo copiar la clave, el error es :'+err);
    }
  }


 /*  mostrarClave() {
   
    juego.mostrarClave = !juego.mostrarClave;
  }
 */
 /*  async obtenerUsuario(){
    const idString = localStorage.getItem('usuarioId');
    const id = idString ? parseInt(idString,10) : null;

    if(id !== null){
      this.usuario = await this.bd.getUsuario(id)
    }else{
      this.bd.presentAlert('error','fallo al obtener id de localStorage.');
    }
  } */

}
