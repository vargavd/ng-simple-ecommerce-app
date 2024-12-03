// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { provideRouter } from '@angular/router';

// COMPONENT IMPORTS
import { HeaderComponent } from './header.component';

// MODEL IMPORTS
import { Product } from '../models/product';
import { SampleProducts } from '../models/product-sample-data';

// SERVICE IMPORTS
import { ProductsService } from '../services/products.service';

// MISC IMPORTS
import { routes } from '../app.routes';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const productsServiceMock = {
    products: new BehaviorSubject<Product[] | null>(null)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter(routes),
        { provide: ProductsService, useValue: productsServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 0 in the badge when there are no products', () => {
    productsServiceMock.products.next([]);
    fixture.detectChanges();

    const cartItems = fixture.nativeElement.querySelector('.p-badge');
    expect(cartItems.textContent.trim()).toBe('0');
  });

  it('should have still 0 in the badge after new products are downloaded', () => {
    productsServiceMock.products.next(SampleProducts);
    fixture.detectChanges();

    const cartItems = fixture.nativeElement.querySelector('.p-badge');
    expect(cartItems.textContent.trim()).toBe('0');
  });

  it('should have still correct number in the badge after adding to cart', () => {
    const newSampleProducts = [
      new Product(
        "1",
        "Red apples",
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        100,
        10,
        10.5,
        4
      ),
      new Product(
        "2",
        "Bananas",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/10a4bf7d-f74f-4c37-ab27-2f7773c81039/Bananas%20%20%20per%20lb",
        150,
        5,
        1,
        9
      ),
    ];

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    productsServiceMock.products.next(newSampleProducts);
    fixture.detectChanges();

    const cartItems = fixture.nativeElement.querySelector('.p-badge');
    expect(cartItems.textContent.trim()).toBe('13');
  });
});
