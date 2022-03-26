import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {BackendService} from "../services/backend.service";
import {Category} from "../models/category";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] =  [];
  originalProducts: Product[] =  [];
  categories: Category[] =  [];

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }


  sortProducts(event:any) {
    this.products = [];
    if (event.target.innerText === 'All categories') {
      this.products = this.originalProducts;
      return;
    }
    this.originalProducts?.map( (i:Product) => {
      if (i.category === event.target.innerText) {
        this.products.push(i);
      }
    });
  }

  // fetch all categories
  getCategories() {
    this.categories.push( {id: 0, name: 'All categories'})
    this.service.getCategories().map( (i:Category) => {
      this.categories.push(i);
    });
  }

  // fetch all products
  getProducts() {
    this.products = this.service.getProducts();
    this.originalProducts = this.service.getProducts();
  }

  // deleting product
  deleteProduct(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete product?',
      accept: () => {
        this.service.deleteProduct(id);
      }
    });
  }
}
