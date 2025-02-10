import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { InfoGenComponent } from "../info-gen/info-gen.component";
import { NewsComponent } from "../news/news.component";
import { EarthComponent } from "../earth/earth.component";
import { PlaneComponent } from "../plane/plane.component";
import { ImgDayComponent } from "../img-day/img-day.component";
import { SolarStormComponent } from "../solar-storm/solar-storm.component";
import { FooterComponent } from '../footer/footer.component';
import { ImgComponent } from "../img-collage/img.component";


@Component({
	selector: 'app-home',
	imports: [CommonModule, NavbarComponent, InfoGenComponent, NewsComponent, EarthComponent, PlaneComponent, ImgDayComponent, SolarStormComponent, FooterComponent, ImgComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

	constructor() { }

}
