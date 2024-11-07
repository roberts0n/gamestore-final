import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { Usuario } from 'src/app/services/usuario';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  /* email: string ="";
  usuario: string ="";
  password: string ="";
  edad!:  number ; */
  imagen : any;
  Usuario!: Usuario | null;
  formulario: FormGroup;


  constructor(private formBuilder: FormBuilder,private alerta : AlertserviceService,private router:Router,private alertcontroller: AlertController,private toastController: ToastController,private menuController: MenuController,private bd :BdserviceService) {

    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.minLength(3)]], // Al menos 3 letras si se cambia
      edad: ['', [Validators.min(13), Validators.max(120)]], // Edad entre 13 y 120
      imagen: [''] // Sin restricciones aquí
    }, { validators: this.validarCamposVacios() });
   }

   ngOnInit() {
    const id_usuario = Number(localStorage.getItem('usuarioId'));
    
    if (id_usuario) {
      // Obtener los datos del usuario y rellenar el formulario
      this.bd.getUsuario(id_usuario);
      this.bd.fetchUsuario().subscribe((data) => {
        this.Usuario = data;

        // Rellenar el formulario con los datos obtenidos
        if (this.Usuario) {
          this.formulario.patchValue({
            usuario: this.Usuario.nombre,
            edad: this.Usuario.edad,
            foto: this.Usuario.imagen
          });
          this.imagen = this.Usuario.imagen;
          this.formulario.setValidators([
            this.validarCamposVacios(),
            this.validarCambios(this.Usuario.nombre, this.Usuario.edad, this.Usuario.imagen)
        ]);
        this.formulario.updateValueAndValidity();

        }
      });
    }
  }

  validarCamposVacios() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const usuario = formGroup.get('usuario')?.value;
        const edad = formGroup.get('edad')?.value;
        const imagen = formGroup.get('imagen')?.value;

        // Validamos que al menos uno de los campos no esté vacío
        if (!usuario && !edad && !imagen) {
            return { camposVacios: true };
        }

        return null; // Si al menos un campo tiene valor, no hay error
    };
}

validarCambios(usuarioActual: string, edadActual: number | undefined, imagenActual: any) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
      const usuario = formGroup.get('usuario')?.value;
      const edad = formGroup.get('edad')?.value;
      const imagen = formGroup.get('imagen')?.value;

      if (usuario === usuarioActual && (edad === edadActual || edadActual === undefined) && imagen === imagenActual) {
          return { camposSinCambios: true };
      }

      return null; 
  };
}

  alMenosUnCampoCambiado() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const usuarioActual = this.Usuario?.nombre || '';
     const edadActual = this.Usuario?.edad || '';
      const imagenActual = this.Usuario?.imagen || '';
      const usuario = formGroup.get('usuario')?.value;
      const edad = formGroup.get('edad')?.value;
      const imagen = formGroup.get('imagen')?.value;

      // Validamos que al menos uno de los campos no esté vacío
      if (!usuario && !edad && !imagen) {
        return { camposVacios: true };
      }

      if (usuario === usuarioActual && edad === edadActual && imagen === imagenActual) {
        return { camposSinCambios: true }; // Error si todos los campos son iguales a los actuales
      }

      

      return null;  // Si al menos un campo tiene valor, no hay error
    };
  }

  editarUser() {
    if (this.formulario.invalid) {
      this.alerta.presentToast('Debes modificar al menos un campo');
      return;
    }

    const {usuario, edad, imagen} = this.formulario.value;

    this.bd.updateUsuario(usuario, edad, imagen)
    .then(()=>{
      const idString = localStorage.getItem('usuarioId');
      const id_usuario = Number(localStorage.getItem('usuarioId'))

      this.bd.getUsuario(id_usuario)
      /* this.bd.getUsuario(id).then(usuario => {
        this.bd.setUsuario(usuario); // Actualiza el BehaviorSubject
      }); */
      /* this.alertaRegistro('perfil editado con exito!') */
      this.bd.fetchUsuario().subscribe((data)=>{
        this.Usuario = data;
      })
    })

    

    // Aquí llamas al servicio para editar el usuario
    // Ejemplo:
    // this.bdservice.actualizarUsuario(this.formulario.value);
    /* this.alerta.presentToast('Datos actualizados correctamente'); */
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
    this.formulario.get('imagen')?.markAsDirty();
  };



/*   editarUsuario(){


    this.bd.updateUsuario(this.usuario, this.edad, this.imagen)
    .then(()=>{
      const idString = localStorage.getItem('usuarioId');
      const id_usuario = Number(localStorage.getItem('usuarioId'))

      this.bd.getUsuario(id_usuario)
      this.bd.fetchUsuario().subscribe((data)=>{
        this.Usuario = data;
      })
    })
     


  } */

}
