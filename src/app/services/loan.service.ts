import { environment } from './../../environments/environment';
import { Loan, Email, Abonnement, AboCostumer } from './../entity/domaine';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  header = new HttpHeaders().set('Access-Control-Allow-Origin:*', 'Content-Type:"aplication/json"');
  private url=environment.backend;
  constructor(private http: HttpClient) { }

  getLoanLists(){
    return this.http.get<Loan[]>(this.url+"/loans/list")
  }

  getLoanListFalse(idbo:number, idco:number){
    return this.http.get<Loan[]>(this.url+"/loans/listConsultFalse/"+idbo+"/"+idco);
  }

  getLoanListFalseByCostumerId(id:number){
    return this.http.get<Loan[]>(this.url+"/loan/listLoanByCostumer/"+id)
  }

 getCostumerAndAboCostumerById(idaboco:number){
    return this.http.get<Loan[]>(this.url+"/loan/listLoanCostumerAndAboCostumer/"+idaboco)
  }


  saveLoan(loan:Loan){
    return this.http.post<Loan>(this.url+"/loans/save", loan);
  }

  deleteLoan(nombre:number){
    return this.http.delete<Loan>(this.url+"/loans/deletedById/"+nombre);
  }

  mailSerder(mail:Email){
    return this.http.post<Email>(this.url+"/mail/sendMail", mail);
  }

}
