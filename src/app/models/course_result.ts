

export class CourseResultData {
    id!:number;
    rating!:number;
    original_amount!:number;
    offer_amount!:number;
    difference!:number;
    title!:string;
    banner!:string;
    course_time!:string;
    percentage!:string;
    enrolled!:string;
    premium!:boolean;
    
}

export class CourseResult {
    course_type_id!:number;
    course_type!:string;
    courses!:Array<CourseResultData>;
    
}

