//var request = require('request')
//var cheerio = require('cheerio')
//
//request('https://www.coinbase.com/dashboard', function(err, response, html){
//    var $ = cheerio.load(html)
//    console.log($('.Flex__FlexBox-gYXKYY lakeGn'))
//                //.attr('title')
//
//})


var ctx = $("#line-chart");
var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017",],
        datasets: [
            {
                label: "Bitcoin Exchange Rates",
                data: [1,2,3,4,5,6,7,8,9]
            }
        ]
    }
});