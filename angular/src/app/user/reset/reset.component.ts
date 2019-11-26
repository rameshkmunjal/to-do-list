import { Component, OnInit } from '@angular/core';
import {UserService} from './../../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public userId:string;
  public email:string;
  public newPassword:string;
  public confirmPassword:string;
  public errorMessage:string;
  public userDetails:any;

  constructor(
    private UserService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.userDetails=this.UserService.getUserFromLocalStorage();
    console.log(this.userDetails);
    this.userId=this.userDetails.userId;
  }

  public resetPassword():any{
    
    if(!this.email){
      this.errorMessage="Enter email address";
    } else if(!this.newPassword){
      this.errorMessage="Enter new password";
    } else if(!this.confirmPassword){
      this.errorMessage="Enter confirm password"
    } else if(this.newPassword !== this.confirmPassword){
      this.errorMessage="New Password does not match with confirm password"
    }else {
      this.errorMessage="";
      console.log("Password will be reset here");
      console.log(this.email);
      console.log(this.newPassword);
      console.log(this.confirmPassword);
      this.UserService.resetPassword(this.userId, this.newPassword).subscribe(
        apiResponse=>{
          console.log(apiResponse);
          this.router.navigate(['/login']);
        }, (err)=>{
          console.log(err);
        }
      )
    }
  }
//---------------------end of class definition------------------------------
}
