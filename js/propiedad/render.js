import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf,validationUF } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../propiedad/apiMapProp.js";

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    } 
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data 
    let data = response.data;
    console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        console.log(selectedValue);
        console.log(data);
        console.log(response);
      
        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    //todo: Modificar url de image
    data = data.map(item => {
        // Reemplazar "\\" por "//" en la propiedad "image"
        item.image = item.image.replace(/\\/g, "//");
        return item;
    });

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-propiedad');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad").innerHTML = data.map(data =>`
                <div class="col-xs-12 col-md-6 col-lg-4">
                    <div class="property-item mb-30">
                        <div class="border" style="background-image: url('${data.image.endsWith('.jpg') ? `${data.image}`:`https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg`}'); background-size: cover;">
                            <div class="shadow-properties m-3">
                                <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${companyId}" class="img">
                                    <div class="property-content text-center" >
                                        <div class="card-body">
                                            <p class="">${data.id}</p>
                                            <p class=""> ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra dirección"},${data.commune != null & data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}</p>
                                            <h3 class="card-title text-transform">${data.title}</h3>
                                            <hr width="100%" size="5"></hr>
                                            <div class="row">
                                                <div class="col-4">
                                                    <div class="row">
                                                        <div class="col-12"><h5>Hab</h5></div>
                                                        <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row">
                                                        <div class="col-12"><h5>UF</h5></div>
                                                        <div class="col-12">${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</div>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="row">
                                                        <div class="col-12"><h5>M2</h5></div>
                                                        <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != null ? data.surface_m2 : "0"}</div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div> 
                </div>
            `).join("");   
        };

        //* si container-propiedad-list es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerList = document.getElementById('container-propiedad-list');
        if (containerList !== null) {
            document.getElementById("container-propiedad-list").innerHTML = data.map(data =>`
                <div class="col-12" style="padding-left: 10%; padding-right: 10%;">
                    <div class="card mb-3 text-center carta " style="max-width: 100%;">
                        <div class="row no-gutters ">
                            <div class="col-md-4" style="background-image: url('${data.image.endsWith('.jpg') ? `${data.image}`:`https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg`}'); background-size: cover;" >
                            </div>
                            <div class="col-md-8 px-md-5" >
                                <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${companyId}">
                                    <div class="card-body " >
                                        <p class="">${data.id}</p>
                                        <p class=" "> <i class="fa fa-map-marker fa-lg  p-1"></i> ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra dirección"},${data.commune != null & data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}</p>
                                        <h3 class="card-title text-title-transform" style="font-weight: bold;">${data.title}</h3>
                                        <hr width="100%" size="5"  ></hr>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="row">
                                                    <div class="col-12"><h5>Habitaciones</h5></div>
                                                    <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</div>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="row">
                                                    <div class="col-12"><h5>UF</h5></div>
                                                    <div class="col-12">${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</div>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="row">
                                                    <div class="col-12"><h5>M2</h5></div>
                                                    <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != null ? data.surface_m2 : "0"}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row text-start">
                                            <div class="col-12 pt-3">
                                                <h5>Descripcion</h5>
                                            </div>
                                        </div>
                                        <p class="card-text text-start text-descrip-transform">
                                        ${data?.description || "No hay descripción"}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
        };

        let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        };
    };
}
