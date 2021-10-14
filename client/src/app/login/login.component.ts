import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  form: FormGroup;
  showSignup:boolean=false;
  submitted = false;
  loading = false;
  errorMsg='';
  constructor(private router: Router,private fb: FormBuilder,private userservice:UserService) {
  
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }
  show(){
    this.router.navigate((['/inscription']))  }
  
    get f() { return this.form.controls; }

  login(){

    if (this.form.invalid) return;
    const user=new User;
    user.email=this.form.value.username;
    user.password=this.form.value.password;
    this.userservice.SignIn(user).subscribe(
      (data) => {
        const res:any =data;
        localStorage.setItem( "token", res.token);
        this.router.navigate((['/dashboard']))
      },
      (error) => {
      this.errorMsg="Email or password invalide"}
    )
  
   
  }

}
