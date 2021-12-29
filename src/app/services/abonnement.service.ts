import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abonnement } from '../entity/domaine';


@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:application/json');
  private url=environment.backend;
  constructor(private http:HttpClient) { }
  getAbons(){
    return this.http.get<Abonnement[]>(this.url+"/abonnements/list");
  }




  deleteAbons(id:number) {
    return this.http.delete(this.url+"/abonnements/deleteById/"+id);
  }

  saveAbons(abon:Abonnement) {
    return this.http.post<Abonnement>(this.url+"/abonnements/save", abon);
  }

  abonsEdit(abon:Abonnement){
    return this.http.put<Abonnement>(this.url+"/abonnements/edit", abon)
  }
}
