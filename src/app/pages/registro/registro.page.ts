import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  /* email: string ="";
  usuario: string ="";
  password: string ="";
  password2: string =""; */
  formulario: FormGroup;
  mostrarPassword: boolean = false;
  mostrarPassword2: boolean = false;

  constructor(private formBuilder :  FormBuilder,private bdservice : BdserviceService, private router:Router,private menuController: MenuController,private alerta : AlertserviceService) {
    this.menuController.enable(false,'menu');
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(4),Validators.pattern(/\S+/)]],
      password: ['', [Validators.required, Validators.minLength(8),this.passwordValidator()]],
      password2: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator() }); 
   }


   verPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  verPassword2() {
    this.mostrarPassword2 = !this.mostrarPassword2;
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

  passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const password2 = formGroup.get('password2')?.value;
  
      return password === password2 ? null : { passwordsMismatch: true };
    };
  }


  onSubmit() {
    if(this.formulario.invalid){
      this.alerta.presentToast('Complete todos los campos como es debido')
      return;
    }

    const {email, usuario, password} = this.formulario.value;

    this.bdservice.registroUsuario(usuario,email,password).then((registroExitoso)=>{
      if(registroExitoso){
        this.router.navigate(['/login']);
        this.alerta.presentToast('Registro exitoso!')
      }
    }).catch((error)=>{
      this.alerta.presentToast('error al registrar'+error)
    })

    }

  /* registrar(){


    if( !this.email|| !this.usuario|| !this.password){
      this.alerta.presentToast('No puedes dejar campos vacios!')
      return;
    };


    const formatoEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formatoEmail.test(this.email)){
      this.alerta.presentToast('Correo invalido!')
      return;
    };

    if (this.password.length<=8){
      this.alerta.presentToast('la contraseña debe tener mas de 8 caracteres!')
      return;
    }

    const formatoPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
    if(!formatoPassword.test(this.password)){
      this.alerta.presentToast('La contraseña debe contener como minimo una mayuscula,un numero y un simbolo!')
      return;
    }
    if(this.password===this.password2){
      this.bdservice.registroUsuario(this.usuario,this.email,this.password).then((registroExitoso)=>{
        if(registroExitoso){
          this.router.navigate(['/login']);
          this.alerta.presentToast('Registro exitoso!')
        }
      }).catch((error)=>{
        this.alerta.presentToast('error al registrar'+error)
      })
    }else{
      this.alerta.presentToast('Las claves no coinciden!')
    }
  }
 */

  ngOnInit() {
    this.formulario.reset();
  }

}

/* this.router.navigate(['/login']);
this.alertaRegistro('Registro exitoso!') */