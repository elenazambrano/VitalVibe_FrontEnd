import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getPaymentsByUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.url}/payments`, {
      nombre: user.name,
      apellidos:user.surname,
      email:user.email,
      password:user.password
    })
  }
}
