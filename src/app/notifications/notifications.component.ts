import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationsService } from './../services/notifications.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AboCostumer, Abonnement, Costumer, Email } from '../entity/domaine';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoanService } from '../services/loan.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  abonnement = new Abonnement('', 0, 0, 0);
  costumer: Costumer=new Costumer('', '', '', '', '', 0);
  email:Email=new Email('', new Date(),'','')
  public datesFin: Date = new Date();
  private datesDeb: Date = new Date();
  public coche:boolean=false;
  mails: String[]=[];
  destinataire : String='';
  aboCos: AboCostumer=new AboCostumer(this.datesDeb, this.datesFin, true, '', this.costumer, this.abonnement)

  masterSelected:boolean=false;
  AlSelected:boolean=false;
  deuxSelect:boolean=false;

  checkedList:AboCostumer[]=[];

  @ViewChild('sendMail') public  sendMail!:ModalDirective;
  mailForm:FormGroup=new FormGroup({});

  listDansDeuxjours:any
  listDansUnjour:any
  listAujourdhuie:any
  constructor(private serviceNoti:NotificationsService, private builder:FormBuilder,
    private dialog: MatDialog, public servLoan:LoanService, private tstr:ToastrService) { }

  ngOnInit(): void {
    this.serviceNoti.getAboCostumerListExpireTrois().subscribe(trois=>{
      this.listDansDeuxjours=trois;

    }, err=>{console.log(err);
    })

    this.serviceNoti.getAboCostumerListExpireDeux().subscribe(deux=>{
      this.listDansUnjour=deux;

    }, err=>{console.log(err);
    })

    this.serviceNoti.getAboCostumerListExpireToday().subscribe(today=>{
      this.listAujourdhuie=today;

    }, err=>{console.log(err);
    })

    this.mailForm=this.builder.group({

      cosmail:[''],
      object:[],
      msg:[]
    })
  }

  getMails(){
    if(this.checkedList.length>0){
      this.mails=this.checkedList.map(ab=>ab.costumer.mail);
      console.log(this.mails);

    }
  }
  //tout cocher
  checkUncheckAll(){
    for (var i = 0; i < this.listAujourdhuie.length; i++) {
      this.listAujourdhuie[i].isSelected=this.masterSelected;
      }
      if(this.masterSelected==true){

          this.checkedList=this.listAujourdhuie;

    }
    else{
      this.checkedList=[];
    }
  }

  isAllSelected() {

    this.listAujourdhuie.every(function(item:any) {
        return item.isSelected==true;
      })
    this.getCheckedItemList();
    console.log(this.checkedList);

  }

  //liste selectioné
  getCheckedItemList(){
    this.checkedList=[];
    for (var i = 0; i < this.listAujourdhuie.length; i++) {
      if(this.listAujourdhuie[i].isSelected==true){
         this.checkedList.push(this.listAujourdhuie[i]);}

    }
    console.log(this.checkedList);

  }

                                    //List qui s'expirent dans 1 jour
toutSelectionner(){
  for (var i = 0; i < this.listDansUnjour.length; i++) {
    this.listDansUnjour[i].isSelected=this.AlSelected;
    }
    if(this.AlSelected==true){

        this.checkedList=this.listDansUnjour;

  }
  else{
    this.checkedList=[];
  }
}

selectUnAUn() {

  this.listDansUnjour.every(function(item:any) {
      return item.isSelected==true;
    })
    this.getCheckedItemListDansUn();
  console.log(this.checkedList);

}

//liste selectioné
getCheckedItemListDansUn(){
  this.checkedList=[];
  for (var i = 0; i < this.listDansUnjour.length; i++) {
    if(this.listDansUnjour[i].isSelected==true){
       this.checkedList.push(this.listDansUnjour[i]);}

  }
  console.log(this.checkedList);

}

                  //EXPIRATION DANS 2 JOURS

                  toutSelectDeux(){
                    for (var i = 0; i < this.listDansDeuxjours.length; i++) {
                      this.listDansDeuxjours[i].isSelected=this.deuxSelect;
                      }
                      if(this.deuxSelect==true){

                          this.checkedList=this.listDansDeuxjours;

                    }
                    else{
                      this.checkedList=[];
                    }
                  }

                  isUnAUnDeuxJ() {

                    this.listDansDeuxjours.every(function(item:any) {
                        return item.isSelected==true;
                      })
                    this.getCheckedItemListDeux();
                    console.log(this.checkedList);

                  }

                  //liste selectioné
                  getCheckedItemListDeux(){
                    this.checkedList=[];
                    for (var i = 0; i < this.listDansDeuxjours.length; i++) {
                      if(this.listDansDeuxjours[i].isSelected==true){
                         this.checkedList.push(this.listDansDeuxjours[i]);}

                    }
                    console.log(this.checkedList);

                  }









  onSendClicked(mail:String, cont?:any){
    //this.mails= this

    this.getMails();
    this.destinataire=this.mails.toString();
    mail=this.destinataire
    //this.sendMail.show();
    const dialogConf = new MatDialogConfig();

    //dialogConf.disableClose = true;
    dialogConf.autoFocus = false;
  // dialogConf.position={'top':'15', 'right':'5'}
    this.dialog.open(cont, dialogConf);


  }

  /*
  Cocher pour liste dans un  jour
*/


onSendClose(){this.dialog.closeAll()}

mailSend(){

  this.mails.forEach(element=>{

    let mail = new Email(element.toString(), new Date(),
    this.mailForm.value['object'], this.mailForm.value['msg']);

     Swal.fire(
       'ENVOI',
      'Votre Mail est en cours d"envoi',
      'info'
       );
    Swal.showLoading(

    );
    this.servLoan.mailSerder(mail).subscribe(data=>{
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
  })

}
}
