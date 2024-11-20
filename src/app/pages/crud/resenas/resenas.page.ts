import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
})
export class ResenasPage implements OnInit {

  arregloResenas: any[] = [];

  constructor(private router:Router,private bd : BdserviceService) { }

  ngOnInit() {
    this.bd.getReseñasGeneral();

    this.bd.fetchReseñasGeneral().subscribe(data=>{
      this.arregloResenas = data;
    })
  }



  eliminar(id_usuario : number,id_juego : number){
    this.bd.EliminarReseñaGeneral(id_usuario,id_juego)
  }

}
