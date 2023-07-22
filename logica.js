/* CAPTURAR formulario VENTAS/INT/SALIDAS/BOTON */

let ventasInp = document.getElementById("ventas")
let interesInp = document.getElementById("interes")
let salidasInp = document.getElementById("salidas")
let btnCalcular = document.getElementById("calcular")

let idValor = document.getElementsByClassName("idValor")[0]
let ventasTValor = document.getElementsByClassName("ventasTValor")[0]
let inversionValor = document.getElementsByClassName("capitalValor")[0]
let intValor = document.getElementsByClassName("intValor")[0]
let gananciasBValor = document.getElementsByClassName("gananciaBValor")[0]
let gananciasNValor = document.getElementsByClassName("gananciaNValor")[0]
let salidasValor = document.getElementsByClassName("salidasValor")[0]

let formulario1 = document.getElementsByClassName("formulario1")[0]


/* clase constructura */

class moldeRegistro {
  constructor(id, ventasT, inversion, interes, salidas, gananciaB, gananciaN, dia, mes, año, hora, minutos, segundos) {
    this.id = id
    this.ventasT = ventasT,
      this.inversion = inversion,
      this.interes = interes,
      this.salidas = salidas,
      this.gananciaB = gananciaB,
      this.gananciaN = gananciaN,
      this.dia = dia,
      this.mes = mes,
      this.año = año,
      this.hora = hora,
      this.minutos = minutos,
      this.segundos = segundos
  }

  vistaPrevia() {
    idValor.innerText = `${this.id}`
    ventasTValor.innerText = `$${this.ventasT}`
    inversionValor.innerText = `$${this.inversion}`
    intValor.innerText = `${this.interes}%`
    gananciasBValor.innerText = `$${this.gananciaB}`
    gananciasNValor.innerText = `$${this.gananciaN}`
    salidasValor.innerText = `$${this.salidas}`
  }
}




let listaRegistros = []

// Variables globales para acceder a los valores desde fuera de la función

let gananciaN_global, gananciaB_global, inversion_global, salidas_global


function registrar(x, y, z) {


  let contador

  if (localStorage.getItem("registros")) {   //SI EXISTE "registros" en localStorage PASA LO SIG.

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    let long = listaRegistros.length

    let ultimoID = listaRegistros[long - 1].id

    contador = ultimoID

    //console.log(long)


  } else { // sino "listaRegistros" empieza estando vacia y el contador arranca en 0

    listaRegistros = []
    contador = 0
  }

  contador += 1
  let Id = contador
  let ventasT, inversion, interes, salidas, gananciaB, gananciaN


  ventasT = parseFloat(x.toFixed(2))
  interes = parseFloat(y.toFixed(2))
  salidas = parseFloat(z.toFixed(2))

  const fechaActual = new Date()

  let año = fechaActual.getFullYear()
  let mes = fechaActual.getMonth() + 1
  let dia = fechaActual.getDate()
  let hora = fechaActual.getHours()
  let minutos = fechaActual.getMinutes()
  let segundos = fechaActual.getSeconds()

  inversion = parseFloat((ventasT / (1 + (interes / 100))).toFixed(2))
  gananciaB = parseFloat((ventasT - inversion).toFixed(2))
  gananciaN = parseFloat((gananciaB - salidas).toFixed(2))



  let nuevoRegistro = new moldeRegistro(Id, ventasT, inversion, interes, salidas, gananciaB, gananciaN, dia, mes, año, hora, minutos, segundos)

  console.log(nuevoRegistro)

  listaRegistros.push(nuevoRegistro)

  localStorage.setItem("registros", JSON.stringify(listaRegistros))

  nuevoRegistro.vistaPrevia()


  // Asignar los valores a las variables globales, me servira para tener acceso a los valores de las variables fuera de la funcion registrar

  gananciaB_global = gananciaB
  gananciaN_global = gananciaN
  inversion_global = inversion
  salidas_global = salidas

}

/*EVENTO EN EL BOTON CALCULAR */

btnCalcular.addEventListener("click", (event) => {

  event.preventDefault()

  let valorVentas = parseInt(ventasInp.value)
  let valorInt = parseInt(interesInp.value)
  let valorSalidas = parseInt(salidasInp.value)

  //operador ternario para ejecutar un "alert" de SweetAlert: Lo que sucede es que cuando uno de los inputs sea distinto de un numero, aparecera un alert anunciando el error. Pero como los inputs estan limitados a una escritura de tipo "number" se puede sobre entender que el "sweetAlert" unicamente aparecera cuando un campo este vacio ya que " vacio y NaN" son distintos de un numero

  let condicion
  condicion = !isNaN(valorVentas) && !isNaN(valorInt) && !isNaN(valorSalidas)? (registrar(valorVentas, valorInt, valorSalidas),formulario1.reset()):Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Uno de los campos esta incompleto!',
    
  })



  

  




})

