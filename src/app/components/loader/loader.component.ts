import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
	selector: 'loader',
	imports: [CommonModule],
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.css'
})
export class LoaderComponent {
	@Input() loading: boolean = false;
	
	constructor(){}

}
