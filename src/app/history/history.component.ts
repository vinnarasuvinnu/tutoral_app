import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CourseResult } from '../models/course_result';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  courseResult!:Array<CourseResult>;
  show_spiner=true;

  constructor(private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCourse();
  }


  getCourse(){
   
    this.homeService.getMyCourse().subscribe(data=>
      {
        this.show_spiner=true;

        this.courseResult=data;
        console.log(this.courseResult.length);
        
          this.show_spiner=false;
    });
  }
}
