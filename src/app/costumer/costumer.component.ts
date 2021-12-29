import { AbonnementService } from '../services/abonnement.service';
import { AbocostumerService } from '../services/abocostumer.service';
import { Costumer, AboCostumer, Abonnement } from './../entity/domaine';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CostumerService } from '../services/costumer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { BookService } from '../services/book.service';




@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {
 costumerList:any;
  public datAjout:Date= new Date();
  abonnement = new Abonnement('', 0, 0, 0);
  costumer: Costumer=new Costumer('', '', '', '', '', 0);

  public datesFin: Date = new Date();
  private datesDeb: Date = new Date();
  public aFactuer:number=0;
  private statut:boolean=true;
  public dateAlert:Date=new Date();

  aboCos: AboCostumer=new AboCostumer(this.datesDeb, this.datesFin, true, '', this.costumer, this.abonnement)

  addCostumerForm:FormGroup=new FormGroup({});
  editCostumerForm: FormGroup = new FormGroup({});
  addAboForm:FormGroup=new FormGroup({});
  @ViewChild('newCostumer') public newCostumer!: ModalDirective;
  @ViewChild('editCostumer') public editCostumer!: ModalDirective;
  @ViewChild('addAbo') public addAbo!: ModalDirective;
  @ViewChild('paye') public paye!:ModalDirective;
  abocoList: any;
  abonnementList:any;
  bookList:any


  private dates: Date = new Date();
  private statutAbo:string=''

  //Pour faire la pagination
  POSTS:any;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';


  constructor(private serviceCostumer:CostumerService, private formBuilder:FormBuilder,
    public serviceAboco:AbocostumerService, public toast:ToastrService,
   public serviceA:AbonnementService, private tst:ToastrService, public servBook:BookService) { }

  ngOnInit(): void {
    this.getCostumer();
    this.getAboList();
    this.addCostumerForm=this.formBuilder.group({
      firstName:['', [Validators.required]],
      lastName: ['', [Validators.required]],
      prof: ['', [Validators.required]],
      posta: ['', [Validators.required]],
      mail: ['', [Validators.required]]
    });
    this.editCostumerForm=this.formBuilder.group({
      firstName:[[Validators.required]],
      lastName:[[Validators.required]],
      prof:[[Validators.required]],
      posta:[[Validators.required]],
      mail:[[Validators.required]],
      datA:[]
    });

    this.addAboForm=this.formBuilder.group({
      firstName:[],
      lastName: [],
      mail: [],
      datdeb: [[Validators.required]],
      datFin:[],
      pack: [[]]
    });

  }

  getCostumer(){
    this.serviceCostumer.getCostumers().subscribe(data=>{
      this.costumerList=data
    },err=>{console.log(err);
    })

  }
  onOpenCostumer(){
    this.newCostumer.show();
  }

  costumerSave(){
    if(!this.addCostumerForm.valid){
      Swal.fire(
        'Formulaire Invalide',
        'Veillez renseigner les champs correctement',
        'error'
      );

    }else{
    const cos = new Costumer(this.addCostumerForm.value['firstName'], this.addCostumerForm.value['lastName'],
      this.addCostumerForm.value['prof'], this.addCostumerForm.value['posta'], this.addCostumerForm.value['mail'],
      Date.now());
      console.log(cos);
      this.serviceCostumer.saveCostumers(cos).subscribe(data=>{
        this.toast.success('Vous Avez Ajouté Un Nouveau Client', 'SUCCES');
        this.newCostumer.hide();
        this.getCostumer();
        }, err=>{
                console.log(err);

        })

    }

  }

  onCloseAjout(){this.newCostumer.ngOnDestroy()}
  onCloseEdit(){this.editCostumer.ngOnDestroy()}

  onDelete(int:number){
    Swal.fire({
      title: 'ATTENTION',
      text: 'Vous voulez supprimer un Client',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI, SUPPRIMER',
      cancelButtonText: 'ANNULER'
    }).then((result) => {
      if (result.value) {
        this.serviceCostumer.deleteCostumers(int).subscribe(data => {
          this.toast.success('Costumer supprimé avec succès', 'SUPPRESSION');
          this.getCostumer();
        }, err => {
            console.log(err);
        })
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.close()
      }
    })


  }


  onEdit(costu: Costumer) {
    this.costumer=costu;
    this.editCostumer.show();
  }

  costumerEdit(){
    if(!this.editCostumerForm.valid){
      Swal.fire(
        'Formulaire Invalide',
        'Veillez renseigner les champs correctement',
        'error'
      );
    }else{
    this.costumer;
    this.serviceCostumer.editCostumers(this.costumer).subscribe(data=>{
      this.tst.success('Modification réussie', 'SUCCESS');
      this.getCostumer();
      this.editCostumer.hide();
    }, err=>{
      console.log(err);
    }
    )
    }
  }


  getAboco() {
    return this.serviceAboco.getAbocos().subscribe(data => {
      this.abocoList = data;
    }, err => {
      console.log(err);
    })
  }


//Ajout de l'Abonnement
  onCloseAbo(){this.addAbo.ngOnDestroy()}

  newCustAbo(t: Costumer){


/*
    this.servBook.getBook().subscribe(tata => {
      const bookExist = tata.filter(ad => ad.titre ===this.bookList.book.titre);
    })*/

    this.serviceAboco.getAbocos().subscribe(data => {
      const datas=data.find(ac => ac.costumer.id == t.id && ac.satut == true)
      this.abocoList=data;

       if(datas==null){
        this.toast.success('Merci de vous abonner', 'Info');
        console.log(t);
        this.costumer=t
        this.addAbo.show();
      }
      else{
        this.toast.info('Le client '+t.nom+' '+t.prenom+' dispose déjà d\'un abonnement', 'Infos')
        //console.log(datas);
      }
    },err=>{console.log(err);
    });
  }

  //Récupération de la liste des packs d'abonnements
  getAboList(){
    this.serviceA.getAbons().subscribe(data=>{
      this.abonnementList=data;
      },err=>{console.log(err);
    })
  }

  //Lors de la soumission avec le boutton s'abonner
  addAbonnement() {
    if (!this.addAboForm.valid) {
      this.tst.error('Le formulaire est invalide, saisir la date de debut et chaoisir un pack d\'abonnement', 'ATTENTION');
    }else {

      this.OnSelected();
      console.log(this.datesFin);
      this.costumer;
      this.statutAbo='valide'
      let abon = new AboCostumer(this.addAboForm.value['datdeb'], this.datesFin, this.statut, this.statutAbo,
        this.costumer,
        this.abonnementList[this.addAboForm.value['pack']])


      this.serviceAboco.adddAbocos(abon).subscribe(data => {
        this.tst.success('Vous avez ajouté un nouveau abonné', 'SUCCESS');
        this.addAbo.hide();
      }, err => {
        console.log(err);
      })}

  }

  //afficher la date d'expiration
 OnSelected(){
   this.dates = new Date(this.addAboForm.value['datdeb']);
   this.datesFin = new Date(this.dates.getFullYear(),
     this.dates.getMonth() + this.abonnementList[this.addAboForm.value['pack']].validite,
     this.dates.getDate());

   this.dateAlert = new Date(this.dates.getFullYear(),
     this.dates.getMonth() + this.abonnementList[this.addAboForm.value['pack']].validite,
     this.dates.getDate() - 3);
   this.paye.show();
   this.aFactuer=this.abonnementList[this.addAboForm.value['pack']].montant;
  console.log(this.aFactuer);

 }



  //Pagination
  onTableDataChange(event: number) {
    this.page = event;
    this.getCostumer();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCostumer();
  }



}



