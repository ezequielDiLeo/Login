import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit} from '@angular/core';
import { ApiService } from '../../services/service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-navbar',
	imports: [CommonModule, RouterLink, RouterLinkActive],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

	isScrolled = false;
	Data: any[] = [];
	private _apiService = inject(ApiService);
	userName: string = '';

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		if (window.scrollY > 50) {
			this.isScrolled = true;
		} else {
			this.isScrolled = false;
		}
	}

	constructor( private router: Router) { }
	
	ngOnInit(): void {
		this.getUserFromApi()
		this._apiService.userName$.subscribe(name => {
			this.userName = name;
		})		
	}

	getUserFromApi() {
		const storedName = localStorage.getItem('userName');
		if (storedName) {
			this.userName = storedName;
		} else {
			console.log('⚠️ Nombre no encontrado en localStorage');
		}
	}

	logout() {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to log out?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel',
			background: '#111',
			color: '#fff',
			confirmButtonColor: '#fff',
			didOpen: () => {
			const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
			if (confirmButton) {
				confirmButton.style.color = 'black'; 
			}
		}
		}).then((result) => {
			if (result.value) {
				this._apiService.logout();
				this.router.navigate(['/login']);
			}
		});
	}

}
