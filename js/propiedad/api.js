import { getProperties } from "../services/PropertiesServices.js";
import { getPropertiesForCustomUrl } from "../services/PropertiesServices.js";
import { getRegiones, getCommune } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData,limitDataApi } from '../Data/userId.js'
import renderCall from "../propiedad/render.js";

export default async function apiCall() {
  const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
  let { data } = await getRegiones();

  let response;
  let storedGlobalQuery = localStorage.getItem('globalQuery');
  if (storedGlobalQuery) {
    response = JSON.parse(storedGlobalQuery);
    console.log('api :',response)
  }

  console.log(response);

  if(response != undefined){
      // hacer consulta a la api
      let operation = (response.operationType !== undefined && response.operationType !== null && response.operationType !== '') ? '&operationType=' + response.operationType : '';

      let typeOfProperty = (response.typeOfProperty !== undefined && response.typeOfProperty !== null && response.typeOfProperty !== '') ? '&typeOfProperty=' + response.typeOfProperty : '';
      // let nameRegion = (nameRegion !== undefined && nameRegion !== '') ? '&region=' + nameRegion : '';
      // let commune = (commune !== undefined && commune !== '') ? '&commune=' + commune : '';
      let bedrooms = (response.bedrooms !== undefined && response.bedrooms !== null && response.bedrooms !== '') ? '&bedrooms=' + response.bedrooms : '';
      let bathrooms = (response.bathrooms !== undefined && response.bathrooms !== null && response.bathrooms !== '') ? '&bathrooms=' + response.bathrooms : '';
      let parkingLots = (response.covered_parking_lots !== undefined && response.covered_parking_lots !== null && response.covered_parking_lots !== '') ? '&covered_parking_lots=' + response.covered_parking_lots : '';
      let minPrice = (response.min_price !== undefined && response.min_price !== null && response.min_price !== '') ? '&min_price=' + response.min_price : '';
      let maxPrice = (response.max_price !== undefined && response.max_price !== null && response.max_price !== '') ? '&max_price=' + response.max_price : '';


      let regionData = '';
      let nameRegion = '';
      let commune = '';

      if(response.region !== undefined && response.region !== null && response.region !== ''){
        regionData = data.regions.find(region => region.id == response.region);
        nameRegion = `&region=`+regionData.name;
        if(response.commune !== undefined && response.commune !== null && response.commune !== ''){
          let aux = await getCommune(response.region);
          const communeData = aux.data.find(commune => commune.id == response.commune);
          commune = `&commune=`+communeData.name;
        }
      }
      


      let urlFilters = operation+typeOfProperty+bedrooms+bathrooms+parkingLots+minPrice+maxPrice+nameRegion+commune;
      console.log('urlFilters: ',urlFilters)
      let response2 = await getPropertiesForCustomUrl(1,limitDataApi.limit,CodigoUsuarioMaestro,1,companyId,realtorId,urlFilters);
      localStorage.setItem('globalResponse', JSON.stringify(response2));

  }else{
    localStorage.removeItem('globalResponse');
  }

  renderCall();

  /* const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;

  let response = await getProperties(1, 2, CodigoUsuarioMaestro, 1, companyId, realtorId);
  let data = response.data;

  const buttons = document.getElementById("buttons");

  let btnNext;
  let btnPrev; */

  /* localStorage.setItem('globalResponse', JSON.stringify(response)); */
  /* console.log(data);
  console.log(response);

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
      //console.log('La opción seleccionada es MayorMenor');
      dataOrdenada = data.sort((a, b) => b.price - a.price);
    } else {
      // console.log('La opción seleccionada es Menor mayor');
      dataOrdenada = data.sort((a, b) => a.price - b.price);
    }
    console.log(dataOrdenada);
    showItems();
  }

  document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas
	</span>`;


  function showItems() {
    document.getElementById("container-propiedad").innerHTML = data.map(data =>
      `<div class="col-xs-12 col-md-6 col-lg-4">
     <div class="property-item mb-30">
                 <div class="border" style="background-image: url('images/img_1.jpg')">
                     <div class="shadow-properties m-3">
                         <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${1}" class="img">
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
    localStorage.setItem('globalResponse', JSON.stringify(response));
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
    localStorage.setItem('globalResponse', JSON.stringify(response));
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


