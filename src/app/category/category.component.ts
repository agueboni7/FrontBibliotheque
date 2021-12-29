import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../entity/domaine';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  addForm:FormGroup=new FormGroup({});
  editForm:FormGroup=new FormGroup({});

  @ViewChild('newCategory')
  public newCategory!: ModalDirective;

  @ViewChild('editCategory')
  public editCategory!: ModalDirective;

  public category:Category=new Category('');

  //Pour faire la pagination
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9];
  terme: string = '';

  listCategory:any;
  constructor(private catService:CategoryService, private formbuil:FormBuilder,
     private  tstr:ToastrService) { }

  ngOnInit(): void {
    this.catgoryList();
    this.addForm=this.formbuil.group({
      libele: ['', [Validators.required]]
    }

    );

    this.editForm=this.formbuil.group({
      libele:[]
    });

  }
//Liste des Catégories
  catgoryList(){
    this.catService.getCategory()
    .subscribe(data=>{
      this.listCategory =data;
    },err=>{
      console.log(err);
    }
    )
  }


  onCloseAjout(){this.newCategory.ngOnDestroy()}


  //Ouverture du formulaire d'ajout
  onAdd(){
    this.newCategory.show();
    this.addForm.patchValue({libele:[]})

  }

  catSave(){
    if (!this.addForm.valid){
      Swal.fire(
        'ERREUR',
        'le champ catégory est incorrecte',
        'error'

      )
    }else{
    const cat= new Category(this.addForm.value['libele']);
     this.catService.categorySave(cat).subscribe(
      data=>{
        this.tstr.success('La catégorie a été ajouté avec succès', 'AJOUT');
        this.catgoryList();
        this.newCategory.hide();
      },err=>{
        this.tstr.error('Consultez votre console', 'ATTENTION');
        console.log(err);

      }

    )
    }
  }



//Ouverture du formulaire Edit
  onEdt(cat:Category){
    this.category=cat;
    this.editCategory.show();
  }
  onCloseEdit(){this.editCategory.ngOnDestroy()}


//Méthode de modification
  catEdit(){
    console.log(this.category);
    this.catService.categoryEdit(this.category).subscribe(
      data=>{
        this.tstr.success('La catégorie a été Modifiée avec succès', 'MODIFICATION');
        this.catgoryList();
        this.editCategory.hide();
        },err=>{
          console.log(err);
        }
    )

  }

  //Méthode pour delete
  onDelete(id:number){
    Swal.fire({
      title: 'ATTENTION',
      text: 'Vous voulez vraiment suprimer la catégorie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI, SUPPRIMER',
      cancelButtonText: 'ANNULER'
    }).then((result) => {
      if (result.value) {
        this.catService.categoryDelete(id).subscribe(
          data => {
            this.tstr.success('Catégorie supprimée', 'SUCCES');
            this.catgoryList();
          }, err => {

            console.log(err);
          }
        )
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.close(

        )
      }
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
