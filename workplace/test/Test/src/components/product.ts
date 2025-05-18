
export type IdType = string

export interface Identifiable {
    id: IdType
}

export interface EntityConstructor<V> {
    new(...args: any): V
    className: string;
}

export type Category = "Computers" | "Phones" | "Accessories" | "Software";

export class Product {
    id: IdType;
    name: string;
    info: string;
    price: number;
    category: Category;
    imageUrl: string;
    tags: string[];

    static className = "Product";

    constructor(
        name: string,
        info: string,
        price: number,
        category: Category,
        imageUrl: string,
        tags: string[] = [],
        id: IdType = '') 
        {
        this.id = id;
        this.name = name;
        this.info = info;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }
}
