import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AdminProductsComponent } from '../admin-products/admin-products.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public errors: any = {};

  constructor(private productService: ProductService, private router: Router) { }

  public ngOnInit(): void {
  }

  public addProduct(form: any): void {
    if(form.valid){
      this.errors = {};
      
      let product: Product = new Product();
      product.title = form.value.inputTitle;
      product.availability = form.value.inputAvailability
      product.price = form.value.inputPrice;
      product.category = form.value.inputCategory;
      product.description = form.value.inputDescription;
      if(form.value.inputPhoto){
        product.photos = [ form.value.inputPhoto ];
      }

      this.productService.insertProduct(product).subscribe((data:any) => {
        let successMessage: string = "The product #" + data.id + " has been created.";
        // Go to the products page
        this.router.navigate(["admin-products"], {state: {message: successMessage}});
      });

    }else{
      this.errors["global"] = "Form is not valid.";
      if(form.controls["inputTitle"].errors["required"]){
        this.errors["inputTitle"] = "Please choose a title.";
      }else{
        delete(this.errors["inputTitle"]);
      }
      if(form.controls["inputPrice"].errors["required"]){
        this.errors["inputPrice"] = "Please set a price.";
      }else{
        delete(this.errors["inputPrice"]);
      }
    }
  }

}
