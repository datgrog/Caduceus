const caduceus = Caduceus.deployed();
var accounts;
var account;

console.log('hellow');
console.log(caduceus);

/*function getGreeter() {
    let greeeting_element = document.getElementById("greeting");
    greeter.greet().then((res) => {
        console.log('coucou : ' + res);
        greeeting_element.innerHTML = res;
    }).catch(function(e) {
        console.log(e);
        setStatus("Error setGreeter(); see log.");
    });
};

function setGreeter() {
    let newString = document.getElementById("greeting_content").value;
    // setStatus("Initiating transaction... (please wait)");

    greeter.setGreeting(newString, {from: account}).then((res) => {
        console.log('success!');
        // setStatus("Transaction complete!");
    }).catch(function(e) {
        console.log(e);
        setStatus("Error setGreeter(); see log.");
    });
};*/


function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};

/*function refreshBalance() {
    var meta = MetaCoin.deployed();

    meta.getBalance.call(account, {from: account})
        .then(function(value) {
            var balance_element = document.getElementById("balance");
            balance_element.innerHTML = value.valueOf();
        })
        .catch(function(e) {
            console.log(e);
            setStatus("Error getting balance; see log.");
        });
};

function sendCoin() {
    var meta = MetaCoin.deployed();

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    setStatus("Initiating transaction... (please wait)");

    meta.sendCoin(receiver, amount, {from: account}).then(function() {
        setStatus("Transaction complete!");
        refreshBalance();
    }).catch(function(e) {
        console.log(e);
        setStatus("Error sending coin; see log.");
    });
};*/

window.onload = function() {

    web3.eth.getAccounts(function(err, accs) {
        console.log("test");
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

        // refreshBalance();
  });
}
