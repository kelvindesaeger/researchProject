import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent as Navigation } from './components/navigation/navigation.component';
import { FooterComponent as Footer } from './components/footer/footer.component';
import alanBtn from "@alan-ai/alan-sdk-web";
import { Product } from './interfaces/product.interface';
import { CartService } from './composables/cart.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navigation, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  alanBtnInstance; 

  constructor(private router: Router, private cartService: CartService){
    this.alanBtnInstance = alanBtn({
      key: '',
      onCommand: (commandData) => {
        //@ts-ignore
        if (commandData.command === 'openURL') {
          // Call the client code that will react to the received command
          // @ts-ignore
          this.alanBtnInstance.playText("Opening " + commandData.url);
          console.info('openURL');
          //@ts-ignore
          this.router.navigate([commandData.url]);
        }
        //@ts-ignore
        if (commandData.command === 'addProduct') {
          // Call the client code that will react to the received command
          //@ts-ignore
          console.log(commandData.product);
          //@ts-ignore
          console.log(commandData.quantity);
          // @ts-ignore
          this.alanBtnInstance.playText("Adding " + commandData.quantity + " " + commandData.product.name + " to cart");

          //TODO: error: this doesn't work for some reason

          //@ts-ignore
          for (let i = 0; i <= commandData.quantity; i++) {
            //@ts-ignore
            this.addToCart(commandData.product);
            //@ts-ignore
            console.log("added " + commandData.product.name + " to cart");
          }

          console.info('addProduct');
        }
      },
    });
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    this.cartService.addToCart(product);
  } 

}