/*BARRA DE PROGRESO */

let capitalInicial, capitalFinal, rendimiento, formula1, formula1A, formula2, formula2A, formula3, formula3A

//Capturo los circulos y los porcentajes
let circulo1 = document.getElementById("circulo1");
let circulo2 = document.getElementById("circulo2");
let circulo3 = document.getElementById("circulo3");
let porcentaje1 = document.getElementById("porcentaje1")
let porcentaje2 = document.getElementById("porcentaje2")
let porcentaje3 = document.getElementById("porcentaje3")

//esta funcion va a cambiar los colores cuando se haya terminado de cargar la barra de progreso

//en esta funcion el color se mantiene violeta mientras cambia
function cambiarGrados(circulo, porcentaje, x, y) {
  circulo.style.background = `conic-gradient(rgb(108 48 190) ${x}deg, rgb(35 26 26) 0deg)`
  porcentaje.innerText = `${y}%`
}

//en esta otra funcion, cuando termina de cargar, la barra se vuelve verde

// Función para cambiar los colores cuando la barra de progreso termina de cargar
function cambiarGradosA(circulo, porcentaje, x, y) {
  // Si el valor es negativo, cambiamos el gradiente a rojo
  if (y < 0) {
    circulo.style.background = `conic-gradient(rgb(255 0 0) ${x}deg, rgb(35 26 26) 0deg)`
    porcentaje.style.color = `rgb(255 0 0)`; // Cambiar color del porcentaje a rojo
  } else {
    // Si es positivo o cero, cambiamos el gradiente a verde
    circulo.style.background = `conic-gradient(rgb(69 201 43) ${x}deg, rgb(35 26 26) 0deg)`
    porcentaje.style.color = `rgb(69 201 43)`; // Cambiar color del porcentaje a verde
  }

  porcentaje.innerText = `${y}%`
}




btnCalcular.addEventListener("click", (event) => {
  event.preventDefault();
  porcentaje1.style.color = `rgb(108, 48, 190)`
  porcentaje2.style.color = `rgb(108, 48, 190)`
  porcentaje3.style.color = `rgb(108, 48, 190)`
  porcentaje1.innerText = `0%`;
  porcentaje2.innerText = `0%`;
  porcentaje3.innerText = `0%`;

  // Reiniciar los valores de las fórmulas a 0





  //CAPITAL

  capitalInicial = inversion_global + gananciaB_global
  capitalFinal = inversion_global + (gananciaN_global)

  //RENDIMIENTO

  rendimiento = ((gananciaN_global / gananciaB_global) * 100)
  console.log(`el rendimiento es ${rendimiento}%`)



  //las formulas1/2/3 funcionan de la siguiente manera "Un numero "X" representa el 100% de la rueda de porcenjate es decir (360°) por lo tanto un Numero "Y" sera una (cantidad Z de grados y W de porcentaje)"


  formula1 = parseInt((((capitalFinal * 100) / capitalInicial) * 360) / 100)
  formula1A = parseInt(((capitalFinal * 100) / capitalInicial).toFixed(2))

  console.log(`los grados del capital son ${formula1}`)


  formula2 = parseInt((360 * rendimiento) / 100)
  if (formula2 < 0) {
    formula2 = formula2 * (-1)
  }

  console.log(`los grados del rendimiento son ${formula2}`)

  formula2A = parseInt((rendimiento).toFixed(2))



  console.log(formula2A)


  formula3 = parseInt((((gananciaN_global * 100) / gananciaB_global) * 360) / 100)

  if (formula3 < 0) {
    formula3 = 0
  }

  console.log(formula3)

  formula3A = parseInt(((gananciaN_global * 100) / gananciaB_global).toFixed(2))


  // set interval le da una transicion de carga a las barras de progreso
  if (formula1 > 0) {
    let inicio = 0;
    let intervalo = setInterval(() => {
      inicio += 1
      cambiarGrados(circulo1, porcentaje1, inicio, formula1A)

      if (inicio == formula1) {

        cambiarGradosA(circulo1, porcentaje1, inicio, formula1A)
        clearInterval(intervalo)
      }
    }, 5)
  }

  if (formula2 > 0) {
    let inicio = 0;
    let intervalo = setInterval(() => {
      inicio += 1;
      cambiarGrados(circulo2, porcentaje2, inicio, formula2A)
      console.log(formula2A)

      if (inicio == formula2) {
        cambiarGradosA(circulo2, porcentaje2, inicio, formula2A)
        clearInterval(intervalo)
      }
    }, 5);
  }

  if (formula3 > 0) {
    let inicio = 0
    let intervalo = setInterval(() => {
      inicio += 1
      cambiarGrados(circulo3, porcentaje3, inicio, formula3A)

      if (inicio == formula3) {
        cambiarGradosA(circulo3, porcentaje3, inicio, formula3A)
        clearInterval(intervalo)
      }
    }, 5);
  } else if (formula3 == 0) {
    inicio = 0
    cambiarGrados(circulo3, porcentaje3, inicio, formula3A)
    cambiarGradosA(circulo3, porcentaje3, inicio, formula3A)
  }
});


