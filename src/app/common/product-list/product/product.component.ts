// NG IMPORTS
import { Component, Input } from '@angular/core';

// PRIMENG IMPORTS
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';

// MODEL IMPORTS
import { Product } from '../../../models/product';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    PrimeNG_ButtonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
}
