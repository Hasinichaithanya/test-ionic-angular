import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private toastService: ToastService) {
    Network.addListener('networkStatusChange', status => {
      // console.log(status)
      let color = (status.connected == true ? "success" : "danger")
      let message = (status.connected ? "You are connected to internet" : "You are offline, please check your connection!")
      this.toastService.presentToast('top', message, color)
      console.log('Network status changed', status);
    });
  }

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    // console.log('Network status:', status);
    return status
  };
}
