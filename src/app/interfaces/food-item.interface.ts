export interface FoodItem {
    name: string;
    cost: number;
    description: string;
    image:string;
    id: number
}


export interface FoodCartItem extends FoodItem{
    quantity: number | 1
}