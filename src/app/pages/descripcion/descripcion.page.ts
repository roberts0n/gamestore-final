import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Juego } from 'src/app/services/juego';
import SwiperCore, { Navigation, Pagination } from 'swiper';





SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

  nombre : string = "";
  plataforma : string = "";
  icono : string = "";
  descripcion : string = "";
  precio : string = "";
  imagen : string = "";
  id! : number;
  juego! : Juego | null;
  screenshots: string[] = [];
  formulario: FormGroup;
  tieneResena: boolean = false;
  tieneJuego: boolean = false;
  resenaUsuario: any = null;
  arregloResenas: any[] = [];
  modoEdicion: boolean = false;


  constructor(private alerta : AlertserviceService,private api : ApiserviceService,private router: Router, private activedroute: ActivatedRoute,private bd : BdserviceService,private formBuilder: FormBuilder) { 
    this.activedroute.queryParams.subscribe(param =>{

      if(this.router.getCurrentNavigation()?.extras.state){

        this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    })

    this.formulario = this.formBuilder.group({
      comentario: ['', [Validators.required,Validators.pattern(/\S+/)]],
      opinion: [null, [Validators.required]]
    });
   
  }
 

  async ngOnInit() {
    this.screenshots = []; 
    this.juego = null; 
  
    if (this.id) {
      this.bd.getJuegosById(this.id).then(() => {
        this.bd.fetchJuegoById().subscribe((data) => {
          this.juego = data;
          if (this.juego) {
            this.api.getJuegoByNombre(this.juego.nombre_juego).subscribe((rawgData: any) => {
              if (rawgData.results && rawgData.results.length > 0) {
                const resultado = rawgData.results[0]; 
                const id_juego = resultado.id;

                this.api.getJuegoById(id_juego).subscribe((detalle: any) => {
                  if (this.juego) { 
                    this.juego.metacritic = detalle.rating;
                    this.juego.fecha_lanzamiento = detalle.released;
  
                    // Cargar screenshots del juego
                    this.api.getScreenshotsById(id_juego).subscribe((data: any) => {
                      this.screenshots = data.results.map((screenshot: any) => screenshot.image);
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
    const id_usuario = Number(localStorage.getItem('usuarioId'));

    this.bd.getReseñasJuego(this.id,id_usuario);

    this.bd.fetchReseñas().subscribe((data)=>{
      this.arregloResenas = data;
    })

    /* const reseña = await this.bd.verificarReseña(id_usuario, this.id);
  
    if (reseña) {
      this.tieneResena = true;
      this.resenaUsuario = reseña;
    } */

      this.bd.verificarReseña(id_usuario, this.id);

      this.bd.reseñaUsuario$.subscribe((reseña) => {
        this.tieneResena = reseña !== null;
        this.resenaUsuario = reseña;
      });

    const haComprado = await this.bd.verificarCompra(id_usuario, this.id);
    this.tieneJuego = haComprado;
  }

  /* onSubmit(){
    if(this.formulario.valid){
      const reseña = this.formulario.get('comentario')?.value;
      const opinion = this.formulario.get('opinion')?.value;
      const id_usuario = Number(localStorage.getItem('usuarioId'));
      this.bd.insertReseña(id_usuario,this.id,reseña,opinion);
      
    }else{
      this.alerta.presentAlert('Fallo','lol')
    }
  } */

    onSubmit() {
      if (this.formulario.valid) {
        const reseña = this.formulario.get('comentario')?.value;
        const opinion = this.formulario.get('opinion')?.value;
        const id_usuario = Number(localStorage.getItem('usuarioId'));
  
        if (this.modoEdicion) {
          // Si estamos en modo de edición, actualizamos la reseña existente
          this.bd.editarReseña(id_usuario, this.id, reseña, opinion);
          this.modoEdicion = false;
        } else {
          // Si no, insertamos una nueva reseña
          this.bd.insertReseña(id_usuario, this.id, reseña, opinion);
        }
      } else {
        if (this.formulario.get('comentario')?.hasError('required') && this.formulario.get('opinion')?.hasError('required')) {
          this.alerta.presentAlert('Error', 'El comentario y la puntuación son obligatorios.');
        } else {
          // Comprobamos cada campo individualmente
          if (this.formulario.get('comentario')?.hasError('required')) {
            this.alerta.presentAlert('Error', 'El comentario es obligatorio y no puede estar vacío.');
          }
          if(  this.formulario.get('comentario')?.hasError('pattern')){
            this.alerta.presentAlert('Error', 'No puedes dejar solo espacios.');
          }
          if (this.formulario.get('opinion')?.hasError('required')) {
            this.alerta.presentAlert('Error', 'La puntuación es obligatoria.');
          }
        }
      }
    }


    activarModoEdicion() {
      this.modoEdicion = true;
      console.log('lo que se muestra es '+JSON.stringify(this.resenaUsuario));
      if (this.resenaUsuario) {
        // Cargar los valores en el formulario
        this.formulario.patchValue({
          comentario: this.resenaUsuario.comentario,
          opinion: String(this.resenaUsuario.puntuacion)
        });
    
        // Marcar los controles como tocados para activar la validación

      }
    }

/*   enviarReseña(){

    const reseña = this.formulario.get('reseña')?.value;
    const opinion = this.formulario.get('opinion')?.value;
    const id_usuario = Number(localStorage.getItem('usuarioId'));


    this.bd.insertReseña(id_usuario,this.id,reseña,opinion);
  }
 */

  botonDeseo(id_juego : number){

    const id_usuario = Number(localStorage.getItem('usuarioId'));


    this.bd.InsertDeseado(id_juego,id_usuario)

  }

  async botonCompra(id_juego: number) {
    const id_usuario = Number(localStorage.getItem('usuarioId'));
    try {
      await this.bd.insertJuegosInCarro(id_usuario, id_juego); 
      console.log('Juego agregado al carro'); 
    } catch (error) {
      console.error('Error al agregar al carro:', error);
      this.alerta.presentAlert('Error', 'No se pudo agregar al carro.');
    }
  }

  eliminarResena(){
    const id_usuario = Number(localStorage.getItem('usuarioId'));
    this.bd.EliminarReseña(id_usuario,this.id);
    this.formulario.patchValue({
      comentario: '',
      opinion: ''
    });
  }


  

}
