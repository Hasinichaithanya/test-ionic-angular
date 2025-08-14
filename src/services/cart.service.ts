import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IFoodCartItem } from '../interfaces/food-item.interface';
import { timeout, Observable, BehaviorSubject, of } from 'rxjs';
import { PREFERENCES_CART_LIST } from 'src/constants/variables';
// import { Storage } from '@capacitor/storage';
import { CapacitorCookies } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems: BehaviorSubject<IFoodCartItem[]> = new BehaviorSubject<
    IFoodCartItem[]
  >([]);
  cartItems$: Observable<IFoodCartItem[]> = this._cartItems.asObservable();

  constructor() {
    this.loadPreferences();
  }

  emitValue(data: IFoodCartItem[]) {
    this._cartItems.next(data);
  }

  async loadPreferences() {
    // await Preferences.remove({ key: 'cartItems' })
    const { value } = await CapacitorCookies.getCookies({
      url: 'http://localhost:8100/',
    });
    console.log(value)
    let list = (value ? JSON.parse(value) : []) as IFoodCartItem[];
    this.emitValue(list);
  }

  async setPreferences() {
    let value = this._cartItems.value;
    await CapacitorCookies.setCookie({
      url: 'http://localhost:8100/',
      key: PREFERENCES_CART_LIST,
      value: JSON.stringify(value),
    });
  }

  async addToCart(item: IFoodCartItem) {
    let list = this._cartItems.getValue();
    // console.log(list)
    let isSameItem = list.find(foodItem => foodItem.id == item.id)
    console.log(isSameItem)
    if (!isSameItem) {
      list.unshift(item);
      this.emitValue(list);
      this.setPreferences();
    }

  }

  async updateCartItemQuantity(id: number, quantity: number) {
    let cartList = this._cartItems.value;

    cartList = cartList.map((item: IFoodCartItem) => {
      if (item.id == id) {
        item.quantity = quantity;
      }
      return item;
    });

    this.emitValue(cartList);
    this.setPreferences();
  }

  async deleteFromCart(id: number) {
    let cartList = this._cartItems.value;
    cartList = cartList.filter((item: IFoodCartItem) => item.id != id);

    this.emitValue(cartList);
    this.setPreferences()
  }
}
