import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenubarModule} from 'primeng/menubar';
import { ProductComponent } from './product/product.component';
import { ProductProfileComponent } from './product-profile/product-profile.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryProfileComponent } from './category-profile/category-profile.component';
import {AccordionModule} from "primeng/accordion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BackendService} from "./services/backend.service";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductProfileComponent,
    ProductCreateComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    MenubarModule,
    AccordionModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule
  ],
  providers: [BackendService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
