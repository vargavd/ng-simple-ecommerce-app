// NG IMPORTS
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// PRIME NG IMPORTS
import { ToolbarModule as PrimeNG_ToolbarModule } from 'primeng/toolbar';
import { ButtonModule as PrimeNG_ButtonModule } from 'primeng/button';

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
export class HeaderComponent {

}
