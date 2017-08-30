import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../../services/commands.service';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

    
    logs: any[] = [];
    
     constructor(private commandsService:CommandsService) {
        commandsService.subscribe(this);
    }

    ngOnInit() {
    }
    
    log(o: any){
        if(typeof o !== "string") o = JSON.stringify(o);
        this.logs.unshift(o);
    }

    commandBusReciever(com){
        if(com[0] == "log"){
            this.log((new Date()).toLocaleTimeString()+">"+com[1]);
        }
    }
}
