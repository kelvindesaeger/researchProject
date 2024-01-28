import { NgFor, NgClass, ViewportScroller } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../composables/cart.service';
import { Router } from '@angular/router';
import { AlanService } from '../../composables/alan.service';
import alanBtn from '@alan-ai/alan-sdk-web';


//TODO: change interface
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

  // TODO: add alanService
  constructor(
    private cartService: CartService,
    private router: Router,
    private alanService: AlanService, 
    private scroller: ViewportScroller
  ) { }
  
  // TODO listen for alanService commands

  customBurger: ICustomBurger = {
    bun: null,
    protein: null,
    toppings: [],
    sause: null,
  };

  isSauceMessage: boolean = false;

  availableToppings = [
    { name: 'Lettuce', img: 'lettuce.jpg' },
    { name: 'Tomato', img: 'tomato.jpg' },
    { name: 'Onion', img: 'onion.jpg' },
    { name: 'Pickles', img: 'pickles.jpg' },
    { name: 'Cheese', img: 'cheese.jpg' },
    { name: 'Bacon', img: 'bacon.jpg' },
    { name: 'Mushrooms', img: 'mushrooms.jpg' },
    { name: 'Jalapenos', img: 'jalapenos.png' },
    { name: 'Avocado', img: 'avocado.jpg' },
    { name: 'Fried Egg', img: 'fried-egg.jpg' },
  ];

  async ngOnInit(): Promise<void> {
    this.alanService.getCommandObservable().subscribe(commandData => {
      if (commandData.command === 'addBun') {
        if (this.customBurger.bun) {
          this.playVoiceCommand('Replacing ' + this.customBurger.bun + ' with ' + commandData.bun + '.');
          this.customBurger.bun = commandData.bun;
        }
        else {
          console.log('Adding bun:', commandData.bun);
          this.playVoiceCommand('Adding ' + commandData.bun + ' bun.');
          this.customBurger.bun = commandData.bun;
          this.scroller.scrollToAnchor("protein");
          this.playVoiceCommand('What protein would you like? We have beef, pork, chicken, and veggie.');
        }
      }
      if (commandData.command === 'addProtein') {
        if (this.customBurger.protein) {
          this.playVoiceCommand('Replacing ' + this.customBurger.protein + ' with ' + commandData.protein + '.');
          this.customBurger.protein = commandData.protein;
        }
        else if (this.customBurger.bun) {
          this.playVoiceCommand('Adding ' + commandData.protein + ' protein.');
          this.customBurger.protein = commandData.protein;
          this.scroller.scrollToAnchor("toppings");
          this.playVoiceCommand('What toppings would you like? We have lettuce, tomato, onion, pickles, cheese, bacon, mushrooms, jalapenos, avocado, and fried egg.');
          this.playVoiceCommand('You can add multiple');
        }
      }
      if (commandData.command === 'addTopping') {
        if (this.customBurger.protein) {
          console.log('Adding topping:', commandData.topping);
          if (this.customBurger.toppings.includes(commandData.topping.charAt(0).toUpperCase() + commandData.topping.slice(1))) {
            this.playVoiceCommand('Removing ' + commandData.topping + '.');
            const index = this.customBurger.toppings.indexOf(commandData.topping.charAt(0).toUpperCase() + commandData.topping.slice(1));
            if (index !== -1) {
              this.customBurger.toppings.splice(index, 1);
            }
          }
          else {
            this.playVoiceCommand('Adding ' + commandData.topping + '.');
            this.customBurger.toppings.push(commandData.topping.charAt(0).toUpperCase() + commandData.topping.slice(1));
            this.scroller.scrollToAnchor("sauce");
            if (this.isSauceMessage == false) {
              this.playVoiceCommand('What sauce would you like? We have BBQ, Mayonnaise, Cocktail');
              this.playVoiceCommand('Or you can add more toppings if you like.');
              this.isSauceMessage = true;
            }
          }
          console.log('toppings:', this.customBurger.toppings);
        }
      }
      if (commandData.command === 'addSauce') {
        if (this.customBurger.toppings.length != 0) {
          if (this.customBurger.sause) {
            this.playVoiceCommand('Replacing ' + this.customBurger.sause + ' with ' + commandData.sauce + '.');
            this.customBurger.sause = commandData.sauce;
          }
          else if (this.customBurger.protein) {
            this.playVoiceCommand('Adding ' + commandData.sauce + ' sause.');
            this.customBurger.sause = commandData.sauce;
            this.playVoiceCommand('You can complete the burger bay saying "Add burger"');
          }
        }
      }
      if (commandData.command === 'addCustomBurgerToCart') {
        if (this.customBurger.sause && this.customBurger.protein && this.customBurger.bun && this.customBurger.toppings.length != 0) {
          this.playVoiceCommand('Adding burger to cart.');
          this.addBurgerToCart();
        }
      } 
    });
  }

  playVoiceCommand(text: string): void {
    this.alanService.playText(text);
  }

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
