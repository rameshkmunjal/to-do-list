import { Component, OnInit } from '@angular/core';
import {UserService} from './../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public password:string;
  public errorMessage:string;

  constructor(
    private UserService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  public loginFunction():any{
    if(!this.email){
      this.errorMessage="Email not entered";
    }else if(!this.password){
      this.errorMessage="Password not entered";
    }else{
      let data={
        email:this.email,
        password:this.password
      }
      this.UserService.loginFunction(data).subscribe(
        apiResponse=>{
          this.errorMessage="";
          console.log(apiResponse);
          let data={
            authToken:apiResponse.data.authToken,
            userId:apiResponse.data.userDetails.userId,
            fullName:apiResponse.data.userDetails.firstName+" "+apiResponse.data.userDetails.lastName
          }
          this.UserService.setUserInLocalStorage(data);
          this.router.navigate(['/allTasks']);
        }, (err)=>{
          console.log(err);
        }
      )
    }
  }

}
