import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { IgxGridModule,IgxButtonGroupModule } from "igniteui-angular";
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../services/service.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
	selector: 'app-users',
	imports: [
		CommonModule,
		FormsModule,
		IgxGridModule,
		IgxButtonGroupModule,
		NavbarComponent,
		FooterComponent,
		LoaderComponent
],
	templateUrl: './users.component.html',
	styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

	@ViewChild('grid1', { read: IgxGridComponent, static: true })
	public grid1!: IgxGridComponent;
	private apiService = inject(ApiService);
	Data: any[] = [];
	loading: boolean = false;

	
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
		this.apiService.deleteUser(id).subscribe({
			next: (response) => {
				console.log(`Usuario ${userName} eliminado:`, response);
				this.getUsers();
			},
			error: (error) => {
				console.error('Error al eliminar usuario:', error);
			}
		});
	}

		public formatCurrency(val: string) {
		return '$' + parseInt(val, 10).toFixed(2);
	}
	
	

}
