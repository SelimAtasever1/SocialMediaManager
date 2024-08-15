import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  login(username: string, password: string): boolean { // gercek ornekte token kullanılırdı, burada amac guard'ın aktif oldugunu gostermek.
    if (username === 'admin' && password === '123') {
      this.authSubject.next(true);  
      return true;  
    }
    return false;  
  }

  logout(): void {
    this.authSubject.next(false);  
  }

  isAuthenticated(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
