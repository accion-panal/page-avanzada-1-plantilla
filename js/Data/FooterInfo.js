import { FooterInformation } from '../Data/userId.js';

const loadInformation = () => {
    let contact = document.getElementById('contact-footer');
    if (contact !== null) {
        contact.innerHTML = `
            <div class="widget">
                <h3 class="p-1 pt-2">Contacto</h3>
                <div class="row pt-2">
                    <div class="col-12">
                        <p class="">
                            <i class="fa fa-map-marker fa-lg  p-1"></i>
                            ${FooterInformation.address}
                        </p>
                    </div>
                    <div class="col-12">
                        <p class="">
                            <i class="fa fa-phone fa-lg  p-1"></i>
                            ${FooterInformation.phone}
                        </p>
                    </div>
                    <div class="col-12">
                        <p class="">
                            <i class="fa fa-envelope fa-lg  p-1"></i>
                            ${FooterInformation.email}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    let socialsData = FooterInformation.socials;
    let socials = document.getElementById('social-footer');
    if (socials !== null) {
        socials.innerHTML = socialsData.map(data => `
            <li><a href="${data.href}">${data.icon}</a></li>
        `).join("");
    }

    

}

loadInformation();