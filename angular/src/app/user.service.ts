import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from'@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string='http://localhost:3000/api/v1/todolist';
  constructor(
    private http:HttpClient
  ) { }
  public setUserInLocalStorage(data){
    localStorage.setItem('userDetails', JSON.stringify(data));
  }

  public getUserFromLocalStorage(){
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  public signupFunction(data):Observable<any>{
    console.log(data);
    let params=new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("email", data.email)
      .set("password", data.password)
      .set("mobile", data.mobile);

      console.log(params);

    return this.http.post(`${this.url}/sign-up`, params)
  }

  public loginFunction(data):Observable<any>{
    let params=new HttpParams()
      .set("email", data.email)
      .set("password", data.password);
    return this.http.post(`${this.url}/login`, params);
  }

  public demandOTP(email):Observable<any>{
      return this.http.get(`${this.url}/demandOTP/${email}`);
    }

    public resetPassword(userId, password):Observable<any>{
      let params=new HttpParams()
        .set('password', password);
      return this.http.post(`${this.url}/resetPassword/${userId}`, params);
    }
  //--------------------end of class definition--------------------------------------
}
