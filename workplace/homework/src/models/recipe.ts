import type { IdType } from "../types/commonType";


export class Recipe{

    id: IdType;
    userId: IdType;
    name: string;
    shortDescription: string;
    timeToBeCooked: number;
    products: string[];
    photo: string;
    longDescription:string;
    tags: string[];
    sharedTime: Date;
    lastEditTime: Date;

    constructor(params:{
        id: IdType;
        userId: IdType;
        name: string;
        shortDescription: string;
        timeToBeCooked: number;
        products: string[];
        photo: string;
        longDescription:string;
        tags: string[];
        sharedTime: Date;
        lastEditTime: Date;
    }){
        const {id, userId, name, shortDescription, timeToBeCooked, products, photo, longDescription, tags,} = params;

        //валидация...

        this.id = id;
        this.userId = userId;
        this.name = name;
        this.shortDescription = shortDescription;
        this.timeToBeCooked = timeToBeCooked;
        this.products = products;
        this.photo = photo;
        this.longDescription = longDescription;
        this.tags = tags;
        this.sharedTime = new Date();
        this.lastEditTime = new Date();
    }

    // updateModified() {
    //     this.lastEditTime = new Date();
    // }
}