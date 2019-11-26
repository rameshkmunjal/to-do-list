import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserService} from './../user.service';


import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { FormComponent } from './form/form.component';
import { ResetComponent } from './reset/reset.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'sign-up', component:SignUpComponent},
      {path:'forgot-password', component:ForgotPasswordComponent, children:[
        {path:'form', component:FormComponent},
        {path:'otp', component:OtpComponent},
        {path:'reset', component:ResetComponent},
        {path:'', redirectTo:'form', pathMatch:'full'}        
      ]}
    ])
  ],
  declarations: [    
    SignUpComponent, 
    ForgotPasswordComponent, 
    OtpComponent, 
    FormComponent, 
    ResetComponent, 
    NavComponent
  ],
  providers:[UserService]
})
export class UserModule { }
