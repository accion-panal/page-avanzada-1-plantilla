import { AboutInformation } from "../Data/userId.js";

const loadInformation = () => {
    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
            <h4>Misión</h4>
            <p>
                ${AboutInformation.mision}
            </p>
            `;
    }

    /* LLENAR INFORMACION DE VISION */
    /* REGION: rescatar value por su id */
    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
            <h4>Visión</h4>
            <p>
                ${AboutInformation.vision}
            </p>
            `;
    }

}

loadInformation();