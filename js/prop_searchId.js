import apiDetalleCall from "./propiedad/apiDetalle.js";
import { PropertyData } from "./Data/userId.js";

const formId = document.getElementById('form-searchId');

formId.addEventListener('submit', function (e) {
    e.preventDefault();

    let idInput = document.getElementById('form-idProperty');
    console.log(idInput.value); // rescatar el valor del input

    const {companyId} = PropertyData; // rescatar el valor de companyId : 1

    if(idInput.value ===  ''){
        // Div de alerta
        let alertElement = document.querySelector('.alert');
        alertElement.textContent = 'Propiedad no encontrada';
        alertElement.classList.add('alert-danger');
        alertElement.classList.remove('visually-hidden');
        setTimeout(function () {
            // Ocultar alerta despues de 5seg
            alertElement.classList.add('visually-hidden');
            alertElement.classList.remove('alert-danger');
        }, 5000);
        return;
    }

    apiDetalleCall(idInput.value, 1, companyId)
        .then(result => {
            if (result) {
                // Redirigir a otra pestaña
                window.location.replace(`/property-single.html?${idInput.value}&statusId=${1}&companyId=${companyId}`);/* /property-single.html?${data.id}&statusId=${1}&companyId=${1} */
            } else {
                // Div de alerta
                let alertElement = document.querySelector('.alert');
                alertElement.textContent = 'Propiedad no encontrada';
                alertElement.classList.add('alert-danger');
                alertElement.classList.remove('visually-hidden');
                setTimeout(function () {
                    // Ocultar alerta despues de 5seg
                    alertElement.classList.add('visually-hidden');
                    alertElement.classList.remove('alert-danger');
                }, 5000);
            }
        })
        .catch(error => {
            console.log('error:', error);
        });

})