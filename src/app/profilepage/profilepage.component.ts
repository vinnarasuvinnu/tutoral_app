import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';
import { ProfileModel } from '../models/profile_model';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {


   imagePath!: FileList ;
  imgURL: any;
  public message: string | undefined;
  profileModel!:ProfileModel;
  show_spiner=true;
  name=""
  email=""



  constructor(private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) { }

  ngOnInit(): void {
       this.getProfile()
  }


  getProfile(){
   
    this.homeService.getMyProfile().subscribe(data=>
      {
        this.show_spiner=true;

        this.profileModel=data;
        console.log(data);
        
          this.show_spiner=false;
  });
  
  }
  updateProfile(){


    this.name=(<HTMLInputElement>(document.getElementById('name'))).value;
    this.email = (<HTMLInputElement>(document.getElementById('email'))).value;
    var fd = new FormData();
    fd.append('name',this.name)
    fd.append('email',this.email);
    fd.append('image',!this.imagePath?"":this.imagePath[0]);
    this.show_spiner=true;
   
    this.homeService.postMyProfile(fd).subscribe((data:any)=>
      {
        console.log(data['result']);
        if(data['result']=="success"){
          this.getProfile();

        }else{
          this.show_spiner=false;

          
        }
  });
  
  }

  preview(files: any) {
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
    
    this.profileModel.image="";
  }

}
