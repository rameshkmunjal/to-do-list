import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  public otp:string;
  public errorMessage:string="";

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  public submitOTP():any{
    if(!this.otp){
      this.errorMessage="Enter OTP";
    } else {
      console.log("OTP is : "+ this.otp);
      this.router.navigate(['/forgot-password/reset']);
    }    
  }

}
