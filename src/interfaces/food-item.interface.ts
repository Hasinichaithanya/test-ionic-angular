export interface IFoodItem {
    name: string;
    cost: number;
    description: string;
    image: string;
    id: number
}


export interface IFoodCartItem extends IFoodItem {
    quantity: number | 1
}