/*----------------------------------------------------------------------------------------------------------- */

//CAJA2 BUSCAR POR ID

/*CAPTURAR FORMULARIO BUSCAR X ID  */

let buscarPorId = document.getElementById("inpBuscarID")
let btnBuscarId = document.getElementById("btnBuscarID")
let cuadroResp2 = document.getElementsByClassName("cuadroResp2")[0]
let formulario2 = document.getElementsByClassName("formulario2")[0]

let idValor2 = document.getElementsByClassName("idValor2")[0]
let ventasTValor2 = document.getElementsByClassName("ventasTValor2")[0]
let inversionValor2 = document.getElementsByClassName("capitalValor2")[0]
let intValor2 = document.getElementsByClassName("intValor2")[0]
let gananciasBValor2 = document.getElementsByClassName("gananciaBValor2")[0]
let gananciasNValor2 = document.getElementsByClassName("gananciaNValor2")[0]
let salidasValor2 = document.getElementsByClassName("salidasValor2")[0]
let fechaValor2 = document.getElementsByClassName("fechaValor2")[0]
let horaValor2 = document.getElementsByClassName("horaValor2")[0]




function buscar(x, y) {

  if (y !== null) {

    if (listaRegistros.length > 0) {

      let pedirId = x

      let buscador = listaRegistros.find(
        (i) => i.id === pedirId

      )

      if (buscador) {

        idValor2.innerText = `${buscador.id}`
        ventasTValor2.innerText = `$${buscador.ventasT}`
        inversionValor2.innerText = `$${buscador.inversion}`
        intValor2.innerText = `${buscador.interes}%`
        gananciasBValor2.innerText = `$${buscador.gananciaB}`
        gananciasNValor2.innerText = `$${buscador.gananciaN}`
        salidasValor2.innerText = `$${buscador.salidas}`

        fechaValor2.innerText = ` ${buscador.dia} /${buscador.mes}/${buscador.año} `
        horaValor2.innerText = `${buscador.hora}:${buscador.minutos}:${buscador.segundos} `

        cuadroResp2.innerText = ""

      } else {
        cuadroResp2.innerText = "El registro no existe"
        idValor2.innerText = `-`
        ventasTValor2.innerText = `-`
        inversionValor2.innerText = `-`
        intValor2.innerText = `-`
        gananciasBValor2.innerText = `-`
        gananciasNValor2.innerText = `-`
        salidasValor2.innerText = `-`

        fechaValor2.innerText = `- `
        horaValor2.innerText = `- `
      }

    }
  } else {
    cuadroResp2.innerText = "El registro esta vacio"
  }
}


btnBuscarId.addEventListener("click", (event) => {

  event.preventDefault()

  listaRegistros = JSON.parse(localStorage.getItem("registros"))
  let valorBusquedaId = parseInt(buscarPorId.value)

  buscar(valorBusquedaId, listaRegistros)

  // reseteo formulario2
  formulario2.reset()

})

/*----------------------------------------------------------------------------------------------------------------------------- */

//CAJA 3 BUSCAR POR RANGO



let buscarRangomin = document.getElementById("buscarRangomin");
let buscarRangoMax = document.getElementById("buscarRangoMax");
let btnBuscarRango = document.getElementById("btnBuscarRango");

let formulario3 = document.getElementsByClassName("formulario3")[0];
let subResp3 = document.getElementsByClassName("subResp3")[0];

