import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboCostumer } from '../entity/domaine';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:"aplication/json"');
  private url=environment.backend
  constructor(private http:HttpClient) { }

  getAboCostumerListEnExpiration(){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/DataExpired")
  }

  getAboCostumerListExpireTrois(){
    return this.http.get<AboCostumer[]> (this.url+"/aboCostumers/expireDansTroisJours")
  }
  getAboCostumerListExpireDeux(){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/expireDansDeuxJours")
  }

  getAboCostumerListExpireToday(){
    return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/expireDansAujourdhuie")
  }


}
