
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CodepageComponent } from './codepage/codepage.component';
import { HistoryComponent } from './history/history.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TaskComponent } from './task/task.component';
import { InterviewComponent } from './interview/interview.component';
import { WeekmeetComponent } from './weekmeet/weekmeet.component';
export const appRoutes: Routes = [

  { path: 'homepage', component: HomePageComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },

  { path: 'history', component: HistoryComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },


  { path: 'task', component: TaskComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },


  { path: 'codepage', component: CodepageComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },

  { path: 'profile', component: ProfilepageComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },

  { path: 'notification', component: NotificationComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },
  
  { path: 'loginPage', component: LoginComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },

  { path: 'mainRoute', component: AppRoutingModule,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },

  { path: 'interview', component: InterviewComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },
  { path: 'weekMeet', component: WeekmeetComponent,
  canActivate:[AuthGuardService], data:{roles:["tutor"]} },
]