function buscarPorVentas(x, y, z) {
  if (z !== null) {
    if (listaRegistros.length > 0) {
      let minimo, maximo;
      minimo = x;
      maximo = y;

      let rango = listaRegistros.filter((i) => i.ventasT >= minimo && i.ventasT <= maximo);
      let copiaRango = rango.slice().sort((a, b) => a.ventasT - b.ventasT);




      // Borra el contenido actual de subResp3 antes de agregar nuevos elementos
      subResp3.innerHTML = "";


      copiaRango.forEach((i) => {

        //Se cambia el metodo map al metodo foreach debido a que no necesito que me devuelva un array
        // Recorre el array copiaRango y agrega cada elemento individualmente al subResp3
        // Basicamente lo que realizan las siguientes linea de codigo es: Por cada iteracion que hace el metodo foreach crea una variable de nombre grilla y en ella un elemento "div" la cual tendra estilos css para crear una cuadricula dentro del contenedor "resp3" que se encuentra en el HTML.
        //Luego se crean diversas variables las cuales tendran el valor de cada iteracion del metodo foreach y se ubicaran en una respectiva celda creada por la "grilla"


        let grilla = document.createElement('div');
        grilla.style.gap="10px 10px"
        grilla.style.display = "flex"
        grilla.style.textAlign = "center"
        grilla.style.width = "100%";
        grilla.style.height = "30px";
        grilla.style.backgroundColor = "rgb(16 16 18)";
        grilla.style.color = "wheat"
        grilla.style.display = "grid";
        grilla.style.gridTemplateColumns = "50px repeat(8, 1fr)";
        grilla.style.gridTemplateRows = "1fr";
        grilla.style.gridTemplateAreas = "'Valorid3 ValorventT3 Valorcap3 Valorint3 ValorganB3 ValorganN3 Valorsal3 Valorfecha3 Valorhora3'";

        let idValor3 = document.createElement('span');
        idValor3.className = "idValor3";
        idValor3.style.gridArea = "Valorid3";
        idValor3.innerText = `${i.id}`;

        let ventasTValor3 = document.createElement('span');
        ventasTValor3.className = "ventasTValor3";
        ventasTValor3.style.gridArea = "ValorventT3";
        ventasTValor3.innerText = `$${i.ventasT}`;

        let capitalValor3 = document.createElement('span');
        capitalValor3.className = "capitalValor3";
        capitalValor3.style.gridArea = "Valorcap3";
        capitalValor3.innerText = `$${i.inversion}`;

        let intValor3 = document.createElement('span');
        intValor3.className = "intValor3";
        intValor3.style.gridArea = "Valorint3";
        intValor3.innerText = `%${i.interes}`;

        let gananciaBValor3 = document.createElement('span');
        gananciaBValor3.className = "gananciaBValor3";
        gananciaBValor3.style.gridArea = "ValorganB3";
        gananciaBValor3.innerText = `$${i.gananciaB}`;

        let gananciaNValor3 = document.createElement('span');
        gananciaNValor3.className = "gananciaNValor3";
        gananciaNValor3.style.gridArea = "ValorganN3";
        gananciaNValor3.innerText = `$${i.gananciaN}`;

        let salidasValor3 = document.createElement('span');
        salidasValor3.className = "salidasValor3";
        salidasValor3.style.gridArea = "Valorsal3";
        salidasValor3.innerText = `$${i.salidas}`;

        let fechaValor3 = document.createElement('span');
        fechaValor3.className = "fechaValor3";
        fechaValor3.style.gridArea = "Valorfecha3";
        fechaValor3.innerText = `${i.dia}/${i.mes}/${i.año}`;

        let horaValor3 = document.createElement('span');
        horaValor3.className = "horaValor3";
        horaValor3.style.gridArea = "Valorhora3";
        horaValor3.innerText = `${i.hora}:${i.minutos}:${i.segundos}`;

        // Agrega cada elemento como hijos del contenedor div grilla. Esta parte es importante ya que una vez el que metodo foreach haya asignado a cada variable un valor, estas deben ingresar a al "grilla" para ubicarse en su respectiva celda con su valor obtenido
        grilla.append(idValor3, ventasTValor3, capitalValor3, intValor3, gananciaBValor3, gananciaNValor3, salidasValor3, fechaValor3, horaValor3)

        // Agrega el div grilla al subResp3
        subResp3.append(grilla);

      });


    }
  } else {
    cuadroResp3.innerText = "El registro está vacío";
  }
}

