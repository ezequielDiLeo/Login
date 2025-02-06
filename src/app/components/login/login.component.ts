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
			},
			error: (error: any) => {
				Swal.fire({ 
					icon: 'error', 
					title: 'Credenciales Inválidas', 
					text: 'Por favor, verifique su correo y contraseña e intente de nuevo.', 
					footer: 'Si no tienes una cuenta, puedes registrarte haciendo clic en el texto inferior "Registrarse".',
					background: '#111',
					color: '#fff',
					confirmButtonColor: '#fff',
					confirmButtonText: "Aceptar",
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

	registrarse() {
		this.router.navigate(['/register']);
	}
}
