import { CommonModule } from '@angular/common';
import { Component, HostListener} from '@angular/core';
import { ApiService } from '../../services/service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  constructor(private apiService: ApiService, private router: Router) { }

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
        this.apiService.logout()
        this.router.navigate(['/login']);
      }
    });
  }

}
