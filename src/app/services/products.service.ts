// NG IMPORTS
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// MODEL IMPORTS
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // EVENTS
  products = new BehaviorSubject<Product[] | null>(null);
  errors = new BehaviorSubject<string[] | null>(null);

  constructor(private http: HttpClient) { }

  // PUBLIC METHODS
  downloadProducts(): void {
    this.http.get<Product[]>(
      'https://cas5-0-urlprotect.trendmicro.com:443/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b'
    ).subscribe({
      next: (products) => {
        this.products.next(products);
      },
      error: (error) => {
        console.error(error);
        this.errors.next(['Failed to download products:.', error.message]);
      }
    })
  }
}
