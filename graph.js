//Web Scraping Attempt

//var request = require('request')
//var cheerio = require('cheerio')
//
//request('https://www.coinbase.com/dashboard', function(err, response, html){
//    var $ = cheerio.load(html)
//    console.log($('.Flex__FlexBox-gYXKYY lakeGn'))
//                //.attr('title')
//
//})


//source for rates every year: https://www.buybitcoinworldwide.com/price/

var ctx = $("#line-chart");
//ctx.height = 500;
//ctx.width = 500;

var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "Bitcoin Exchange Rates",
                data: [0,0.39,3.03,13.41,638.09,350.50,455.61,958.24,4672.83],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
            }
        ]
    }
});