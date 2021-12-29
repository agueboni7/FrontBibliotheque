import { AbonnementService } from './../services/abonnement.service';
import { LoanService } from './../services/loan.service';
import { ToastrService } from 'ngx-toastr';
import { AbocostumerService } from './../services/abocostumer.service';
import { CostumerService } from './../services/costumer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, Category, Costumer, Loan, AboCostumer, Abonnement } from './../entity/domaine';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe} from '@angular/common';
import { CategoryService } from '../services/category.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [DatePipe]
})
export class BookComponent implements OnInit {
  oneLoanExist: boolean = false;
  public ind:number=0;
  listCategory:any ;
  public category=new Category("");

  private datSortie:Date=new Date()
  private datSorti: Date = new Date()
  public book=new Book('', '', this.datSortie , 0, '', this.category);
  public costumer: Costumer = new Costumer('', '', '', '', '', 0);
  public abonnement:Abonnement= new Abonnement('',0, 0,0)
  public abocostumer: AboCostumer = new AboCostumer(this.datSortie, this.datSorti, true, '', this.costumer, this.abonnement)
  private type:string=''

  listBook:any;
  listCostumer:any;
  listAboCostumer:any;
  listAboEnCours:any;
  listAbonnement:any
  listAboCostumerVAlid:any
  loanList:any
  ids:any

  addBookForm:FormGroup=new FormGroup({});
  editBookForm:FormGroup=new FormGroup({});
  loanForm:FormGroup=new FormGroup({});

  @ViewChild('newBook')
  public newBook!: ModalDirective;
  @ViewChild('editBook')
  public editBook!: ModalDirective;
  @ViewChild('addLoan')
  public addLoan!: ModalDirective;
  @ViewChild('paye') public paye!: ModalDirective;

  //Pour faire la pagination
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';

  constructor(private serviceCat:CategoryService,private serviceBook:BookService,
     private formBuilder:FormBuilder, private datePipe:DatePipe,
     public serviceCostumer:CostumerService, public serviceAbocos:AbocostumerService,
     public serviceLoan: LoanService,
    private tstr: ToastrService, private router: Router, public servloan: LoanService,
    public serAbo:AbonnementService) { }

  ngOnInit(): void {
    this.bookList();
    this.getCostumer();
    this.serviceCat.getCategory().subscribe(data=>{
      this.listCategory=data;
    }, err=>{console.log(err);
    }
    )
    this.addBookForm=this.formBuilder.group({
      isbn:['', [Validators.required]],
      title:['', [Validators.required]],
      datSorti: ['', [Validators.required]],
      nombre: [1, [Validators.required]],
      author: ['', [Validators.required]],
      cat:[this.category, [Validators.required]]
    });

    this.editBookForm=this.formBuilder.group({
      isbn:[],
      title:[],
      datSorti: [],
      nombre:[],
      author:[],
      cat:[]
    });
    this.loanForm=this.formBuilder.group({
      isbn: [],
      titre: [],
      auteur: [],
      datAjout: [Validators.required],
      datRetour: [Validators.required],
      typConsult:[true],
      costumer: [Validators.required],
      abonnement: []
    });

        /////APPEL DE LA METHODE DE MISE A JOUR DE LA LISTE DES ABC QUI ONT EXPIRE//////

        this.getListABCExpire();


    }

//Liste des Books
  bookList(){return this.serviceBook.getBook().subscribe(data=>{
    this.listBook=data;}, err=>{console.log(err);});}

//Ouverture du formulaire d'ajout
  onAddBook(){this.newBook.show();}

  onCloseAjout(){
    this.newBook.ngOnDestroy();
  }


