import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    private route: ActivatedRoute
  )
  {
    // receive category id
    this.route.params.subscribe( (params:any) => {
      this.categoryId = params.id;
    });

    // initialize form
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getCategoryData();

  }

  // to check for errors
  get validateForm() {
    return this.categoryForm.controls
  }


  // get category data to patch values in form
  getCategoryData() {
    let categoryData:any = this.service.getCategoryById(this.categoryId);
    this.categoryForm.patchValue(categoryData)
  }


  // edit category
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
