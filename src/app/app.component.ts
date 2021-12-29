import { StatistiqueComponent } from './statistique/statistique.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'maBibliotheque';
  nombre:number=9
  listexpire:any
constructor( public servNoti:NotificationsService, private dialog: MatDialog, private log:MatDialog){}

  ngOnInit(): void {
    //Affiche le nombre de notifications sur l'icon de notification
   this.servNoti.getAboCostumerListEnExpiration().subscribe(data=>{
     this.nombre=data.length;

   })

  }

  OnViewNoti(){
   const dialogConf = new MatDialogConfig();
    //dialogConf.disableClose = true;
    dialogConf.autoFocus = false;
    dialogConf.height  = '460px';
    dialogConf.width = '750px';

  // dialogConf.position={'top':'15', 'right':'5'}
    this.dialog.open(NotificationsComponent, dialogConf)

  }

  onStatistiqueView(){
    const dialogconfig=new MatDialogConfig();
      dialogconfig.autoFocus=false;
      dialogconfig.height='460px';
      dialogconfig.width='750px'
    this.log.open(StatistiqueComponent, dialogconfig)
  }

}
