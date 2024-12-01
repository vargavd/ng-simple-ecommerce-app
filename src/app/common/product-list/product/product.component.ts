// NG IMPORTS
import { Component } from '@angular/core';

// PRIMENG IMPORTS
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';


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

}
