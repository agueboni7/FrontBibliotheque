import { NotificationsService } from './services/notifications.service';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from './services/category.service';
import { LoanService } from './services/loan.service';
import { BookService } from './services/book.service';
import { CostumerService } from './services/costumer.service';
import { AbonnementService } from './services/abonnement.service';
import { AbocostumerService } from './services/abocostumer.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostumerComponent } from './costumer/costumer.component';
import { LoanComponent } from './loan/loan.component';
import { BookComponent } from './book/book.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { AbocostumerComponent } from './abocostumer/abocostumer.component';
import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotificationsComponent } from './notifications/notifications.component';
import { StatistiqueComponent } from './statistique/statistique.component';



@NgModule({
  declarations: [
    AppComponent,
    CostumerComponent,
    LoanComponent,
    BookComponent,
    AbonnementComponent,
    AbocostumerComponent,
    CategoryComponent,
    NotificationsComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    MatBadgeModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AppRoutingModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CategoryService, LoanService, BookService, CostumerService,
    AbonnementService, AbocostumerService, NotificationsService, { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
