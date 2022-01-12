import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  /**
   * Get all products from database
   * 
   * @returns 
   */
  public getProducts(searchText: string, page?: number, limit?: number, minPrice?: string, maxPrice?: string): Observable<Product[]> {
    let query = this.getQuery(searchText, page, limit, minPrice, maxPrice);

    return this.http.get("http://localhost:3000/products?" + query) as Observable<Product[]>;
  }

  /**
   * Get the all products with its category
   * Can use the pipe named "categoryFilter" with a parameter
   * 
   * @param category the category of the product
   * @returns 
   */
  public getProductsByCategory(searchText: string, category: string, page?: number, limit?: number, minPrice?: string, maxPrice?: string): Observable<Product[]> {
    let query = this.getQuery(searchText, page, limit, minPrice, maxPrice);
    return this.http.get("http://localhost:3000/products?" + query + "&category=" + category) as Observable<Product[]>;
  }

  /**
   * Get the unique product with its id
   * 
   * @param id The id of the product
   * @returns 
   */
  public getProductById(id: string): Observable<Product> {
    return this.http.get("http://localhost:3000/products/" + id) as Observable<Product>;
  }

  /**
   * Get the 
   * 
   * @param 
   * @returns 
   */
  public findProductsByPrice(min: number, max: number): Observable<Product> {
    return this.http.get("http://localhost:3000/products/price_gte=" + min + "&price_lte=" + max) as Observable<Product>;
  }


  /**
   * Update any field of a product
   * 
   * @param productId The id of the product
   * @param field The name of the field to update
   * @param newValue the new value of the field
   * @returns Observable<any>
   */
  public updateField(productId: string, field: string, newValue: any): Observable<Product> {
    let body: any = {};
    body[field] = newValue;
    return this.http.patch("http://localhost:3000/products/" + productId, body) as Observable<Product>;
  }

  /**
   * Insert the new product in the database, using the PUT method
   * 
   * @param product 
   * @returns 
   */
  public insertProduct(product: Product): Observable<Product> {
    return this.http.post("http://localhost:3000/products/", product) as Observable<Product>;
  }

  /**
   * Update a product
   * 
   * @param product 
   * @returns 
   */
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put("http://localhost:3000/products/" + product.id, product) as Observable<Product>;
  }



  /**
   * Delete a product in the database
   * 
   * @param product
   * @returns No result in the Observable
   */
  public deleteProduct(productId: any): Observable<any> {
    return this.http.delete("http://localhost:3000/products/" + productId);
  }

  /**
   * Build the search query
   * 
   * @param searchText 
   * @param page 
   * @param limit 
   * @returns 
   */
  private getQuery(searchText: string, page?: number, limit?: number, minPrice?: string, maxPrice?: string): string {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    let searchQuery = "";
    if (searchText) {
      searchQuery = "&q=" + searchText;
    }
    if (minPrice) {
      searchQuery += "&price_gte=" + minPrice;
    }
    if (maxPrice) {
      searchQuery += "&price_lte=" + maxPrice;
    }
    return "_page=" + page + "&_limit=" + limit + searchQuery;
  }

}
