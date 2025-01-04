var valuesContainer = document.querySelector('.A8SBwf');


var savedValuesDisplay = document.createElement('div');

savedValuesDisplay.style.display = 'flex';
savedValuesDisplay.style.gap = '20px';
savedValuesDisplay.style.flexDirection = 'row';
savedValuesDisplay.style.overflowY = 'hidden';
savedValuesDisplay.style.overflowX = 'overlay';
savedValuesDisplay.style.top='7px';
savedValuesDisplay.style.position='relative';
savedValuesDisplay.style.whiteSpace = 'nowrap';
savedValuesDisplay.style.border = '1px solid transparent';
savedValuesDisplay.style.fontSize='10px';
savedValuesDisplay.style.marginLeft='20px';
if (valuesContainer) {
  valuesContainer.appendChild(savedValuesDisplay);
}

chrome.storage.local.get(['savedTextareaValues'], function(result) {
    var savedValues = result.savedTextareaValues || [];

    function displaySavedValues() {
        savedValuesDisplay.innerHTML = '';
        savedValues.forEach(function(value, index) {
            var valueDiv = document.createElement('div');
            valueDiv.style.display = 'flex';
            valueDiv.style.cursor='pointer';
            valueDiv.style.alignItems = 'center';
            valueDiv.innerHTML = value + ' <span class="deleteButton" style="cursor: pointer; color: red; margin-left: 5px;">❌</span>';

            valueDiv.querySelector('.deleteButton').addEventListener('click', function() {
                savedValues.splice(index, 1);
                chrome.storage.local.set({ savedTextareaValues: savedValues }, displaySavedValues);
            });

            savedValuesDisplay.appendChild(valueDiv);
        });
    }

    displaySavedValues();


    var parentDiv = document.querySelector('.fM33ce');

    var containerDiv = document.createElement('div');
    if (parentDiv) {
        parentDiv.appendChild(containerDiv);


        var saveImage = document.createElement('img');
        saveImage.src = 'https://kevin-benabdelhak.fr/wp-content/uploads/2025/01/sauvegarder.svg';
        saveImage.alt = 'Sauvegarder';

 
        saveImage.style.width = '18px';
        saveImage.style.cursor = 'pointer';
        saveImage.style.marginTop = '13px';
        saveImage.style.marginLeft = '8px';
        saveImage.style.marginRight = '10px';

        containerDiv.appendChild(saveImage);


        saveImage.addEventListener('click', function(event) {
            event.preventDefault();
     
            var textarea = document.querySelector('textarea.gLFyf');
            if (textarea) {
                var valueToSave = textarea.value.trim();
                if (valueToSave && !savedValues.includes(valueToSave)) {
                    savedValues.push(valueToSave);
                    chrome.storage.local.set({ savedTextareaValues: savedValues }, displaySavedValues);
                }
            }
        });

        savedValuesDisplay.addEventListener('click', function(event) {
            if (event.target.matches('div') && event.target.childNodes.length > 1) {
                var textarea = document.querySelector('textarea.gLFyf');
                if (textarea) {
                    textarea.value = event.target.childNodes[0].nodeValue.trim();
                }
            }
        });

        var style = document.createElement('style');
        style.innerHTML = `
            .A8SBwf div::-webkit-scrollbar {
                height: 5px;
                background: red;
            }
            .A8SBwf div::-webkit-scrollbar-thumb {
                background: black;
            }
        `;
        document.head.appendChild(style);
    }
});