

export class TaskResult {
    id!:number;
    question!:string;
    solution!:string;
    date!:string;
    
}

export class TaskModel {
    count!:number;
    next!:string;
    previous!:string;
    results!:Array<TaskResult>;
    
}

