import { getProperties } from "../services/PropertiesServices.js"
import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";
import { PropertyData } from "../Data/userId.js";

export default async function apiDestCall() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let {data} = await getProperties(1, 10, CodigoUsuarioMaestro, 1, companyId, realtorId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    //todo: Modificar url de image
    data = data.map(item => {
        // Reemplazar "\\" por "//" en la propiedad "image"
        item.image = item.image.replace(/\\/g, "//");
        return item;
    });
      
    document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<li class="splide__slide">
            <div class="property-item mb-30">
                <div class="border" style="background-image: url('${data.image.endsWith('.jpg') ? `${data.image}`:`https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg`}'); background-size: cover;">
                    <div class="shadow-properties m-3">
                        <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${companyId}" class="img">
                            <div class="property-content text-center" >
                                <div class="card-body">
                                    <p class="">${data.id}</p>
                                    <p class=" "> <i class="fa fa-map-marker fa-lg  p-1"></i> ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra dirección"},${data.commune != null & data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}</p>
                                    <h3 class="card-title text-transform" style="font-weight: bold;">${data.title}</h3>
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
                                                <div class="col-12">${clpToUf(data.price, ufValueAsNumber)}</div>
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
        </li>`
          ).join('');

          let splide = new Splide(".splide", {
            type    : 'loop',
            perPage : 3,
            autoplay: 'play',
            // autoWidth: true,
            drag:true,
            breakpoints:{
                1399:{
                    perPage:2
                },
                991:{
                    perPage:1
                }
            }

            
        });
        splide.mount();
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});