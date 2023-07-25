import * as googleTTS from 'google-tts-api';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor() { }

  getAudioUrl(text:string){
    const url = googleTTS.getAudioUrl(text, {
      lang: 'de',
      slow: false,
      host: 'https://translate.google.com',
    });
    // console.log(url);
    return url
  }
  getAudioBase64(text:string){
    googleTTS
    .getAudioBase64(text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    })
    .then(console.log) // base64 text
    .catch(console.error);
  }
  getAllAudioBase64(text:string){
    googleTTS
  .getAllAudioBase64(text, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000,
    splitPunct: ',.?',
  })
  .then(console.log)
  // [
  //   { shortText: '...', base64: '...' },
  //   { shortText: '...', base64: '...' },
  //   ...
  // ];
  .catch(console.error);
  }

}
