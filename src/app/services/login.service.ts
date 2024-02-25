import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenServiceService } from './token-service.service';
let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private tokenSerivce:TokenServiceService) { 
    headers=headers.set("Authorization" , "Token " +this.tokenSerivce.decryptData(localStorage.getItem("token_coding")));

  }

  post_login_token(fd:FormData){
    return this.http.post(environment.ip + 'coding/course/0/update_push_token/',fd,{headers:headers,});

  }
}
