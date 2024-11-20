import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Juego } from 'src/app/services/juego';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

   formulario: FormGroup; 
 /*  nombreJuego : string = "";
  categoria! : number ; */
  /* plataforma! : number ; */
/*   precio! : number ; */
  imagen : any;
  /* descripcion! : string; */
  id! : number;
  juego! : Juego | null;

  

  constructor(private alerta : AlertserviceService,private formBuilder: FormBuilder,private router:Router,private bd : BdserviceService ) {
    if(this.router.getCurrentNavigation()?.extras.state){

      this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
    }

     this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.minLength(3), Validators.pattern(/\S+/)]],
      plataforma: [null, ],
      categoria: [null, ],
      descripcion: ['', [Validators.minLength(10), Validators.pattern(/\S+/)]],
      precio: [null, [ Validators.min(1000)]],
      imagen: ['']
    },{ validators: this.alMenosUnCampoCambiado() }); 
   }


  ngOnInit() {
    if(this.id){

      this.bd.getJuegosById(this.id);
      this.bd.fetchJuegoById().subscribe((data)=>{
        this.juego = data;

        if(this.juego){
          this.formulario.patchValue({
            nombre : this.juego.nombre_juego,
            plataforma : String(this.juego.id_plataforma),
            categoria : String(this.juego.id_categoria),
            descripcion : this.juego.descripcion,
            precio : this.juego.precio,
          })
          this.imagen = this.juego.imagen;
        }
      })

    }
  }

   onSubmit(){


    if (this.formulario.invalid) {
      this.alerta.presentToast('Debes modificar al menos un campo SUBNORMAL');
      return;
    }


    const {nombre, plataforma, categoria, descripcion, precio, imagen} = this.formulario.value;

      this.bd.updateJuego(nombre,imagen,plataforma,categoria,precio,descripcion,this.id)
      /* this.alertaBoton('Juego registrado con exito!') */
      this.router.navigate(['/menu-admin']);


  } 

  alMenosUnCampoCambiado() {
    return (FormGroup: AbstractControl): ValidationErrors | null => {
      const nombre = FormGroup.get('nombre')?.value;
      const plataforma = FormGroup.get('plataforma')?.value;
      const categoria = FormGroup.get('categoria')?.value;
      const descripcion = FormGroup.get('descripcion')?.value;
      const precio = FormGroup.get('precio')?.value;
      const imagen = FormGroup.get('imagen')?.value;

      // Validamos que al menos uno de los campos no esté vacío
      if (!nombre && !plataforma && !categoria && !descripcion && !precio && !imagen) {
        return { camposVacios: true };
      }

      return null;  // Si al menos un campo tiene valor, no hay error
    };
  }

  /* async alertaBoton(mensaje:string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  } */


  
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
     this.formulario.get('imagen')?.markAsDirty();
  };


 /*  verDescripcion(id : any){

    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/editar-juegos'],navigationextras)
  } */

   /* botonEditar(){
   
      if(this.nombreJuego==="" || this.categoria===null || this.plataforma===null || this.precio === undefined || this.precio === null || this.descripcion ===""){
        this.bd.presentAlert('editar','No puedes dejar campos vacios')
        return;
      }
      
      if(this.precio < 0){
        this.bd.presentAlert('editar','El precio no puede ser negativo')
        return;
      }
  
  
      
      this.bd.updateJuego(this.nombreJuego,this.imagen,this.plataforma,this.categoria,this.precio,this.descripcion,this.id)
      this.alertaBoton('Juego registrado con exito!')
      this.router.navigate(['/menu-admin']);
  
  
    this.alertaBoton('Juego editado con exito!')
    this.router.navigate(['/menu-admin']);


  } */
}
