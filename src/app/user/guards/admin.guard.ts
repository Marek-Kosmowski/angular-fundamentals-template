import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  // Add your code here
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.userStore.isAdmin) {
      return true;
    } else {
      return this.router.createUrlTree(['/courses']);
    }
  }
}
