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

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
export type Category = 'men'|'women'|'kid'|'unisex';