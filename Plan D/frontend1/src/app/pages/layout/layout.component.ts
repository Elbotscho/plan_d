import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private auth: AuthService) {}

  isLoginView: boolean = localStorage.getItem("authToken") ? true : false;
  
  router = inject(Router)

  onLogout() {
    this.auth.logout().subscribe(
      (response:any) => {
        localStorage.removeItem('authToken');  
        this.isLoginView = false;
        this.router.navigateByUrl('login')
      });
  }
}
