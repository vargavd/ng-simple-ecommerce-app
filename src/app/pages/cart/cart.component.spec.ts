// NG IMPORTS
import { ComponentFixture, TestBed } from '@angular/core/testing';

// COMPONENT IMPORTS
import { CartComponent } from './cart.component';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let sampleData = [
    new Product(
      "1",
      "Red apples",
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      100,
      10,
      10.5
    ),
    new Product(
      "2",
      "Bananas",
      "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/10a4bf7d-f74f-4c37-ab27-2f7773c81039/Bananas%20%20%20per%20lb",
      150,
      5,
      1
    ),
    new Product(
      "3",
      "oranges",
      "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/203b374e-e266-4974-9b33-b4091b272d87/Navel%20Oranges%203%20lb",
      200,
      1,
      1
    ),
  ];
  let productsServiceMock = {
    products: new BehaviorSubject<Product[] | null>(null),
    removeFromCart: (productId: string) => undefined
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        provideAnimations(),
        { provide: ProductsService, useValue: productsServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No Products in Cart", 0 as total amount and $0 as total when products is null', () => {
    productsServiceMock.products.next(null);
    fixture.detectChanges();

    const noProducts = fixture.debugElement.nativeElement.querySelector('.p-message-detail');
    const totalAmount = fixture.debugElement.nativeElement.querySelector('.total-amount');
    const total = fixture.debugElement.nativeElement.querySelector('.total');

    expect(noProducts.textContent.trim()).toBe('No Products in Cart');
    expect(totalAmount.textContent.trim()).toBe('0');
    expect(total.textContent.trim()).toBe('$0');
  });

  it('should display "No Products in Cart" and $0 as total when products is []', () => {
    productsServiceMock.products.next([]);
    fixture.detectChanges();

    const noProducts = fixture.debugElement.nativeElement.querySelector('.p-message-detail');
    const total = fixture.debugElement.nativeElement.querySelector('.total');

    expect(noProducts.textContent.trim()).toBe('No Products in Cart');
    expect(total.textContent.trim()).toBe('$0');
  });

  it('should display "No Products in Cart" and $0 as total when there are no products in cart', () => {
    productsServiceMock.products.next([
      new Product(
        "1",
        "Red apples",
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        100,
        10,
        10.5
      ),
      new Product(
        "2",
        "Bananas",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/10a4bf7d-f74f-4c37-ab27-2f7773c81039/Bananas%20%20%20per%20lb",
        150,
        5,
        1
      ),
      new Product(
        "3",
        "oranges",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/203b374e-e266-4974-9b33-b4091b272d87/Navel%20Oranges%203%20lb",
        200,
        1,
        1
      ),
    ]);
    fixture.detectChanges();

    const noProducts = fixture.debugElement.nativeElement.querySelector('.p-message-detail');
    const total = fixture.debugElement.nativeElement.querySelector('.total');

    expect(noProducts.textContent.trim()).toBe('No Products in Cart');
    expect(total.textContent.trim()).toBe('$0');
  });

  it('should display 1 type of product properly', () => {
    productsServiceMock.products.next([
      new Product(
        "1",
        "Red apples",
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        85,
        10,
        10.5,
        15
      ),
      new Product(
        "2",
        "Bananas",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/10a4bf7d-f74f-4c37-ab27-2f7773c81039/Bananas%20%20%20per%20lb",
        150,
        5,
        1
      ),
      new Product(
        "3",
        "oranges",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/203b374e-e266-4974-9b33-b4091b272d87/Navel%20Oranges%203%20lb",
        200,
        1,
        1
      ),
    ]);
    fixture.detectChanges();

    const productRows = fixture.debugElement.nativeElement.querySelectorAll('.product-row');
    expect(productRows.length).toBe(1);

    const productName = fixture.debugElement.nativeElement.querySelector('.product-name');
    expect(productName.textContent.trim()).toBe('Red apples');

    const amountInCart = fixture.debugElement.nativeElement.querySelector('.amount-in-cart');
    expect(amountInCart.textContent.trim()).toBe('15');

    const price = fixture.debugElement.nativeElement.querySelector('.price');
    expect(price.textContent.trim()).toBe('$157.5');

    const total = fixture.debugElement.nativeElement.querySelector('.total');
    expect(total.textContent.trim()).toBe('$157.5');

    const totalAmount = fixture.debugElement.nativeElement.querySelector('.total-amount');
    expect(totalAmount.textContent.trim()).toBe('15');
  });

  it('should display multiple types of products in cart', () => {
    productsServiceMock.products.next([
      new Product(
        "1",
        "Red apples",
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        78,
        10,
        10.5,
        22
      ),
      new Product(
        "2",
        "Bananas",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/10a4bf7d-f74f-4c37-ab27-2f7773c81039/Bananas%20%20%20per%20lb",
        143,
        5,
        1,
        7
      ),
      new Product(
        "3",
        "oranges",
        "https://dm.cms.aldi.cx/is/image/prod1amer/product/jpg/scaleWidth/306/203b374e-e266-4974-9b33-b4091b272d87/Navel%20Oranges%203%20lb",
        200,
        1,
        1
      ),
    ]);
    fixture.detectChanges();

    const productRows = fixture.debugElement.nativeElement.querySelectorAll('.product-row');
    expect(productRows.length).toBe(2);

    const total = fixture.debugElement.nativeElement.querySelector('.total');
    expect(total.textContent.trim()).toBe('$238');

    const totalAmount = fixture.debugElement.nativeElement.querySelector('.total-amount');
    expect(totalAmount.textContent.trim()).toBe('29');
  });

  it('should call removeFromCart with the correct product id in a service when remove button is clicked', () => {
    productsServiceMock.products.next([
      new Product(
        "1",
        "Red apples",
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        78,
        10,
        10.5,
        22
      )
    ]);
    fixture.detectChanges();

    spyOn(productsServiceMock, 'removeFromCart').and.callThrough();

    const removeButtons = fixture.debugElement.nativeElement.querySelectorAll('.remove-from-cart button');
    removeButtons[0].click();

    expect(productsServiceMock.removeFromCart).toHaveBeenCalledWith('1');
  });
});
