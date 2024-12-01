// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// COMPONENTS IMPORTS
import { ProductListComponent } from './product-list.component';

// MODEL IMPORTS
import { Product } from '../../models/product';
import { SampleProducts } from '../../models/product-sample-data';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize products with null', () => {
    expect(component.products).toBeNull();
  });

  it('should display 0 products when the products array is empty', () => {
    const productCards = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productCards.length).toBe(0);
  });

  it('should display 3 products when the products array has 3 item', () => {
    component.products = SampleProducts.slice(0, 3);
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productCards.length).toBe(3);
  });
});
