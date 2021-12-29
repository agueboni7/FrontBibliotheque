import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboCostumer } from '../entity/domaine';


@Injectable({
  providedIn: 'root'
})
export class AbocostumerService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', "aplication/json");
  private url=environment.backend;
  constructor(private http: HttpClient) {}


  getAbocos(){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/list");
  }

  adddAbocos(abonnement:AboCostumer){
    return this.http.post<AboCostumer>(this.url+"/aboCostumers/save", abonnement)
  }

  getAboCostumerById(id:number, idac:number){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/getByCostumerAbonnement/"+id+"/"+idac)
  }


  getAboByCostumer(id:number){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/getByCostumer/"+id)
  }


  statutUpdate(statut:string){
    return this.http.put<AboCostumer>(this.url+"/aboCostumers/edit", statut)
  }

}
