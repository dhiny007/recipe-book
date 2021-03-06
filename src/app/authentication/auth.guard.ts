import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map,take } from 'rxjs/operators';

@Injectable(
    {
        providedIn:'root'
    }
)
export class AuthGuardService implements CanActivate{

    constructor(private authService:AuthService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot): 
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree
    {
        return this.authService.user.pipe(
            take(1),map(user => {
            // return !!user;
            const isAuth=!!user;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth'])
        }))
            // ), tap(isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);
            //     }
            // }))
    }
}