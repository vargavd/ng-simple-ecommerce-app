// NG IMPORTS
import { Component } from '@angular/core';

// COMPONENT IMPORTS
import { ProductComponent } from './product/product.component';

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

}
