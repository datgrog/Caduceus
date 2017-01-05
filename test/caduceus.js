contract('Caduceus', function(accounts) {
    it("should have 0 patient in the patients mapping at first", function() {
        var caduceus = Caduceus.deployed();

        return caduceus.getNextPatientId().then(function(nextPatientId) {
            console.log('nextPatientId : ' + JSON.stringify(nextPatientId));
            assert.equal(nextPatientId.valueOf(), 0, "there is already at least 1 patient");
        });
    });
    it("should have the mapping properties initialise with 0 values", function() {
        var caduceus = Caduceus.deployed();

        return caduceus.getContactFromPatientId(0).then(function(contact) {
            console.log('contact : ' + JSON.stringify(contact));
            assert.equal(contact, '0x0000000000000000000000000000000000000000', "the address was already initialize without a patient");
        }).then(function() {
            return caduceus.getKidneyDataFromPatientId(0).then(function(kidneyData) {
                console.log('kidneyData : ' + JSON.stringify(kidneyData));
                // http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
                for (val of kidneyData) {
                    assert.equal(val.c[0], 0, "one index of kidneyData array is not 0");
                }
                assert.equal(kidneyData.length, 24, "the kidneyData array length is not 24");
            });
        });
    });
    it("should add and get a patient correctly", function() {
        var caduceus = Caduceus.deployed();

        return caduceus.addPatient([60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,0]).then(function() {
            console.log('patient has been added so we can retrieve it');
        }).then(function() {
            return caduceus.getKidneyDataFromPatientId(0).then(function(kidneyData) {
                console.log('kidneyData : ' + JSON.stringify(kidneyData));
            });
        }).catch(function(error) {
            console.log(error);
            assert.equal(1, 0, "set or get didn't work");
        });
    });
/*    it("should call a function that depends on a linked library", function() {
        var meta = MetaCoin.deployed();
        var metaCoinBalance;
        var metaCoinEthBalance;

        return meta.getBalance.call(accounts[0]).then(function(outCoinBalance) {
            metaCoinBalance = outCoinBalance.toNumber();
            return meta.getBalanceInEth.call(accounts[0]);
        }).then(function(outCoinBalanceEth) {
            metaCoinEthBalance = outCoinBalanceEth.toNumber();
        }).then(function() {
            assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpeced function, linkage may be broken");
        });
    });
/*    it("should send coin correctly", function() {
        var meta = MetaCoin.deployed();

        // Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;

        var amount = 10;

        return meta.getBalance.call(account_one).then(function(balance) {
            account_one_starting_balance = balance.toNumber();
            return meta.getBalance.call(account_two);
        }).then(function(balance) {
            account_two_starting_balance = balance.toNumber();
            return meta.sendCoin(account_two, amount, {from: account_one});
        }).then(function() {
            return meta.getBalance.call(account_one);
        }).then(function(balance) {
            account_one_ending_balance = balance.toNumber();
            return meta.getBalance.call(account_two);
        }).then(function(balance) {
            account_two_ending_balance = balance.toNumber();

            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
        });
    });*/
});
