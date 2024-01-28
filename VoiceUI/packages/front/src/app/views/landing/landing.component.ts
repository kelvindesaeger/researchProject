import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { AlanService } from '../../composables/alan.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgFor],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  burgers = [
    { name: 'Bacon Burger', description: 'A classic burger topped with crispy bacon.', img: 'burger.jpg', price: 6.99 },
    { name: 'Cheeseburger Deluxe', description: 'A juicy burger with melted cheese and fresh vegetables.', img: 'burger.jpg', price: 7.49 },
    { name: 'Mushroom Swiss Burger', description: 'A flavorful burger topped with sautéed mushrooms and Swiss cheese.', img: 'burger.jpg', price: 8.29 }
  ];

  constructor(private alanService: AlanService) { }
  
  startVoice(): void {
    console.log('Starting voice');
    this.alanService.activate();
    this.alanService.playText('Welcome to Delicious Burgers! With me you can order burgers, sides, and drinks. You can also make your own custom burger.');
    this.alanService.playText('To navigate say "go to" followed by the name of the page. For example, "go to menu" or "go to home".');
    this.alanService.playText('To order a burger, say "add" followed by the name of the burger. For example, "add bacon burger".');
    this.alanService.playText('If you need more information say "help".');
  }
}
