$(document).ready(function() {
    
//    $.get('https://coinmap.org/api/v1/venues/', function(){
//        console.log(data);
//    })



    $.get('/exchange', function(data) {
        console.log(data)
        //newData = JSON.parse(data)
        console.log('Exchange Rate: ', data.data.rates.USD)
        $('#exchange').append(data.data.rates.USD)
        //if above 4900 - record-breaking, sell as much as 40% of your wallet
        if (data.data.rates.USD >= 4900) {
            $('#alert4900').show();
        } else {
            $('#alert4900').hide();
        }
        //if above 4500 - don't sell more than 15% of what's in your wallet
        if (data.data.rates.USD >= 4500) {
            $('#alert4500').show();
        } else {
            $('#alert4500').hide();
        }
        //if above 4000 - decent time to buy some bitcoin, maybe about 100 dollars worth of it
        if (data.data.rates.USD >= 4000) {
            $('#alert4000above').show();
        } else {
            $('#alert4000above').hide();
        }
        //if 4000 or below - if you're feeling conservative, buy $100 worth of bitcoin 
        if (data.data.rates.USD < 4000) {
            $('#alert4000').show();
        } else {
            $('#alert4000').hide();
        }
        //if below 3700 - buy about $200 worth of bitcoin
        if (data.data.rates.USD <= 3700) {
            $('#alert3700').show();
        } else {
            $('#alert3700').hide();
        }
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
    

                                                
}); //end of $(document).ready


//
//
//    twttr.widgets.createTimeline(
//  {
//    sourceType: "profile",
//    screenName: "Coindesk"
//  },
//  document.getElementById("container")
//);