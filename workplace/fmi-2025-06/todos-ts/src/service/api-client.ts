import { EntityConstructor, Identifiable, IdType } from "../common/common-types";

export class ApiClient {
    constructor(private baseUrl: string){}

    async findAll<V extends Identifiable>( ctor: EntityConstructor<V>){
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s`) as Promise<V[]>
    }

    async findByID<V extends Identifiable>( ctor: EntityConstructor<V>, id: IdType){
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s/${id}`) as Promise<V[]>
    }

    async create<V extends Identifiable>( ctor: EntityConstructor<V>, entity: Omit<V,"id">){

        return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s`, 
            {
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entity)
            }
        ) as Promise<V>
    }

    async update<V extends Identifiable>( ctor: EntityConstructor<V>, entity: V){

        return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s/${entity.id}`, 
            {
                method: 'PUT', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entity)
            }
        ) as Promise<V>
    }

    async deleteById<V extends Identifiable>( ctor: EntityConstructor<V>, id: IdType){
        return this.fetchData(`${this.baseUrl}/${ctor.className.toLocaleLowerCase()}s/${id}`, 
            {
                method: 'DELETE', 
            }
        ) as Promise<V>
    }


    async fetchData(uri: string, options?: RequestInit){
        const resp = await fetch(uri, options);

        if(resp.status >= 400)
        {
            throw new Error(await resp.text());
        }

        return resp.json();
    }

}


