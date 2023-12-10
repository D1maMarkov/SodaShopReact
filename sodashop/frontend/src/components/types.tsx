export  type TypeCartProduct = {
    product: TypeProduct,
    id: number,
    quantity: number,
    price: number
}

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

export type TypeImage = {
    id: number,
    category: string,
    image: string
}