import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { NgFor } from '@angular/common';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }
}