  bookSave(){
    if(!this.addBookForm.valid){
      Swal.fire(
        'ATTENTION',
        'Veaillez renseigner correctementle formulaire',
        'error'
      )
    }else{
    let bo = new Book(this.addBookForm.value['isbn'], this.addBookForm.value['title'],
    this.addBookForm.value['datSorti'], this.addBookForm.value['nombre'],
     this.addBookForm.value['author'], this.listCategory[this.addBookForm.value['cat']]);
     this.serviceBook.bookSave(bo).subscribe(data=>{
       this.bookList();
       this.tstr.success('Vous avez ajouté un nouveau Book', 'SUCCES')
       this.newBook.hide();
     },err=>{
       console.log(err);
     }
     )
    }
  }

  //Oppen Edit Book
  onEdit(book:Book){
    this.book = book;
   // this.ind = this.listCategory.map((f: { idCat: any; })=> f.idCat).indexOf(this.book.category.idCat);
    this.editBookForm.patchValue({ cat: book.category.idCat});
    this.editBook.show();
  }

// Edit Book
  bookEdite(){
    //ON AJOUTE [(ngModal)]=ind POUR UTILISER LA METHODE DE MAP
   // this.book.category = this.listCategory[this.ind];
    console.log(this.book);
      return this.serviceBook.bookEdit(this.book).subscribe(data=>{
        this.tstr.success('Modification effectuée avec succès', 'SUCCES')
        this.editBook.hide();
      this.bookList();
    },err=>{
       console.log(err);

    });
  }

  onCloseEdit(){this.editBook.ngOnDestroy()}

  //Delete Book
  deleteBook(id:number){
    Swal.fire({
      title: 'ATTENTION',
      text: 'Vous êtes entrain de supprimer un Book',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI, SUPPRIMER',
      cancelButtonText: 'ANNULER'
    }).then((result) => {
      if (result.value) {
        this.serviceBook.bookDelete(id).subscribe(data => {
          this.tstr.success('Book supprimé avec succès', 'SUPPRESSION');
          this.bookList();
        }, err => {console.log(err);}
        )
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.close();
      }
    })

  }

          //GESTION DES PRETS

  //Liste des clients

  getCostumer(){
    this.serviceCostumer.getCostumers().subscribe(data=>{
      this.listCostumer=data;
      }, err=>{console.log(err);
    })
  }




  loanOpen(book:Book){
    this.book=book;
    this.addLoan.show()

  }

  onClosePret(){this.addLoan.ngOnDestroy()}

