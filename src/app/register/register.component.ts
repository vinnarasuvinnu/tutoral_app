import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ResultData } from '../models/common_result';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // URL = "assets/images/drop.png";
  public imagePath: any;
  imgURL: any = "assets/images/drop.png";
  public message: string = "";
  resultData!:ResultData;
  loading=false;

  constructor(private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  removeImage() {
    this.imgURL = "assets/images/drop.png";
  }

  preview(files: FileList | any) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  registerUser() {
    var email = (<HTMLInputElement>(document.getElementById('mail'))).value;

    var name = (<HTMLInputElement>(document.getElementById('username_register'))).value;
    var password = (<HTMLInputElement>(document.getElementById('password_register'))).value;
    var confirm_password = (<HTMLInputElement>(document.getElementById('confirm_password'))).value;
    var imgfile = (<HTMLInputElement>(document.getElementById('photo'))).files;
    if (password.length >= 8) {
      if (password == confirm_password) {
        var fd = new FormData();
        if (imgfile) {
          fd.append('image', imgfile[0]);
        }
        fd.append("email",email);
        fd.append('name',name);
        fd.append("password",password);
        fd.append('mobile',JSON.parse(localStorage.getItem("mobile")!));
        this.loading=true;

        this.http.post(`${environment.ip}coding/coding_register/`,fd).subscribe((data:any) => {
          this.resultData = data;
          if(this.resultData.result=="success"){
            this.loading=false;
          this.toastr.success("", "Registration successful", { positionClass: "toast-bottom-right" });

            location.reload();
          }else{
            this.loading=false;
            this.toastr.info("", data['description'], { positionClass: "toast-bottom-right" });

          }
        })
      } else {
        this.toastr.info("", "Password and confirm password did not match", { positionClass: "toast-bottom-right" });

      }
    } else {
      this.toastr.info("", "Password should be above 8 letters", { positionClass: "toast-bottom-right" });

    }
  



  }


}
