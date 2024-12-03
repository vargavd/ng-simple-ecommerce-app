// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

// COMPONENT IMPORTS
import { ProductComponent } from './product.component';

// MODEL IMPORTS
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const productsServiceMock = {
    products: new BehaviorSubject<Product[] | null>(null)
  }
  const normalProduct = new Product(
    '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 50, 4, 25.99
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = normalProduct;
    component.ngOnChanges({
      product: {
        previousValue: null,
        currentValue: normalProduct,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title, price and image source', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const image = fixture.debugElement.query(By.css('img')).nativeElement;
    const price = fixture.debugElement.query(By.css('.price-amount')).nativeElement;

    expect(title.textContent.trim()).toBe('Wireless Mouse');
    expect(image.src).toBe('https://example.com/images/wireless-mouse.jpg');
    expect(price.textContent.trim()).toBe('25.99');
  });

  it('should display the minOrderAmount', () => {
    const p = new Product(
      '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 50, 4, 25.99
    );
    component.product = p;
    component.ngOnChanges({
      product: {
        previousValue: null,
        currentValue: p,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();

    const minOrderAmount = fixture.debugElement.query(By.css('.min-order-amount')).nativeElement;
    const addToCartAmount = fixture.debugElement.query(By.css('.add-to-cart-amount')).nativeElement;

    expect(minOrderAmount.textContent.trim()).toBe('4');
    expect(addToCartAmount.textContent.trim()).toBe('4');
  });

  it('should display the correct in stock message', () => {
    const inStock = fixture.debugElement.query(By.css('.in-stock')).nativeElement;

    expect(inStock.textContent.trim()).toBe('(50) In Stock');
  });

  it('should display the correct out of stock message', () => {
    const p = new Product(
      '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 0, 5, 25.99
    );
    component.product = p;
    fixture.detectChanges();

    const outOfStock = fixture.debugElement.query(By.css('.out-of-stock')).nativeElement;

    expect(outOfStock.textContent.trim()).toBe('Out of Stock');
  });

  it('should display the correct not enough message', () => {
    const p = new Product(
      '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 4, 5, 25.99
    );
    component.product = p;
    fixture.detectChanges();

    const outOfStock = fixture.debugElement.query(By.css('.not-enough')).nativeElement;

    expect(outOfStock.textContent.trim()).toBe('(4) Not Enough');
  });

  it('add button should be disabled when there are less product then minimum order amount', () => {
    const p = new Product(
      '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 4, 5, 25.99
    );
    component.product = p;
    component.ngOnChanges({
      product: {
        previousValue: null,
        currentValue: p,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    fixture.detectChanges();

    const addToCartButton = fixture.debugElement.query(By.css('.add-to-cart-button button')).nativeElement;

    expect(addToCartButton.disabled).toBeTruthy();
  });

  it('can increase add to cart number', () => {
    const increaseButton = fixture.debugElement.query(By.css('.increase-button button')).nativeElement;

    increaseButton.click();

    expect(component.addToCartNumber).toBe(5);
  });

  it('can decrease add to cart number', () => {
    component.addToCartNumber = 5;
    fixture.detectChanges();

    const decreaseButton = fixture.debugElement.query(By.css('.decrease-button button')).nativeElement;

    decreaseButton.click();

    expect(component.addToCartNumber).toBe(4);
  });

  it('cannot increase add to cart number above the available amount', () => {
    component.addToCartNumber = normalProduct.availableAmount;
    fixture.detectChanges();

    const increaseButton = fixture.debugElement.query(By.css('.increase-button button')).nativeElement;

    increaseButton.click();

    expect(component.addToCartNumber).toBe(normalProduct.availableAmount);
  });

  it('cannot decrease add to cart number below the minimum order amount', () => {
    const decreaseButton = fixture.debugElement.query(By.css('.decrease-button button')).nativeElement;

    expect(component.addToCartNumber).toBe(normalProduct.minOrderAmount);
    decreaseButton.click();
    expect(component.addToCartNumber).toBe(normalProduct.minOrderAmount);
  });
});
