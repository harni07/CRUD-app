import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {BackendService} from "../services/backend.service";
import {Category} from "../models/category";
import {ConfirmationService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] =  [];
  // for sorting products
  originalProducts: Product[] =  [];
  // storing values for creating products
  categories: Category[] =  [];
  // storing all sorting values
  categoriesSort: Category[] =  [];

  products2:any = [
    {id: '1000', code: 'f230fh0g3', description: 'Product Description', image: 'https://primefaces.org/primeng/assets/showcase/images/demo/product/blue-t-shirt.jpg', inventoryStatus: "INSTOCK", name: "Bamboo Watch",price: 65,quantity: 24,rating: 5},
    {id: '1001', code: 'nvklal433', description: 'Product Description', image: 'https://primefaces.org/primeng/assets/showcase/images/demo/product/blue-t-shirt.jpg', inventoryStatus: "INSTOCK", name: "Bamboo Watch",price: 65,quantity: 24,rating: 5},
    {id: '1002', code: 'zz21cz3c1', description: 'Product Description', image: 'https://primefaces.org/primeng/assets/showcase/images/demo/product/blue-t-shirt.jpg', inventoryStatus: "INSTOCK", name: "Bamboo Watch",price: 65,quantity: 24,rating: 5},
    {id: '1003', code: '244wgerg2', description: 'Product Description', image: 'https://primefaces.org/primeng/assets/showcase/images/demo/product/blue-t-shirt.jpg', inventoryStatus: "INSTOCK", name: "Bamboo Watch",price: 65,quantity: 24,rating: 5},
    {id: '1004', code: 'h456wer53', description: 'Product Description', image: 'https://primefaces.org/primeng/assets/showcase/images/demo/product/blue-t-shirt.jpg', inventoryStatus: "INSTOCK", name: "Bamboo Watch",price: 65,quantity: 24,rating: 5}
  ];

  productForm: FormGroup;
  submittedProductForm = false;

  // modal on/off
  display: boolean = false;

  //storing product id for edit
  selectedProductId: number = 0;
  // checking if we are editing/creating for modal
  isEditProduct: boolean = false;

  constructor(
    private service: BackendService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {

    // initialize form
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      price: [0,[Validators.required]],
      category:['',[Validators.required]],
      image: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  // to check for errors
  get validateForm() {
    return this.productForm.controls
  }


  // open edit or create modal
  openCreateCategoryModal(productId:number) {
    this.isEditProduct = false;
    this.productForm.reset();
    if (productId !== 0 ) {
      this.isEditProduct = true;
      this.selectedProductId = productId;
      this.getProductData();
      this.getCategories()
      this.display = true;
    } else {
      this.getCategories();
      this.display = true;
    }
  }

  // sorting products by categories
  sortProducts(event:any) {
    this.products = [];
    if (event.target.innerText === 'All categories') {
      this.products = this.originalProducts;
      return;
    }
    this.originalProducts?.map( (i:Product) => {
      if (i.category === event.target.innerText) {
        this.products.push(i);
      }
    });
  }

  // fetch all categories
  getCategories() {
    this.categories = [];
    this.categoriesSort.push( {id: 0, name: 'All categories'})
    this.service.getCategories().map( (i:Category) => {
      this.categories.push(i);
      this.categoriesSort.push(i);
    });
    let filteredArr:any = [];
    this.categories.map( i => {
      filteredArr.push(i.name);
    });
    this.categories = filteredArr;
  }

  // fetch all products
  getProducts() {
    this.products = this.service.getProducts();
    this.originalProducts = this.service.getProducts();
  }

  // create new product
  createProduct() {

    this.submittedProductForm = true;

    if (this.productForm.invalid) {
      return;
    }

    this.service.createProduct(this.productForm.value);
    this.getProducts();
    this.productForm.reset();
    this.display = false;
    this.submittedProductForm = false;

  }

  // get product data to patch values in edit modal
  getProductData() {
    let data:any = this.service.getProductById(this.selectedProductId);
    this.productForm.patchValue(data);
    this.productForm.value.category = {category: data.category};
  }

  // edit product
  editProduct() {

    this.submittedProductForm = true;

    if (this.productForm.invalid) {
      return;
    }

    this.service.editProduct(this.selectedProductId, this.productForm.value);
    this.submittedProductForm = false;
    this.isEditProduct = false;
    this.getProducts();
    this.display = false;
    this.productForm.reset();

  }

  // deleting product
  deleteProduct(id:number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete product?',
      accept: () => {
        this.service.deleteProduct(id);
        this.getProducts();
      }
    });
  }
}
