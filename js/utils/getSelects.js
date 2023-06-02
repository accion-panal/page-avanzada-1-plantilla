import { getRegiones } from "../services/PropertiesServices.js";
import { getCommune } from "../services/PropertiesServices.js";


const filterSelects = async () => {
    let { data } = await getRegiones();
    console.log(data);

    /* LLENAR FILTROS DE REGION */
    /* REGION: rescatar value por su id */
    let region = document.getElementById('region');
    if (region !== null) {
        region.innerHTML = data.regions.map((data, i) => {
            // let regInt =  getRegiones(data.target.value);
            if (i != 0) {
                return `
                <option value="${data.id}">${data.name}</option>
            `;
            } else {
                return `
                <option value="0" selected >Región</option>
                <option value="${data.id}">${data.name}</option>
            `;

            }
        }).join("");
    }
    /* REGION: rescatar value por su name */
    let regionText = document.getElementById('regionText');
    if (regionText !== null) {
        regionText.innerHTML = data.regions.map((data, i) => {
            if (i != 0) {
                return `<option value="${data.name}">${data.name}</option>`;
            } else {
                return `
                    <option value="0" selected >Región</option>
                    <option value="${data.name}">${data.name}</option>
                `;
            }
        }).join("");
    }
    /* LLENAR FILTROS DE TIPO DE PROPIEDAD */
    let typeOfProperty = document.getElementById('typeOfProperty');
    if (typeOfProperty !== null) {
        typeOfProperty.innerHTML = data.typeOfProperty.map((data, i) => {
            if (i != 0) {
                return `<option value="${data.value}">${data.name}</option>`;
            } else {
                return `
                    <option value="0" selected >Tipo Propiedad</option>
                    <option value="${data.value}">${data.name}</option>
                `;
            }
        }).join("");
    }
    /* LLENAR FILTROS DE TIPO DE OPERACION */
    let operationType = document.getElementById('operationType');
    if (operationType !== null) {
        operationType.innerHTML = data.operationType.map((data, i) => {
            if (i != 0) {
                return `<option value="${data.value}">${data.name}</option>`;
            } else {
                return `
                    <option value="0" selected >Operacion</option>
                    <option value="${data.value}">${data.name}</option>
                `;
            }
        }).join("");
    }

    /*region.addEventListener("change", async (data) => {
        let aux = await getCommune(data.target.value);
        document.getElementById("commune").innerHTML = aux.data.map((data) => 
        `<option value="${data.id}">${data.name}</option>`
        );
    }); */

}
filterSelects();