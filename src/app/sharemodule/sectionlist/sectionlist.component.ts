import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sectionlist',
  templateUrl: './sectionlist.component.html',
  styleUrls: ['./sectionlist.component.scss'],
})
export class SectionlistComponent implements OnInit ,OnChanges {
  @Input('data') data!:object
  @Input('type') type:string='grammar'
  @Input('loading') loading:boolean=true
  id!:number|string
  title!:string
  bookTitle!:string
  children!:Array<object>
  constructor() { }

  ngOnInit() {
    // console.log(this.loading);
    console.clear()
    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log( changes.loading?.currentValue);
    // console.log(changes.data.currentValue);
    // console.log( changes.data.currentValue['children']);
    // console.log( changes.data.currentValue['children'].length);
    this.id=changes.data?.currentValue.id
    this.bookTitle=changes?.data?.currentValue['book_title']
    this.title=changes.data?.currentValue['title']
    changes.data?.currentValue['children']? this.children=changes.data?.currentValue['children']:''
    this.loading= changes.loading?.currentValue
    console.clear()


  }

}
