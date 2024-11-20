import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  arregloCompras: any[] = [];

  constructor(private router:Router,private bd : BdserviceService) { }

  ngOnInit() {
    this.bd.getComprasGeneral();

    this.bd.fetchComprasGeneral().subscribe(data=>{
      this.arregloCompras = data;
    })
  }


  irDetalle(id : number){
    let navigationextras : NavigationExtras = {
      state:{
        id : id
      }
    }
    
    this.router.navigate(['/historial-detalle'], navigationextras).then(success => {
      console.log('Navegación exitosa:', success);
    }).catch(error => {
      console.error('Error en la navegación:', error);
    });
  }

}
