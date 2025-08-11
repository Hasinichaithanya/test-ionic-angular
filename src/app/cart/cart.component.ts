import { Component, OnInit } from '@angular/core';
import { FoodCartItem } from '../interfaces/food-item.interface';
import { CartService } from '../services/cart.service';
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
  IonImg,IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [IonIcon,
    IonHeader,
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
  ],
})
export class CartComponent  implements OnInit {
  cartItems: FoodCartItem[];

constructor(public cartService: CartService) {
    this.cartItems = this.cartService.cartItems;
    console.log(this.cartItems)
    // addIcons({
    //   cartOutline,
    // });
  }
  ngOnInit() {}

}
