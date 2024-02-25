import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import { RegisterComponent } from './register/register.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { PasswordComponent } from './password/password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { HistoryComponent } from './history/history.component';
import { TaskComponent } from './task/task.component';
import { CodepageComponent } from './codepage/codepage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { NotificationComponent } from './notification/notification.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { InterviewComponent } from './interview/interview.component';
import { WeekmeetComponent } from './weekmeet/weekmeet.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    RegisterComponent,
    OtpPageComponent,
    PasswordComponent,
    HomePageComponent,
    CardComponent,
    HistoryComponent,
    TaskComponent,
    CodepageComponent,
    ProfilepageComponent,
    NotificationComponent,
    InterviewComponent,
    WeekmeetComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgbModule,
    MatListModule,
    MdbCarouselModule,
    MatMenuModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash: true}),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
