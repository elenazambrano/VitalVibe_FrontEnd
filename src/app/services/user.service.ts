import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8080";


  constructor(private http: HttpClient) { }

  register(user:any): Observable<any>{
    return this.http.post<any>(`${this.url}/api/register`, {
      nombre: user.name,
      apellidos:user.surname,
      email:user.email,
      password:user.password
    })
  }
  login(user:any){
    return this.http.post<any>(`${this.url}/api/login?email=${user.email}&password=${user.password}`, {})
  }
}
