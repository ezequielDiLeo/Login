import { CommonModule } from '@angular/common';
import { Component, HostListener, inject} from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent, IgxIconModule } from 'igniteui-angular';
import { IgxGridModule,IgxButtonGroupModule } from "igniteui-angular";
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../services/service.service';
import { LoaderComponent } from "../loader/loader.component";
import Swal from 'sweetalert2';

@Component({
	selector: 'app-users',
	imports: [
		CommonModule,
		FormsModule,
		IgxGridModule,
		IgxIconModule,
		IgxButtonGroupModule,
		NavbarComponent,
		FooterComponent,
		LoaderComponent
],
	templateUrl: './users.component.html',
	styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

	private apiService = inject(ApiService);
	
	@ViewChild('grid1', { read: IgxGridComponent, static: true })
	public grid1!: IgxGridComponent;
	Data: any[] = [];
	loading: boolean = false;
	
	// Variables para el menú contextual
	menuVisible: boolean = false;
	menuX: number = 0;
	menuY: number = 0;
	selectedRow: any = null;
	modalIsOpen: boolean = false;
	isEditingOpen: boolean = false;
	selectedUser: any = {};
	isPasswordVisible: boolean = false;

	
	public ngOnInit(): void {
		this.getUsers();
	}
	
	getUsers(){
		this.loading = true;
		setTimeout(() => {
			this.apiService.getUsers().subscribe({
				next: (response) => {
					this.Data = response;
				},
				error: (error) => {
					console.error('Error al obtener usuarios:', error);
				},
				complete: () => {
					this.loading = false;
				}
			})
		}, 1500);
	}
	
	
	deleteUser(id: number, userName: string) {
		Swal.fire({
					title: 'WARNING!',
					text: 'Do you want to delete this user?',
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
						this.apiService.deleteUser(id).subscribe({
							next: () => {
								this.getUsers();
							},
							error: (error) => {
								console.error('Error al eliminar usuario:', error);
							}
						});
					}
				});
	}

		public formatCurrency(val: string) {
		return '$' + parseInt(val, 10).toFixed(2);
	}
	
	
	@HostListener('document:click', ['$event'])
	onClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const isInsideMenu = target.closest('.context-menu');
		if (!isInsideMenu) {
		this.menuVisible = false;
		}
  }
	
	onRightClick(event: MouseEvent) {
		event.preventDefault();
		
		// Oculta el menú si no se hizo clic en una fila
		const target = event.target as HTMLElement;
		const targetRow = target.closest('igx-grid-row');
	
		
		if (targetRow) {
			// Aquí obtenemos los datos de la fila
			const rowIndex = targetRow.getAttribute('data-rowindex');
			const row = this.grid1.getRowByIndex(Number(rowIndex));
			this.selectedRow = row ? row.data : null;
		
		// Guardar la posición del menú
		this.menuX = event.clientX;
		this.menuY = event.clientY;
		this.menuVisible = true;
		}
	}
	
	
	  editUser() {
			this.selectedUser = { ...this.selectedRow };
			this.modalIsOpen = true;
			this.isEditingOpen = true;
			this.menuVisible = false;
	  }
	  
	  addUser() {
		this.selectedUser = { 
			name: '', 
			email: '', 
			password: '' 
		};
		this.modalIsOpen = true;
		this.isEditingOpen = false;
		this.menuVisible = false;
	}	  
	  
	  saveEdit() {
		const isCreatingUser = !this.selectedUser.id;
		
		Swal.fire({
			text: this.isEditingOpen ? 'You will change the user data, are you sure?' : 'add a new user?',
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
			if (result.isConfirmed) {
				if(isCreatingUser) {
					this.apiService.createUser(this.selectedUser).subscribe({
						next: () => {
							this.closeModal();
							this.showSuccessMessage('User added successfully');
							this.getUsers();
						},
						error: (err) => {
							console.error('Error creating user', err);
						},
					})
				} else {
					this.apiService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
						next: () => {
							this.closeModal();
							this.showSuccessMessage('Saved successfully');
							this.getUsers();
						},
						error(err) {
							console.log('error updating', err);
						},
					})
					}
				}
			});
	  	}
	  
	  showSuccessMessage(message: string) {
		setTimeout(() => {
			Swal.fire({
				title: message,
				icon: 'success',
				background: '#111',
				color: '#fff',
				timer: 2000, // La alerta desaparecerá automáticamente en 2 segundos
				timerProgressBar: true, // Mostrar barra de progreso del tiempo
				allowOutsideClick: true,
				showConfirmButton: false,
			});
		}, 1500);
	}
	  
	  togglePasswordVisibility(): void {
		this.isPasswordVisible = !this.isPasswordVisible;
	  }
	
	  closeModal() {
		this.modalIsOpen = false;
	  }
	

}
