import { environment } from './../../environments/environment';
import { AboCostumer, Book } from '../entity/domaine';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:application/json');
  private url=environment.backend;
  constructor(private http:HttpClient) { }

  getBook() {
    return this.http.get<Book[]>(this.url+"/books/list");
  }

  bookSave(book: Book) {
    return this.http.post<Book>(this.url+"/books/save", book);
  }

  bookEdit(book:Book) {
    return this.http.put<Book>(this.url+"/books/edit", book)
  }

  bookDelete(id: number) {
    return this.http.delete<Book>(this.url+"/books/deleteById/"+id);
  }

updateAboCosEpration(){
  return this.http.get<AboCostumer[]>(this.url+"/aboCostumers/listToUpdate")
}

}
