import { Component, OnInit } from '@angular/core';
import {Category} from "../models/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] =  [];

  constructor() { }

  ngOnInit() {

    this.categories = [
      {id: 1, name: 'Small'},
      {id: 2, name: 'Medium'},
      {id: 3, name: 'Large'},
    ]
  }

}
