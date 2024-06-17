import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";


export type LoginData = {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOCAL_STORAGE_USER_KEY = 'authUser';

  constructor() { }

  login(data: LoginData): Observable<void> {
    localStorage.setItem(this.LOCAL_STORAGE_USER_KEY, JSON.stringify(data.email));
    return of(void 0);
  }

  logout() {
    localStorage.removeItem(this.LOCAL_STORAGE_USER_KEY);
  }

  isLoggedIn() {
    return localStorage.getItem(this.LOCAL_STORAGE_USER_KEY) !== null;
  }
}
