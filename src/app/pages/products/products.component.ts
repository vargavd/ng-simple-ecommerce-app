// NG IMPORTS
import { Component, OnInit } from '@angular/core';

// PRIME NG IMPORTS
import { ProgressSpinnerModule as PrimeNG_ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule as PrimeNG_MessagesModule } from 'primeng/messages';

// MODEL IMPORTS
import { Product } from '../../models/product';

// SERVICE IMPORTS
import { ProductsService } from '../../services/products.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PrimeNG_ProgressSpinnerModule,
    PrimeNG_MessagesModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = null;
  errors: string[] | null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.products = products
    });

    this.productsService.errors.subscribe((errors) => {
      this.errors = errors;
    });
  }

  getErrorMessages(): Message[] {
    return this.errors?.map((error) => ({ severity: 'error', summary: 'Error', detail: error })) ?? [];
  }
}
