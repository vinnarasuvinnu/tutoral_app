

export class NotificationResult {
    id!:number;
    title!:string;
    description!:string;
    image!:string;
    
}

export class NotificationModel {
    count!:number;
    next!:string;
    previous!:string;
    results!:Array<NotificationResult>;
    
}

