// NG IMPORTS
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

// COMPONENT IMPORTS
import { AppComponent } from './app.component';

// SERVICE IMPORTS
import { ProductsService } from './services/products.service';

// MODEL IMPORTS
import { Product } from './models/product';


describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
      ],
      providers: [
        provideRouter(routes),
        {
          provide: ProductsService,
          useValue: {
            products: new BehaviorSubject<Product[] | null>(null),
            errors: new BehaviorSubject<string[] | null>(null)
          }
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});