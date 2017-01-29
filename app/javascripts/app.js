const caduceus = Caduceus.deployed();
const NA_VALUE = 65535;

var accounts;
var account;

var radios;
var alert;
var prediction;

function getMyKidneyData() {
    return new Promise(function(resolve, reject) {
        let isInitialized = false;

        console.log('current account : ' + account);
        caduceus.getKidneyData(account).then(function (kidneyData) {
            // isInitialized ?
            for (dataValue of kidneyData) {
                if (dataValue.c[0] !== 0) {
                    isInitialized = true;
                    break;
                }
            }
            console.log('isInitialized : ' + isInitialized);

            if (isInitialized) {
                document.getElementById('alertData').className = 'alert alert-danger hide1';
                document.getElementById('kidneyDataRes').className = '';
                if (65535 == kidneyData[24]) {
                    prediction.innerHTML = "La prédiction n'est pas encore disponible, réessayer plus tard";
                } else {
                    prediction.innerHTML = kidneyData[24].toString() + "%";
                }
                console.log(kidneyData);
                resolve(kidneyData);
            } else {
                document.getElementById('alertData').className = 'alert alert-danger';
                document.getElementById('kidneyDataRes').className = 'hide1';
            }

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
            return getMyKidneyData()
                .then(updateTable)
                .then(toggleTable)
                .catch(function (error) {
                    console.log(error);
                })
        })

    }
}

function updateData(customAdress) {
    return new Promise(function(resolve) {
        console.log('wtf ?? account : ' + customAdress);
        caduceus.getKidneyData(customAdress).then(function (kidneyData) {
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
    prediction = document.getElementById('prediction');

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
