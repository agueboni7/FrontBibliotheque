import { ToastrService } from 'ngx-toastr';
import { Abonnement } from 'src/app/entity/domaine';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbonnementService } from '../services/abonnement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent implements OnInit {

  abonnement = new Abonnement('',0,0,0);
  addAbonForm:FormGroup=new FormGroup({});
  editAbonForm:FormGroup=new FormGroup({});

  @ViewChild('newAbonnement') public newAbonnement!:ModalDirective;
  @ViewChild('editAbonnement') public editAbonnement!:ModalDirective;
  //Pour faire la pagination
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';

  constructor(private formBuilder:FormBuilder, private serviceAbo:AbonnementService,
    private tstr:ToastrService) { }
  abonList:any;

  ngOnInit(): void {
    this.getAbon();
    this.addAbonForm=this.formBuilder.group({
      code: ['',[Validators.required]],
      valid:[0, [Validators.required]],
      mont:[0, [Validators.required]],
      nbrLivre:[[Validators.required]]
    });
    this.editAbonForm=this.formBuilder.group({
      code:[],
      valid:[],
      mont:[],
      nbrLivre:[]
    })
  }
  getAbon(){
    return this.serviceAbo.getAbons().subscribe(data=>{
      this.abonList=data;

    }, err=>{console.log(err);
    })
  }

  onAddOpen(){this.newAbonnement.show();}
  abonSave(){
    if(!this.addAbonForm.valid){
      Swal.fire(
        'ATTENTION',
        'Le formulaire est invalide, renseignez les champs correctement',
        'error'
      )
    }else{
      let abonn = new Abonnement(this.addAbonForm.value['code'], this.addAbonForm.value['valid'],
        this.addAbonForm.value['mont'], this.addAbonForm.value['nbrLivre']);
      this.serviceAbo.saveAbons(abonn).subscribe(data => {
        this.tstr.success('Pack d\'abonneent ajouté avec succès', 'SUCCES');
        this.getAbon();
        this.newAbonnement.hide();
      }, err => {
        console.log(err);
      })
    }

  }
  onCloseAjout(){this.newAbonnement.ngOnDestroy()}


  deleteAbon(id: number){
    Swal.fire({
      title: 'ATTENTION',
      text: 'Etes-vous sûr de supprimer un pack d\'abonnement ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI, SUPPRIMER',
      cancelButtonText: 'ANNULER'
    }).then((result) => {
      if (result.value) {
        this.serviceAbo.deleteAbons(id).subscribe(data => {
          this.tstr.success('Pack d\'abonneent Supprimé avec succès', 'SUCCES');
          this.getAbon();
        }, err => {
          console.log(err);
        })
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.close(
        )
      }
    })

  }


  editAbon(abonn:Abonnement){
    this.abonnement=abonn;
    this.editAbonnement.show();
  }
  onCloseEdit(){this.editAbonnement.ngOnDestroy()}
  abonEdit(){
    this.abonnement;
    this.serviceAbo.abonsEdit(this.abonnement).subscribe(data=>{
     this.tstr.success('Le pack d\'abonnement a été modifié avec succès', 'MODIFICATION');
      this.editAbonnement.hide();

   },err=>{
     console.log(err);

   })

  }






  //Pagination
  onTableDataChange(event: number) {
    this.page = event;

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
}
