import { getPropertiesForId } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf } from '../utils/getExchangeRate.js';

export default async function apiDetalleCall(id, statusId = 1, companyId) {

    let { data } = await getPropertiesForId(id, statusId, companyId);
    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
    let img;

    console.log(data)
    /* INFORMACION */
    /* Informacion principal */
    document.getElementById('main-info-prop').innerHTML = `
        <h4 class="heading " style="font-weight: bold;" >${data.operation}</h4>
        <h1 class="heading " style="font-weight: bold; color: #4D4D4D;">${data.title}</h1>
        <p>REF:${data.id}</p>
    `;
    /* Direccion en Info */
    document.getElementById('direction-info-prop').innerHTML = `
        <i class="fa fa-map-marker "  aria-hidden="true"></i>
        ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile
    `;
    /* Precio */
    document.getElementById('price-info-prop').innerHTML = `
        <b><h1 class="heading " style="font-weight: bold; color: #4D4D4D;">UF ${clpToUf(data.price, ufValueAsNumber)}</h1></b>
        <h5 class="heading "> CLP ${parseToCLPCurrency(data?.price)}</h5>
    `;
    /* Imagenes en splide */
    data.images.forEach((images, index) => {img += ` 
        <li class="splide__slide ${ index == 0 ? "active" : ""}"> 
            <img src="${images != null && images != "" && images != undefined  ? images : "img/Sin.png"}" style="height:600px;width:100%;"/>
        </li>	
    `})
    document.getElementById('carrucel-img').innerHTML = `
        <li class="splide__slide">${img}</li>
    `;
    let splide = new Splide(".splide", {
        type: "fade",
        padding: '5rem',
        rewind:true,
        autoplay: "play",
        
    });
    splide.mount();

    /* Descripcion/Caracteristicas */
    document.getElementById('description-info-prop').innerHTML = `
        <h3 class="text-center" style="font-size: 35px; font-weight:bold ;">CARACTERÍSTICAS</h3>
        <div class="row text-center" style="padding-left: 15%;padding-right: 15%;"	>
            <div class="col-3">
                <div class="row " style="font-size: 40px;">
                    <div class="col-12">
                        ${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}
                    </div>
                    <div class="col-12">
                        <i class="fa fa-bed  "  aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row " style="font-size: 40px;">
                    <div class="col-12">
                    ${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}
                    </div>
                    <div class="col-12">
                        <i class="fa fa-bath "  aria-hidden="true"></i>
                    </div>
                </div>						
            </div>
            <div class="col-3">
                <div class="row " style="font-size: 40px;">
                    <div class="col-12">
                    ${data.coveredParkingLots != null && data.coveredParkingLots != undefined && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}
                    </div>
                    <div class="col-12">
                        <i class="fa fa-car "  aria-hidden="true"></i>
                    </div>
                </div>						
            </div>
            <div class="col-3">
                <div class="row " style="font-size: 40px;">
                    <div class="col-12">
                    ${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}
                    </div>
                    <div class="col-12">
                        <i class="fa fa-ruler "></i>
                    </div>
                </div>						
            </div>
        </div>
        <div class="m-3 pt-3 bord-venta p-3">
            <h2 style="font-size: 35px; font-weight:bold ;">Descripción</h2>
            <p class="text-black-50" style="font-size:20px ;">
                ${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
            </p>
        </div>
        <br><br><br>
        <div class="m-3 pt-3 bord-venta p-3">
            <h2 style="font-size: 35px; font-weight:bold ;">Características Generales</h2>
            <p class="text-black-50" style="font-size:20px ;">
                ${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
            </p>
        </div>
    `;

    /* MAPA */
    /* Direccion en Mapa */
    document.getElementById('direction-map-prop').innerHTML = `
        <i class="fa fa-map-marker "  aria-hidden="true"></i>
        ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile
    `;

    /* CONTACTO */
}

