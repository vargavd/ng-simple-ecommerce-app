// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// COMPONENT IMPORTS
import { ProductComponent } from './product.component';

// MODEL IMPORTS
import { Product } from '../../../models/product';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = new Product(
      '1', 'Wireless Mouse', 'https://example.com/images/wireless-mouse.jpg', 50, 1, 25.99
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title and image source', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    const image = fixture.debugElement.query(By.css('img')).nativeElement;

    expect(title.textContent.trim()).toBe('Wireless Mouse');
    expect(image.src).toBe('https://example.com/images/wireless-mouse.jpg');
  })
});
