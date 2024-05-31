import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userSubject: BehaviorSubject<any>;
  
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    this.userSubject = new BehaviorSubject<any>(user);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  clearUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}
