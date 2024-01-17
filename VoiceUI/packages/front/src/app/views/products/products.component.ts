import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Product as ProductInterface } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { ProductsService } from '../../graphql/products.service';
import { AlanService } from '../../composables/alan.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: ProductInterface[] = [];
  burgers: ProductInterface[] = [];
  sides: ProductInterface[] = [];
  drinks: ProductInterface[] = [];

  constructor(private cartService: CartService, private productsService: ProductsService, private alanService: AlanService) {}

  async ngOnInit(): Promise<void> {
    // Get the products from the GraphQL API
    await this.refreshProducts();

    // Listen to commands from Alan
    this.alanService.getCommandObservable().subscribe(commandData => {
      // Handle the command data in this component or service
      console.log('Received command:', commandData);
      if (commandData.command === 'addProduct') {
        console.log('Adding product:', commandData.product);
        this.addToCart(commandData.product);
      }
    });
  }

  async refreshProducts() {
    const result = await this.productsService.getProducts();
    console.log(result);
    
    this.products = result;

    // Now you can filter products based on their type
    this.burgers = this.products.filter(product => product.productType?.name === 'Burger');
    this.sides = this.products.filter(product => product.productType?.name === 'Side');
    this.drinks = this.products.filter(product => product.productType?.name === 'Drink');
    console.log(this.burgers);
  }

  addToCart(product: ProductInterface): void {
    console.log('Adding to cart:', product);
    this.cartService.addToCart(product);
  }
  
}
