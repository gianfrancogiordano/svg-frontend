export class PedidosActivos {

    public telefono: string;
    public idPedido: string = '';

    constructor(idPedido: string, telefono: string) {

        this.idPedido = idPedido;
        this.telefono = telefono;

    }

}
