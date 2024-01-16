import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    this.cartService.addToCart(product);
  }

  burgers = [
    {id: "1", name: 'Bacon Burger', description: 'A classic burger topped with crispy bacon.', img: 'burger.jpg', price: 6.99 },
    {id: "2", name: 'Cheeseburger Deluxe', description: 'A juicy burger with melted cheese and fresh vegetables.', img: 'burger.jpg', price: 7.49 },
    {id: "3", name: 'Mushroom Swiss Burger', description: 'A flavorful burger topped with sautéed mushrooms and Swiss cheese.', img: 'burger.jpg', price: 8.29 },
    {id: "4", name: 'Spicy Jalapeño Burger', description: 'A fiery burger with jalapeño slices and spicy mayo.', img: 'burger.jpg', price: 7.99 },
    {id: "5", name: 'BBQ Ranch Burger', description: 'A tangy burger with BBQ sauce, crispy onion rings, and ranch dressing.', img: 'burger.jpg', price: 8.49 }
  ];
  
  sides = [
    {id: "6", name: 'French Fries', description: 'Crispy golden fries seasoned to perfection.', img: 'fries.jpg', price: 2.99 },
    {id: "7", name: 'Onion Rings', description: 'Crunchy battered onion rings with a savory flavor.', img: 'onionRings.jpg', price: 3.49 }
  ];
  

  drinks = [
    {id: "8", name: 'Cola', description: 'Classic cola flavor with a hint of vanilla.', img: 'cola.jpg', price: 2.49 },
    {id: "9", name: 'Fanta', description: 'Bright and bubbly orange soda.', img: 'fanta.png', price: 2.49 },
    {id: "10", name: 'Sprite', description: 'Refreshing lemon-lime soda.', img: 'sprite.png', price: 2.49 }
  ];
  
}
