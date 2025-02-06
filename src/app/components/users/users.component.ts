import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { IgxGridModule,IgxButtonGroupModule } from "igniteui-angular";
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-users',
  imports: [
	CommonModule,
	FormsModule,
	IgxGridModule,
	IgxButtonGroupModule,
	NavbarComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  @ViewChild('grid1', { read: IgxGridComponent, static: true })
  public grid1!: IgxGridComponent;
  public Data!: any[];

  
  public ngOnInit(): void {
		this.Data = this.getMockData;
	}
	
	public getMockData = [
		{ Users: 'Ezequiel', Password: 'xD8bGp3AqzH2oL9u', Email: 'example@gmail.com', DateUser: new Date(2021, 5, 24), Discontinued: true },
		{ Users: 'Fabricio', Password: 'F9vKz5yNpD6tQw1X', Email: 'example@gmail.com', DateUser: new Date(2021, 4, 10), Discontinued: true },
		{ Users: 'Sergie', Password: 'hJ3sTp7CqV4nXy8B', Email: 'example@gmail.com', DateUser: new Date(2021, 6, 15), Discontinued: false },
		{ Users: 'Matias', Password: 'eL9zUj1QwB2kZp4D', Email: 'example@gmail.com', DateUser: new Date(2021, 7, 20), Discontinued: true },
		{ Users: 'Pablo', Password: 'Yb7Vn0FqL3gXj2Tw', Email: 'example@gmail.com', DateUser: new Date(2023, 4, 20), Discontinued: false },
		{ Users: 'Facundo', Password: 'vB5kXq2Hn8zT0pLs', Email: 'example@gmail.com', DateUser: new Date(2022, 3, 20), Discontinued: true },
		{ Users: 'Rodrigo', Password: 'W3mNj9QxA7zGp4Yb', Email: 'example@gmail.com', DateUser: new Date(2024, 1, 20), Discontinued: false },
	  ];


	  public formatCurrency(val: string) {
		return '$' + parseInt(val, 10).toFixed(2);
	}

}
