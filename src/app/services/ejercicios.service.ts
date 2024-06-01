import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ejercicio } from '../models/ejercicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private url = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getTablaEjercicios(id:number):Observable<Ejercicio[]>{
    return this.http.post<Ejercicio[]>(`${this.url}/ejercicios?tipoEjercicio=${id}`,{})
  }
}
