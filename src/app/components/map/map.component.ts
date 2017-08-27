import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @ViewChild('canvas') canvas;
    ctx: CanvasRenderingContext2D;
    bg;

    objects: any = {};
    classes = {Shape:Shape,BigRobot:BigRobot,SmallRobot:SmallRobot}

    constructor() { }

    ngOnInit() {
        let that = this;
        this.bg = new Image();
        this.bg.src = "assets/map.jpg";
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.ctx.globalCompositeOperation = "screen";
        this.ctx.scale(960/3000, 960/3000);
        this.bg.onload = function(){
            that.update();
        }
    }
    
    update(){
        if(typeof this.ctx !== "undefined" && typeof this.bg !== "undefined"){
            this.ctx.clearRect(0,0,3000,2000);
            this.ctx.drawImage(this.bg,0,0,3000,2000);
            for(let object in this.objects) this.objects[object].draw(this.ctx);
        }
    }

    commandBusReciever(com){
        if(com[0] == "addMapObject"){
            this.objects[com[1]] =new (this.classes[com[2]])(com[3],com[4],com[5],[com[6],com[7],com[8]]);
            this.update();
        }
        if(com[0] == "moveMapObject"){
            this.objects[com[1]].x=com[2];
            this.objects[com[1]].y=com[3];
            this.objects[com[1]].r=com[4];
            this.update();
        }
        if(com[0] == "removeMapObject"){
            delete this.objects[com[1]];
            this.update();
        }
    }
}

export class Shape {
    x;
    y;
    r;
    color;
    constructor(x = 0,y = 0,r = 0,color = [125, 125, 125]){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw(ctx){
        this.center(ctx);
        this.drawer(ctx);
        this.uncenter(ctx);
    }
    drawer(ctx){
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
        ctx.fill();
    }
    center(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.r);
    }
    uncenter(ctx){
        ctx.restore();
    }
}

export class BigRobot extends Shape{
    drawer(ctx){
        let inperimeter = 1200;
        let outperimeter = 1500;
        //radii
        let radii = [outperimeter/5, outperimeter/2/Math.PI, inperimeter/2/Math.PI];
        ctx.lineWidth = 10;
        ctx.shadowBlur = 10;
        for(let i=0;i<radii.length;i++){
            ctx.beginPath();
            ctx.arc(0, 0, radii[i], 0, 2 * Math.PI, false);
            ctx.shadowColor = "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+((i+1)/(radii.length+1))+")";
             ctx.strokeStyle = "rgba(255,255,255,"+((i+1)/(radii.length+1))+")";
            ctx.lineWidth = 10 * ((i+1)/(radii.length+1));
            ctx.stroke();
        }
        //robot
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
        ctx.strokeRect(-inperimeter/8, -inperimeter/8, inperimeter/4, inperimeter/4);
        ctx.fillRect(0, -5, inperimeter/8, 10);
    }
}
export class SmallRobot extends Shape{
    drawer(ctx){
        let inperimeter = 700;
        let outperimeter = 900;
        //radii
        let radii = [outperimeter/5, outperimeter/2/Math.PI, inperimeter/2/Math.PI];
        ctx.lineWidth = 10;
        ctx.shadowBlur = 10;
        for(let i=0;i<radii.length;i++){
            ctx.beginPath();
            ctx.arc(0, 0, radii[i], 0, 2 * Math.PI, false);
            ctx.shadowColor = "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+((i+1)/(radii.length+1))+")";
             ctx.strokeStyle = "rgba(255,255,255,"+((i+1)/(radii.length+1))+")";
            ctx.lineWidth = 10 * ((i+1)/(radii.length+1));
            ctx.stroke();
        }
        //robot
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
        ctx.strokeRect(-inperimeter/8, -inperimeter/8, inperimeter/4, inperimeter/4);
        ctx.fillRect(0, -5, inperimeter/8, 10);
    }
}