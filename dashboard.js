$(document).ready(function() {
    
//    $.get('https://coinmap.org/api/v1/venues/', function(){
//        console.log(data);
//    })

    
    //DO I NEED THIS?????
    $.get('/graph', function(data){
        ctx.show();
    })

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
        //if between 4500 and 4900 - don't sell more than 15% of what's in your wallet
        if ((data.data.rates.USD >= 4500) && (data.data.rates.USD < 4900)) {
            $('#alert4500_4900').show();
        } else {
            $('#alert4500_4900').hide();
        }
        //if between 4000 and 4500 - decent time to buy some bitcoin, maybe about 100 dollars worth of it
        if ((data.data.rates.USD >= 4000) && (data.data.rates.USD < 4500)) {
            $('#alert4000_4500').show();
        } else {
            $('#alert4000_4500').hide();
        }
        //if between 3700 and 4000 - if you're feeling conservative, buy $100 worth of bitcoin 
        if ((data.data.rates.USD >= 3700) && (data.data.rates.USD < 4000)) {
            $('#alert3700_4000').show();
        } else {
            $('#alert3700_4000').hide();
        }
        //if between 3400 and 3700 - buy about $200 worth of bitcoin
        if ((data.data.rates.USD >= 3400) && (data.data.rates.USD < 3700)) {
            $('#alert3400_3700').show();
        } else {
            $('#alert3400_3700').hide();
        }
        //if between 3000 and 3400 - buy about $300 worth of bitcoin
        if ((data.data.rates.USD >= 3000) && (data.data.rates.USD < 3400)) {
            $('#alert3000_3400').show();
        } else {
            $('#alert3000_3400').hide();
        }
        //if between 2500 and 3000 - buy about $300 worth of bitcoin
        if ((data.data.rates.USD >= 2500) && (data.data.rates.USD < 3000)) {
            $('#alert2500_3000').show();
        } else {
            $('#alert2500_3000').hide();
        }
        //if between 2000 and 2500 - buy about $400 worth of bitcoin
        if ((data.data.rates.USD >= 2000) && (data.data.rates.USD < 2500)) {
            $('#alert2000_2500').show();
        } else {
            $('#alert2000_2500').hide();
        }
        //if below 2000 - buy about $400 worth of bitcoin
        if (data.data.rates.USD < 2000) {
            $('#alert2000').show();
        } else {
            $('#alert2000').hide();
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