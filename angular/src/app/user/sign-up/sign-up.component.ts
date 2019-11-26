import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public firstName:string;
  public lastName:string;
  public email:string;
  public password:string;
  public mobile:string;
  public errorMessage:string;


  constructor(
    private UserService:UserService
  ) { 
    
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public signupFunction():any{
    if(!this.firstName){
      this.errorMessage="Enter First Name of user"
    } else if(!this.lastName){
      this.errorMessage="Enter last name of user"
    }else if(!this.email){
      this.errorMessage="Enter Email  Address  of user"
    } else if(!this.password){
      this.errorMessage="Enter password of user"
    } else if(!this.mobile){
      this.errorMessage="Enter Mobile Number of user"
    } else {
        let data={
          firstName:this.firstName,
          lastName:this.lastName,
          email:this.email,
          password:this.password,
          mobile:this.mobile
        }
    this.UserService.signupFunction(data).subscribe(
          apiResponse=>{
            this.errorMessage="";
            console.log(apiResponse);
          }, (err)=>{
            console.log(err.error.message);
          }
        )
    }
  }

}
