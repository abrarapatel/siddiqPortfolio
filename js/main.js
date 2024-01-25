
fetch('..json/data.json')
    .then(response => response.json())
    .then(data => {
        let servicesData = data.services;

        let serviceCode = ``;

        servicesData.forEach(element => {
            let imageSrc = element.imageName;
            let head = element.head;
            let details = element.details;

            serviceCode += `<div class="service-card">
                        <div class="service-image"><img src="./Images/${imageSrc}"></div>
                        <div class="service-head">${head}</div>
                        <div class="service-details">${details}</div>
                    </div>`;
        });

        document.getElementById("serviceCardsContainer").innerHTML = serviceCode;

        let contactData = data.contact;

        let contactCode = ``;

        contactData.forEach(element => {
            let icon = element.icon;
            let head = element.head;
            let text = element.text;
            let value = element.value;

            contactCode += `<div class="contact-detail">
                        <div class="contact-icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="contact-head">${head}</div>
                        <a class="contact-value" href="${value}">${text}</a>
                    </div>`;
        });

        document.getElementById("contactDetailsContainer").innerHTML = contactCode;
    }).catch(error => console.error('Error fetching data:', error));


document.addEventListener('DOMContentLoaded', showService());

function showService() {
    const urlParams = new URLSearchParams(window.location.search);

    const showService = urlParams.get('showService');

    if (showService) {
        var serviceCards = document.getElementsByClassName("service-card");

        var htmlCode = serviceCards[showService - 1].innerHTML;

        snap.spark({
            htmlCode: htmlCode,
        });
    }
}
