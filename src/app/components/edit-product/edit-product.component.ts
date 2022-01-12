import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public errors: any = {};

  @Input()
  public product: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  
}
