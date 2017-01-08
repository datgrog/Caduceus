// assign 'NA' to input related to current checkbox element
function disableInput(el) {
    let inputState = el.parentElement.nextElementSibling.disabled;

    el.parentElement.nextElementSibling.disabled = !inputState;

    if(!inputState) {
        el.parentElement.nextElementSibling.placeholder = 'NA';
        el.parentElement.nextElementSibling.value = null;
    } else {
        el.parentElement.nextElementSibling.placeholder = '';
        el.parentElement.nextElementSibling.value = 0;
    }
}

// check if number field are not empty
function isNotEmptyDecimalFloat() {
    var msg = "Oh snap! Les champs suivants ne sont pas remplient : ";
    let valid = true;

    for(let x = 0; x < radios.length; x++) {
        if(radios[x].type == "number" && radios[x].value == '' && radios[x].disabled === false) {
            valid = false;
            msg += radios[x].name+", ";
        }
    }
    alert.firstElementChild.innerHTML = msg;

    /*
     * ALERT POPIN/POPOUT
     */
    alertValidation = alert.nextElementSibling;
    if (!valid) {
        // alert
        alert.className = "alert alert-danger";
        return false;
    } else {
        // pas alert
        alert.className = "alert alert-danger hide1";
        alertValidation.className = "alert alert-success";
        return true;
    }
}

// get both decimal and float (still decimal for now) inputs value
function getDecimalFloat() {
    let values = [];
    let currentInputValue;

    for(let x = 0; x < radios.length; x++) {
        if(radios[x].type == "number" ) {
            currentInputValue = radios[x].value;

            // field set to 'NA'
            if (radios[x].disabled === true) {
                values.push(65535);
            }
            // field not empty and decimal
            else {
                values.push(parseInt(radios[x].value));
            }
            // TODO Si on recup une valeur float on la represente comme specifie dans le contrat avec * 100

        }
    }
    return values;
}

// get nominal inputs value
function getNominal() {
    let values = [];

    for(var x = 0; x < radios.length; x++){
        if(radios[x].type == "radio" && radios[x].checked){
            values.push(parseInt(radios[x].value));
        }
    }

    return values;
}

// get specific blood pressure field
function getBloodPressure() {
    let bp = document.getElementById("bp");

    return (bp.selectedIndex * 5) + 5;
}