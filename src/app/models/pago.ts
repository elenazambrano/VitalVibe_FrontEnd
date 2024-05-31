export interface Pago {
    id: number;
    fechaPagoInicio: string;
    fechaPagoFin: string;
    estado: string;
    persona: {
      idPersona: number;
      nombre: string;
      apellido: string;
      email: string;
      password: string;
    };
  }