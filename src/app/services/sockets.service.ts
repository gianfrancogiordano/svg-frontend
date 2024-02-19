import { Injectable } from '@angular/core';
import { PedidosActivos } from '../models/pedidoActivo.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  public socketStatus = false;
  public pedido: PedidosActivos;

  constructor(private socket: Socket) { 
    this.cargarStorage();
    this.checkStatus();
  }

  guardarStorage() {
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
  }

  cargarStorage() {
    if( localStorage.getItem('pedido') ) {
      this.pedido = JSON.parse(localStorage.getItem('pedido') || '');
    }
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;

      // si hay pedido entonces es desde seguimiento
      if( this.pedido != null ) {
        this.loginWS(this.pedido.idPedido, this.pedido.telefono);
      }

    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  emit( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }

  loginWS(id: string, telefono: string) {

    return new Promise<void>((resolve, reject) => {
      this.emit('configurar-pedido', { id, telefono });
      this.pedido = new PedidosActivos(id, telefono);
      this.guardarStorage();
      resolve();

    });

  }
  
}
