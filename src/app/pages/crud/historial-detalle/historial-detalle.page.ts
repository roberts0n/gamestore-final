import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-historial-detalle',
  templateUrl: './historial-detalle.page.html',
  styleUrls: ['./historial-detalle.page.scss'],
})
export class HistorialDetallePage implements OnInit {
  id! : number;

  arregloDetalles: any[] = [];

  constructor(private bd : BdserviceService,private router : Router) {
    if(this.router.getCurrentNavigation()?.extras.state){

      this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
    }
   }

  ngOnInit() {
    
    this.bd.getHistorialDetallesByCompra(this.id);

    this.bd.fetchHistorialDetalles().subscribe(data=>{
      this.arregloDetalles = data;
    })
  }

}
