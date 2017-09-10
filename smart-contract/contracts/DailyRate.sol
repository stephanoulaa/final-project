pragma solidity ^0.4.11;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol"

contract DailyRate is usingOraclize {

    string public btc_eth;

    event newOraclizeQuery(string description);
    event RateRetreive(string rate);

    function DailyRate() {
        update();   
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        RateRetrieved(result);
        btc_eth = result;
    }
    
    function update() payable {
        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        oraclize_query(60, "URL", "json(https://shapeshift.io/rate/btc_eth).rate");
    }
    
    //what i have a question about:
    function rateChange(btc_eth) {
        if (btc_eth < 14) {
            //do something
        } else if () {
            //do something
        } else if () {
            //do something else
        }
    }
    //how to print this somewhere??
}