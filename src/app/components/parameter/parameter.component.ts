import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

    @Input() parameter: any;
    @Output() changeEvent: EventEmitter<any> = new EventEmitter();
    isInt: boolean = false;
    isFloat: boolean = false;
    isBool: boolean = false;
    isPulse: boolean = false;
    
    constructor() {
    }

    ngOnInit() {
        if(typeof this.parameter !== "undefined") {
            if(typeof this.parameter.value == "undefined") this.parameter.value=0;
            if(this.parameter.type == "int")   this.isInt = true;
            if(this.parameter.type == "float") this.isFloat = true;
            if(this.parameter.type == "bool")  this.isBool = true;
            if(this.parameter.type == "pulse") this.isPulse = true;
        }
    }

    doChange() {
        this.changeEvent.emit(this.parameter);
    }
}
