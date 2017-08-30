import { Injectable } from '@angular/core';

@Injectable()
export class CommandsService {
  static subscribers:any = [];
    
  constructor() { }
  
  subscribe(f){
      CommandsService.subscribers.push(f);
  }
  send(command){
     var ts=command.join("|");+"?" 
  }
  broadcast(command){
      for(let i=0; i<CommandsService.subscribers.length; i++){
          CommandsService.subscribers[i].commandBusReciever(command);
      }
  }
}
