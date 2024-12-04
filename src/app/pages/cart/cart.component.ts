// NG IMPORTS
import { Component, OnInit } from '@angular/core';

// PRIME NG IMPORTS
import { DataViewModule as PrimeNG_DataViewModule } from 'primeng/dataview';
import { MessagesModule as PrimeNG_MessagesModule } from 'primeng/messages';
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';
import { TagModule as PrimeNG_TagModule } from 'primeng/tag';

// MODEL IMPORTS
import { Product } from '../../models/product';

// SERVICE IMPORTS
import { ProductsService } from '../../services/products.service';

// MISC IMPORTS
import { SHARED } from '../../shared/helper-funcs';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    PrimeNG_DataViewModule,
    PrimeNG_ButtonModule,
    PrimeNG_TagModule,
    PrimeNG_MessagesModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  productsInCart: Product[] | undefined;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.productsInCart = products?.filter((product) => product.amountInCart);
    });
  }

  isItInStock(product: Product): string | null {
    return product.availableAmount > product.minOrderAmount ? 'In Stock' : 'Out of Stock';
  };

  getItemWrapperClassAttr(last: boolean): string {
    return 'flex flex-column sm:flex-row sm:align-items-center p-4 gap-3' +
      (last ? '' : ' border-bottom-1 surface-border');
  }

  getFullPriceInCart(): number {
    return this.roundTo2Decimals(this.productsInCart?.reduce((acc, product) => acc + product.price * product.amountInCart!, 0) ?? 0);
  }

  getTotalAmountInCart(): number {
    return this.productsInCart?.reduce((acc, product) => acc + product.amountInCart!, 0) ?? 0;
  }

  removeProductFromCart(productId: string): void {
    this.productsService.removeFromCart(productId);
  }

  roundTo2Decimals(value: number): number {
    return SHARED.roundTo2Decimals(value);
  }
}
