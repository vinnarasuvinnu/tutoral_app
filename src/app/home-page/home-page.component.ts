import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CourseResult, CourseResultData } from '../models/course_result';
import { HomeBanners } from '../models/home_banners';
import { ResultData } from '../models/common_result';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  courseResult!:Array<CourseResult>;
  homeBanners!:Array<HomeBanners>;
  homeTask!:ResultData;
  show_spiner=true;


  constructor(private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) { }

  ngOnInit(): void {
    console.log("called **********");
    this.getBanners();
    this.getTask();
this.getCourse();
  }

  getBanners(){

    this.homeService.getHomeBanners().subscribe(data=>
      {
        this.homeBanners=data;
      })
  }
  goToTask() {
    this.router.navigate(['/task']);
  }

  getTask(){

    this.homeService.getHomeTask().subscribe(data=>
      {
        this.homeTask=data;
      })
  }

  getCourse(){
   
    this.homeService.getCourseResults().subscribe(data=>
      {

        this.courseResult=data;
        if(this.courseResult.length==0){
          this.show_spiner=false;
        }else{
          this.show_spiner=false;
        }
  });
  }


}
