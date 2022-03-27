import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../models/category";

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit {

  categories: Category[] =  [];

  productForm: FormGroup;
  submittedProductForm = false;

  productId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: BackendService,
    private router: Router,
    private route: ActivatedRoute
  )
  {
    // receive product id
    this.route.params.subscribe( (params:any) => {
      this.productId = params.id;
    });

    // initialize form
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [, [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.getCategories();
    this.getProductData();

  }

  //get categories
  getCategories() {
    this.categories = this.service.getCategories();
  }

  // get product data to patch values in form
  getProductData() {
    let data:any = this.service.getProductById(this.productId);
    this.productForm.patchValue(data);
  }

  // to check for errors
  get validateForm() {
    return this.productForm.controls
  }

  //edit product
  editProduct() {

    this.submittedProductForm = true;

    if (this.productForm.invalid) {
      return;
    }

    this.service.editProduct(this.productId, this.productForm.value);
    this.router.navigate(['/products']);
    this.submittedProductForm = false;

  }
}
