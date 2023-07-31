import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://task-management-system-service.onrender.com/users'; 

  constructor(private http: HttpClient) { }

  //User Register
  signup(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  //User Login
  login(credentials: User): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/login', credentials).pipe(
      tap(response => {
        const token = response.accessToken;
        this.storeToken(token);
      })
    );
  }
  //Forget Password
  forget(credentials: User): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/forget', credentials);
  }
  private storeToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
}
