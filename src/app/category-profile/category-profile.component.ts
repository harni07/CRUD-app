import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../models/category";

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.scss']
})
export class CategoryProfileComponent implements OnInit {

  categoryForm: FormGroup;
  submittedCategoryForm = false;

  categoryId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: BackendService,
    private router: Router,
    private route: ActivatedRoute,
  )
  {
    // receive property id
    this.route.params.subscribe( (params:any) => {
      this.categoryId = params.id;
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getCategoryData();

  }

  get validateForm() {
    return this.categoryForm.controls
  }


  getCategoryData() {
    let categoryData:any = this.service.getCategoryById(this.categoryId);
    this.categoryForm.patchValue(categoryData)
  }


  editCategory() {

    this.submittedCategoryForm = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.service.editCategory(this.categoryId, this.categoryForm.value.name);
    this.router.navigate(['/categories']);
    this.submittedCategoryForm = false;


  }
}
