import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';

@Component({
  selector: 'app-registro-juego',
  templateUrl: './registro-juego.page.html',
  styleUrls: ['./registro-juego.page.scss'],
})
export class RegistroJuegoPage implements OnInit {

  nombreJuego : string = "";
  categoria! : number ;
  plataforma! : number ;
  precio! : number ;
  imagen : any;
  descripcion! : string;
  formulario: FormGroup;

  

  constructor(private alerta : AlertserviceService,private formBuilder: FormBuilder,private toastController : ToastController,private router:Router,private alertcontroller: AlertController,private bd: BdserviceService) {

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/\S+/)]],
      plataforma: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [null, [Validators.required, Validators.min(1000)]],
      imagen: ['', [Validators.required]]
    });
    
   }  

  ngOnInit() {
  }

  onSubmit(){
    if(this.formulario.invalid){
      this.alerta.presentToast('Campos invalidos.')
    }

    const {nombre, plataforma, categoria, descripcion, precio, imagen} = this.formulario.value;

    this.bd.insertarJuego(nombre,imagen,plataforma,categoria,precio,descripcion);
    /* this.alertaBoton('Juego registrado con exito!') */
    this.router.navigate(['/menu-admin']);

  }


  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagen = image.webPath;
    this.formulario.patchValue({ imagen: this.imagen });
  };


  registroJuego(){
    if(this.nombreJuego==="" || this.categoria===null || this.plataforma===null || this.precio === undefined || this.precio === null || this.descripcion ===""){
      this.alertaError('No puedes dejar campos vacios')
      return;
    }
    
    if(this.precio < 0){
      this.alertaError('El precio no puede ser negativo')
      return;
    }



    this.bd.insertarJuego(this.nombreJuego,this.imagen,this.plataforma,this.categoria,this.precio,this.descripcion)
    /* this.alertaBoton('Juego registrado con exito!') */
    this.router.navigate(['/menu-admin']);


  }

  async alertaBoton(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }

  async alertaError(mensaje:string){
    const alerta = await this.alertcontroller.create({
      header: 'Error al registrar',
      message: mensaje,
      buttons: ['Aceptar']
    });
    
    await alerta.present();
  }

  botonRegistro(){

    this.alertaBoton('Juego registrado con exito!')
    this.router.navigate(['/menu-admin']);


  }


}
