import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import { InterfaceLogin } from '../../interfaces/interface-login';
import { ApiService } from '../../services/service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

	private fb = inject(FormBuilder);
	private router = inject(Router);
	private apiService = inject(ApiService);
	isPasswordVisible: boolean = false; // Variable para controlar la visibilidad de la contraseña

	loginForm: FormGroup = this.fb.group({
		Email: ['', [Validators.required, Validators.email]],
		Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('.*[A-Z].*')]]
	});

	iniciarSesion() {
		if (this.loginForm.invalid){
			this.loginForm.markAllAsTouched();
			return;
		};

		const objeto: InterfaceLogin = {
			Email: this.loginForm.value.Email,
			Password: this.loginForm.value.Password
		}
		this.apiService.postLogin(objeto).subscribe({
			next: () => {
					this.router.navigate(['/home']);
					Swal.fire({ 
						icon: 'success', 
						title: 'You logged in successfully.',
						text: 'Welcome!',
						background: '#111',
						color: '#fff',
						confirmButtonColor: '#fff',
						confirmButtonText: "Accept",
						didOpen: () => {
							const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
							if (confirmButton) {
								confirmButton.style.color = 'black'; 
							}
						  }
					});
			},
			error: (error: any) => {
				Swal.fire({ 
					icon: 'error', 
					title: 'Credenciales Inválidas', 
					text: 'Please check your email and password and try again.', 
					footer: 'If you do not have an existing account, you can register by clicking on the "Register" text below.',
					background: '#111',
					color: '#fff',
					confirmButtonColor: '#fff',
					confirmButtonText: "Submit",
					didOpen: () => {
						const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
						if (confirmButton) {
							confirmButton.style.color = 'black'; 
						}
					  }
				});
			  }
		});
	}
	
	 togglePasswordVisibility(): void {
		this.isPasswordVisible = !this.isPasswordVisible;
	  }

	registrarse() {
		this.router.navigate(['/register']);
	}
}
