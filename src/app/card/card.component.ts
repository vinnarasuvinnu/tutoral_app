import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseResult, CourseResultData } from '../models/course_result';
import { TokenServiceService } from '../services/token-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  @Input()
  items!: Array<CourseResultData>;


  constructor(private router:Router,private tokenSerivce:TokenServiceService) {
    
  }
  ngOnInit(): void {
  }
  goToCodePage( courseResult:CourseResultData) {
    localStorage.removeItem("model");

    localStorage.setItem('model', JSON.stringify(courseResult));
    // let data = localStorage.getItem("model");

    // console.log( JSON.parse(data|| '{}'));
    // courseResult= JSON.parse(data|| '{}');

    this.router.navigateByUrl('/codepage',{state:courseResult});
  }

}
