import { MapService } from './../../services/map.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
// import { GlobalService } from 'src/app/core/services/global.service';
// import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  	map: any;
	mapMarker: any;
	markericon: any;
  	mainBranch
	zoom = 16;
	lat = 32.6548766;
	lng = 51.6647008;
	center: number[];
	title:string=''

	// contactTitle:string=''
	// socialTitle:string=''
	// socialLlist:Array<any>
	// contactLlist:Array<any>
	address!:string
	mobile!:string
	youtube!:string
	whatsapp!:string
	twitter!:string
	instagram!:string
	facebook!:string
	email!:string
	sotial!:Array<[string,string,string]>
  constructor(
    public mapService: MapService,
    private global: GlobalService,

  ) { }

  ngOnInit() {
    this.global.httpGet('support/contact-us').subscribe(
      async (res:any) => {
        console.log(res);
		// this.contactLlist=res.contact.items
		// this.contactTitle=res.contact.title
		// console.log(res.social.items);
		// this.socialLlist=res.social.items
		// this.socialTitle=res.social.title
		this.address=res.data.address
		this.email=res.data.email
		this.youtube=res.data.youtube
		this.whatsapp=res.data.whatsapp
		this.twitter=res.data.twitter
		this.instagram=res.data.instagram
		this.facebook=res.data.facebook
		this.sotial=[['mail','ایمیل',this.email],['logo-whatsapp','واتساپ',this.whatsapp],['logo-twitter','تویتر',this.twitter],['logo-instagram','اینستاگرام',this.instagram],['logo-facebook','فیسبوک',this.facebook]]
		this.lat = parseFloat(res.data.lat);
		this.lng = parseFloat(res.data.lng);
		// this.title = res.location.title;
		// this.center = [this.lat, this.lng];

		// this.map.panTo([this.lat, this.lng]);
		// this.mapMarker.setLatLng([this.lat, this.lng]);

		if (this.mapService.L) {

			this.setupMap();
		}
      },
      async (error:any) => {
        console.log(error);
      }
    )
  }

  onMapReady(map: any) {
		setTimeout(() => {
			map.invalidateSize();
		}, 500);
	}

	private async setupMap() {
		// console.log(this.map);
		if (!this.map) {
			// console.log(this.map,"true");
			this.map = this.mapService.L.map('map', { scrollWheelZoom: 'center' }).setView([this.lat, this.lng], this.zoom);
			this.mapService.L.tileLayer(
				'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
				{
					maxZoom: 19,
					attribution: 'AtriaTech - َAtriaShop',
					subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],

				}
			).addTo(this.map);

			this.markericon = this.mapService.L.icon({
				iconSize: [50, 50],
				iconAnchor: [25, 30],
				// popupAnchor: [0, 0],
				iconUrl: '/assets/icon/location-marker@2x.png',
			

			});
			this.mapMarker = this.mapService.L.marker([this.lat, this.lng], { icon: this.markericon ,  title:this.title, } ).addTo(this.map);

			this.map.on('load', this.onMapReady(this.map));
			// console.log(this.map,"true");

		}

  //   this.map = leaflet.map('map', {
  //     center: [51.505, -0.09],
  //     zoom: 13
  // });

	}

}
