import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>('');

  userId$ = this.userIdSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor() {
    // Initialize the user service, try to get the userId from local storage
    const userData = this.getUserDataFromLocalStorage();
    if (userData) {
      this.userIdSubject.next(userData.userId);
      this.usernameSubject.next(userData.username);
    } else {
      // Set default values if not found in local storage
      this.userIdSubject.next(3);
      this.usernameSubject.next('');
    }
  }

  setUserData(userId: number, username: string) {
    this.userIdSubject.next(userId);
    this.usernameSubject.next(username);

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify({ userId, username }));
  }

  clearUserData() {
    this.userIdSubject.next(null);
    this.usernameSubject.next('');

    // Remove user data from localStorage
    localStorage.removeItem('userData');
  }

  getUserData() {
    const userId = this.userIdSubject.value || 3;
    const username = this.usernameSubject.value || '';
    return { userId, username };
  }

  // Get user data from localStorage
  getUserDataFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}
