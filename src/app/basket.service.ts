import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Basket } from './basketModel';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'access-token': 'NodeJS the best'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BasketService {

  constructor(private http: HttpClient) { }

  getBasket(IdBasket: string = '5cf9aff50026ca1e4c41498e'): Promise<any> {
    return this.http.get<Basket>(
      `http://localhost:3000/baskets/${IdBasket}`).toPromise() ;
  }

  putProductToBasket(product: object, IdBasket: string = '5cf9aff50026ca1e4c41498e'): Promise<any> {
    return this.http.put<Basket>(
      `http://localhost:3000/baskets/${IdBasket}`, product, httpOptions
    ).toPromise();
  }

  removeFromBasket(product: object, IdBasket: string = '5cf9aff50026ca1e4c41498e'): Promise<any> {
    return this.http.delete<Basket>(`http://localhost:3000/baskets/${IdBasket}/${product}`).toPromise();
  }

}
