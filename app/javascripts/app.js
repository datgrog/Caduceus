const caduceus = Caduceus.deployed();
const NB_TABLE = 3;
var DOMtable = [];
var accounts;
var account;

function updateTable(kidneyData) {
    // kidneyData [60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,0]);
    let kidneyDataIdx = 0;

    console.log(kidneyData.toString());

    for(let tableIndex=0; tableIndex < NB_TABLE; tableIndex++) {
        for(let dataIdx=0; dataIdx < DOMtable[tableIndex].childElementCount; dataIdx++) {
            // /!\ STRING
            const currentKidneyDataValue = kidneyData[kidneyDataIdx].toString();

            if(currentKidneyDataValue === '65535') {
                DOMtable[tableIndex].children[dataIdx].innerHTML = 'NA';
            } else {
                switch(kidneyDataIdx) {
                    case 2:
                        DOMtable[tableIndex].children[dataIdx].innerHTML = '1.0'+currentKidneyDataValue;
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                        // check bignumber js methods https://github.com/MikeMcl/bignumber.js/
                        // 10 to 13 are float value;
                        DOMtable[tableIndex].children[dataIdx].innerHTML = kidneyData[kidneyDataIdx].div(100).toString();
                        break;
                    case 14:
                    case 15:
                        // (normal,abnormal) -> rbc Red Blood Cells || pc  Pus Cell
                        DOMtable[tableIndex].children[dataIdx].innerHTML = (currentKidneyDataValue === '1') ? 'normal' : 'abnormal';
                        break;
                    case 16 :
                    case 17:
                        // (present,notpresent) -> pcc Pus Cell clumps || ba  Bacteria
                        DOMtable[tableIndex].children[dataIdx].innerHTML = (currentKidneyDataValue === '1') ? 'present' : 'notpresent';
                        break;
                    case 18:
                    case 19:
                    case 20:
                    case 22:
                    case 23:
                        // (yes,no) -> htn Hypertension dm  || Diabetes Mellitus cad || cad Coronary Artery Disease
                        // (yes,no) -> pe  Pedal Edema      || ane Anemia
                        DOMtable[tableIndex].children[dataIdx].innerHTML = (currentKidneyDataValue === '1') ? 'yes' : 'no';
                        break;
                    case 21:
                        // (good,poor) -> appet Appetite
                        DOMtable[tableIndex].children[dataIdx].innerHTML = (currentKidneyDataValue === '1') ? 'good' : 'poor';
                        break;
                    default:
                        DOMtable[tableIndex].children[dataIdx].innerHTML = currentKidneyDataValue;
                }
            }
            kidneyDataIdx++;
        }
    }
}

// SHOULD NOT BE USED AFTER EVENT BECAUSE MAPPING ADDRESS NOT ID
function isAccountRegistered() {
    return new Promise(function(resolve) {

        caduceus.getNextPatientId().then(function(maxPatientId) {
            resolve(maxPatientId.toString());
        }).catch(function(e) {
            console.log(e);
            setStatus("Error getMyKidneyData(); see log.");
        });
    });
}

function getMyKidneyData() {
    return new Promise(function(resolve) {

        caduceus.getKidneyDataFromPatientId(2).then(function (kidneyData) {
            resolve(kidneyData);
        }).catch(function(e) {
            console.log(e);
            setStatus("Error getMyKidneyData(); see log.");
        });
    });

}

function toggleTable() {
    return new Promise(function(resolve) {
        for(let tableIndex=0; tableIndex < NB_TABLE; tableIndex++) {
            // make class 'hide' disappear
            DOMtable[tableIndex].parentElement.parentElement.className = "table";
            resolve();
        }
    });
}

window.onload = function() {

    DOMtable.push(document.getElementById('decimal'));
    DOMtable.push(document.getElementById('float'));
    DOMtable.push(document.getElementById('nominal'));

    web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        } else if (accs.length == 0) {
          alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        } else {
            var metamask = document.getElementById("metamask");
            metamask.className = "fa fa-check-circle fa-2x";
        }

        accounts = accs;
        account = accounts[0];

        // NOP
/*        isAccountRegistered().then(function(maxPatientId) {
            for(let patientId = 0; patientId < maxPatientId.valueOf(); patientId++) {
                caduceus.getContactFromPatientId(patientId).then(function(address) {
                    console.log(address);
                })
            }
        });*/

        getMyKidneyData()
            .then(updateTable)
            .then(toggleTable)
            .catch(function (error) {
                console.log(error);
            })
  });
}
