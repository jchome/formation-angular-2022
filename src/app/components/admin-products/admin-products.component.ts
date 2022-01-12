import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  public products: Product[] = [];

  /**
   * Edited product
   */
  public product: Product = new Product();
  public message: string = "";

  public errors: any = {};

  constructor(private productService: ProductService, private modalService: NgbModal) {
    
  }

  public ngOnInit(): void {
    if (history.state && history.state.message) {
      this.message = history.state.message;
    }
    this.getProducts();
  }

  /**
   * The user wants to delete a product
   * 
   * @param product 
   */
  public deleteProduct(product: Product): void {
    if (confirm("Are you sure to delete the product " + product.title + "?")) {
      this.productService.deleteProduct(product.id).subscribe({
        complete: () => {
          this.message = "Product \"" + product.title + "\" successfully deleted."
          // Option 1: Delete the product from the array
          // this.products = this.products.filter( p => p.id !== product.id);
          // Option 2: Get the data from the database
          this.getProducts();
        },
        error: (error) => {
          this.message = "Something goes wrong in the DELETE request...";
          console.error(error);
        }
      });
    }
  }

  /**
   * User user wants to edit a product
   * 
   * @param content 
   * @param product 
   */
  public editProduct(content: any, product: Product) {
    this.product = product;
    
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        if(result === "OK"){
          this.productService.updateProduct(product).subscribe((data) => {
            console.log(data);
            this.getProducts();
          });
        }else{
          console.log(`Closed with: ${result}`);
        }
      }, (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      });
      
  }
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * Get all products with the current context
   */
  private getProducts(): void {
    this.productService.getProducts("", 1, 9999).subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
