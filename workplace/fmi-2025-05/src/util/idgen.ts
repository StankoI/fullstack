export interface IdGenerator<K>{
    getNextId():K;
}

export class NumberIdGenerator implements IdGenerator<number>{
    constructor(private nextId: number = 0){}
    getNextId(): number {
        return ++this.nextId;
    }
    
}