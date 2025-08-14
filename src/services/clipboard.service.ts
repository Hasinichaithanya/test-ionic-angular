import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { IFoodItem } from 'src/interfaces/food-item.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private toastService: ToastService) { }

  writeToClipboard = async (content: IFoodItem) => {
    Clipboard.write({
      string: `Title: ${content.name}\nDescription: ${content.description}\nPrice:${content.cost}`,
    }).then((response: any) => {
      console.log(response);
      this.toastService.presentToast('bottom', 'Details copied to clipboard', 'success')
    });
  };

  checkClipboard = async () => {
    const { type, value } = await Clipboard.read();
    console.log(`Got ${type} from clipboard: ${value}`);
  };
}
