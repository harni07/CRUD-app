import { Component, OnInit } from '@angular/core';
import {Category} from "../models/category";
import {CategoriesList} from "../categories";
import {BackendService} from "../services/backend.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] =  [];

  constructor(
    private service: BackendService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  // fetch all categories
  getCategories() {
    this.categories = this.service.getCategories();
  }

  // deleting category
  deleteCategory(id:number) {
    this.service.deleteCategory(id);
  }

}
