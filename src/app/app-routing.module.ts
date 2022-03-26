import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {CategoryProfileComponent} from "./category-profile/category-profile.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductProfileComponent} from "./product-profile/product-profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoryComponent
  },
  {
    path: 'categories/new',
    component: CategoryCreateComponent
  },
  {
    path: 'categories/edit/:id',
    component: CategoryProfileComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'products/new',
    component: ProductCreateComponent
  },
  {
    path: 'products/edit/:id',
    component: ProductProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
