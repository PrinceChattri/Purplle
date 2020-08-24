import { ProductHandlerService } from './../product-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productsData: any;
  editable: boolean;
  indexForEditableProduct: number;
  productForm = this.fb.group({
    title: [''],
    category: [''],
    description: [''],
    price: [''],
    image: [''],
  });

  // Created a json for creating UI elements on the go and dynamic bindings using *ngFor
  formDesignElements = [
    {
      model: 'title',
      label: 'Enter title'
    },
    {
      model: 'category',
      label: 'Enter category'
    },
    {
      model: 'description',
      label: 'Enter description'
    },
    {
      model: 'price',
      label: 'Enter price'
    },
    {
      model: 'image',
      label: 'Enter imageURL'
    }
  ]

  constructor(private phs: ProductHandlerService, private fb: FormBuilder,  private router: Router) {
    this.editable = false;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsData = this.phs.getData().subscribe(res => {
      this.productsData = res;
    });
  }

  addProduct() {
    if (this.editable === true) {
      // if in edit mode, just update the current Product
      this.productsData[this.indexForEditableProduct] = {
        title: this.productForm.get('title').value,
        category: this.productForm.get('category').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        image: this.productForm.get('image').value
      };
    } else {
      // Create a new Product
      const newProduct = {
        title: this.productForm.get('title').value,
        category: this.productForm.get('category').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        image: this.productForm.get('image').value
      };
      this.productsData.unshift(newProduct);
    }
    this.productForm.reset();
  }

  editProduct(index) {
    this.indexForEditableProduct = index;
    this.editable = true;
    // Set the values of the form to this edited product data
    this.productForm.setValue({
      title: this.productsData[index].title,
      category: this.productsData[index].category,
      description: this.productsData[index].description,
      price: this.productsData[index].price,
      image: this.productsData[index].image
    });
  }

  deleteProduct(index) {
    this.productsData.splice(index, 1);
  }

  openPdpPage(indx) {
    this.router.navigate(['/pdp'],
         {queryParams: {data: indx}});
  }

}
