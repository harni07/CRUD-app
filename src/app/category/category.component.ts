import { Component, OnInit } from '@angular/core';
import {Category} from "../models/category";
import {BackendService} from "../services/backend.service";
import {ConfirmationService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] =  [];

  // modal on/off
  display: boolean = false;

  categoryForm: FormGroup;
  submittedCategoryForm = false;

  //storing category id for edit
  selectedCategoryId: number = 0;
  // checking if we are editing/creating for modal
  isEditCategory: boolean = false;

  constructor(
    private service: BackendService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {

    // initialize form
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.getCategories();
  }

  // to check for errors
  get validateForm() {
    return this.categoryForm.controls
  }

  // open edit or create modal
  openCreateCategoryModal(categoryId:number) {
    this.display = true;
    this.categoryForm.reset();
    this.submittedCategoryForm = false;
    if (categoryId !== 0 ) {
      this.isEditCategory = true;
      this.selectedCategoryId = categoryId;
      this.getCategoryData();
    }
  }

  // fetch all categories
  getCategories() {
    this.categories = this.service.getCategories();
  }

  // create new category
  createCategory() {
    this.submittedCategoryForm = true;
    if (this.categoryForm.invalid) {
      return;
    }

    // if form is validated create category, fetch results to get new value and reset form and close modal
    this.service.createCategory(this.categoryForm.value.name);
    this.getCategories()
    this.submittedCategoryForm = false;
    this.display = false;
    this.categoryForm.reset();

  }

  // get category data to patch values in edit modal
  getCategoryData() {
    let categoryData:any = this.service.getCategoryById(this.selectedCategoryId);
    this.categoryForm.patchValue(categoryData)
  }


  // edit category
  editCategory() {

    this.submittedCategoryForm = true;

    if (this.categoryForm.invalid) {
      return;
    }

    // if form is validated edit category, fetch results to get new value and reset form and close modal
    this.service.editCategory(this.selectedCategoryId, this.categoryForm.value.name);
    this.submittedCategoryForm = false;
    this.getCategories();
    this.display = false;
    this.categoryForm.reset();
    this.isEditCategory = false;

  }

  // deleting category
  deleteCategory(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      accept: () => {
        this.service.deleteCategory(id);
        this.getCategories();
      }
    });
  }

}
