import { Injectable } from '@angular/core';
const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private get window(): Window {
    return window;
  }

  setToken(token: string) {
    // Add your code here
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    // Add your code here
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    // Add your code here
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
