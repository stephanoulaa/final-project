RESOURCE: https://github.com/desmondmorris/node-twitter/tree/master/examples#streams
===================================================================================

<!DOCTYPE html>
<html lang="en" ng-app="VideoTweetStream">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>PubNub Twitter Stream Demo</title>

    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/css/bootstrap.min.css' />

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/pubnub/3.6.3/pubnub.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/3.1.8/imagesloaded.pkgd.min.js"></script>

    <script>
			var pubnub = PUBNUB.init({
				subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
			});
			pubnub.subscribe({
				channel : 'pubnub-twitter',
				message : function(tweet){
					$('#tweet-list').prepend('<li class="list-group-item">' + tweet.text + '</li>');
					if($('#tweet-list li').length > 10) {
						$('#tweet-list li').last().remove();
					}
				}
			});
    </script>

  </head>
  <body role="document">

    <div class="container" role="main" style="margin-top: 20px;">
    	<div class="panel panel-primary">
			  <div class="panel-heading">PubNub Twitter Stream Demo</div>
			  <div class="panel-body">
			  	<p>
			  	This is a client-side only application.
			  	It consumes a <a href="https://dev.twitter.com/streaming/reference/post/statuses/filter" target="_blank">statuses/filter</a>
			  	that is hosted by <a href="http://www.pubnub.com/developers/data-streams/twitter-stream" target="_blank">PubNub</a>.
			  	</p>

			  	<p>To setup your own hosted Twitter stream see this <a href="https://gist.github.com/stephenlb/36aef15a165d5bad0d82" target="_blank">gist</a>.

			  </div>
			  <ul id="tweet-list" class="list-group">
			    <li class="list-group-item">Waiting for Tweets . . .</li>
			  </ul>
			</div>
    </div>

  </body>
</html>


===================================================================================
make new js file, connect to html: stream.js

var nconf = require('nconf');
var Twit = require('twit');
var _ = require('lodash');

nconf.file({ file: 'config.json' }).env();

var twitter = new Twit({
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
  access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
});

// attach to filter stream
var tweetStream = twitter.stream('statuses/sample');

// on tweet
tweetStream.on('tweet', function (tweet) {
  console.log('---');
  console.log('screen_name:', tweet.user.screen_name);
  console.log('text:', tweet.text);
});
===================================================================================
===================================================================================


