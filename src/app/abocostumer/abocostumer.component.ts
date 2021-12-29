import { Component, OnInit } from '@angular/core';
import { AbocostumerService } from '../services/abocostumer.service';


@Component({
  selector: 'app-abocostumer',
  templateUrl: './abocostumer.component.html',
  styleUrls: ['./abocostumer.component.css']
})
export class AbocostumerComponent implements OnInit {
  abocoList:any;
  //Pour faire la pagination
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';
  constructor(private serviceAboco:AbocostumerService) { }

  ngOnInit(): void {
    this.getAboco();
  }
  getCostumer(){}
  getAbon(){}
  getAboco(){
    return this.serviceAboco.getAbocos().subscribe(data=>{
    this.abocoList=data;
    }, err=>{console.log(err);
    })
  }


  //Pagination
  onTableDataChange(event: number) {
    this.page = event;

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
}
