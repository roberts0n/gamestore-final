import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-recuperar-clave-final',
  templateUrl: './recuperar-clave-final.page.html',
  styleUrls: ['./recuperar-clave-final.page.scss'],
})
export class RecuperarClaveFinalPage implements OnInit {

  password: string = "";
  password2: string = "";
  passwordActual : string = "";
  formulario: FormGroup;
  mostrarPassword: boolean = false;
  mostrarPassword2: boolean = false;
  mostrarPassword3: boolean = false;
  codigo : string = "";
  codigoReal! : string;
  correo! : string;

  constructor(private formBuilder :  FormBuilder,private alerta : AlertserviceService,private router:Router,private menuController: MenuController,private bd : BdserviceService) {
    this.formulario = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator()]],
      password2: ['', [Validators.required]]
    },{ validators: this.passwordsMatchValidator() }); 
   }

  ngOnInit() {
    this.codigoReal = "";
    this.codigoReal= String(localStorage.getItem('codigoRecuperacion'));
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

    const {password} = this.formulario.value;

    const id_usuario = Number(localStorage.getItem('usuarioId'));
    const correo = String(localStorage.getItem("correoRecuperacion"));
      this.bd.updatePasswordRecuperacion(correo,password) 
      this.router.navigate(['/login']);
      /* this.alerta.presentToast('Cambio de clave exitoso!')  */

    }

}
