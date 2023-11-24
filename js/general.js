
class Apuesta {
    constructor(monto, cuota) {
        this.monto = monto || 0;
        this.cuota = cuota || 0;
    }

    calcularGanancia() {
        let ganancia = parseFloat(this.monto * this.cuota);
        ganancia = ganancia.toFixed(2);
        return parseFloat(ganancia).toLocaleString("es-AR");
    }

    // realizarApuesta() {
    //     // Aquí puedes agregar la lógica específica para realizar la apuesta, si es necesario.
    //     // Por ejemplo, puedes actualizar las propiedades de la apuesta o realizar alguna acción adicional.
    //     console.log("Apuesta realizada");
    // }
}
