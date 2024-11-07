import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.page.html',
  styleUrls: ['./plataforma.page.scss'],
})
export class PlataformaPage implements OnInit {
  titulo : string = "";
  filtro : string = "";
  id!: number;
  arregloJuegos : any = [{
    idJuego : '',
    nombre_juego : '',
    precio : '',
    nombre_plataforma : '',
    nombre_categoria : '',
    descripcion : '',
    imagen : ''

  }]


  constructor(private bd : BdserviceService, private router: Router, private activedroute: ActivatedRoute,private menuController: MenuController,private alertcontroller: AlertController,private toastController: ToastController) {
    
    this.activedroute.queryParams.subscribe(param =>{

      if(this.router.getCurrentNavigation()?.extras.state){

        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['titulo'];
        this.filtro = this.router.getCurrentNavigation()?.extras?.state?.['filtro'];
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    })



   }

  ngOnInit() {

    this.bd.fetchJuegosByPlataforma().subscribe(data=>{
      this.arregloJuegos = data;
    });
    this.bd.getJuegoByPlataforma(this.id)
  }

  verDescripcion(id : any){

    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/descripcion'],navigationextras)
  }

}
