import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() open;
  opened = false;
  constructor(private history:HistoryService) { }

  ngOnInit() {
      this.opened = false;
  }
  ngOnChanges() {
      this.opened = true;
  }
  dump(){
      this.history.dump();
  }
  clear(){
      if(this.history.isDumped() || confirm("the history has changed since last dump.\nDo you want to proceed?")){
          this.history.reset();
      }
  }
  both(){
      this.dump();
      this.clear();
  }
}
