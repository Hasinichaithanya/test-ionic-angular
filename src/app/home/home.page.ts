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
  IonImg,IonIcon
} from '@ionic/angular/standalone';
import { menu } from '../../../mock-data/data';
import { FoodItem } from '../interfaces/food-item.interface';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
    IonCardContent,RouterLink
  ],
})
export class HomePage {
  foodItems: FoodItem[];

  constructor(public cartService: CartService) {
    this.foodItems = menu;
    console.log(this.foodItems);
    addIcons({
      cartOutline,
    });
  }

  addToCart(item: FoodItem){
    let updatedItem = {...item,quantity: 1}
    this.cartService.addToCart(updatedItem)
  }
}
