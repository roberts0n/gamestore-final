import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /* usuario: string = "";
  password: string = ""; */
  formulario: FormGroup;
  mostrarPassword: boolean = false;
  

  usuarioAdmin: string ="admin";
  passwordAdmin: string = "hola12345"

  constructor(private formBuilder :  FormBuilder,private router:Router,private menuController: MenuController,private bd: BdserviceService,private alerta : AlertserviceService) {
    this.menuController.enable(false,'menu');
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }
  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const id_usuario = localStorage.getItem('usuarioId');
    if (token) {
      this.router.navigate(['/inicio'])
     }
    
  }

   ionViewWillEnter() {
    this.mostrarPassword = false;
   /*  this.usuario = '';
    this.password = ''; */
    this.formulario.reset();
  } 

  verPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit(){
    if(this.formulario.valid){
      this.verificarLogin();
    }
  }


  borrarUsuarios() {
    this.bd.borrarUsuarios();
  }



  async verificarLogin() {
    /* if (this.usuario.trim() === "" || this.password.trim() === "") {
      this.alerta.presentToast('No puedes dejar campos vacios')
      return;
    } */
    
    const usuario = this.formulario.get('usuario')?.value;
    const password = this.formulario.get('password')?.value; 
    const isLoggedIn = await this.bd.verificarLogin(usuario, password);
    
    if (isLoggedIn) {
      this.router.navigate(['/inicio']);
      this.menuController.enable(true, 'menu');
    } /* else {
      this.alerta.presentToast('Los datos no coinciden!')
    } */
  }

}





 /* this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required)
    }) */


    /*   if (this.usuario==="" || this.password===""){
        this.alertaError('No puedes dejar campos vacios');
        return;
    };
  */