btnBuscarRango.addEventListener("click", (event) => {
  event.preventDefault();

  listaRegistros = JSON.parse(localStorage.getItem("registros"));

  let valorInpRangomin = parseInt(buscarRangomin.value);
  let valorInpRangoMax = parseInt(buscarRangoMax.value);

  buscarPorVentas(valorInpRangomin, valorInpRangoMax, listaRegistros);

  formulario3.reset();
});

/*-------------------------------------------------------------------------------------------------------- */

// CAJA 4 VER REGISTRO COMPLETO 

let subResp4 = document.getElementsByClassName("subResp4")[0]
let btnRegistroCompleto = document.getElementById("btnRegistroCompleto")
let formulario4 = document.getElementsByClassName("formulario4")[0];

function registroCompleto(x) {

  subResp4.innerHTML = ""


  if (x !== null) {

    if (x.length > 0) {

      let iterarTodo = x.forEach((i) => {


        let grilla = document.createElement('div');
        grilla.style.gap="10px 5px"
        grilla.style.display = "flex"
        grilla.style.textAlign = "center"
        grilla.style.width = "100%";
        grilla.style.height = "30px";
        grilla.style.backgroundColor = "rgb(16 16 18)";
        grilla.style.color = "wheat"
        grilla.style.display = "grid";
        grilla.style.gridTemplateColumns = "50px repeat(8, 1fr)";
        grilla.style.gridTemplateRows = "1fr";
        grilla.style.gridTemplateAreas = "'Valorid4 ValorventT4 Valorcap4 Valorint4 ValorganB4 ValorganN4 Valorsal4 Valorfecha4 Valorhora4'";

        let idValor4 = document.createElement('span');
        idValor4.className = "idValor4";
        idValor4.style.gridArea = "Valorid4";
        idValor4.innerText = `${i.id}`;

        let ventasTValor4 = document.createElement('span');
        ventasTValor4.className = "ventasTValor4";
        ventasTValor4.style.gridArea = "ValorventT4";
        ventasTValor4.innerText = `$${i.ventasT}`;

        let capitalValor4 = document.createElement('span');
        capitalValor4.className = "capitalValor4";
        capitalValor4.style.gridArea = "Valorcap4";
        capitalValor4.innerText = `$${i.inversion}`;

        let intValor4 = document.createElement('span');
        intValor4.className = "intValor4";
        intValor4.style.gridArea = "Valorint4";
        intValor4.innerText = `%${i.interes}`;

        let gananciaBValor4 = document.createElement('span');
        gananciaBValor4.className = "gananciaBValor4";
        gananciaBValor4.style.gridArea = "ValorganB4";
        gananciaBValor4.innerText = `$${i.gananciaB}`;

        let gananciaNValor4 = document.createElement('span');
        gananciaNValor4.className = "gananciaNValor4";
        gananciaNValor4.style.gridArea = "ValorganN4";
        gananciaNValor4.innerText = `$${i.gananciaN}`;

        let salidasValor4 = document.createElement('span');
        salidasValor4.className = "salidasValor4";
        salidasValor4.style.gridArea = "Valorsal4";
        salidasValor4.innerText = `$${i.salidas}`;

        let fechaValor4 = document.createElement('span');
        fechaValor4.className = "fechaValor4";
        fechaValor4.style.gridArea = "Valorfecha4";
        fechaValor4.innerText = `${i.dia}/${i.mes}/${i.año}`;

        let horaValor4 = document.createElement('span');
        horaValor4.className = "horaValor4";
        horaValor4.style.gridArea = "Valorhora4";
        horaValor4.innerText = `${i.hora}:${i.minutos}:${i.segundos}`;

        // Agrega cada elemento como hijos del contenedor div grilla. Esta parte es importante ya que una vez el que metodo foreach haya asignado a cada variable un valor, estas deben ingresar a al "grilla" para ubicarse en su respectiva celda con su valor obtenido
        grilla.append(idValor4, ventasTValor4, capitalValor4, intValor4, gananciaBValor4, gananciaNValor4, salidasValor4, fechaValor4, horaValor4)

        // Agrega el div grilla al subResp3
        subResp4.append(grilla);




      })


    }
  } else {
    cuadroResp4.innerText = "El registro esta vacio"
  }
}





btnRegistroCompleto.addEventListener("click", (event) => {

  event.preventDefault()

  listaRegistros = JSON.parse(localStorage.getItem("registros"))


  registroCompleto(listaRegistros)

  formulario4.reset()

})

/*------------------------------------------------------------------------------------------------------------------------------ */

/*CAJA 5 RESUMEN */

