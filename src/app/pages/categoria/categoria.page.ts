import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

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

    this.bd.fetchJuegosByCategoria().subscribe(data=>{
      this.arregloJuegos = data;
    });
    this.bd.getJuegoByCategoria(this.id)
  }

  verDescripcion(id : any){

    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    this.router.navigate(['/descripcion'],navigationextras)
  }

  descripcionffxvi(){
    let navigationextras : NavigationExtras = {
      state:{
        nombre : 'Final Fantasy XVI',
        plataforma : 'Playstation',
        icono : 'play',
        descripcion : ' Una fantasía oscura épica donde el destino lo deciden los Eikons y los Dominantes que los controlan. Esta es la historia de Clive Rosfield, un guerrero que jura vengarse del Eikon oscuro Ifrit, una entidad misteriosa que deja desgracias a su paso.',
        precio : '40000',
        imagen : '../../../assets/img/ffxvi.jpeg'
      }
    }
    this.router.navigate(['/descripcion'],navigationextras);
   }


}
