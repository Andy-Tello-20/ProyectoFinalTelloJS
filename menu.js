let botones = document.querySelectorAll('.boton')
let registro = document.getElementsByClassName('registro')[0]
let buscarId = document.getElementsByClassName('busPId')[0]
let rangoVentas = document.getElementsByClassName('ranVentas')[0]
let registroCom = document.getElementsByClassName('regCompleto')[0]
let resumen = document.getElementsByClassName('resumen')[0]
let borrarReg = document.getElementsByClassName('borrarReg')[0]


let slideContainer = document.getElementById('slideContainer')

let boton = document.getElementById("abrir")
let caja1 = document.getElementById("caja1")
let caja2 = document.getElementById("caja2")
let caja3 = document.getElementById("caja3")
let caja4 = document.getElementById("caja4")
let caja5 = document.getElementById("caja5")
let caja6 = document.getElementById("caja6")



boton.addEventListener('click', () => {
  slideContainer.classList.toggle('slide-in')

})


botones.forEach(boton => {
  boton.addEventListener('click', event => {

    event.preventDefault()
    const caja = event.target


    //Importante, aca se captura la caja que contenga una clase llamada "aparecer" 
    let cajaX = document.querySelectorAll('.aparecer')

    cajaX.forEach(caja => {
      
      // y a esa misma caja se le quita la clase "aparecer" para que que no se visualice hasta que se seleccione una caja en el switch
      caja.classList.remove('aparecer')
    })

    switch (true) {
      case caja.classList.contains('registro'):
        caja1.classList.add("aparecer")
        break
      case caja.classList.contains('busPId'):
        caja2.classList.add("aparecer")
        break
      case caja.classList.contains('ranVentas'):
        caja3.classList.add("aparecer")
        break
      case caja.classList.contains('regCompleto'):
        caja4.classList.add("aparecer")
        break
      case caja.classList.contains('resumen'):
        caja5.classList.add("aparecer")
        break
      case caja.classList.contains('borrarReg'):
        caja6.classList.add("aparecer")
        break
    }
  })
})


