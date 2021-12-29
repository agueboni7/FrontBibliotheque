import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:application/json');
  private url=environment.backend
  constructor(private http: HttpClient) { }
  getAboParPackAbo(){
    return this.http.get<any[][]>(this.url+"/aboCostumers/listParPack")
  }

}
