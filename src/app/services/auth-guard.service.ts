import { Injectable } from '@angular/core';
// import { AuthServiceService } from '../services/auth-service.service';
import { CanActivate} from '@angular/router';
// import { Observable } from 'rxjs';

// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  expectedrole: any;
  constructor() { }
  
  // canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   if(this.authService.isAdmin()){
  //     return true;
  //   } else{
  //   this.router.navigate(['/login']);
  //   return false;
  //   }
  // }
  canActivate(): boolean {
    return true;
    // let expectedRoleArray = route.data.roles;
    // const userDetails = localStorage.getItem('userDetails');
    // let expectedRole: string;
    // for (const index in expectedRoleArray) {
    //     if (userDetails && userDetails === expectedRoleArray[index]) {
    //         expectedRole = expectedRoleArray[index];
    //         this.expectedrole =expectedRole
    //     }

    // }
    // expectedRoleArray = null;
   

    // if (userDetails===expectedRole) {
    //     return true;
    // } else {
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    //     return false;
    // }
}
}
