import { HttpClient } from '@angular/common/http';
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
  private refreshTokenKey = 'refreshToken';
  private publicKeyKey = 'publicKey';

  constructor( private _httpClient: HttpClient, private _router: Router) { }

  
  postLogin(object:InterfaceLogin): Observable<any> {
    return this._httpClient
      .post(`${this.baseUrl}/login`, object)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            console.log('Token:', response.token);
            this.setToken(response.token);
          }
          if (response.refreshToken) {
            console.log('Refresh Token:', response.refreshToken);
            this.setRefreshToken(response.refreshToken);
          }
        })
      );
  }

  //REGISTER
  postRegister(object:InterfaceRegister): Observable<any> {
    return this._httpClient.post<any>(`${this.baseUrl}`, object )
  }

  //TOKEN
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
 
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //REFRESH TOKEN
  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
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
 
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.publicKeyKey);
    this._router.navigate(['/login']);
  }

}