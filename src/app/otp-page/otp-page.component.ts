import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenServiceService } from '../services/token-service.service';
import { ToastrService } from 'ngx-toastr';
import { ResultData } from '../models/common_result';
declare var $: any;

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {
  loading=false;
  resultData!: ResultData;

  url:string='';

  constructor(private http:HttpClient,private tokenService:TokenServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    (<HTMLInputElement>(document.getElementById('toPassword'))).style.display='none';
    (<HTMLInputElement>(document.getElementById('otp_value'))).style.display='none';

  }

sendOtp(){
 var mobile_otp = (<HTMLInputElement>(document.getElementById('mobile_otp'))).value;

var fd = new FormData();
fd.append('mobile',mobile_otp)
fd.append('code',"+91");

if(localStorage.getItem("register")=='true'){

  this.url=`${environment.ip}coding/coding_send_otp/`;
}else if(localStorage.getItem("password")=='true'){
  
  this.url=`${environment.ip}coding/phone_change_otp/`;
}
 if(mobile_otp.length == 10){
 this.loading=true;
this.http.post(this.url,fd).subscribe((data:any) => {
console.log(data);
  this.resultData = data;
  if(this.resultData.result=="success"){
    localStorage.setItem("mobile",mobile_otp);
    this.loading=false;
  
    (<HTMLInputElement>(document.getElementById('sendOtp'))).style.display='none';
    (<HTMLInputElement>(document.getElementById('otp_value'))).style.display='block';
    (<HTMLInputElement>(document.getElementById('resendOtp'))).style.display='block';
    (<HTMLInputElement>(document.getElementById('toPassword'))).style.display='block';


  }else{
    this.loading=false;
    this.toastr.info("", this.resultData.description, { positionClass: "toast-bottom-right" });

  }





})


}else{
  this.toastr.info("", "Invalid phone number ", { positionClass: "toast-bottom-right" });

}

}




resendOtp(){
  var mobile_otp = (<HTMLInputElement>(document.getElementById('mobile_otp'))).value;





var fd = new FormData();
fd.append('mobile',mobile_otp)
fd.append('code',"+91");
if(localStorage.getItem("register")=='true'){
  this.url=`${environment.ip}coding/coding_send_otp/`;
}else if(localStorage.getItem("password")=='true'){
  this.url=`${environment.ip}coding/phone_change_otp/`;

}if(mobile_otp.length == 10){
this.loading=true;
this.toastr.info("", "Requesting to resend otp", { positionClass: "toast-bottom-right" });

this.http.post(this.url,fd).subscribe((data:any) => {
console.log(data);
this.resultData = data;
if(this.resultData.result=="success"){
  localStorage.setItem("mobile",mobile_otp);
  this.loading=false;




}else{
  this.loading=false;
  this.toastr.info("", this.resultData.description, { positionClass: "toast-bottom-right" });

}





})
}else{
this.toastr.info("", "Invalid phone number ", { positionClass: "toast-bottom-right" });

}

}

saveOtp(){
  var otp_value = (<HTMLInputElement>(document.getElementById('otp_value'))).value;

  var fd = new FormData();

fd.append('mobile',JSON.parse(localStorage.getItem("mobile")!));
fd.append('code',"+91");
fd.append('otp',otp_value);
if(otp_value.length == 4){
  this.loading=true;
this.http.post(`${environment.ip}coding/coding_validate_otp/`,fd).subscribe((data:any) => {
    this.resultData=data;
  if(this.resultData.result=="success"){
    this.loading=false;
    if(localStorage.getItem("password")=="true"){
      $('#otpPage').hide();
      $('#loginDiv').hide();
      $('#registerDiv').hide();
      $('#passwordDiv').show();
    }else{
      $('#otpPage').hide();
      $('#loginDiv').hide();
      $('#registerDiv').show();
      $('#passwordDiv').hide();
    }

  }else{
    this.loading=false;
    this.toastr.info("", this.resultData.description, { positionClass: "toast-bottom-right" });

  }

})
}else{
  this.toastr.info("", "Invalid Otp", { positionClass: "toast-bottom-right" });

}

}


  ngAfterViewInit(){
    // A $( document ).ready() block.
    $( document ).ready(function() {
      $('#otp_value,#resendOtp,#submitOtp,#toPassword').hide();


    });
  }

}
