import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    var url_string = window.location.href;
    var url = new URL(url_string);

    var push = url.searchParams.get("token_push");
    if (push != null){
      var push_token = localStorage.setItem("token_push",push);

    }
    // else{
    //   alert("no value found");
    // }
  }
  title = 'my_vision_panel';

  get_login_info(){
    // console.log(localStorage.getItem("token_vision"));
    if(localStorage.getItem("token_coding")==null || localStorage.getItem("token_coding")==undefined){
      // console.log("no way");
      return false;
    }
    return true;
  }
}
