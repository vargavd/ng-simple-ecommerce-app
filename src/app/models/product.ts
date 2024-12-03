export class Product {
  constructor(
    public id: string,
    public name: string,
    public img: string,
    public availableAmount: number,
    public minOrderAmount: number,
    public price: number,
    public amountInCart?: number
  ) { }
}
