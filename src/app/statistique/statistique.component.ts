import { StatistiqueService } from './../services/statistique.service';
import { Component, OnInit } from '@angular/core';
import { AboCostumer, Abonnement } from '../entity/domaine';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  listCode:any[]  = [];
  listNombre:any[]=[];

  constructor(private serSta:StatistiqueService) { }

  ngOnInit(): void {
    this.serSta.getAboParPackAbo().subscribe(data=>{data
      console.log(data);

      for(var i=0; i<data.length; i++){
        this.listCode.push(data[i])

      }

      console.log(this.listCode)



      }
    )
  }

 /* getListAboByPack(par:Abonnement): AboCostumer[]{
    return this.listByPack.filter(a => a.abonnement.idA == par.idA);
    this.listByPack=[...data];
    console.log(this.getListAboByPack(data[0].abonnement).length);
  }*/

}
