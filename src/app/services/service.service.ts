import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InterfaceLogin } from '../interfaces/interface-login';
import { InterfaceRegister } from '../interfaces/interface-register';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private baseUrl = 'http://localhost:5187/api/users'
	private tokenKey = 'loginToken';

	constructor( private _httpClient: HttpClient, private _router: Router) { }

	//  -.......... POST - GET ..........-
	
	//LOGIN
	postLogin(object:InterfaceLogin): Observable<any> {
		return this._httpClient
			.post(`${this.baseUrl}/login`, object)
			.pipe(
				tap((response: any) => {
					if (response.token) {
						this.setToken(response.token);
					}
					if (response.UserId) {
						localStorage.setItem('userId', response.UserId); // Guarda el UserId en el localStorage
					  }
				})
			);
	}

	//REGISTER
	postRegister(object:InterfaceRegister): Observable<any> {
		return this._httpClient.post<any>(`${this.baseUrl}`, object )
	}
	
	//GET USERS
	getUsers(): Observable<any[]> {
		const token = this.getToken();

		// Verifica si hay un token y lo incluye en los encabezados de la solicitud
		const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
		return this._httpClient.get<any[]>(this.baseUrl, { headers });
	}
	
	

	// -........ DELETE ........-
	deleteUser(id: number): Observable<any> {
		const token = this.getToken();
		const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
		return this._httpClient.delete(`${this.baseUrl}/${id}`, { headers });
	}
	
	
	
	//  -.......... PRIVATES (LOCALSTORAGE) ..........-
	//TOKEN
	private setToken(token: string): void {
		localStorage.setItem(this.tokenKey, token);
	}
 
	private getToken(): string | null {
		return localStorage.getItem(this.tokenKey);
	}

 
	//AUTHENTICATED
	isAunthenticated(): boolean {
		const token = this.getToken();
		if (!token) {
			return false;
		}
		const payload = JSON.parse(atob(token.split('.')[1]));
		const exp = payload.exp * 1000;
		return Date.now() < exp;
	}
 
	
	//  -.......... LOGOUT ..........-
	logout(): void {
		localStorage.removeItem(this.tokenKey);
		this._router.navigate(['/login']);
	}

}