import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: Auth) { 
        super(auth);
    }

    canActivate(): any {
        var isAutheticated  =  super.canActivate();
        
        return isAutheticated ? this.auth.isInRole('Admin') : false;
    }

}