let formulario5 = document.getElementsByClassName("formulario5")[0]
let btnResumen = document.getElementById("verResumen")
let resumenResp = document.getElementsByClassName("resumenResp")[0]

let ventasTValor5= document.getElementsByClassName("ventasTValor5")[0]
let gananciaNValor5=document.getElementsByClassName("gananciaNValor5")[0]
let interesValor5= document.getElementsByClassName("interesValor5")[0]
let salidasValor5= document.getElementsByClassName ("salidasValor5")[0]




function resumenContabilidad(x) {

    if (x !== null) {

        if (listaRegistros.length > 0) {

            let rango = listaRegistros.filter(
                (i) => i.ventasT > 0 && i.ventasT <= Infinity
            )

            /*let contTotal = listaRegistros.map(
                (i) => `Id: ${i.id}, Ventas: $${i.ventas}, Interés: $${i.interes}, Ganancia: $${i.ganancia}, Salidas: $${i.salidas}`
            )
 
            let mensaje = contTotal.join("\n\n")*/

            let reduceVentas = rango.reduce((acumulador, i) => {
                return acumulador + i.ventasT
            }, 0)

            let reduceGanancias = rango.reduce((acumulador, i) => {
                return acumulador + i.gananciaN
            }, 0)

            let reduceInteres = rango.reduce((acumulador, i) => {
                return acumulador + i.interes
            }, 0)

            let reduceSalidas = rango.reduce((acumulador, i) => {
                return acumulador + i.salidas
            }, 0)


            let promedioInteres = reduceInteres / rango.length

            ventasTValor5.innerText=`💲 ${reduceVentas}`
            gananciaNValor5.innerText=`💲 ${reduceGanancias.toFixed(2)}`
            interesValor5.innerText=`${promedioInteres.toFixed(2)}%`
            salidasValor5.innerText=`💲 ${reduceSalidas} `
            


           

            let resumenRespuesta

            if (reduceGanancias == reduceSalidas) {
              resumenRespuesta = "Estás obteniendo un equilibrio entre los ingresos generados y los gastos incurridos en tu negocio"
            } else if (reduceGanancias < reduceSalidas) {
              resumenRespuesta = "Estás incurriendo en pérdidas, tu negocio no está generando suficientes ingresos para cubrir los costos o gastos"
            } else {
                let porcentajeRentabilidad = ((reduceGanancias - reduceSalidas) / reduceSalidas) * 100

                resumenRespuesta = `Estás obteniendo un rendimiento positivo del ${porcentajeRentabilidad.toFixed(2)}% en tu negocio, lo cual es deseable y demuestra que tu actividad comercial es rentable.`
            }

            resumenResp.innerText = `${resumenRespuesta}`

        }
    } else {
        alert("El registro esta vacio")
    }
}


btnResumen.addEventListener("click", (event) => {
    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    resumenContabilidad(listaRegistros)

})


/*--------------------------------------------------------------------------------------------------------------------------- */

/* CAPTURANDO FORMULARIO 6 */

let formulario6 = document.getElementsByClassName("formulario6")[0]
let inpBorrarId = document.getElementById("idABorrar")
let btnBorrarRegistro = document.getElementById("borrarRegistro")
let cuadroResp6 = document.getElementsByClassName("resp6")[0]


function borrarRegistro(x, y) {

    if (x !== null) {

        if (x.length > 0) {

            
            //obtengo el objeto.ID
            let obtenerId = x.find(
                (i) => i.id == y
            )

            if (obtenerId) {
                function confirmar() {


                  Swal.fire({
                    title: `está seguro de borrar el registro Id: ${obtenerId.id}`,
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Bórralo!',
                    cancelButtonText: 'No, cancela!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        'Deleted!',
                        `El registro con ID: ${obtenerId.id}, ha sido eliminado`,
                        'success',
                      )
                    }else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      Swal.fire(
                        "Operacion cancelada",
                        'Tu archivo imaginario está a salvo :)',
                        'error'
                      )
                    }
                  })

                    

      

                }
                confirmar()

            } else {
                cuadroResp6.innerText="El ID ingresado no existe"
            }
        }

    } else {
        cuadroResp6.innerText="El registro esta vacio"
    }
}

btnBorrarRegistro.addEventListener("click", (event) => {
    event.preventDefault()

    listaRegistros = JSON.parse(localStorage.getItem("registros"))

    let valorInpBorrar = parseInt(inpBorrarId.value)

    borrarRegistro(listaRegistros, valorInpBorrar)

    formulario6.reset()
})

