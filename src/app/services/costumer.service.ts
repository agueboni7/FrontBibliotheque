import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Costumer } from '../entity/domaine';
import { Observable } from 'rxjs';
const endpoint = 'https://jsonplaceholder.typicode.com/posts';
@Injectable({
  providedIn: 'root'
})
export class CostumerService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:application/json');
  private url=environment.backend;

  constructor(private http:HttpClient) { }


  getCostumers() {
    return this.http.get<Costumer[]>(this.url+"/costumers/list");
  }

  saveCostumers(costumer:Costumer) {
    return this.http.post<Costumer>(this.url+"/costumers/save", costumer);
  }

  editCostumers(costumer:Costumer){
    return this.http.put(this.url+"/costumers/edit", costumer);
  }

  deleteCostumers(id:number){
    return this.http.delete(this.url+"/costumers/deleteById/"+id);
  }

}

