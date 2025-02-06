import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { InfoGenComponent } from "../info-gen/info-gen.component";
import { NewsComponent } from "../news/news.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavbarComponent, InfoGenComponent, NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() { }

}
