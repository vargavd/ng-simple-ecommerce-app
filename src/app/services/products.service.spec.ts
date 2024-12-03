import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


describe('ProductsService', () => {
  let productsService: ProductsService;

  const mockProducts: Product[] = [
    new Product('1', 'Product 1', '', 10, 1, 0),
    new Product('2', 'Product 2', '', 5, 2, 0)
  ];

  const httpMock = {
    get: (url: string) => of(mockProducts)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductsService,
        { provide: HttpClient, useValue: httpMock }
      ],
    });

    productsService = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  it('should call the get method of httpMock in constructor', () => {
    const httpMock2 = {
      get: (url: string) => of(mockProducts)
    };

    spyOn(httpMock2, 'get').and.callThrough();

    new ProductsService(httpMock2 as any);

    expect(httpMock2.get).toHaveBeenCalled();
  });

  it('should download products on creation', () => {
    expect(productsService.products.value).toEqual(mockProducts);
  });

  it('should not add a product to the cart if products value is null', () => {
    productsService.products.next(null);

    productsService.addToCart('1', 1);

    expect(productsService.products.value).toBeNull();
  });

  it('should throw an error if the product to be added is not in the products array', () => {
    expect(() => productsService.addToCart('3', 1)).toThrowError('Product not found.');
  });

  it('should throw an error if adding too many products to the cart', () => {
    expect(() => productsService.addToCart('1', 11)).toThrowError('You are trying to add too much product.');
  });

  it('should throw an error if adding fewer products than the minimum order amount', () => {
    expect(() => productsService.addToCart('2', 1)).toThrowError('Amount is less than minimum order amount.');
  });

  it('should correctly add a product to the cart', () => {
    productsService.addToCart('1', 1);

    expect(productsService.products.value?.find((product) => product.id === '1')?.amountInCart).toEqual(1);
    expect(productsService.products.value?.find((product) => product.id === '1')?.availableAmount).toEqual(9);
  });

  it('should remove a product from the cart and update the available amount', () => {
    productsService.products.next([
      new Product('1', 'Product 1', '', 6, 1, 0, 4),
      new Product('2', 'Product 2', '', 5, 2, 0)
    ]);

    productsService.removeFromCart('1');

    expect(productsService.products.value?.find((product) => product.id === '1')?.amountInCart).toEqual(0);
    expect(productsService.products.value?.find((product) => product.id === '1')?.availableAmount).toEqual(10);
  });
});