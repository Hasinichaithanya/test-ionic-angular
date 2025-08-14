import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonIcon,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { menu } from '../../../mock-data/data';
import { IFoodCartItem, IFoodItem } from '../../interfaces/food-item.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  shareSocialOutline,
  clipboardOutline,
  arrowRedoOutline,
} from 'ionicons/icons';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/services/toast.service';
import { BarCodeService } from 'src/services/barcode.service';
import { NetworkService } from 'src/services/network.service';
import { ClipboardService } from 'src/services/clipboard.service';
import { ShareService } from 'src/services/share.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonHeader,
    IonLoading,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    IonText,
    IonButton,
    IonCard,
    IonImg,
    IonCardContent,
    RouterLink,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class HomePage {
  foodItems: IFoodItem[] = [];
  cartList!: IFoodCartItem[];
  isLoading: boolean = true;
  restaurantName: string = '';
  errorMessage: string = '';

  constructor(
    public cartService: CartService,
    public toastService: ToastService,
    private qrScanner: BarCodeService,
    private clipBoardService: ClipboardService,
    private networkService: NetworkService,
    private shareService: ShareService
  ) {
    addIcons({
      cartOutline,
      shareSocialOutline,
      clipboardOutline,
      arrowRedoOutline,
    });

    this.startScanning();
  }

  async startScanning() {
    let connectionStatus = await this.networkService.logCurrentNetworkStatus();
    console.log(this.isLoading);
    if (connectionStatus.connected) {
      //break

      this.qrScanner
        .scanCode()
        .then((response) => {
          this.restaurantName = response;
          if (this.restaurantName == 'restaurant') {
            //break
            this.foodItems = menu;
            this.isLoading = false;
            console.log(this.isLoading);
            this.cartService.cartItems$.subscribe((res) => {
              this.cartList = res;
              this.isLoading = false;
              this.errorMessage = '';
            });
            //break
          }
        })
        .catch((err) => {
          this.errorMessage = 'Please scan to continue!';
          this.isLoading = false;
          console.log(this.isLoading);
        });

      //break
    } else {
      this.errorMessage = 'Please connect to the internet!';
      this.isLoading = false;
    }
  }

  addToCart(item: IFoodItem) {
    let updatedItem = { ...item, quantity: 1 };
    this.cartService.addToCart(updatedItem);
    this.toastService.presentToast('top', 'Item added to cart', 'success');
  }

  async startSharing(item: IFoodItem) {
    await this.shareService.shareFunction(
      `Title: ${item.name}\nDescription: ${item.description}\nPrice:${item.cost}`
    );
  }

  async writeToClipboard(item: IFoodItem) {
    await this.clipBoardService.writeToClipboard(item);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      this.foodItems = this.foodItems.concat(menu);
      console.log(this.foodItems);
      event.target.complete();
    }, 500);
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.foodItems = menu;
      event.target.complete();
    }, 2000);
  }
}
