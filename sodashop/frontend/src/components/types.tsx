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