import { Injectable } from '@angular/core';
import alanBtn from "@alan-ai/alan-sdk-web";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlanService {
  private alanBtnInstance;
  private commandSubject = new Subject<any>();

  constructor() {
    this.alanBtnInstance = alanBtn({
      key: 'd87556a8fdabd79bc686f506c0d4402c2e956eca572e1d8b807a3e2338fdd0dc/stage', 
      onCommand: (commandData) => {
        this.handleCommand(commandData);
      },
    });
  }

  private handleCommand(commandData: any) {
    // if (commandData.command === 'openURL') {
    //   // Handle the command, e.g., navigate to a URL
    //   // console.info('openURL', commandData.url);
    //   // You can emit an event or perform an action here
    // }
    // // Handle other commands as needed

    // Emit the command data through the subject
    this.commandSubject.next(commandData);
  }

  public getCommandObservable() {
    return this.commandSubject.asObservable();
  }
}
