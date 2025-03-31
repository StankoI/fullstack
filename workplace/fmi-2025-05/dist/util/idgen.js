export class NumberIdGenerator {
    constructor(nextId = 0) {
        this.nextId = nextId;
    }
    getNextId() {
        return ++this.nextId;
    }
}
