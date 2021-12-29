import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from './../services/loan.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Costumer, Email } from '../entity/domaine';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
loanList:any;
costumer:Costumer=new Costumer('','','', '','', 0);
 private dateS: Date=new Date();
  email: Email = new Email('', this.dateS, '', '');
mailForm:FormGroup=new FormGroup({});
  //Pour faire la pagination
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';

@ViewChild('newMail') public newMail!:ModalDirective;

private datSend:Date=new Date;
  constructor(private serviceLoan:LoanService,
    private tstr: ToastrService, private builder:FormBuilder) { }

  ngOnInit(): void {
    this.getLoanList();
    this.mailForm=this.builder.group({
      cosmail:[],
      object:['', [Validators.required]],
      msg:['',[Validators.required]]

    })

  }

  getLoanList(){
    this.serviceLoan.getLoanLists().subscribe(data=>{
      this.loanList=data;
    }, err=>{console.log(err);
    });
   }

   deletedLoan(id:number){
     Swal.fire({
       title: 'ATTENTION',
       text: 'Vous voulez supprimer un prêt ou consultation',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'OUI, SUPPRIMER',
       cancelButtonText: 'ANNULER'
     }).then((result) => {
       if (result.value) {
         this.serviceLoan.deleteLoan(id).subscribe(data => {
           this.tstr.success('Opération réussie', 'SUCCESS');
           this.getLoanList();
         }, err => {
           console.log(err);
           this.tstr.error('Consultez votre Console', 'ATTENTION');
         })
       } else if (result.dismiss == Swal.DismissReason.cancel) {
         Swal.close();
       }
     })

   }
  onSend(costu:Costumer){
    this.costumer=costu;
    this.newMail.show();
  }

  //Envoie de mail
  mailSend(){
    if (!this.mailForm.valid){
      Swal.fire(
        'ATTENTION',
        'Le formulaire n\'est pas valide',
        'error'
      )
    }else{
    let mail = new Email(this.mailForm.value['cosmail'], this.datSend,
    this.mailForm.value['object'], this.mailForm.value['msg']);
    this.newMail.hide();
    Swal.fire(
      'ENVOIE',
      'Votre Mail est en Cours d\'envoie',
      'info'
    );
    Swal.showLoading(

    );
    this.serviceLoan.mailSerder(mail).subscribe(data=>{
        Swal.fire(
          'SUCCESS',
          'Vous avez envoyé un mail à votre client',
          'success'
        )
    }, err=>{
      Swal.close();
      this.tstr.error('Consultez votre console', 'ATTENTION');
      console.log(err);
    })

  }
}

  onCancel() { this.newMail.ngOnDestroy()}




  //Pagination
  onTableDataChange(event: number) {
    this.page = event;

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }

}
