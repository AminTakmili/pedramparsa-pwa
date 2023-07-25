import { Component ,ViewChild } from '@angular/core';
import { FirstSliderAPI } from '../interfaces/IFirstSliderAPI';
import SwiperCore, { Pagination, Swiper, Virtual,EffectFade  } from 'swiper';
import { SwiperComponent } from "swiper/angular";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage   {
  @ViewChild('intro', { static: false }) intro?: SwiperComponent;

  startSliderList: FirstSliderAPI[] = [
    {
      id: 0,
      imgSrc: '/assets/img/Group 7287@2x.png',
      text: 'لـورم ایپســــــــوم متــن ساختگــــــی با تولیـد سادگـــی نامفهــــوم از صنعـــت چـــاپ و با استفاده از طراحان گرافیک است. برای اینکه '

    },
    {
      id: 1,
      imgSrc: '/assets/img/Group 7288@2x.png',
      text: 'لـورم ایپســــــــوم متــن ساختگــــــی با تولیـد سادگـــی نامفهــــوم از صنعـــت چـــاپ و با استفاده از طراحان گرافیک است. برای اینکه '

    },
    {
      id: 2,
      imgSrc: '/assets/img/Group 7289@2x.png',
      text: 'لـورم ایپســــــــوم متــن ساختگــــــی با تولیـد سادگـــی نامفهــــوم از صنعـــت چـــاپ و با استفاده از طراحان گرافیک است. برای اینکه '

    }
  ]

  isEnd:boolean=false


  constructor(private navCtrl: NavController,) {}
  slideNext(){
    if (this.isEnd) {
      this.navCtrl.navigateRoot('/login');
     
    }
    else{
      this.intro.swiperRef.slideNext(300);
      
    

    }
  }

}
