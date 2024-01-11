import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

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
  
}
