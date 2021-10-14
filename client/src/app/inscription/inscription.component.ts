import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  SignupForm: FormGroup;
  showSignup:boolean=false;
  constructor(private router: Router,private fb: FormBuilder,private userservice:UserService) {
    this.SignupForm = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
    })
   }

  ngOnInit(): void {
  }
  hide(){
    this.showSignup=false;
  }
  signup(){
    console.log('herr')
    console.log(this.SignupForm)
    if (this.SignupForm.invalid) return;
    const user=new User;
    user.email=this.SignupForm.value.email;
    user.password=this.SignupForm.value.password;
    user.name=this.SignupForm.value.name;
 
    this.userservice.SignUp(user).subscribe(
      (data) => {
        const res:any =data;
        console.log(res);
        this.router.navigate((['/login']))
      },
      (error) => console.error
    )  
  }

}
