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
            $('#alert4500above').show();
        } else {
            $('#alert4500above').hide();
        }
        //if below 4000 - if you're feeling conservative, buy $100 worth of bitcoin 
        if (data.data.rates.USD <= 4000) {
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
    
    //FIX THIS
//    if (asteroid.is_potentially_hazardous_asteroid) {
//                $('#header1').text(asteroidDate)
//                $('#asteroid-name').append('<div id=asteroid-name><p>Asteroid Name: ' + asteroid.name + '</p></div>');
//                $('#asteroid-vel').append('<div id=asteroid-vel><p>Velocity: ' + asteroid.close_approach_data[0].relative_velocity.miles_per_hour + ' miles per hour</p></div>');
//                $('#asteroid-diam').append('<div id=asteroid-diam><p>Max Diameter: ' + asteroid.estimated_diameter.feet.estimated_diameter_max + ' feet</p></div><br>');
//                $('#asteroid-dist').append('<div id=asteroid-dist><p>Distance from Earth (mi): ' + asteroid.close_approach_data[0].miss_distance.miles + '</p></div>');
//            } else if (asteroid.is_potentially_hazardous_asteroid == false) {
//                $('#headerElse').text(``)
//            } //end of if/else statements
    
 
    
    
    
                                                
}); //end of $(document).ready