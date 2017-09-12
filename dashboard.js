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
    
    //FIX THIS
    if (asteroid.is_potentially_hazardous_asteroid) {
                $('#header1').text(asteroidDate)
                $('#asteroid-name').append('<div id=asteroid-name><p>Asteroid Name: ' + asteroid.name + '</p></div>');
                $('#asteroid-vel').append('<div id=asteroid-vel><p>Velocity: ' + asteroid.close_approach_data[0].relative_velocity.miles_per_hour + ' miles per hour</p></div>');
                $('#asteroid-diam').append('<div id=asteroid-diam><p>Max Diameter: ' + asteroid.estimated_diameter.feet.estimated_diameter_max + ' feet</p></div><br>');
                $('#asteroid-dist').append('<div id=asteroid-dist><p>Distance from Earth (mi): ' + asteroid.close_approach_data[0].miss_distance.miles + '</p></div>');
            } else if (asteroid.is_potentially_hazardous_asteroid == false) {
                $('#headerElse').text(``)
            } //end of if/else statements
    
    
    //var exchangeRate = data.data.rates.USD;
    //console.log(data.data.rates.USD);
    
    //$('#exchange').add('<div>'+'</div>');
                                                
}); //end of $(document).ready