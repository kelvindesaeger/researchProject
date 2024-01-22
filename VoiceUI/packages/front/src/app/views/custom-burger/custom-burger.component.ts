import { NgFor, NgClass } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { Router } from '@angular/router';

interface ICustomBurger {
  bun: string | null;
  protein: string | null;
  toppings: string[];
  sause: string | null;
}

@Component({
  selector: 'app-custom-burger',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './custom-burger.component.html',
  styleUrl: './custom-burger.component.scss'
})
export class CustomBurgerComponent {

  constructor(private cartService: CartService, private router: Router) { }
  
    customBurger: ICustomBurger = {
      bun: null,
      protein: null,
      toppings: [],
      sause: null,
    };

    availableToppings: string[] = [
      'Lettuce', 'Tomato', 'Onion', 'Pickles', 'Cheese',
      'Bacon', 'Mushrooms', 'Jalapenos', 'Avocado', 'Fried Egg'
    ];

    toggleTopping(event: Event, topping: string) {
      if(event.target) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
          // Add topping to the array
          this.customBurger.toppings.push(topping);
        } else {
          // Remove topping from the array
          const index = this.customBurger.toppings.indexOf(topping);
          if (index !== -1) {
            this.customBurger.toppings.splice(index, 1);
          }
        }
      }
    }

    addBurgerToCart() {

      const price:number = 10 + (this.customBurger.toppings.length * 0.5);
      let burgerproducts:string = "Bun: " + this.customBurger.bun + ", Protein: " + this.customBurger.protein + ", Toppings: " + this.customBurger.toppings + ", Sause: " + this.customBurger.sause + ".";

      const burger: Product = {
        name: 'Custom Burger',
        description: burgerproducts,
        productType: {
          name: 'Burger',
          description: 'A burger',
        },
        img: 'burger.jpg',
        price: price,
      };

      console.log('Adding burger to cart:', burger);

      this.cartService.addToCart(burger);

      this.router.navigate(['/products']);
    }

    isChecked(topping: string): boolean {
      // Add your logic to determine whether the checkbox should be checked
      return this.customBurger.toppings.includes(topping);
    }  
}
