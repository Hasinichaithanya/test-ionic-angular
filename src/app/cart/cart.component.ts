import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IFoodCartItem } from '../../interfaces/food-item.interface';
import { CartService } from '../../services/cart.service';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonCard,
  IonCardContent,
  IonImg,
  IonIcon, IonButtons, IonCardHeader, IonCardTitle
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline, trashOutline } from 'ionicons/icons';
import { BarCodeService } from 'src/services/barcode.service';
import { ClipboardService } from 'src/services/clipboard.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    IonIcon,
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
    IonButtons, IonCardHeader, IonCardTitle
  ],
})
export class CartComponent {
  cartItems!: IFoodCartItem[]

  constructor(public cartService: CartService, private qrService: BarCodeService) {
    this.cartService.cartItems$.subscribe((res) => {
      console.log(res);
      this.cartItems = res;
    })
    addIcons({
      addCircleOutline, removeCircleOutline, trashOutline
    })
  }

  increaseQuantity(item: IFoodCartItem) {
    let newQuantity = item.quantity + 1
    this.cartService.updateCartItemQuantity(item.id, newQuantity)
  }


  decreaseQuantity(item: IFoodCartItem) {
    let newQuantity = item.quantity - 1
    this.cartService.updateCartItemQuantity(item.id, newQuantity)
  }

  deleteItemFromCart(item: IFoodCartItem) {
    this.cartService.deleteFromCart(item.id)
  }

  scanQr() {
    this.qrService.scanCode()
  }


}
