pragma solidity ^0.4.7;

contract Caduceus {

/* uint16[25] kidneyData;
 * -------------------------------------------------------------------------------------------------------------------------------------------------
 * |                   DECIMAL VALUE                     |      FLOAT VALUE     |               NOMINAL VALUE                             | RESULT |
 * -------------------------------------------------------------------------------------------------------------------------------------------------
 * |  0  | 1  | 2  | 3  | 4  | 5   | 6  | 7   | 8   | 9  | 10 | 11 | 12  | 13   | 14  | 15 | 16  | 17 | 18  | 19 | 20  | 21    | 22 | 23  |   24   |
 * | age | bp | sg | al | su | bgr | bu | sod | pcv | wc | rc | sc | pot | hemo | rbc | pc | pcc | ba | htn | dm | cad | appet | pe | ane |   res  |
 * -------------------------------------------------------------------------------------------------------------------------------------------------
 *
 * EXEMPLE :
 *                   | age | bp | sg | al | su | bgr | bu | sod | pcv | wc | rc | sc | pot | hemo | rbc | pc | pcc | ba | htn | dm | cad | appet | pe | ane |
 * caduceus.addPatient([60,  80,  25,   0,   0,   131,  10, 146,  41, 10700, 510, 50,  500,  1450,   1,   1,   0,    0,   0,    0,   0,     1,     0,   0]);
 *
 */

    struct Patient {
        uint16[25]  kidneyData;
    }

    // datascience backend
    address oracle = 0x38bbe4a93b886224e25f8df5f3dc393f9cc26cd8;
    mapping (address => Patient) private patients;

    modifier onlyOracle() {
        if (msg.sender != oracle) throw;
        _;
    }

    function Caduceus() {
        // addPatient([60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,0, 65535]);
        // gas: 270000
    }

    function addPatient(uint16[24] patientData) {
        var patient = patients[msg.sender];
        patient.kidneyData = patientData;
    }


    function setKidneyDataResult(uint16 patientResult, address patientAddress)  {
        patients[patientAddress].kidneyData[24] = patientResult;
    }

    function getKidneyData() constant returns (uint16[25] kidneyData) {
        kidneyData = patients[msg.sender].kidneyData;
    }

}
