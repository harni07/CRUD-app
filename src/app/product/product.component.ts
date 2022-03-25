import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] =  [];

  constructor() { }

  ngOnInit() {

    this.products = [
      {id: 1, name: 'Book', price: 50, image: 'http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png', category: 1, categoryName: 'Small' },
      {id: 2, name: 'Car', price: 50000, image: 'https://web-cdn.rimac-automobili.com/wp-content/uploads/2021/05/31101405/intro_slider_07_optimised.jpg', category: 2, categoryName: 'Medium'},
      {id: 3, name: 'Laptop', price: 500, image: 'https://images.prismic.io/frameworkmarketplace/5dc5fc06-aec5-4f28-a924-0230aa91a360_Pre-Marketplace+-+image_02.jpg?auto=compress,format', category: 3, categoryName: 'Large'},
    ]
  }

}
