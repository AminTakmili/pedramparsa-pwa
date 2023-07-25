import { ModalController } from '@ionic/angular';
// import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-support',
  templateUrl: './add-support.component.html',
  styleUrls: ['./add-support.component.scss'],
})
export class AddSupportComponent implements OnInit {

  addSupportForme:FormGroup
  resData:any
  constructor(
   private fb:FormBuilder,
   private ModalController:ModalController,
   public global:GlobalService
  ) {
    this.addSupportForme=this.fb.group(
      {
        ticket_title:['',Validators.compose([Validators.required])],
        ticket_body:['',Validators.compose([Validators.required])]
      }
    )
   }

  ngOnInit() {}

  submitaddSupportForme(){
    this.addSupportForme.markAllAsTouched();
		this.addSupportForme.controls['ticket_body'].markAsDirty();
		this.addSupportForme.controls['ticket_title'].markAsDirty();
    // console.log(this.addSupportForme.value);
    // console.log(this.addSupportForme.valid);
    // this.global.showLoading()
    if (this.addSupportForme.valid) {
      this.global.httpPost(
        'tickets/send-ticket',
        this.addSupportForme.value
      ).subscribe(
       async (res:any) => {
        //  console.log(res);
         this.resData=res

        // this.global.dismisLoading()
         this.addSupportForme.reset()
         this.dismiss()
       },
       async (error:any) => {
        // this.global.dismisLoading()
         this.global.showError(error)
        //  console.log(error);
       }
      )
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back resData
    this.ModalController.dismiss({
      'dismissed': true,
      resData:this.resData 

    });
  }

}
