import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";
import { PropertyData } from "../Data/userId.js";
import renderCall from "../propiedad/render.js";

export default async function apiCallList() {

  renderCall();
  /* const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
  let response = await getProperties(1, 2, CodigoUsuarioMaestro, 1, companyId, realtorId);
  let data = response.data;

  const buttons = document.getElementById("buttons");

  let btnNext;
  let btnPrev;
  console.log(data);


  let storedGlobalResponse = localStorage.getItem('globalResponse');
  let globalResponse;

  if (storedGlobalResponse) {
    globalResponse = JSON.parse(storedGlobalResponse);
  }
  console.log('stored: ',globalResponse);
  console.log('meta: ',globalResponse.meta);
  console.log('data: ',globalResponse.data);

  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor;
  const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

  const filtroSelect = document.getElementById('FilterPrice');
  filtroSelect.addEventListener('change', handleFilterChange);
  showItems();

  function handleFilterChange() {
    const selectedValue = filtroSelect.value;
    console.log(selectedValue);
    console.log(data);
  
    let dataOrdenada;
  
    if (selectedValue === 'MayorMenor') {
      // console.log('La opción seleccionada es MayorMenor');
      dataOrdenada = data.sort((a, b) => b.price - a.price);
    } else {
      // console.log('La opción seleccionada es Menor mayor');
      dataOrdenada = data.sort((a, b) => a.price - b.price);
    }
    console.log(dataOrdenada);
    showItems();
  } */

  /* document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas
	</span>`;


  function showItems() {
    document.getElementById("container-propiedad-list").innerHTML = data.map(data =>
     `<div class="col-12" style="padding-left: 10%; padding-right: 10%;">
     <div class="card mb-3 text-center carta " style="max-width: 100%;">
         <div class="row no-gutters ">
               <div class="col-md-4" style="background-image: url(images/img_1.jpg);" >
               </div>
             <div class="col-md-8 px-md-5" >
                 <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${1}">
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
     `
  ).join("");
  } */
  
  /* Paginado */
  /* let countPage = 1;
  async function handleNextPage(){
    countPage+=1;
    response = await getProperties(countPage, 2, CodigoUsuarioMaestro, 1, companyId, realtorId);
    data = response.data;

    if(data.length === 0){
      countPage-=1;
      console.log('pagina maxima')
      return;
    }
    console.log(countPage);
    console.log(response);
    console.log(data);
    document.getElementById("current-pagination").innerHTML = countPage;
    showItems();
  }
  
  async function handlePrevPage(){
    if(countPage === 1){
      console.log('pagina minima 1');
      return;
    }
    countPage-=1;
    response = await getProperties(countPage, 2, CodigoUsuarioMaestro, 1, companyId, realtorId);
    data = response.data;

    document.getElementById("current-pagination").innerHTML = countPage;
    console.log(countPage);
    showItems();
  }
  console.log(countPage);

  let pagination = document.getElementById('pagination-col');
  if (pagination !== null) {
    pagination.innerHTML = `
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item">
          <button id='prevButton' class="page-link" href="#">Previous</button>
          </li>
          <li class="page-item disabled"><a id='current-pagination' class="page-link" href="#">1</a></li>
          <li class="page-item">
          <button id='nextButton' class="page-link" href="#">Next</button>
          </li>
        </ul>
      </nav>
    `
  };

  const nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', handleNextPage);

  const prevButton = document.getElementById('prevButton');
  prevButton.addEventListener('click', handlePrevPage); */

}


