import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-perfil-contrasena',
  templateUrl: './perfil-contrasena.page.html',
  styleUrls: ['./perfil-contrasena.page.scss'],
})
export class PerfilContrasenaPage implements OnInit {

  password: string = "";
  password2: string = "";
  passwordActual : string = "";
  formulario: FormGroup;
  mostrarPassword: boolean = false;
  mostrarPassword2: boolean = false;
  mostrarPassword3: boolean = false;

  constructor(private formBuilder :  FormBuilder,private alerta : AlertserviceService,private router:Router,private menuController: MenuController,private bd : BdserviceService) {
    this.formulario = this.formBuilder.group({
      passwordActual: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator()]],
      password2: ['', [Validators.required]]
    },{ validators: this.passwordsMatchValidator() }); 
   }

  ngOnInit() {
  }


  verPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  verPassword2() {
    this.mostrarPassword2= !this.mostrarPassword2;
  }

  verPassword3() {
    this.mostrarPassword3= !this.mostrarPassword3;
  }


  
  passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const password2 = formGroup.get('password2')?.value;
  
      return password === password2 ? null : { passwordsMismatch: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
      const formatoPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  
      const isValid = formatoPassword.test(value);
  
      return !isValid ? { validezPassword: true } : null;
    };
  }

  onSubmit() {
    if(this.formulario.invalid){
      this.alerta.presentToast('Complete todos los campos como es debido')
      return;
    }

    const {passwordActual, password} = this.formulario.value;

    const id_usuario = Number(localStorage.getItem('usuarioId'));
      this.bd.updatePassword(id_usuario,password,passwordActual);
/*       this.router.navigate(['/perfil']);
      this.alerta.presentToast('Cambio de clave exitoso!') */


    }




  editarPassword(){
    if(!this.password || !this.password2){
      this.alerta.presentToast('No puedes dejar campos vacios')
      return;
    }
    if (this.password.length<=8){
      this.alerta.presentToast('La contraseña debe tener mas de 8 caracteres')
      return;
    }

    const formatoPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
    if(!formatoPassword.test(this.password)){
      this.alerta.presentToast('La contraseña debe contener como minimo una mayuscula,un numero y un simbolo.')
      return;
    }

    if(this.password===this.password2){
      const id_usuario = Number(localStorage.getItem('usuarioId'));
      this.bd.updatePassword(id_usuario,this.password,this.password2);
      this.router.navigate(['/perfil']);
      this.alerta.presentToast('Cambio de clave exitoso!')
    }else{
      this.alerta.presentToast('Las contraseñas no coinciden!')
    }

  }

}
