import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { CommandsService } from '../../services/commands.service';

@Component({
  selector: 'app-automatic-page',
  templateUrl: './automatic-page.component.html',
  styleUrls: ['./automatic-page.component.css']
})
export class AutomaticPageComponent implements OnInit {

    @ViewChild('logger') logger;
    @ViewChild('map') map;
    @ViewChild('plotter') plotter;
    @ViewChild('parameters') parameters;

    constructor(private history:HistoryService,private commandsService:CommandsService) { }

    ngOnInit() {
        this.commandsService.broadcast(["addParam","side","bool",0,"is blue"]);
        this.commandsService.broadcast(["addPlotLine","ts","target speed"]);
        this.commandsService.broadcast(["addMapObject","me", "BigRobot", 175, 175, 0, 0,0,255]);
        this.commandsService.broadcast(["addMapObject","bro", "SmallRobot", 875+250, 175+250, Math.PI/4, 0,0,255]);
        this.commandsService.broadcast(["addMapObject","big", "BigRobot", 3000-175, 175, Math.PI, 255,255,0]);
        this.commandsService.broadcast(["addMapObject","small", "SmallRobot", 3000-875, 175, Math.PI, 255,255,0]);
        let that = this;
        let i=0;
        let pt = setInterval(function(){
            if(i%10==0)that.commandsService.broadcast(["addPlotData","ts",Math.random()*i/2+i]);
            that.commandsService.broadcast(["moveMapObject","bro", 875+250+Math.cos(i/10)*300, 175+250+Math.sin(i/10)*300, Math.PI/2+i/10]);
            if(Math.cos(i/10)<0.07 && Math.cos(i/10)>-0.07) that.commandsService.broadcast(["log","around the world!"]);
            i++;
            
        },50);
        setTimeout(function(){clearInterval(pt);that.commandsService.broadcast(["log","funny action!"]);},90000);
    }
    log(t){
        this.logger.log(t);
    }
}
