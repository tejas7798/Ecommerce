import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, Injector, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NavBar } from "./components/nav-bar/nav-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, MatButtonModule, NavBar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('front-End');
  

}
