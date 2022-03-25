import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

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


}
