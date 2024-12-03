// NG IMPORTS
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// MODEL IMPORTS
import { Product } from '../models/product';

// CONFIG
import { environment } from '../env';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // EVENTS
  products = new BehaviorSubject<Product[] | null>(null);
  errors = new BehaviorSubject<string[] | null>(null);

  constructor(private http: HttpClient) {
    this.http.get<Product[]>(environment.apiUrl)
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.products.next(products.map((product) => {
            product.amountInCart = 0;

            return product;
          }));
        },
        error: (error) => {
          console.error(error);
          this.errors.next(['Failed to download products:', error.message]);
        }
      });
  }

  addToCart(productId: string, amount: number): void {
    if (this.products.value === null) {
      return;
    }

    const product = this.products.value.find((product) => product.id === productId);

    if (!product) {
      throw new Error('Product not found.');
    }

    if (product.availableAmount < amount) {
      throw new Error('You are trying to add too much product.');
    }

    if (product.minOrderAmount > amount) {
      throw new Error('Amount is less than minimum order amount.');
    }

    product.availableAmount -= amount;
    product.amountInCart = product.amountInCart ? (product.amountInCart + amount) : amount;

    this.products.next(this.products.value);
  }

  removeFromCart(productId: string): void {
    if (this.products.value === null) {
      return;
    }

    const product = this.products.value.find((product) => product.id === productId);

    if (!product) {
      throw new Error('Product not found.');
    }

    if (!product.amountInCart) {
      throw new Error('Cannot remove product that is not in cart.');
    }

    product.availableAmount += product.amountInCart;
    product.amountInCart = 0;

    this.products.next(this.products.value);
  }
}
