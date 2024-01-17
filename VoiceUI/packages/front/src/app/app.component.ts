import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent as Navigation } from './components/navigation/navigation.component';
import { FooterComponent as Footer } from './components/footer/footer.component';
import alanBtn from "@alan-ai/alan-sdk-web";
import { Product } from './interfaces/product.interface';
import { CartService } from './composables/cart.service';
import { AlanService } from './composables/alan.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navigation, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  constructor(private router: Router, private cartService: CartService, private alanService: AlanService){ }

  ngOnInit(): void {
    this.alanService.getCommandObservable().subscribe(commandData => {
      // Handle the command data in this component or service
      console.log('Received command:', commandData);
      if (commandData.command === 'openURL') {
        // Handle the command, e.g., navigate to a URL
        console.info('openURL', commandData.url);
        // You can emit an event or perform an action here
        this.router.navigate([commandData.url]);
      }
    });
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    this.cartService.addToCart(product);
  } 

}
