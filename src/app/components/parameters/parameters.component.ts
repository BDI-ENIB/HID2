import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
    
    @Output() logEvent:EventEmitter<any> = new EventEmitter();
    
    params:any=[];
    
    constructor() { }

    ngOnInit() {
    }
    
    onChange(param){
        this.log(">"+((typeof param["label"] !== "undefined")?param["label"]:param["id"])+": "+param["value"]);
    }
    
    log(t){
        this.logEvent.emit(t);
    }
    
    commandBusReciever(com){
        if(com[0] == "addParam"){
            let param = {};
            param["id"] = com[1];
            param["type"] = com[2];
            param["value"] = com[3];
            if(com.length>4)param["label"] = com[4];
            this.params.push(param);
        }
    }
}
