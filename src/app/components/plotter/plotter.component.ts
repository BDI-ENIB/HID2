import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
    @ViewChild('canvas') canvas;
    ctx;
    plot;
    constructor() { }
    lines = [];
    indexes = {};
    st: number = (new Date()).getTime()/1000;
    ngOnInit() {
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.plot = new Chart(this.ctx, {
            type: "scatter",
            data: {
                labels:[0,1,2],
                datasets: this.lines
            },
            options: {
                animation : false
            }
        });
    }
    
    commandBusReciever(com){
        if(com[0] == "addPlotLine"){
            this.indexes[com[1]] = this.lines.length;
            this.lines.push({label:com[2],data:[]});
            if(typeof this.plot !== "undefined")this.plot.update();
        }
        if(com[0] == "addPlotData"){
            if(typeof this.indexes[com[1]] !== "undefined"){
                this.lines[this.indexes[com[1]]]["data"].push({x:((new Date()).getTime()/1000)-this.st,y:com[2]});
                if(typeof this.plot !== "undefined")this.plot.update();
            }
        }
    }

}
