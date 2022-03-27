import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {Category} from "../models/category";

@Injectable()
export class BackendService {
  products: Product[] =  [];
  categories: Category[] =  [];

  constructor() { }

  getProducts(): any {
    this.products = JSON.parse(<string>localStorage.getItem('products'));
    return this.products;
  }
  getCategories(): any {
    this.categories = JSON.parse(<string>localStorage.getItem('categories'));
    return this.categories;
  }

  getProductById(id:number) {
    this.getProducts();
    let product;
    this.products?.map( (i:Product) => {
      if (i.id === Number(id)) {
        product = i;
      }
    });
    return product;
  }

  getCategoryById(id:number) {
    this.getCategories();
    let category;
    this.categories?.map( (i:Category) => {
      if (i.id === Number(id)) {
        category = i;
      }
    });
    return category;
  }


  createCategory(name:string) {
    this.getCategories();
    this.categories.push( {id: Math.floor(Math.random() * (10000 - 3 + 1) + 3), name: name});
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  createProduct(product:Product) {
    this.getProducts();
    this.products.push( {id: Math.floor(Math.random() * (10000 - 3 + 1) + 3), name: product.name, price: Number(product.price), image: product.image, category:product.category});
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  editCategory(id:number, name:string) {
    this.getCategories();
    this.categories?.map( (i:Category) => {
      if (i.id === Number(id)) {
        i.name = name;
      }
    });
    localStorage.setItem('categories', JSON.stringify(this.categories));

  }

  editProduct(id:number, product:Product) {
    this.getProducts();
    this.products?.map( (i:Product) => {
      if (i.id === Number(id)) {
        i.name = product.name;
        i.price = product.price;
        i.image = product.image;
        i.category = product.category;
      }
    });
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  deleteProduct(id:number) {
    this.getProducts();
    this.products?.map( (i:Product, index: number) => {
      if (i.id === id) {
        this.products.splice(index, 1)
      }
    });
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  deleteCategory(id:number) {
    this.getCategories();
    this.categories?.map( (i:Product, index: number) => {
      if (i.id === id) {
        this.categories.splice(index, 1)
      }
    });
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

}
