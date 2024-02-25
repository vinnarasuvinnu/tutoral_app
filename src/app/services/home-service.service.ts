import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultData } from '../models/common_result';
import { CourseResult, CourseResultData } from '../models/course_result';
import { HomeBanners } from '../models/home_banners';
import { TokenServiceService } from './token-service.service';
import { TaskModel, TaskResult } from '../models/tasks_model';
import { NotificationModel } from '../models/notification_model';
import { ProfileModel } from '../models/profile_model';
import { FirstVideo } from '../models/first_video';
import { AboutCourse } from '../models/about_course';
import { CourseDoubts } from '../models/doubts';
import { Certificate } from '../models/certificate';
import { RazorpayResult } from '../models/razorpay_model';
import { InterviewModel } from '../models/interview_model';
import { WeekMeetModel } from '../models/weemeet_model';

let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http:HttpClient,private tokenSerivce:TokenServiceService) { 
    headers=headers.set("Authorization" , "Token " +this.tokenSerivce.decryptData(localStorage.getItem("token_coding")));
  }


  getCourseResults( ) {
    return this.http.get<Array<CourseResult>>(environment.ip + 'coding/course/0/get_courses/',{headers:headers});
  }
  getInterviewResults( ) {
    return this.http.get<Array<InterviewModel>>(environment.ip + 'coding/course/0/get_interviews/',{headers:headers});
  }
  getWeekMeetResults( ) {
    return this.http.get<Array<WeekMeetModel>>(environment.ip + 'coding/course/0/get_week_meet/',{headers:headers});
  }

  getHomeBanners( ) {
    return this.http.get<Array<HomeBanners>>(environment.ip + 'coding/course/0/get_banners/',{headers:headers});
  }
  getHomeTask( ) {
    return this.http.get<ResultData>(environment.ip + 'coding/course/0/get_home_task/',{headers:headers});
  }
  // ( ) {
  //   return this.http.get<>(environment.ip + 'coding/tasks/',{headers:headers});
  // }
  getMyCourse( ) {
    return this.http.get<Array<CourseResult>>(environment.ip + 'coding/course/0/get_my_courses/',{headers:headers});
  }
  getMyNotification( url:any) {
    return this.http.get<NotificationModel>(url,{headers:headers});
  }
  getTask( url:any) {
    return this.http.get<TaskModel>(url,{headers:headers});
  }

  getMyProfile( ) {
    return this.http.get<ProfileModel>(environment.ip + 'coding/users/0/get_user/',{headers:headers});
  }

  getFirstVideo( id:number) {
    return this.http.get<FirstVideo>(environment.ip + 'coding/videos/'+id+'/get_first_video/',{headers:headers});
  }
  getVideoList(id:number ) {
    return this.http.get<Array<FirstVideo>>(environment.ip + 'coding/videos/'+id+'/get_videos/',{headers:headers});
  }

  getAboutCourse(id:number ) {
    return this.http.get<AboutCourse>(environment.ip + 'coding/course/'+id+'/get_about_course/',{headers:headers});
  }
  getCourseDoubts(id:number ) {
    return this.http.get<Array<CourseDoubts>>(environment.ip + 'coding/course/'+id+'/get_doubts/',{headers:headers});
  }

  getCertificate(id:number ) {
    return this.http.get<Certificate>(environment.ip + 'coding/course/'+id+'/get_certificate/',{headers:headers});
  }


  getSubscription(id:number){
    return this.http.get<RazorpayResult>(environment.ip + 'coding/course/'+id+'/get_razorpay_key/',{headers:headers});
  }
  getOrderKey(fd:FormData){
    return this.http.post(environment.ip + 'coding/register_course/',fd,{headers:headers,});
  }


  getSubscribeResult(id:number){
    return this.http.get(environment.ip + 'coding/course/'+id+'/get_subscription_data/',{headers:headers});
  }

  postMyProfile(fd:FormData) {
    
    return this.http.post(environment.ip + 'coding/users/0/update_user/',fd,{headers:headers});
  }
  postClaimCertificate(fd:FormData,id:number) {
    return this.http.post(environment.ip + 'coding/course/'+id+'/update_certificate/',fd,{headers:headers});
  }
  postDoubts(fd:FormData,id:number) {
    return this.http.post(environment.ip + 'coding/course/'+id+'/update_doubts/',fd,{headers:headers});
  }
  postClearNotification() {
    return this.http.post(environment.ip + 'coding/notification/0/update_notification/',{},{headers:headers});
  }  
}
