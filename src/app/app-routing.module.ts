import { AbocostumerComponent } from './abocostumer/abocostumer.component';
import { CategoryComponent } from './category/category.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { LoanComponent } from './loan/loan.component';
import { CostumerComponent } from './costumer/costumer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {path:'categorie', component:CategoryComponent},
  {path: 'book', component: BookComponent },
  {path:'costumer', component:CostumerComponent},
  {path:'loan', component:LoanComponent},
  {path:'abonnement', component:AbonnementComponent},
  {path:'statut', component:AbocostumerComponent},
  {path: 'notification', component:NotificationsComponent},
  {path:'**', redirectTo:'book'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
