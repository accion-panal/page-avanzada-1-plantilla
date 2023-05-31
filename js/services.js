
const $btnAso = document.querySelector('.boton-aso'),
      $btnForm = document.querySelector('.boton-for'),
      $publica = document.querySelector('publicagratis'),
      $formulario = document.querySelector('asesoriabancaria');

document.addEventListener('click',e=>  {
    if (e.target === $btnAso ||  e.target === $btnForm) {
        $publica.classList.toggle('active');
        $formulario.classList.toggle('active');
        
    }


})