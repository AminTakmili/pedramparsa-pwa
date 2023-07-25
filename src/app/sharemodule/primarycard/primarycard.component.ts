import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-primarycard',
  templateUrl: './primarycard.component.html',
  styleUrls: ['./primarycard.component.scss'],
})
export class PrimarycardComponent implements OnInit ,OnChanges {
@Input ('item') item={}
@Input ('loading') loading:boolean=true
isLoading:boolean=true
child!:object
  id:number=2
  constructor() { }

  ngOnInit() {
    // console.log(this.item);
    console.clear()
    this.id=1
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.loading.currentValue);
   this.isLoading= changes.loading.currentValue
   this.child=changes.item.currentValue
  //  this.child=changes.item.currentValue
  // console.log(changes.item.currentValue);
  // console.log(this.child);
  console.clear()
  }

}
