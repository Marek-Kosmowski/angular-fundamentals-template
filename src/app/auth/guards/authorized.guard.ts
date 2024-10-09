import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  // Add your code here

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean | UrlTree {
    if (this.authService.isAuthorised) {
      console.log('access granted');
      return true;
    }
    console.log('access denied');
    return this.router.createUrlTree(['/login']);
  }
}
