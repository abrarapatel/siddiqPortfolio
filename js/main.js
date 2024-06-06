fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let companyName = data.companyName;
        let landingText = data.landingText;

        landingText = landingText.replace("{[companyName]}", companyName);

        document.getElementById('landingText').innerHTML = landingText;

        let servicesData = data.services;

        let serviceCode = ``;

        let index = 0;

        servicesData.forEach(element => {
            index++;
            let imageSrc = element.imageName;
            let head = element.head;
            let details = element.details ? element.details : "";

            serviceCode += `<div class="service-card">
                                <div class="service-image"><img src="./Images/${imageSrc}"></div>
                                <div class="service-head">${head}</div>
                                <div class="service-details">${details}</div>
                                <div class="service-poster"><button onclick="generateImage(this,${index})"><i class="fa fa-share"></i> Share</button></div>
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

        let aboutText = data.aboutText;

        document.getElementById("aboutText").innerText = aboutText;

        const urlParams = new URLSearchParams(window.location.search);

        const showService = urlParams.get('showService');

        if (showService) {
            var serviceCards = document.getElementsByClassName("service-card");

            var htmlCode = serviceCards[showService - 1].innerHTML;

            snap.spark({
                htmlCode: htmlCode,
            });
        }
    }).catch(error => console.error('Error fetching data:', error));

function generateImage(element, index) {

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            let companyName = data.companyName;
            let contactData = data.contact;

            let contactCode = `<div class="share-contact-detail-container">
            <div>`;

            contactData.forEach(element => {
                let icon = element.icon;
                let text = element.text;
                let share = element.share;

                if (share) {
                    contactCode += `<div class="share-contact-detail">
                                        <div class="share-contact-icon">
                                            <i class="${icon}"></i>
                                        </div>
                                        <div class="share-contact-text">${text}</div>
                                    </div>`;
                }
            });

            contactCode += `</div></div>`;

            let parentElement = element.parentElement.parentElement;

            let shareUrl = window.location.origin + window.location.pathname + "?showService=" + index;

            let shareHtmlCode = ``;

            shareHtmlCode += `<div class="service-card-share" id="serviceCardShare">`;

            shareHtmlCode += `<div class="service-head">${companyName}</div>`;

            shareHtmlCode += parentElement.getElementsByClassName('service-image')[0].outerHTML;
            shareHtmlCode += parentElement.getElementsByClassName('service-head')[0].outerHTML;

            shareHtmlCode += contactCode;

            shareHtmlCode += `<svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(191, 32, 52, 1)" offset="0%"></stop><stop stop-color="rgba(191, 32, 52, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,70L10,58.3C20,47,40,23,60,25C80,27,100,53,120,66.7C140,80,160,80,180,76.7C200,73,220,67,240,53.3C260,40,280,20,300,11.7C320,3,340,7,360,6.7C380,7,400,3,420,6.7C440,10,460,20,480,28.3C500,37,520,43,540,43.3C560,43,580,37,600,36.7C620,37,640,43,660,50C680,57,700,63,720,70C740,77,760,83,780,73.3C800,63,820,37,840,31.7C860,27,880,43,900,51.7C920,60,940,60,960,50C980,40,1000,20,1020,18.3C1040,17,1060,33,1080,48.3C1100,63,1120,77,1140,75C1160,73,1180,57,1200,46.7C1220,37,1240,33,1260,38.3C1280,43,1300,57,1320,58.3C1340,60,1360,50,1380,45C1400,40,1420,40,1430,40L1440,40L1440,100L1430,100C1420,100,1400,100,1380,100C1360,100,1340,100,1320,100C1300,100,1280,100,1260,100C1240,100,1220,100,1200,100C1180,100,1160,100,1140,100C1120,100,1100,100,1080,100C1060,100,1040,100,1020,100C1000,100,980,100,960,100C940,100,920,100,900,100C880,100,860,100,840,100C820,100,800,100,780,100C760,100,740,100,720,100C700,100,680,100,660,100C640,100,620,100,600,100C580,100,560,100,540,100C520,100,500,100,480,100C460,100,440,100,420,100C400,100,380,100,360,100C340,100,320,100,300,100C280,100,260,100,240,100C220,100,200,100,180,100C160,100,140,100,120,100C100,100,80,100,60,100C40,100,20,100,10,100L0,100Z"></path></svg>`;

            shareHtmlCode += `</div>`;

            shareHtmlCode += `<input type="text" class="shareLinkCopyInput" id="shareLinkCopyInput" value="${shareUrl}" disabled>`;
            shareHtmlCode += `<div class="shareFinalButtonContainer">
                                <div class="div-button" onclick="navigator.clipboard.writeText('${shareUrl}');this.innerText='Copied'">Copy URL</div>
                                <div class="div-button" onclick="downloadShareImage()">Download Image</div>
                                </div>`;
            shareHtmlCode += ``;

            snap.spark({
                htmlCode: shareHtmlCode,
            });
        }).catch(error => console.error('Error fetching data:', error));
}

function downloadShareImage() {

    html2canvas(document.getElementById('serviceCardShare')).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.href = imgData;
        link.download = 'exportedDiv.png';
        link.click();
    });
    snap.close();
}