# Caduceus Project

Owners of medical record save specific health data from the web app and could allow external parties (oracles) to access his medical data in order to get a disease prediction.

* Medical Record : Web App using MetaMask as Ethereum blockchain provider allowing the using to interact with our smartcontract over testnet 'ropsten' network. We used Truffle framework.

* Data Science : Backend with MySQL and Azure ML to compute prediction. It was an implementation of a simple oracle and fetched data via ethjsonrpc from ConsenSys.

![Caduceus](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/3c/650485/59a49b4a01f724bb93e2fce58f65c34d-original.png)

[~~Caduceus website~~](http://caduceus-prototype.me/) Not live Anymore.

* address = '0x832826d9c32dd4d320754122109dbe16e10cb46b';
* abi = [{"constant":true,"inputs":[{"name":"patientId","type":"uint256"}],"name":"getKidneyDataFromPatientId","outputs":[{"name":"kidneyData","type":"uint16[24]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patientId","type":"uint256"}],"name":"getContactFromPatientId","outputs":[{"name":"contact","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"patientData","type":"uint16[24]"}],"name":"addPatient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNextPatientId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
* var caduceus = web3.eth.contract(abi).at('@contract');
* caduceus.addPatient([60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,0], {from: eth.coinbase, gas: 270000})
* web3.personal.unlockAccount(eth.coinbase) // Joseph il kiff ça haha #joke

/!\ didn't test sg 'NA' value
updateData(51) to update table with specific id
