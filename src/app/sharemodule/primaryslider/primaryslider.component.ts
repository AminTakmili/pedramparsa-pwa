import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-primaryslider',
  templateUrl: './primaryslider.component.html',
  styleUrls: ['./primaryslider.component.scss'],
})
export class PrimarysliderComponent implements OnInit , OnChanges {

  @Input('children') children=[]
  @Input('loading') loading:boolean=true
  isLoading:boolean=true
  childrenArray!:Array<object>
  constructor() { }

  ngOnInit() {
    // console.log(this.children);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(changes.children.currentValue);
    this.isLoading=changes.loading.currentValue
    this.childrenArray=changes.children.currentValue
  }

}
