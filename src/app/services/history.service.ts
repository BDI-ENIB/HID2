import { Injectable } from '@angular/core';

@Injectable()
export class HistoryService {

  static file:any = null;
  static dumped:boolean =false;
  constructor() {
      if(typeof localStorage["history"] == "undefined") localStorage["history"] = "";
  }
  commandBusReciever(com){
      localStorage["history"] += "<"+(new Date()).toLocaleTimeString()+"> "+JSON.stringify(com)+"\r\n";
      HistoryService.dumped = false;
  }
  dump() {
    HistoryService.dumped = true;
    var data = new Blob([localStorage["history"]], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (HistoryService.file !== null) {
      window.URL.revokeObjectURL(HistoryService.file);
    }

    HistoryService.file = window.URL.createObjectURL(data);

    var a = document.createElement("a");
    a.href = HistoryService.file;
    a.download = "history"+(new Date()).getTime().toString();
    a.click();
    document.body.appendChild(a);
    setTimeout(function() {
        document.body.removeChild(a);
    }, 0); 
  };
  reset(){
      localStorage["history"] = "";
  }
  isDumped(){
      return HistoryService.dumped;
  }
}
