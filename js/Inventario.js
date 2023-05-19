class Inventario {

    constructor(identificador, producto, cantidad, valor) {
        this.identificador = identificador;
        this.producto = producto;
        this.cantidad = cantidad;
        this.valor = valor;
    }

    consultarId() {
        return this.identificador;
    }

}
