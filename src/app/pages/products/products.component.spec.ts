// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

// COMPONENT IMPORTS
import { ProductsComponent } from './products.component';

// SERVICE IMPORTS
import { ProductsService } from '../../services/products.service';

// MODEL IMPORTS
import { Product } from '../../models/product';
import { SampleProducts } from '../../models/product-sample-data';


describe('ProductsComponent', () => {
  let productsComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const productsServiceMock = {
    products: new BehaviorSubject<Product[] | null>(null),
    errors: new BehaviorSubject<string[] | null>(null)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideAnimations(),
        { provide: ProductsService, useValue: productsServiceMock }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productsComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productsComponent).toBeTruthy();
  });

  it('should initialize products with null', () => {
    expect(productsComponent.products).toBeNull();
  });

  it('should initialize errors with null', () => {
    expect(productsComponent.errors).toBeNull();
  });

  it('should update products when productsService emits a new product', () => {
    const products: Product[] = SampleProducts.slice(0, 3);

    productsServiceMock.products.next(products);

    fixture.detectChanges();

    expect(productsComponent.products).toEqual(products);
  });

  it('should update errors when productsService emits 2 new errors', () => {
    const errors: string[] = [
      'Failed to download products:.',
      '401 Unauthorized'
    ];

    productsServiceMock.errors.next(errors);

    fixture.detectChanges();

    expect(productsComponent.errors).toEqual(errors);
  });

  it('should display 2 error message with the correct texts when productsService emits 2 new errors', () => {
    const errors: string[] = [
      'Failed to download products:.',
      '401 Unauthorized'
    ];

    productsServiceMock.errors.next(errors);

    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.p-message'));
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].nativeElement.textContent).toContain('Failed to download products:.');
    expect(errorMessages[1].nativeElement.textContent).toContain('401 Unauthorized');
  });

  // this test is already covered in the product-list component, but I thought it would be a good idea to include it here as wel
  it('should display 3 products when productsService emits 3 new products', () => {
    const products: Product[] = SampleProducts.slice(0, 3);

    productsServiceMock.products.next(products);

    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productCards.length).toBe(3);
  });
});