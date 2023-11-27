const arrayEventos= [
{id:1, evento: 'GANA BRASIL', cuota:2.4},
{id:2, evento: 'GANA ARGENTINA', cuota:3.1},   
{id:3, evento: 'EMPATE', cuota:3.4},   
]

//enlace a dom a elementos html
const divApuesta= document.querySelector('div.panel-apuesta')
const divDetalle = document.querySelector('div.panel-desgloce')


const inputMonto = document.querySelector("input#montoApuesta")
// const inputPlazo = document.querySelector("input#plazoPago")
const selectEvento = document.querySelector("select#selectEvento")
const textoMensaje = document.querySelector("p.texto-verde")


const btnCalcular = document.querySelector("button.button-calcular")


const btnApostar = document.querySelector("button.button-apostar")

const tablaDesgloce = document.querySelector("table tbody")


// logica


function elegirApuesta(){
    if(arrayEventos.length>0){
        arrayEventos.forEach((opcion)=> selectEvento.innerHTML += `<option>${opcion.evento}</option>`)
    }
}

function retornarCuota(evento){
    let pagador = arrayEventos.find((pagador) => pagador?.evento === evento)
    return pagador?.cuota
}



function armarTablaHTML(partido1, eventoSeleccionado, cuotaAplicada,dineroApostado) {
    tablaDesgloce.innerHTML = '';
    tablaDesgloce.innerHTML += `<tr>
                                    <td>${partido1}</td>
                                    <td>${cuotaAplicada}</td>
                                    <td>${eventoSeleccionado}</td>
                                    <td class="texto-derecha">${dineroApostado}</td>
                                   </tr>`;
    
}

function guardarEnLS(dineroApostado, eventoSeleccionado){
    localStorage.setItem('MontoSolicitado', dineroApostado)
    localStorage.setItem('evento', eventoSeleccionado)
}

function recuperarLC(){
    inputMonto.value = localStorage.getItem('MontoSolicitado') || ''
    selectEvento.value = localStorage.getItem('evento') || 'Elige aqui..'
}

function calcularApuesta(){
    //recuperar datos html
    let dineroApostado =  parseInt(inputMonto.value)
    let eventoSeleccionado = selectEvento.value
    let cuotaAplicada = retornarCuota(selectEvento.value)

    //instanciamos el objeto Apuesta y calculamos la ganancia
    const apuesta = new Apuesta(dineroApostado,cuotaAplicada)
    let gananciaEsperada = apuesta.calcularGanancia()

    // nos enlazamos con los elementos html del otro div
    const spanMonto = document.querySelector('span.label-monto')
    const spanEvento = document.querySelector('span.label-evento')
    const spanCuota = document.querySelector('span.label-cuota')
    const spanGanacia = document.querySelector('span.label-ganacia')
    const partido = document.querySelector('.partido')
    const ganaciaTabla = document.querySelector('#ganancia')

   
    //cargamos los datos a visualizar como confirmacion de la apuesta
    spanMonto.textContent = apuesta.monto
    spanEvento.textContent = selectEvento.value
    spanCuota.textContent = cuotaAplicada
    spanGanacia.textContent = gananciaEsperada
    ganaciaTabla.textContent= gananciaEsperada
    const partido1= partido.textContent

    guardarEnLS(apuesta.monto, selectEvento.value)


    //armamos la tabla html creando una fila para verificar el resumen de la apuesta
    armarTablaHTML(partido1, eventoSeleccionado, cuotaAplicada,dineroApostado );
    divDetalle.classList.remove('ocultar-panel')
    divApuesta.classList.add('ocultar-panel')

}

//eventos

btnCalcular.addEventListener('click', ()=> calcularApuesta())
btnApostar.addEventListener('click', ()=> {
    alert('Apuesta Realizada⚽️ \nBuena suerte!!')
    localStorage.clear()
    location.reload()
})


//llamar funcionalidades principales

elegirApuesta()
recuperarLC()


