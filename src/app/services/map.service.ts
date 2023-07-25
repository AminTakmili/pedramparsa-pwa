import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { leaflet } from '../../../../node_modules/leaflet/src/Leaflet.js';
// import { leaflet } from '../../../../node_modules';
// import { map } from "leaflet/src/map/Map"



declare var require: any
@Injectable()
export class MapService {
  public L = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.L = require('leaflet');
      // this.L = leaflet;
    }
  }
}