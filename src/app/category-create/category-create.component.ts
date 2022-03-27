import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;
  submittedCategoryForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: BackendService,
    private router: Router,
  )
  {

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

  }

  get validateForm() {
    return this.categoryForm.controls
  }

  createCategory() {

    this.submittedCategoryForm = true;

    if (this.categoryForm.invalid) {
      return;
    }


    this.service.createCategory(this.categoryForm.value.name);
    this.router.navigate(['/categories']);
    this.submittedCategoryForm = false;


  }

}
