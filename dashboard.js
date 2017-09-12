$(document).ready(function() {
    
//    $.get('https://coinmap.org/api/v1/venues/', function(){
//        console.log(data);
//    })
//    
//    $.get('/https://api.coinbase.com/v2/exchange-rates', function(){
//        console.log(data);  
//    })
    
    
    $.get('/exchange', function(data) {
        console.log(data)
        //newData = JSON.parse(data)
        console.log('Exchange Rate: ', data.data.rates.USD)
        $('#exchange').append(data.data.rates.USD)
    });
    
    
    $.get('/buy', function(data) {
        console.log(data)
        //newData = JSON.parse(data)
        console.log('Current Buy Price: ', data.data.amount)
        $('#buyPrice').append(data.data.amount)
    });
    
    $.get('/sell', function(data) {
        console.log(data)
        //newData = JSON.parse(data)
        console.log('Current Sell Price: ', data.data.amount)
        $('#sellPrice').append(data.data.amount)
    });
    
    
    //var exchangeRate = data.data.rates.USD;
    //console.log(data.data.rates.USD);
    
    //$('#exchange').add('<div>'+'</div>');
                                                
}); //end of $(document).ready