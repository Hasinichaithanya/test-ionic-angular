import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { TPosition } from 'src/interfaces/toast-position';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  constructor(private toastController: ToastController) { }

  async presentToast(position: TPosition, message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1200,
      position: position,
      color
    });

    await toast.present();
  }
}
