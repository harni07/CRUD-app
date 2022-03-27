import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../models/category";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] =  [];

  productForm: FormGroup;
  submittedProductForm = false;
  categoryError = false;

  productId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: BackendService,
    private router: Router,
    private route: ActivatedRoute,
  )
  {
    // receive property id
    this.route.params.subscribe( (params:any) => {
      this.productId = params.id;
    });

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [, [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.getCategories();

  }

  getCategories() {
    this.categories.push( {id: 0, name: 'Select category'});
    this.service.getCategories().map( (i:Category) => {
      this.categories.push(i);
    });
  }

  // to check for errors
  get validateForm() {
    return this.productForm.controls
  }

  // create product
  createProduct() {

    this.submittedProductForm = true;

    if (this.productForm.invalid) {
      return;
    }

    if (this.productForm.value.category.name === 'Select category') {
      this.categoryError = true;
      return;
    }

    this.productForm.value.category = this.productForm.value.category.name

    this.service.createProduct(this.productForm.value);
    this.router.navigate(['/products']);
    this.submittedProductForm = false;

  }
}
