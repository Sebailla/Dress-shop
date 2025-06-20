
export interface Product {
    id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    gender: Category
}

export interface ProductImage{
    id: number
    url: string
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
type Category = 'men'|'women'|'kid'|'unisex';

export interface CartProducts{
    id: string
    slug: string
    title: string
    price: number
    size: Size
    quantity: number
    image: string
}