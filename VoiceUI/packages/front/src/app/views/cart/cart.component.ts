import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { NgFor } from '@angular/common';
import { AlanService } from '../../composables/alan.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  total = 0;

  constructor(private cartService: CartService, private alanService: AlanService) {}

  ngOnInit(): void {
    // fill cart
    this.cart = this.cartService.getCart();

    // calculate total
    if (this.cart.length > 0) {
      this.cart.forEach(product => {
        if (product.price)
          this.total += product.price;
      });
    }

    // listen to alan commands
    this.alanService.getCommandObservable().subscribe(commandData => {
      if (commandData.command === 'clearCart') {
        this.clearCart();
      }
      if (commandData.command === 'removeFromCart') {
        console.log('commandData', commandData.product);
        this.removeFromCart(commandData.product);
      }
      if (commandData.command === 'checkout') {
        if (this.cart.length > 0) {
          const names = this.cart.map(product => product.name+', ');
          this.alanService.playText('Your order has been placed. Your total is $' + this.total.toFixed(2) + '. You ordered ' + names);
          this.clearCart();
          this.total = 0;
        } else {
          this.alanService.playText('Your cart is empty. Please add items to your cart before checking out.');
        }
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCart();
  }
}
