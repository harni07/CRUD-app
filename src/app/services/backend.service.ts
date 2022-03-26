import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {ProductsList} from "../products";
import {Category} from "../models/category";
import {CategoriesList} from "../categories";

@Injectable()
export class BackendService {
  products: Product[] =  ProductsList;
  categories: Category[] =  CategoriesList;

  constructor() { }

  getProducts(): any {
    return this.products;
  }
  getCategories(): any {
    return this.categories;
  }

  getProductById(id:number) {
    let product;
    this.products?.map( (i:Product) => {
      if (i.id === Number(id)) {
        product = i;
      }
    });
    return product;
  }

  getCategoryById(id:number) {
    let category;
    this.categories?.map( (i:Category) => {
      if (i.id === Number(id)) {
        category = i;
      }
    });
    return category;
  }


  createCategory(name:string) {
    this.categories.push( {id: this.categories.length, name: name});
  }

  createProduct(product:Product) {
    this.products.push( {id: this.products.length, name: product.name, price: Number(product.price), image: product.image, category:product.category});
  }

  editCategory(id:number, name:string) {
    this.categories?.map( (i:Category) => {
      if (i.id === Number(id)) {
        i.name = name;
      }
    });
  }

  editProduct(id:number, product:Product) {
    this.products?.map( (i:Product) => {
      if (i.id === Number(id)) {
        i.name = product.name;
        i.price = product.price;
        i.image = product.image;
        i.category = product.category;
      }
    });
  }

  deleteProduct(id:number) {
    this.products?.map( (i:Product, index: number) => {
      if (i.id === id) {
        this.products.splice(index, 1)
      }
    });
  }

  deleteCategory(id:number) {
    this.categories?.map( (i:Product, index: number) => {
      if (i.id === id) {
        this.categories.splice(index, 1)
      }
    });
  }

}
