export type IdType = string

export interface Identifiable{
    id :IdType
}

export interface EntityConstructor<V>{
    new (...args: any): V
    className: string;
}