// NG IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// CUSTOM IMPORTS
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
