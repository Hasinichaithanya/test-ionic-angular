import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  async shareFunction(details: string) {
    await Share.share({
      title: details,
      // files: [item.image],
      // text: item.description,
      dialogTitle: 'Share',
    });
  }
}
