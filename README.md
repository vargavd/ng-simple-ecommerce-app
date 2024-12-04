# Simple Ąngular v17 Ecommerce Webapp with Unit Tests

> [!CAUTION]
> The products endpoint url has to be set in the `src/app/env.ts` file (format is below)

## Features

- There are 2 pages: Products (homepage) and Cart
- Every other url redirects to Products
- Displays products from an external resource
- Ability to add each products in various amounts
- Handles stock amount and minimum order value
- Cart page displays products added to the cart, plus total amount and total price
- Manages ID duplication
- Responsive UI

## Implementation
- **State management:** `Service` and `BehaviorSubject`
- **UI and Responsivity:** 
  - `PrimeNG` (Component Library)
  - `PrimeIcons` (Icon Library) 
  - `PrimeFlex` (CSS Utility Library)
- **Additional Styles:** `SCSS` with `ViewEncapsulation.Emulated`
- **Tests:** unit tests with `Jasmine` and `Karma`

## `src/app/env.ts` format
```
export const environment = {
  production: false,
  apiUrl: 'https://url-to-products.com'
};

```

> <small>:bulb: This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.</small>
