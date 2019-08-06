import { Auth } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: Auth) { }

    canActivate(): boolean {
        if(!this.auth.authenticated()) {
            window.location.href = 'georgevc15.auth0.com/login';
            return false;
        }
            return true;
    }

}