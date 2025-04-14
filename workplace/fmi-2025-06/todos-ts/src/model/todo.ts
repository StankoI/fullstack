import { IdType } from "../common/common-types";

export class Todo {
    id: IdType = '';
    // static nextId = 0;
    // id = ++Todo.nextId;
    static className = 'Todo';
    constructor(
        public text: string,
        public status: TodoStatus = TodoStatus.ACTIVE
    ){}
}

export enum TodoStatus {
    ACTIVE = 1, COMPLETED
}