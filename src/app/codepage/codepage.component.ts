
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FirstVideo } from '../models/first_video';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';
import { Location } from '@angular/common';
import { CourseResultData } from '../models/course_result';
import { AboutCourse } from '../models/about_course';
import { CourseDoubts } from '../models/doubts';
import { Certificate } from '../models/certificate';
import { RazorpayResult } from '../models/razorpay_model';

@Component({
  selector: 'app-codepage',
  templateUrl: './codepage.component.html',
  styleUrls: ['./codepage.component.css']
})


export class CodepageComponent implements OnInit {
  
  
  show_loader=false;
 is_subscribe!:false;
  videoList!:Array<FirstVideo>;
  firstVideo!:FirstVideo;
  show_spiner=true;
  courseResultData!:CourseResultData;
  aboutCourse!:AboutCourse;
  certificate!:Certificate;
  courseDoubts!:Array<CourseDoubts>;
 razorpayResult!:RazorpayResult;

// question="";

@ViewChild('question') question: any; // accessing the reference element

  constructor(private location:Location,private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService,private activatedRoute: ActivatedRoute) {
    // console.log(this.router.getCurrentNavigation().extras.state);
     }

  ngOnInit(): void {
    let data = localStorage.getItem("model");
    this.courseResultData= JSON.parse(data|| '{}');
    console.log(this.courseResultData);
    this.getFirstVideo();
    this.getVideosList();
    this.getAboutCourse();
    this.getCourseDoubts();
    this.getCertificate();
    this.getSubscriptionData();
    this.checkPayment();
  }

  getFirstVideo(){
   
    this.homeService.getFirstVideo( this.courseResultData.id).subscribe(data=>
      {
        this.show_spiner=true;
        this.firstVideo=data;
          this.show_spiner=false;
  });
  }

  
  getVideosList(){
   
    this.homeService.getVideoList( this.courseResultData.id).subscribe(data=>
      {
        // this.show_spiner=true;
        this.videoList=data;
          // this.show_spiner=false;
      });
  }

  getAboutCourse(){
   
    this.homeService.getAboutCourse( this.courseResultData.id).subscribe(data=>
      {
        // this.show_spiner=true;
        this.aboutCourse=data;
          // this.show_spiner=false;
      });
  }

  getCourseDoubts(){
   
    this.homeService.getCourseDoubts( this.courseResultData.id).subscribe(data=>
      {
        // this.show_spiner=true;
        this.courseDoubts=data;
          // this.show_spiner=false;
      });
  }

  getCertificate(){
   
    this.homeService.getCertificate( this.courseResultData.id).subscribe(data=>
      {
        // this.show_spiner=true;
        this.certificate=data;
          // this.show_spiner=false;
      });
  }

  claimCertificate(type:number){

    var fd = new FormData();
    fd.append('cert_type',type.toString());
   
    this.homeService.postClaimCertificate(fd,this.courseResultData.id).subscribe((data:any)=>
      {
        this.show_spiner=true;
        if(data['result']=="success"){
          this.getCertificate();
        }
          this.show_spiner=false;
  });
  
  }
  sendDoubts(){
    var question = (<HTMLInputElement>(document.getElementById('question'))).value;
if(!question){
 this.toastr.show("jfbbfh");
}else{
    var fd = new FormData();
    fd.append('question',question);
   
    this.homeService.postDoubts(fd,this.courseResultData.id).subscribe((data:any)=>
      {
        this.show_spiner=true;
        if(data['result']=="success"){
          this.getCourseDoubts();
        }
          this.show_spiner=false;
  }); 
  }
  this.question.nativeElement.value = '';


}


async changeVideo(index:number){
  
this.show_spiner=true;
 setTimeout(() => { 
 this.firstVideo=this.videoList[index];
 this.show_spiner=false;
}, 500); // 2500 is millisecond


}
//razorpay
checkPayment(){
  this.homeService.getSubscribeResult(this.courseResultData.id).subscribe((data:any)=>{
    this.is_subscribe=data['description'];
})
}

getSubscriptionData(){

  this.homeService.getSubscription(this.courseResultData.id).subscribe(data=>
    {
      this.razorpayResult=data;
      });
}


goToSubscription(){
    this.show_loader=true;
   var fd= new FormData();
  //  var amount=this.razorpayResult.amount.toString();
   fd.append('course_id',this.courseResultData.id.toString());
  this.homeService.getOrderKey(fd).subscribe(
  (data:any)=>{
    
    if(data['result']=='success'){
     this.modalService.dismissAll();
      this.show_loader=false;
      this.payWithRazor(data['description']);
       
    }else{
      this.toastr.info("", data['description'], { positionClass: "toast-bottom-right" });

    }
      }
    )

  }

payWithRazor(id:any) {
   
  const options: any = {
    key:this.razorpayResult.key,
    amount: this.razorpayResult.amount,
    currency: this.razorpayResult.currency,
    name: 'Winstoot Coding',
    mail:this.razorpayResult.email, 
    description: '',   
    order_id: id,
   
    prefill: {email: this.razorpayResult.email,
      contact: this.razorpayResult.phone},

    notify: {
      sms: true,
      email: true
    }, 
    handler: function (response:any){


     alert('payment successs');
     location.reload();
   }, 
    modal: {
      
      escape: false,
    },
    notes: {
     
    },
    theme: {
    }
  };  

  options.modal.ondismiss = (() => {
    alert('transuction cancles');
   
     
  });
  const rzp = new this.winRef.nativeWindow.Razorpay(options);
  rzp.open();

  rzp.on("payment.failed", (response: any) => {
    alert('payment failed');
     
     
    });

    
}


}
