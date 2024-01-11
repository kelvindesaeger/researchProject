import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent as Navigation } from './components/navigation/navigation.component';
import { FooterComponent as Footer } from './components/footer/footer.component';
import alanBtn from "@alan-ai/alan-sdk-web";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navigation, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  // alanBtnInstance;


  constructor(private router: Router){
    // this.alanBtnInstance = alanBtn({
    //   key: 'd87556a8fa3e2338fdd0dc/stage',
    //   onCommand: (commandData) => {
    //     //@ts-ignore
    //     if (commandData.command === 'openURL') {
    //       // Call the client code that will react to the received command
    //       // @ts-ignore
    //       this.alanBtnInstance.playText("Opening " + commandData.url);
    //       console.info('openURL');
    //       //@ts-ignore
    //       this.router.navigate([commandData.url]);
    //     }
    //   },
    // });
  }
}
