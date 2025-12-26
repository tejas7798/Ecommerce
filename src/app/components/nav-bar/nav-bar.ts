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
  logInStatus = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  constructor(private router:Router) { }

  NavBarMenu(){
    const userName =localStorage.getItem('username')
    if(userName == "Guest" || userName == null){
    }else{
      this.logInStatus = true;
    }
  } 
  

  LogOut(){
    localStorage.setItem('username', "Guest");
  }
}
