import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: any;
  public currentFilter: string = "";
  public currentPage: number = 1;
  public pageSize: number = 5;
  public totalNbOfProducts: number = 0;
  public totalNbOfPages: number = 0
  public searchText: string = "";
  
  public priceMin: string = "";
  public priceMax: string = "";

  public userConnected: boolean = false;

  constructor(private productService: ProductService, private authService: AuthService) { }

  public ngOnInit(): void {
    this.getProducts();
  }
  
  public userIsConnected(): boolean{
    return localStorage.getItem('user') !== null;
  }

  /**
   * The user changed the value of the search input field
   * 
   * @param searchValue 
   */
  public onSearchChange(searchValue: any): void {
    this.searchText = searchValue.value;
    this.getProducts();
  }

  /**
   * the user chooses the category
   * 
   * @param category The string category or empty string
   */
  public filterCategory(category: string): void {
    this.currentFilter = category;
    // Go to the page #1
    this.currentPage = 1;
    this.getProducts();
  }


  /**
   * The user updates the product availability
   * 
   * @param productId 
   */
  public setAvailable(productId: string): void {
    this.productService.updateField(productId, "availability", true).subscribe(data => {
      this.getProducts();
    });
  }


  /**
   * The user goes to the previous page
   */
  public previousPage(): void {
    this.currentPage--;
    this.getProducts();
  }

  /**
   * The user goes to the next page
   */
  public nextPage(): void {
    this.currentPage++;
    this.getProducts();
  }

  /**
   * The user goes to a specific page
   * 
   * @param newPage The page number
   */
  public gotoPage(newPage: number): void {
    this.currentPage = newPage;
    this.getProducts();
  }

  /**
   * Get all products with the current context
   */
  public getProducts(): void {
    if (this.currentFilter === "") {
      this.productService.getProducts(this.searchText, this.currentPage, this.pageSize, this.priceMin, this.priceMax).subscribe((data: Product[]) => {
        this.products = data;
      });
      // Get the number of items
      this.productService.getProducts("", 1, 99999, this.priceMin, this.priceMax).subscribe((data: any) => {
        this.totalNbOfProducts = data.length;
        this.totalNbOfPages = Math.round(this.totalNbOfProducts / this.pageSize);
      });
    } else {
      this.productService.getProductsByCategory(this.searchText, this.currentFilter, this.currentPage, this.pageSize, this.priceMin, this.priceMax).subscribe((data: Product[]) => {
        this.products = data;
      });
      // Get the number of items
      this.productService.getProductsByCategory("", this.currentFilter, 1, 99999, this.priceMin, this.priceMax).subscribe((data: any) => {
        this.totalNbOfProducts = data.length;
        this.totalNbOfPages = Math.round(this.totalNbOfProducts / this.pageSize);
      });

    }
  }

}

