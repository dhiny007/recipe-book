import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseInterface } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isLoginMode=true;
  isLoading=false;
  error=null;

  constructor(private authService:AuthService, private router:Router) { }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;
    let authObs:Observable<AuthResponseInterface>;

    if(this.isLoginMode){
      //nothing
      authObs=this.authService.login(email,password);
    }
    else{
      authObs=this.authService.signUp(email,password);
    }

    authObs.subscribe((response)=>{
      console.log(response);
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },
    (errorMessage)=>{
      console.log(errorMessage);
      //this.error='An error occured!';
      this.error=errorMessage;
      this.isLoading=false;
    });
    form.reset();
  }

  ngOnInit(): void {
  }

}
