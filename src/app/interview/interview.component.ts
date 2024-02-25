import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';
import { InterviewModel } from '../models/interview_model';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  show_spiner=true;
  interviewData!:Array<InterviewModel>;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  timer_id:any;
  stop_loop=false;
  timer_set=false;

  currentDate: any;
  targetDate: any;
  cDateMillisecs: any;
  tDateMillisecs: any;
  difference: any;
  // timer_set=false;

  constructor(private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getInterview();
  }

  getInterview(){
    this.homeService.getInterviewResults().subscribe(data=>
      {
        this.show_spiner=true;
        if(this.timer_set==false){
          this.timer_set=true;
          this.timer_id=setInterval(() =>{
            this.myTimer();
          }, 1000);
        }
        this.interviewData=data;
        this.show_spiner=false;
       });
  }
  ngOnDestroy() {
  this.stop_loop=true;
      clearInterval(this.timer_id);
  }

  myTimer() {
    if(this.stop_loop==false){
     for(var i=0;i<this.interviewData.length;i++){
 
    this.currentDate = new Date();
    this.targetDate = new Date(this.interviewData[i].year, this.interviewData[i].month-1,
    this.interviewData[i].day,this.interviewData[i].hour,this.interviewData[i].minutes,this.interviewData[i].seconds);
   
    
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    if(this.cDateMillisecs <this.tDateMillisecs){
      this.timer_id=this.interviewData[i].course_id;
       
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
     
     if (this.hours>0 || this.minutes >0 || this.seconds > 0 || this.days >0){
      this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
     (<HTMLInputElement>(document.getElementById('days'+this.interviewData[i].course_id.toString()))).innerText = this.days;
    (<HTMLInputElement>(document.getElementById('hours'+this.interviewData[i].course_id.toString()))).innerText = this.hours;
    (<HTMLInputElement>(document.getElementById('mins'+this.interviewData[i].course_id.toString()))).innerText = this.minutes;
    (<HTMLInputElement>(document.getElementById('seconds'+this.interviewData[i].course_id.toString()))).innerText = this.seconds; 
    if (this.hours<=0 || this.minutes <=0 || this.days <= 0 || this.seconds<=0){
      (<HTMLInputElement>(document.getElementById('getin'+this.interviewData[i].course_id.toString()))).style.display = 'none'; 
      (<HTMLInputElement>(document.getElementById('block'+this.interviewData[i].course_id.toString()))).style.display = 'block'; 
    }
    } else{
    (<HTMLInputElement>(document.getElementById('getin'+this.interviewData[i].course_id.toString()))).style.display = 'block'; 
    (<HTMLInputElement>(document.getElementById('block'+this.interviewData[i].course_id.toString()))).style.display = 'none'; 

    (<HTMLInputElement>(document.getElementById('seconds'+this.interviewData[i].course_id.toString()))).innerText = '00'; 
    }
    }else{

    (<HTMLInputElement>(document.getElementById('getin'+this.interviewData[i].course_id.toString()))).style.display = 'block'; 
    (<HTMLInputElement>(document.getElementById('block'+this.interviewData[i].course_id.toString()))).style.display = 'none'; 
     
    (<HTMLInputElement>(document.getElementById('days'+this.interviewData[i].course_id.toString()))).innerText = '00';
    (<HTMLInputElement>(document.getElementById('hours'+this.interviewData[i].course_id.toString()))).innerText = '00';
    (<HTMLInputElement>(document.getElementById('mins'+this.interviewData[i].course_id.toString()))).innerText = '00';
    (<HTMLInputElement>(document.getElementById('seconds'+this.interviewData[i].course_id.toString()))).innerText = '00';
    }
    }
    }
  }   

}
