export type TypeProduct = {
    category: number,
    image: string,
    name: string,
    description: string,
    id: number,
    gradient: string,
    blob1: string,
    blob2: string,
    price: number
}

export type TypeCartProduct = TypeProduct & {
    quantity: number
}

export enum OrderState {
    pickUp = "At the pick-up point",
    warehouse = "In the warehouse",
}

export type TypeOrder = {
    date: string,
    id: number,
    price: number,
    products: TypeCartProduct[],
    state: OrderState,
}
