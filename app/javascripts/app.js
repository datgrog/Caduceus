const caduceus = Caduceus.deployed();
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
            alertValidation.firstElementChild.innerHTML = "OUBS!!";
            setStatus("Error sendMyKidneyData(); see log.");
        });
    });
}

function submit() {
    if(isNotEmptyDecimalFloat()) {
        // merge decimal float and nominal value
        var kidneyData = getDecimalFloat().concat(getNominal());
        // insert blood pressure
        kidneyData.splice(1, 0, getBloodPressure());

        sendMyKidneyData(kidneyData).then(function () {
            console.log('done bro go reload or clear form and updateTable');
        })

    }
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
