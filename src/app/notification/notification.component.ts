import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from '../services/home-service.service';
import { WindowRefService } from '../services/window-ref.service';
import { NotificationModel, NotificationResult } from '../models/notification_model';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationModel!:NotificationModel;
  dummyResult!:NotificationResult[];
  show_spiner=true;
  null_val:any=null;
  next:any;
  currentRequest=0;
  private request$!: Observable<any>;  
  noCourse=false;
  show_loader=false;


  // listener;

  constructor(private location: Location,private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) {

     }



  ngOnInit(): void {
    this.getData("0");
    this.clearNotification();
  }



  getData(value:any){
    this.getNotification(value).pipe(finalize(() => this.onFinalize()))
    .subscribe((news) => this.render_onScrollDown(news));
  }

  private onFinalize(): void {
    this.request$ = this.null_val;
  }



  render_onScrollDown(data:any) {
    console.log("scrolling");
    this.notificationModel = data;
    console.log(this.notificationModel.results.length);
    
    this.currentRequest=0;
    this.next = this.notificationModel.next;
    console.log(this.next);

     if(data.results.length != 0){

      this.dummyResult = this.dummyResult.concat(this.notificationModel.results);
      this.notificationModel.results=this.dummyResult;
      if(this.dummyResult.length!=0){
        this.show_spiner=false;
      this.show_loader=false;
      } 
    }
    else{
      this.show_loader=false;
      this.show_spiner=false;
      this.noCourse=true;
    }
  }


  


  clearNotification(){
    this.homeService.postClearNotification().subscribe((data:any)=>
      {
        if(data['result']=="success"){
          console.log("cleared"); 
        }
  }); 
  }


  getNotification(val:any): Observable<any>{
    var url = environment.ip +'coding/notification/';
    if (val == "0") {
      this.dummyResult=[];
    }
    else if (val == "1") {
      url = this.next;
    console.log(url);

    }
    

    if (this.request$) {
      return this.request$;
    }
    else {
      this.request$ = this.homeService.getMyNotification(url);
      return this.request$;
    }

  }
  public onScrollDown(): void {
    console.log("scroll working");
    if(this.currentRequest == 0 && this.next != null){
      this.show_loader=true;
      this.currentRequest=1;
        this.getData("1");
    }
  }

  back(){
    this.location.back();
  }
 
}
