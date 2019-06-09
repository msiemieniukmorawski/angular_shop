import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductResault } from './productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(): Promise<any> {
    return this.http.get<ProductResault>(
      'http://localhost:3000/product'
    ).toPromise();
  }

  getProductLisID(id: string): Promise<any> {
    return this.http.get<Product>(
      `http://localhost:3000/products/${id}`
    ).toPromise();
  }

}
