// NG IMPORTS
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// PRIMENG IMPORTS
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';

// MODEL IMPORTS
import { Product } from '../../../models/product';

// SERVICE IMPORTS
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    PrimeNG_ButtonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnChanges {
  @Input() product!: Product;

  addToCartNumber: number = 1;

  constructor(private productsService: ProductsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.addToCartNumber = changes['product'].currentValue.minOrderAmount;
    }
  }

  increaseAddToCartNumber(): void {
    if (this.addToCartNumber < this.product.availableAmount) {
      this.addToCartNumber++;
    }
  }

  decreaseAddToCartNumber(): void {
    if (this.addToCartNumber > this.product.minOrderAmount) {
      this.addToCartNumber--;
    }
  }

  addToCart(): void {
    this.productsService.addToCart(this.product.id, this.addToCartNumber);
    this.addToCartNumber = this.product.minOrderAmount;
  }

  get isThereEnoughAmount(): boolean {
    return this.product.availableAmount >= this.product.minOrderAmount;
  }

  get canAddToCart(): boolean {
    return this.addToCartNumber >= this.product.minOrderAmount && this.isThereEnoughAmount;
  }
}
