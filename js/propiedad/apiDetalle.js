import { getPropertiesForId } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf, validationUF,validationCLP, ufToClp } from '../utils/getExchangeRate.js';

export default async function apiDetalleCall(id, statusId = 1, companyId) {
    try {
        let { data } = await getPropertiesForId(id, statusId, companyId);
        const response = await ExchangeRateServices.getExchangeRateUF();
        const ufValue = response?.UFs[0]?.Valor
        const ufValueAsNumber = parseFloat(ufValue.replace(',', '.')); 

        let realtorInfo = data.realtor;

        let updatedImages = data.images.map(function (image) {
            return image.replace(/\\/g, "//");
        });

        //! transformar valor del uf a int
        const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
        const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);
        //!--

        console.log(data)
        console.log(realtorInfo)
        /* INFORMACION */
        /* Informacion principal */
        let mainInfo = document.getElementById('main-info-prop');
        if(mainInfo !== null){
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
                <b><h1 class="heading " style="font-weight: bold; color: #4D4D4D;">UF ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</h1></b>
                <h5 class="heading "> CLP ${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price): parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</h5>
            `;
            //! Imagenes en splide */
            let img = '';
            updatedImages.forEach((image, index) => {
                img += `
                    <li class="splide__slide ${index === 0 ? 'active' : ''}">
                        <img src="${image || 'img/Sin.png'}" style="height: 600px; width: 100%;" />
                    </li>
                `;
            });
            document.getElementById('carrucel-img').innerHTML = img;

            let splide = new Splide('.splide', {
                type: 'fade',
                padding: '5rem',
                rewind: true,
                autoplay: 'play',
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
            document.getElementById('realtorImage').innerHTML = `
                <div class="img mb-4 text-center pt-2">
                    <img src="images/person_4-min.jpg" alt="Image" class="img-fluid" style="width: 60%; max-width: 200px; border-radius: 50%; border: #000 1px solid;">
                </div>
            `;
            document.getElementById('realtorName').innerHTML = `
                <h2>${realtorInfo.name} ${realtorInfo.lastName != null ? realtorInfo.lastName : ''}</h2>
            `;
            document.getElementById('realtorEmail').innerHTML = `
                <p style="font-size: 15px;">${realtorInfo.mail}</p>
            `;
            document.getElementById('realtorPhone').innerHTML = `
                <p style="font-size: 15px;">
                ${realtorInfo.contactPhone != null && realtorInfo.contactPhone != undefined && realtorInfo.contactPhone != "" ? realtorInfo.contactPhone : "No registra Numero"}
                </p>
            `;


        }
        return true;

    } catch (error) {
        return null;
    }
        
}

