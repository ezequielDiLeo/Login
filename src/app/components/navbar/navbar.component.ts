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
	// userNames: string[] = [];

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
		// this.getUser()
	}

	// getUser(){
	// 	const userId = localStorage.getItem('userId');  // Recupera el UserId desde el localStorage

  //   if (userId) {
  //     this._apiService.getUsers().subscribe((users: any[]) => {
  //       const user = users.find(u => u.id == parseInt(userId));  // Encuentra el usuario por el id
  //       if (user) {
  //         this.userNames = user.name;  // Asigna el nombre del usuario logueado
  //       }
  //     });
  //   }
  // }

	logout() {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¿Quieres cerrar sesión?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'Cancelar',
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
				this._apiService.logout()
				this.router.navigate(['/login']);
			}
		});
	}

}
