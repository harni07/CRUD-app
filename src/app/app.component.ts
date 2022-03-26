import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-app';

  products = [
    { "id": 1, "name": "Book", "price": 50,
      "image": "http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png",
      "category": "Small" },
    { "id":2, "name": "Car", "price": 5000,
      "image": "https://web-cdn.rimac-automobili.com/wp-content/uploads/2021/05/31101405/intro_slider_07_optimised.jpg",
      "category": "Large" },
    { "id": 3, "name": "Laptop", "price": 500,
      "image": "https://images.prismic.io/frameworkmarketplace/5dc5fc06-aec5-4f28-a924-0230aa91a360_Pre-Marketplace+-+image_02.jpg?auto=compress,format",
      "category": "Medium" }
  ];

  categories = [
    {
      "id": 1, "name": "Small"
    },
    {
      "id": 2, "name": "Medium"
    },
    {
      "id": 3, "name": "Large"
    }
  ];

  items: MenuItem[] = [
    {
      label: 'Categories',
      icon: 'pi pi-fw pi-pencil',
      routerLink: 'categories'
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-pencil',
      routerLink: 'products'
    }
  ];

  ngOnInit() {
    this.products = JSON.parse(<string>localStorage.getItem('products'));
    this.categories = JSON.parse(<string>localStorage.getItem('categories'));
    if (this.products?.length === 3 ) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
    if (this.categories?.length === 3 ) {
      localStorage.setItem('categories', JSON.stringify(this.categories));
    }

  }


}
