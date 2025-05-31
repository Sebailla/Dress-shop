export interface Product {
    // id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    size: ValidSize[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidType;
    gender: Category
}

export type ValidSize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidType = 'shirts'|'pants'|'hoodies'|'hats';
export type Category = 'men'|'women'|'kid'|'unisex';