contract('Caduceus', function(accounts) {
    it("should have the mapping properties initialise with 0 values", function() {
        var caduceus = Caduceus.deployed();

        return caduceus.getKidneyData(accounts[0]).then(function(kidneyData) {
            console.log('kidneyData : ' + JSON.stringify(kidneyData));
            // http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
            for (val of kidneyData) {
                assert.equal(val.c[0], 0, "one index of kidneyData array is not 0");
            }
            assert.equal(kidneyData.length, 25, "the kidneyData array length is not 25");
        });
    });
    it("should add and get a patient correctly", function() {
        var caduceus = Caduceus.deployed();

        return caduceus.addPatient([60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,1]).then(function() {
            console.log('patient has been added so we can retrieve it');
        }).then(function() {
            return caduceus.getKidneyData(accounts[0]).then(function(kidneyData) {
                console.log('kidneyData : ' + JSON.stringify(kidneyData));
            });
        }).catch(function(error) {
            console.log(error);
            assert.equal(1, 0, "set or get didn't work");
        });
    });
    it("should add and get result of patient kidneyData correctly", function() {
        var caduceus = Caduceus.deployed();

        // invalid JUMP when onlyOracle modifier is active
        return caduceus.setKidneyDataResult(45, accounts[0]).then(function() {
            console.log('patient\'s result has been added so we can retrieve it');
        }).then(function() {
            return caduceus.getKidneyData(accounts[0]).then(function(kidneyData) {
                console.log('kidneyData : ' + JSON.stringify(kidneyData));
                assert.equal(kidneyData[24], 45, "kidneyData first account res is not 45");
            });
        }).catch(function(error) {
            console.log(error);
            assert.equal(1, 0, "set or get didn't work");
        });
    });
});
