import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users:User[]=[];

  constructor(private http : HttpClient) {}

  SignIn(user : User) {
    return this.http.post(`${environment.BaseUrl}/signin`,user);
  }

  SignUp(user : User){
    return this.http.post(`${environment.BaseUrl}/signup`,user);
    
  }


  logout() {
    localStorage.removeItem('token');
  }
}
