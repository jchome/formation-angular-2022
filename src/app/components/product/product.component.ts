import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product: any;
  public userConnected: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService, 
    private authService: AuthService) {

    let id: any = activatedRoute.snapshot.paramMap.get("id");
    productService.getProductById(id).subscribe(data => {
      this.product = data;
    });
   }

  ngOnInit(): void {
    this.userConnected = (this.authService.user !== undefined);
    
  }

}
