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
    this.categories = this.service.getCategories();
  }

  get validateForm() {
    return this.productForm.controls
  }

  createProduct() {

    this.submittedProductForm = true;

    if (this.productForm.invalid) {
      return;
    }

    this.service.createProduct(this.productForm.value);
    this.router.navigate(['/products']);
    this.submittedProductForm = false;

  }
}
