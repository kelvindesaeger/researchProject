import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'shoppingCart';

  getCart(): Product[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(product: Product): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  removeFromCart(product: Product): void {
    let cart = this.getCart() || []; // Handle case where getCart returns null
    console.log('cart', cart);
    console.log('product', product);
    const newCart = cart.filter((item) => item.name !== product.name);
  
    // Ensure immutability, create a new array only if the cart changes
    if (newCart.length !== cart.length) {
      localStorage.setItem(this.cartKey, JSON.stringify(newCart));
    }
  }

  // Add more methods for removing items, calculating total, clearing cart, etc.
}
