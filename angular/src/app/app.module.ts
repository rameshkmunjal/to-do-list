//import angular/npm  packages/modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {TaskModule} from './task/task.module';
//import components
import { AppComponent } from './app.component';
import {LoginComponent } from './user/login/login.component';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    TaskModule,
    RouterModule.forRoot([
      {path:'login', component:LoginComponent},
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'**', component:LoginComponent}
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
