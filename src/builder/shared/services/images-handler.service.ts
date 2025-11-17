import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesHandlerService {

  constructor() { }

    imageToBase64(img: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    });
  }
}
