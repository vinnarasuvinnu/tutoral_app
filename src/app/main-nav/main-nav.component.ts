import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenServiceService } from '../services/token-service.service';
import { HomeServiceService } from '../services/home-service.service';
import { ProfileModel } from '../models/profile_model';
import { MatSidenav } from '@angular/material/sidenav';

let headers = new HttpHeaders();


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  profile_image="";
  profileModel!:ProfileModel;
  show_spiner=true;
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private observer: BreakpointObserver,private breakpointObserver: BreakpointObserver,private homeService:HomeServiceService,private router:Router,private http:HttpClient,private tokenService:TokenServiceService) {
    this.profile_image = "assets/images/profile.png";
  }
  ngOnInit(): void {
    this.goToHome();
    this.getNotification();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  closeNavbar(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
      } 
    });
  }

  getNotification(){

    this.homeService.getMyProfile().subscribe(data=>
      {
        this.show_spiner=true;
        this.profileModel=data;
        this.show_spiner=false;
      })
  }




  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToHome() {
    this.router.navigate(['/homepage']);
    this.closeNavbar();
  }
  reload() {
    location.reload();
  }

  goToNotification() {
    this.router.navigate(['/notification']);
  }
  goToTask() {
    this.router.navigate(['/task']);
    this.closeNavbar();

  }

  goToInterview() {
    this.router.navigate(['/interview']);
    this.closeNavbar();

  }
  goToWeekMeet() {
    this.router.navigate(['/weekMeet']);
    this.closeNavbar();

  }

  goToHistory() {
    this.router.navigate(['/history']);
    this.closeNavbar();
  }



  logout(){
    let headers = new HttpHeaders();
    headers=headers.set("Authorization" , "Token " +this.tokenService.decryptData(localStorage.getItem("token_vision")));
    this.http.post(`${environment.ip}home/logout/`,{},{headers:headers}).subscribe(() => {
      console.log("Logout Success")
      localStorage.clear();

      // this.router.navigate(['/overview']);
      this.router.navigate(['/loginPage']);

    })
      localStorage.clear();
    this.router.navigate(['/','/loginPage']);


  }


}
