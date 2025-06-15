export interface ProductInterface {
    name: string;
    brand: string;
    sizes: string[];
    price: number;
    stock: number;
    description?: string;
    images: string[];
    imageFileIds?: string[];
    category: string;
    style: string;
}