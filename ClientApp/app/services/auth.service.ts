import { tokenNotExpired } from '@angular-jwt';
import { Injectable }      from '@angular/core';

// Avoid name not found warnings
import Auth0Lock from '@auth0-lock';

@Injectable()
export class Auth {
  profile: any;
  private roles: string[] = [];

  // Configure Auth0
  lock = new Auth0Lock('YoAnWl6rRj46UfYdVu7XOuIgPUFJoHFB', 'georgevc15.auth0.com', {});

  constructor() {
 
    this.readUserFromLocalStorage();
  
    this.lock.on("authenticated", (authResult: any) => this.onUserAuthenticated(authResult));
  }

private onUserAuthenticated(authResult : any) {
  localStorage.setItem('token', authResult.accessToken);

      this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
        if (error)
          throw error;

          localStorage.setItem('profile', JSON.stringify(profile));
          
          this.readUserFromLocalStorage();
      });
}

private readUserFromLocalStorage() {
  this.profile = JSON.parse(localStorage.getItem('profile'));
  
  var token = localStorage.getItem('token');
  if (token) {
    var jwtHelper = new jwtHelper();
    var decodedToken = jwtHelper.decodeToken(token);
    this.roles = decodedToken['https://vega.com/roles'];
  }
}

  public isInRole(roleName: any) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'token'
    return tokenNotExpired('token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
  }
}