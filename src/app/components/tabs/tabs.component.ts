import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 
import { Keyboard } from '@capacitor/keyboard';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonicModule,RouterModule,CommonModule]
})
export class TabsComponent  implements OnInit/* , OnDestroy */ {
  keyboardOpen : boolean = false;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(()=>{
      Keyboard.addListener('keyboardWillShow',()=>{
        this.keyboardOpen = true;
      });
      
      Keyboard.addListener('keyboardWillHide',()=>{
        this.keyboardOpen = false;
      })
    })
  }

 /*  ngOnDestroy() {
    Keyboard.removeAllListeners();
  } */
}
