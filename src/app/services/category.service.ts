import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../entity/domaine';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:application/json');
  private url=environment.backend;
  constructor(private http: HttpClient) { }

 getCategory(){
   return this.http.get<Category[]>(this.url+"/categorys/list");
 }
  categorySave(category: Category) {
    return this.http.post<Category>(this.url+"/categorys/save", category);
  }

  categoryEdit(category: Category) {
    return this.http.put<Category>(this.url+"/categorys/edit", category);
  }

  categoryDelete(id: number) {
    return this.http.delete<Category>(this.url+"/categorys/deleteById/"+id);
  }

}
