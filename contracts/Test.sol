pragma solidity ^0.4.0;

contract Test {
    event Deposit(
        address indexed _from,
        bytes32 indexed _id
    );

    function deposit(bytes32 _id) {
        // Any call to this function (even deeply nested) can
        // be detected from the JavaScript API by filtering
        // for `Deposit` to be called.
        Deposit(msg.sender, _id);
    }

}