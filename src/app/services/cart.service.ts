import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { FoodCartItem } from '../interfaces/food-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: FoodCartItem[];

  // private _cartItems: BehaviouralSubject<FoodCartItem> = new BehaviouralSubject<FoodCartItem>([])
  // cartItems$: Observable<FoodCartItem> = this._cartItems.asObservable()

  constructor() {
    this.cartItems = [];
    this.loadPreferences();
  }

  async loadPreferences() {
    const { value } = await Preferences.get({ key: 'cartItems' });
    this.cartItems = (value ? JSON.parse(value) : []) as FoodCartItem[];
    console.log(this.cartItems);
  }

  async setPreferences() {
    await Preferences.set({
      key: 'cartItems',
      value: JSON.stringify(this.cartItems),
    });
  }

  async addToCart(item: FoodCartItem) {
    this.cartItems.push(item);
    // this._cartItems.next({...this.cartItems$,item})
    // this.
    this.setPreferences();
    console.log(this.cartItems);
  }

  async updateCartItemQuantity(id: number, quantity: number) {
    // let updatedList: FoodCartItem[] =
    this.cartItems.map((item) => {
      if (item.id == id) {
        item.quantity = quantity;
      }
    });
    // this.cartItems = updatedList
    this.setPreferences();
  }

  async deleteFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id != id);
  }
}
