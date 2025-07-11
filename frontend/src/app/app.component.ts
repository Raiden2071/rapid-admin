import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rapid-admin-frontend';
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      console.log(user);
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          userName: user.displayName!,
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
    });
  }
}
