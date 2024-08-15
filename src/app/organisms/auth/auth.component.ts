import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'] 
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/links']);
    } 
    else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
