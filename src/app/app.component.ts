import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { register } from 'swiper/element/bundle';
import { BdserviceService } from './services/bdservice.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 




  constructor(private router : Router,private db: BdserviceService) {
    this.requestPermissions();
    this.initializeLocalNotificationListener();

    this.db.dbState().subscribe((isReady) => {
      if (isReady) {
      }
    });
  }
 

  ngOnInit(){
  }



  async requestPermissions() {
    const permissions = await LocalNotifications.requestPermissions();
    console.log(permissions);
  }

  initializeLocalNotificationListener() {
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      console.log('Notificación tocada', notification);
      this.router.navigate(['/perfil']);
    });
  }
}
