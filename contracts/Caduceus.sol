pragma solidity ^0.4.7;

contract Caduceus {

/* uint16[24] kidneyData;
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * |                   DECIMAL VALUE                     |      FLOAT VALUE     |               NOMINAL VALUE                             |
 * ----------------------------------------------------------------------------------------------------------------------------------------
 * |  0  | 1  | 2  | 3  | 4  | 5   | 6  | 7   | 8   | 9  | 10 | 11 | 12  | 13   | 14  | 15 | 16  | 17 | 18  | 19 | 20  | 21    | 22 | 23  |
 * | age | bp | sg | al | su | bgr | bu | sod | pcv | wc | rc | sc | pot | hemo | rbc | pc | pcc | ba | htn | dm | cad | appet | pe | ane |
 * ----------------------------------------------------------------------------------------------------------------------------------------
 *
 * EXEMPLE :
 *                   | age | bp | sg | al | su | bgr | bu | sod | pcv | wc | rc | sc | pot | hemo | rbc | pc | pcc | ba | htn | dm | cad | appet | pe | ane |
 * caduceus.addPatient([60,  80,  25,   0,   0,   131,  10, 146,  41, 10700, 510, 50,  500,  1450,   1,   1,   0,    0,   0,    0,   0,     1,     0,   0]);
 *
 */

    struct Patient {
        address     contact;
        uint16[24]  kidneyData;
    }

    uint nextPatientId;
    mapping (uint256 => Patient) private patients;

    function Caduceus() {
        // addPatient([60,80,25,0,0,131,10,146,41,10700,510,50,500,1450,1,1,0,0,0,0,0,1,0,0]);
        // gas: 270000
    }

    function getNextPatientId() constant returns (uint256) {
        return nextPatientId;
    }

    function addPatient(uint16[24] patientData) {
        var patient = patients[nextPatientId];

        patient.contact = msg.sender;
        patient.kidneyData = patientData;

        nextPatientId++;
    }

    function getKidneyDataFromPatientId(uint256 patientId) constant returns (uint16[24] kidneyData) {
        kidneyData = patients[patientId].kidneyData;
    }

    function getContactFromPatientId(uint256 patientId) constant returns (address contact) {
        contact = patients[patientId].contact;
    }
}
