// NG IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// PRIME NG IMPORTS
import { ToolbarModule as PrimeNG_ToolbarModule } from 'primeng/toolbar';
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';

// SERVICE IMPORTS
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,

    PrimeNG_ToolbarModule,
    PrimeNG_ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  numberOfProductsInCart: number = 0;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.products.subscribe((products) => {
      this.numberOfProductsInCart = products ? products.reduce((acc, product) => {
        return acc + (product.amountInCart ?? 0);
      }, 0) : 0;
    });
  }
}
