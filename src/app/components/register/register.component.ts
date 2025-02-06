import { CommonModule } from '@angular/common';
import { Component, inject,  } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from '../../services/service.service';
import { InterfaceRegister } from '../../interfaces/interface-register';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
    private router = inject(Router);
    private apiService = inject(ApiService);
  
      registerForm: FormGroup = this.fb.group({
        name: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',[ Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('.*[A-Z].*')]]
      });
  
      registrarse() {
        const objeto: InterfaceRegister = {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        }
        console.log(this.registerForm.value);
  
        this.apiService.postRegister(objeto).subscribe({
          next: () => {
                  Swal.fire({ 
                    icon: 'success', 
                    title: 'Bienvenido! Creación de cuenta exitosa', 
                    text: 'Ahora puedes iniciar sesión con tus credenciales.', 
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
                  }).then(() => {
                    this.router.navigate(['/login']);
                  });
                },
          error: () => {
            Swal.fire({ 
                  icon: 'error', 
                  title: 'Credenciales Inválidas', 
                  text: 'Por favor, verifique que su correo y contraseña tengan el formato correcto e intente de nuevo.', 
                  footer: 'La contraseña debe tener al menos un número y una mayúscula.',
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
        })
      }

      volver(){
        this.router.navigate(['login']);
      }
}
