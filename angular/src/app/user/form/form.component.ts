import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public email:string;
  public errorMessage:string;

  constructor(
    private router:Router,
    private UserService:UserService
    ) { }

  ngOnInit() {
  }

  public demandOTP():any{
    if(!this.email){
      this.errorMessage="E-mail field is blank";
    } else {
      console.log("email address is : "+this.email);
      this.UserService.demandOTP(this.email).subscribe(apiResponse=>{
        console.log(apiResponse);
        this.router.navigate(['/forgot-password/otp']);
      },
      (err)=>{
        console.log(err);
      })      
    }    
  }
//--------------------------------class defintion ended------------------------------------
}
