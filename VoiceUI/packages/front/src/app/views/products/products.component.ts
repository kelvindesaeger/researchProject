import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Product as ProductInterface } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { ProductsService } from '../../graphql/products.service';
import { AlanService } from '../../composables/alan.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  private toastr = inject(ToastrService);

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private alanService: AlanService,
    private scroller: ViewportScroller,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    // Get the products from the GraphQL API
    await this.refreshProducts();

    // Listen to commands from Alan
    this.alanService.getCommandObservable().subscribe(commandData => {
      // Handle the command data in this component or service
      console.log('Received command:', commandData);
      if (commandData.command === 'addProduct') {
        console.log('Adding product:', commandData.product);
        console.log('Quantity:', commandData.quantity);
        this.addToCart(commandData.product, commandData.quantity);
      }
      if (commandData.command === 'scrollToSection') {
        console.log('Scrolling to section:', commandData.section);
        if (commandData.section === 'burgers') {
          this.scroller.scrollToAnchor("burgers");
        }
        if (commandData.section === 'sides') {
          this.scroller.scrollToAnchor("sides");
        }
        if (commandData.section === 'drinks') {
          this.scroller.scrollToAnchor("drinks");
        }
      }
      if (commandData.command === 'makeCustomBurger') {
        console.log('Routing to custom burger page');
        this.makeCustomBurger();
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

  addToCart(product: ProductInterface, quantity: number): void {
    // Add the product to the cart
    for (let i = 0; i < quantity; i++) {
      console.log('Adding to cart:', product.name);
      this.cartService.addToCart(product);
      this.toastr.success('Added ' + product.name + ' to cart', 'Success!');
    }
  }

  makeCustomBurger(): void {
    console.log('Routing to custom burger page');
    this.router.navigate(['/customBurger']);
  }

  
}
