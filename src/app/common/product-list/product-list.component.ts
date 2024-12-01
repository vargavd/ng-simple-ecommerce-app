// NG IMPORTS
import { Component, Input } from '@angular/core';

// COMPONENT IMPORTS
import { ProductComponent } from './product/product.component';

// MODEL IMPORTS
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: Product[] | null = null;
}
