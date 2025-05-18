export type IdType = string;
export type Gender = "male" | "female";
export type Role = "user" | "admin";
export type AccountStatus = "active" | "suspended" | "deactivated";

export interface Identifiable{
    id :IdType
}
export interface EntityConstructor<V>{
    new (...args: any): V
    className: string;
}