import { HttpClient } from '@angular/common/http';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ResultData } from '../models/common_result';
import { LoginService } from '../services/login.service';
import { TokenServiceService } from '../services/token-service.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mobileno="";
  password = "";
  resultData!:ResultData;
  loading=false;
  constructor(private http:HttpClient,private tokenService:TokenServiceService,private toastr:ToastrService,private loginService:LoginService) { }

  ngOnInit(): void {
    localStorage.removeItem("register");
    localStorage.removeItem("password");


  }


  login() {
    this.mobileno=(<HTMLInputElement>(document.getElementById('username'))).value;
    this.password = (<HTMLInputElement>(document.getElementById('password'))).value;
    var fd = new FormData();
    fd.append('username',this.mobileno)
    fd.append('password',this.password);
    fd.append('panel',"coding");
    if(this.mobileno!=''&& this.password!=''){
      this.loading=true;
    this.http.post(`${environment.ip}coding/coding_login/`,fd).subscribe((data:any) => {
      
      // console.log(data);
      if(data['result']=="success"){
        localStorage.setItem("token_coding",this.tokenService.encryptData(data['description'].token));
        localStorage.setItem("type",data['description'].type);
        localStorage.setItem("name",data['description'].name);
        localStorage.setItem("mail",data['description'].mail);
        localStorage.setItem("profile",data['description'].profile);
        this.post_token();
      //   this.loading=false;

      //  location.reload();
      }else{

        this.loading=false;

        this.toastr.info("", data['description'].token, { positionClass: "toast-bottom-right" });

      }    
    })
 
  } else{
    if(this.mobileno==''){
      this.toastr.info("", "Please do enter your mobile number", { positionClass: "toast-bottom-right" });

    }else{
      this.toastr.info("", "Please do enter your password", { positionClass: "toast-bottom-right" });

    }
  }

    
  }
  post_token(){

    var token=localStorage.getItem("token_push");

    if(token!=null && token!='' &&token!=undefined){
      var fd=new FormData();
      fd.append('token',token);
      this.loginService.post_login_token(fd).subscribe(
        data=>{
            this.loading=false;

              location.reload();

        }
      )

       
    }else{
      this.loading=false;

      location.reload();

    }

    


  }




  ngAfterViewInit(){
// A $( document ).ready() block.
$( document ).ready(function() {
  $('#registerDiv').hide();
  $('#otpPage').hide();
  $('#passwordDiv').hide();
  // $('#loginDiv').hide();
  $('#toRegister').click(function(){
    localStorage.setItem("register","true");
    localStorage.setItem("password","false");
    $('#loginDiv').hide();
    $('#registerDiv').hide();
    $('#otpPage').show();
    $('#passwordDiv').hide();
    



  })

  $('#toLogin,#toLoginOtp,#toLoginPassword').click(function(){
    $('#loginDiv').show();
    $('#registerDiv').hide();
    $('#otpPage').hide();
    $('#passwordDiv').hide();

    location.reload();


  })

  $('#toForgot').click(function(){
    localStorage.setItem("password","true");
    localStorage.setItem("register","false");
    $('#otpPage').show();
    $('#loginDiv').hide();
    $('#registerDiv').hide();
    $('#passwordDiv').hide();
    


  })







 


});
  }

}
