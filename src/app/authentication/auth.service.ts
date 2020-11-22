import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { throwError,BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseInterface{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthService {
    user=new BehaviorSubject<User>(null);
    private _tokenExpirationTimer:any;

    constructor(private http:HttpClient, private router:Router){}

    signUp(email:string, password:string){
        return this.http.post<AuthResponseInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2wunqnjbivTIkbvvyDMeP6IK4BURJ3U4',{
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(
            catchError(this.handleError),tap(resData => {
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                }
            )
        )
    }

    login(email:string, password:string){
        return this.http.post<AuthResponseInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2wunqnjbivTIkbvvyDMeP6IK4BURJ3U4',{
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(
            catchError(this.handleError), tap(resData =>{
                this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            })
        )
    }

    autoLogin(){
        const userData: {
            email:string,
            localId:string,
            _idToken:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userItem'));

        if(!userData){
            return;
        }

        const loadedUser=new User(userData.email,userData.localId,userData._idToken,new Date(userData._tokenExpirationDate));

        if(loadedUser){
            const tokenExpirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.user.next(loadedUser);
            this.autoLogout(tokenExpirationDuration);
            console.log(tokenExpirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userItem');
        if(this._tokenExpirationTimer){
            clearTimeout(this._tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration:number){
        this._tokenExpirationTimer=setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }

private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
        const user= new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        console.log(expiresIn);
        localStorage.setItem('userItem',JSON.stringify(user));

}

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage= 'An unknown error occured';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This email already exists!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This email does not exist!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='Incorrect password!';
                    break;
            }
            return  throwError(errorMessage);
    }
}
