import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Product} from "./models/product";
import {Category} from "./models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-app';

  products:Product[] = [];
  originalProducts = [
    { "id": 1, "name": "Lamborghini", "price": 350000,
      "image": "https://assets.entrepreneur.com/content/3x2/2000/1604129652-malusi-msomi-4XtAqMN9laE-unsplash.jpg",
      "category": "Supercar" },
    { "id":2, "name": "Nevera", "price": 1000000,
      "image": "https://web-cdn.rimac-automobili.com/wp-content/uploads/2021/05/31101405/intro_slider_07_optimised.jpg",
      "category": "Supercar" },
    { "id": 3, "name": "BMW M4", "price": 75000,
      "image": "https://www.byri.net/wp-content/uploads/2021/03/Video-test-BMW-M4-2021-maturity-assumed.jpg",
      "category": "Coupe" },
    { "id": 4, "name": "Mercedes E220", "price": 75000,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NCfA5uLUsf3neqdjiy8lWJ_3Kk0fmECZng&usqp=CAU",
      "category": "Coupe" },
    { "id": 5, "name": "Mercedes E220", "price": 55000,
      "image": "https://hips.hearstapps.com/hmg-prod/images/2021-mercedes-benz-e450-4matic-sedan-107-1604280340.jpg?crop=0.689xw:0.774xh;0.208xw,0.154xh&resize=640:*",
      "category": "Sedan" },
    { "id": 6, "name": "Skoda octavia", "price": 35000,
      "image": "https://cdn.motor1.com/images/mgl/1xB1K/s1/2021-skoda-octavia-rs.jpg",
      "category": "Sedan" },
    { "id": 7, "name": "VW Passat", "price": 35000,
      "image": "https://cmcdistribution.com.vn/en/wp-content/uploads/2021/02/2021-NEW-Volkswagen-Passat-R-LINE-VW-Passat-FULL.jpg",
      "category": "Sedan" },

  ];

  categories:Category[] = [];
  originalCategories = [
    {
      "id": 1, "name": "Supercar"
    },
    {
      "id": 2, "name": "Coupe"
    },
    {
      "id": 3, "name": "Sedan"
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

    if (this.products?.length === 3  || this.products === null) {
      localStorage.setItem('products', JSON.stringify(this.originalProducts));
    }
    if (this.categories?.length === 3  || this.categories === null ) {
      localStorage.setItem('categories', JSON.stringify(this.originalCategories));
    }

  }


}
