const caduceus = Caduceus.deployed();
const NA_VALUE = 65535;

var accounts;
var account;

var radios;
var alert;

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

function sendMyKidneyData(kidneyData) {
    return new Promise(function(resolve) {
        alertValidation = alert.nextElementSibling;

        caduceus.addPatient(kidneyData, {from: account, gas: 270000}).then(function () {
            alertValidation.removeChild(alertValidation.firstElementChild);
            alertValidation.firstElementChild.innerHTML = "Votre ajout a bien été validé!";
            alertValidation.className = "alert alert-success";
            resolve();
        }).catch(function(e) {
            console.log(e);
            alertValidation.removeChild(alertValidation.firstElementChild);
            alertValidation.firstElementChild.innerHTML = "OUPS!!";
            setStatus("Error sendMyKidneyData(); see log.");
        });
    });
}

function submit() {
    if(isNotEmptyDecimalFloat()) {
        // merge decimal float and nominal value
        let kidneyData = getDecimalFloat().concat(getNominal());
        // insert specific gravity, albumin and sugar
        kidneyData.splice(2, 0, getOptionsValues()[0], getOptionsValues()[1], getOptionsValues()[2]);
        console.log('array to send');
        console.log(kidneyData);
        sendMyKidneyData(kidneyData).then(function () {
            console.log('done go reload or clear form and updateTable');
        })

    }
}

// TESTING PURPOSE
function updateData(patientId) {
    return new Promise(function(resolve) {

        caduceus.getKidneyDataFromPatientId(patientId).then(function (kidneyData) {
            resolve(kidneyData);
        }).catch(function(e) {
            console.log(e);
            setStatus("Error getMyKidneyData(); see log.");
        });
    }).then(updateTable)
      .then(toggleTable)
      .catch(function (error) {
          console.log(error);
      })
}

window.onload = function() {
    // form.js
    radios = document.getElementsByTagName("input");
    alert = document.getElementById("alert");

    // table.js
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

        getMyKidneyData()
            .then(updateTable)
            .then(toggleTable)
            .catch(function (error) {
                console.log(error);
            })
  });
};
