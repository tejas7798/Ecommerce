import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, CommonModule],
  standalone: true,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  constructor(private router:Router) { }

  NavBarMenu(){
    
    const userName =localStorage.getItem('username')
    if(userName == "Guest" || userName == null){
    const logoutEl = document.getElementById('logout');
      if (logoutEl) {
        logoutEl.innerHTML = `<a href='/login'>Log In</a>`;
      }
    }else{
      const logoutEl = document.getElementById('logout'); 
      if (logoutEl) { 
        logoutEl.innerHTML = `<a href='/' (click)="LogOut()">Log Out</a>`;
      }
    } 
  }

  LogOut(){
    localStorage.setItem('username', "Guest");
  }
}
