import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryService } from '../../services/history.service';

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

    constructor(private history:HistoryService) { }

    ngOnInit() {
        this.commandBusReciever(["addParam","side","bool",0,"is blue"]);
        this.commandBusReciever(["addPlotLine","ts","target speed"]);
        this.commandBusReciever(["addMapObject","me", "BigRobot", 175, 175, 0, 0,0,255]);
        this.commandBusReciever(["addMapObject","bro", "SmallRobot", 875+250, 175+250, Math.PI/4, 0,0,255]);
        this.commandBusReciever(["addMapObject","big", "BigRobot", 3000-175, 175, Math.PI, 255,255,0]);
        this.commandBusReciever(["addMapObject","small", "SmallRobot", 3000-875, 175, Math.PI, 255,255,0]);
        let that = this;
        let i=0;
        let pt = setInterval(function(){
            if(i%10==0)that.commandBusReciever(["addPlotData","ts",Math.random()*i/2+i]);
            that.commandBusReciever(["moveMapObject","bro", 875+250+Math.cos(i/10)*300, 175+250+Math.sin(i/10)*300, Math.PI/2+i/10]);
            if(Math.cos(i/10)<0.07 && Math.cos(i/10)>-0.07) that.commandBusReciever(["log","around the world!"]);
            i++;
            
        },50);
        setTimeout(function(){clearInterval(pt);that.commandBusReciever(["log","funny action!"]);},90000);
    }
    log(t){
        this.logger.log(t);
    }
    commandBusReciever(com){
        this.parameters.commandBusReciever(com);
        this.plotter.commandBusReciever(com);
        this.map.commandBusReciever(com);
        this.logger.commandBusReciever(com);
        this.history.commandBusReciever(com);
    }
}