                                ///LOAN SAVE  /////
  loanSave(){
              //Si est abonné et que l'abonnement est valid, il peut faire un prêt
            if (this.loanForm.value['typConsult']== false) {
              if(this.loanForm.value['abonnement']==null){
                this.tstr.warning('VEILLEZ SELECTIONNER VOTRE ABONNEMENT VALIDE', 'ATTENTION');
              }else{
                this.type="prêt"
                this.tstr.success(' Vous pouvez prêter', 'Prêt en cours')
                const pret = new Loan(this.loanForm.value['datAjout'], this.loanForm.value['datRetour'],
                 this.loanForm.value['typConsult'], this.book,
                 this.listCostumer[this.loanForm.value['costumer']],
                 this.type, this.listAboCostumer[this.loanForm.value['abonnement']]);
//Ajout de prêt
               this.servloan.saveLoan(pret).subscribe(data=>{
                 this.tstr.success('VOUS AVEZ AJOUTE UN NOUVEAU PRET', 'SUCCESS')
                 this.addLoan.hide();

              },err=>{
                console.log(err);
       })

      }
    }
         ///Si la consultation se fait surplace, Operation
    else {
          if(!this.loanForm.valid){
            Swal.fire(
              'ATTENTION',
              'Le formulaire est invalide pour l\'enregistrement',
              'error'
            )
          }else{
          this.type="Consultation"
          const consult = new Loan(this.loanForm.value['datAjout'], this.loanForm.value['datRetour'],
          this.loanForm.value['typConsult'],
            this.book, this.listCostumer[this.loanForm.value['costumer']], this.type, this.loanForm.value['abonnement']);

      this.serviceLoan.saveLoan(consult).subscribe(data => {
        Swal.fire(
          'SUCCESS',
          'Le livre ' + this.book.titre+ ' est en consultation par '+
           this.listCostumer[this.loanForm.value['costumer']].nom+' '+
          this.listCostumer[this.loanForm.value['costumer']].prenom,
          'success'
        )
        this.addLoan.hide();
      }, err => {
        console.log(err);
      })

    }
  }
  }

//Verifier si le client n'a  pas fait un prêt en double
  verifyExist(){
    //Verification si un client a un abonnement en cours
    if(this.loanForm.value['typConsult']==false){
    this.serviceAbocos.getAboByCostumer(this.listCostumer[this.loanForm.value['costumer']].id)
    .subscribe(
      data=>{
        this.listAboCostumer=data.filter(d=>new Date(d.datFinAC)>new Date());
        console.log('Ce client a un abonnement en cours:', this.listAboCostumer);
      },
      err=>{
        console.log(err);

      }
    )
    //Meilleur Méthode pour Parcourir les élement d'une liste
    let idcost= this.listCostumer[this.loanForm.value['costumer']].id;

    this.servloan.getLoanListFalse(this.book.idBo, idcost).subscribe(data => {
      if (data.length > 0){
        this.oneLoanExist= true;
        Swal.fire(
          'ATTENTION',
          'Vous voulez prêter le même livre à plusieurs reprises, nous n\'autorisons pas cette opération',
          'info'
        )
      }else{
        this.oneLoanExist = false;
      }
    }, err => {
      console.log(err);
    })

    //Verification si la date d'expiration n'est pas dépassé
    this.serviceAbocos.getAbocos().subscribe(data => {
      const client=data.find(ac=>ac.costumer.id==this.listCostumer[this.loanForm.value['costumer']].id
      && ac.datFinAC >= this.loanForm.value['datRetour']);
      this.listAboCostumerVAlid=data;
      if(client==undefined){

        Swal.fire({
          title: 'ATTENTION',
          text: 'Vous devez ajouter un abonnement avant de continuer l\'opération car votre abonnement expire avant la date du retour',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OUI, AJOUTER',
          cancelButtonText: 'ANNULER'
        }).then((result)=>{
          if(result.value){
            this.router.navigateByUrl('/costumer')
          }else if(result.dismiss==Swal.DismissReason.cancel){
            Swal.close(

          )}
        })
     }

    }, err=>{
        console.log(err);
    })
  }else{ this.oneLoanExist = false;}
  }

  //Controle si le client a atteint le nombre de prêt qui lui est réservé par son pack d'abonnement
  onNbrPretAbonementAttein(){
    //RECUPERATION DES LA LISTE DES ABONNEMENTS PAR PACK
    let idp=this.listAboCostumer[this.loanForm.value['abonnement']].idAC
    this.servloan.getCostumerAndAboCostumerById(idp).subscribe(data=>{
//data.filter(d=>d.abocostumer.idAC==this.listAboCostumer[this.loanForm.value['abonnement']].idAC).length
      if(data.length>=this.listAboCostumer[this.loanForm.value['abonnement']].abonnement.nbrLivre){
           Swal.fire({
            title: 'DESOLE',
            text: 'Vous avez atteint le nombre de prêt maximal autaurisé par votre pack d\'abonnement. Souhaitez-Vous vous réabonner pour profiter de ce service ?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OUI, AJOUTER',
            cancelButtonText: 'ANNULER'
          }).then((result)=>{
            if(result.value){
              this.router.navigateByUrl('/costumer')
            }else if(result.dismiss==Swal.DismissReason.cancel){
              Swal.close(

            )}
          })
      }
    }, err=>{console.log(err);
    })

  }



//Methode de paiement
  acheterLivre(){
    this.paye.show();
  }

  //Pagination
  onTableDataChange(event: number) {
    this.page = event;

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }


   /////MISE A JOUR DE LA LISTE DES ABC QUI ONT EXPIRE/////
  getListABCExpire(){
    this.serviceBook.updateAboCosEpration().subscribe(data=>{}

    )
  }
}
