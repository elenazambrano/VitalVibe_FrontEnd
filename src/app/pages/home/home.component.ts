import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';
import { Pago } from 'src/app/models/pago';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { Ejercicio } from 'src/app/models/ejercicio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  peso?: number;
  altura: number = 0;
  imc: number = 0;
  user?: User;
  pagos: any;
  ejercicios?: Ejercicio[];

  constructor(private sessionService: SessionService,
    private router: Router,
    private pagosService: PagosService,
    private ejercicioService: EjerciciosService
  ) { }

  ngOnInit(): void {
    this.sessionService.getUser().subscribe(res => {
      this.user = res;
      if (!res) this.goToIndex()
    })
    if (!this.user) {
      this.goToIndex()
    }

    this.pagosService.getPaymentsByUser(this.user).subscribe(res => {
      this.pagos = res.sort((a: Pago, b: Pago) => {
        const fechaA = new Date(a.fechaPagoInicio);
        const fechaB = new Date(b.fechaPagoInicio);
        return fechaB.getTime() - fechaA.getTime();
      });
    })

    this.ejercicioService.getTablaEjercicios(1).subscribe(res => {
      console.log(res)
    })
  }

  goToIndex() {
    this.router.navigate(["/"])
  }

  calcularIMC() {
    console.log(this.peso, this.altura)
    if (this.peso && this.altura) {
      this.imc = this.peso / Math.pow(this.altura / 100, 2);
    } else {
      alert('Por favor introduce valores válidos para peso y altura.');
    }
  }

  getEjercicios(id: number) {
    this.ejercicioService.getTablaEjercicios(id).subscribe(res => {
      this.ejercicios = res;
    })
  }
}
