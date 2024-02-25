import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { WindowRefService } from '../services/window-ref.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from '../services/home-service.service';
import { TaskModel, TaskResult } from '../models/tasks_model';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskModel!:TaskModel;
  dummyResult!:TaskResult[];

  show_spiner=true;
  null_val:any=null;
  next:any;
  currentRequest=0;
  private request$!: Observable<any>;  
  noCourse=false;



  constructor(private clipboard: Clipboard,private router:Router,private homeService:HomeServiceService,private winRef:WindowRefService,
    private modalService: NgbModal,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getData("0");
  }
  

  // getTask(){
   
  //   this.homeService.getTask().subscribe(data=>
  //     {
  //       this.taskModel=data;
  //       console.log(this.taskModel);
  //           if(this.taskModel.results.length==0){
  //                 this.show_spiner=true;
  //           }
  //           else{
  //                 this.show_spiner=false;
  //           }
  // });
  // }

  getData(value:any){
    this.getNotification(value).pipe(finalize(() => this.onFinalize()))
    .subscribe((news) => this.render_onScrollDown(news));
  }
  private onFinalize(): void {
    this.request$ = this.null_val;
  }

  render_onScrollDown(data:any) {
    console.log("scrolling");
    this.taskModel = data;
    console.log(this.taskModel.results.length);
    
    this.currentRequest=0;
    this.next = this.taskModel.next;
    console.log(this.next);

     if(data.results.length != 0){

      this.dummyResult = this.dummyResult.concat(this.taskModel.results);
      this.taskModel.results=this.dummyResult;
      if(this.dummyResult.length!=0){
        this.show_spiner=false;
      } 
    }
    else{
      this.show_spiner=false;
      this.noCourse=true;
    }
  }

  getNotification(val:any): Observable<any>{
    var url = environment.ip +'coding/tasks/';
    if (val == "0") {
      this.dummyResult=[];
    }
    else if (val == "1") {
      url = this.next;
    }
    

    if (this.request$) {
      return this.request$;
    }
    else {
      this.request$ = this.homeService.getTask(url);
      return this.request$;
    }

  }


  public onScrollDown(): void {
    console.log("scroll working");
    if(this.currentRequest == 0 && this.next != null){
      this.show_spiner=true;
      this.currentRequest=1;
        this.getData("1");
    }
  }

  copyText(element: string) {
    this.clipboard.copy(element);
  }
}
