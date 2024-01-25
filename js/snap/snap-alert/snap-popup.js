createBackgroundOnLoad();
const snapBGVar = document.getElementById("snapBackground");

createBaseOnLoad();

const snapBaseVar = document.getElementById("snapBase");
const baseContentVar = document.getElementById("baseContent");

function createBackgroundOnLoad() {
    var newSnapBG = document.createElement("div");
    newSnapBG.id = "snapBackground";
    newSnapBG.className = "snap-background";
    document.body.appendChild(newSnapBG);
}

function createBaseOnLoad() {
    var newSnapBase = document.createElement("div");
    newSnapBase.id = "snapBase";
    newSnapBase.className = "snap-base";
    snapBGVar.appendChild(newSnapBase);

    var baseContentHtml = `<div id="baseContent" class="base-content-container"></div>`;
    newSnapBase.insertAdjacentHTML('beforeend', baseContentHtml);

    newSnapBase.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

const snap = {
    spark: function (options) {
        const {
            header = '',
            details = '',
            type = '',
            autoclose = 0,
            closeButton = true,
            defaultButton = false,
            defaultButtonText = "Ok",
            cancelButton = false,
            cancelButtonText = "Cancel",
            footer = "",
            htmlCode = "",
            width = 0,
        } = options;

        document.body.classList.add('snap-stop-scroll');

        snap.close();

        let iconSvgCode = '';

        if (width > 0) {
            snapBaseVar.style.width = width + "px";
        }

        if (type != "") {
            switch (type) {
                case "success":
                    iconSvgCode = `
            <svg viewBox="0 0 24 24">
              <polygon class="snapIcon" points="12,1 22,6.4 22,17.6 12,23 2,17.6 2,6.4" fill="none" stroke="#8BC34A" stroke-width="1" />
              <path fill="none" stroke="#8BC34A" stroke-width="2" d="M6,12 l4,4 l8,-8" class="snapIcon" />
            </svg>`;
                    break;
                case "error":
                    iconSvgCode = `
            <svg viewBox="0 0 24 24">
              <polygon class="snapIcon" points="12,1 22,6.4 22,17.6 12,23 2,17.6 2,6.4" fill="none" stroke="#FF0000" stroke-width="1" />
              <line x1="8" y1="8" x2="16" y2="16" stroke="#FF0000" stroke-width="2" class="snapIcon" />
              <line x1="16" y1="8" x2="8" y2="16" stroke="#FF0000" stroke-width="2" class="snapIcon" />
            </svg>`;
                    break;
                case "warning":
                    iconSvgCode = `
            <svg viewBox="0 0 24 24">
              <path class="snapIcon" fill="none" stroke="#e9d312" stroke-width="2" d="M12,1 L23,22 H1 Z" />
              <text class="snapIcon" x="12" y="15" font-size="14" fill="#e9d312" text-anchor="middle" dominant-baseline="middle">!</text>
              </svg>`;
                    break;
                case "info":
                    iconSvgCode = `
                  <svg viewBox="0 0 24 24">
                  <polygon class="snapIcon" points="12,1 22,6.4 22,17.6 12,23 2,17.6 2,6.4" fill="none" stroke="#bd5ec3" stroke-width="1" />
                  <text class="snapIcon" x="12" y="13" font-size="14" fill="#bd5ec3" text-anchor="middle" dominant-baseline="middle">&#8505;</text>
            </svg>`;
                    break;
            }

            if (iconSvgCode != "") {
                var iconCode = `<div class="snap-icon">${iconSvgCode}</div>`;
                baseContentVar.insertAdjacentHTML('beforeend', iconCode);
            }
        }

        if (closeButton) {
            var closeIconCode = '<div class="snap-close" onclick="snap.close()"><div>&times;</div></div>';
            baseContentVar.insertAdjacentHTML('beforeend', closeIconCode);
            snapBGVar.addEventListener("click", closeHandler);
        } else {
            snapBGVar.removeEventListener("click", closeHandler);
        }

        if (header != "") {
            var headerCode = `<div class="snap-header snap-top-margin-3">${header}</div>`;
            baseContentVar.insertAdjacentHTML('beforeend', headerCode);
        }

        if (details != "") {
            var detailsCode = `<div class="snap-details snap-top-margin-1">${details}</div>`;
            baseContentVar.insertAdjacentHTML('beforeend', detailsCode);
        }

        if (htmlCode != "") {
            var htmlCodeCode = `<div class="snap-manual-html snap-top-margin-3">${htmlCode}</div>`;
            baseContentVar.insertAdjacentHTML('beforeend', htmlCodeCode);
        }

        if (defaultButton) {
            var defaultButtonCode = `<button class="snap-button snap-button-black snap-top-margin-3" snap-btn-val='true'>${defaultButtonText}</button>`;
            baseContentVar.insertAdjacentHTML('beforeend', defaultButtonCode);
        }

        if (cancelButton) {
            var cancelButtonCode = `<button class="snap-button snap-button-white snap-top-margin-1" snap-btn-val='false'>${cancelButtonText}</button>`;
            baseContentVar.insertAdjacentHTML('beforeend', cancelButtonCode);
        }

        if (footer != "") {
            var footerCode = `<div class="snap-footer snap-top-margin-2">${footer}</div>`;
            baseContentVar.insertAdjacentHTML('beforeend', footerCode);
        }

        snapBGVar.style.display = "grid";

        if (autoclose > 0) {
            // const lineLoadingElement = document.getElementById('lineLoading');
            // const lineLoadingWidth = 100;

            const animationSpeed = autoclose / 100;

            // let currentWidth = lineLoadingWidth;
            // const interval = setInterval(() => {
            //     currentWidth -= 1;
            //     lineLoadingElement.style.width = currentWidth + '%';

            //     if (currentWidth <= 0) {
            //         clearInterval(interval);
            //     }
            // }, animationSpeed);

            setTimeout(() => {
                snap.close();
            }, autoclose);
        }

        let allBtns = baseContentVar.getElementsByTagName('button');

        return new Promise((resolve) => {
            for (let index = 0; index < allBtns.length; index++) {
                let button = allBtns[index];
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (button.hasAttribute("snap-btn-val")) {
                        var snapBtnVal = button.getAttribute("snap-btn-val");
                        resolve(snapBtnVal);
                    } else {
                        resolve(button.id);
                    }
                    snap.close();
                });
            }
        });
    },
    close: function () {
        document.body.classList.remove('snap-stop-scroll');
        snapBaseVar.classList.remove('animate-snap-base');
        snapBGVar.style.display = "none";
        baseContentVar.innerHTML = "";
    },
};

function closeHandler() {
    snap.close();
}
