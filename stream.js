//var nconf = require('nconf');
//var Twit = require('twit');
//var _ = require('lodash');
//
//nconf.file({ file: 'config.json' }).env();
//
//var twitter = new Twit({
//  consumer_key: nconf.get('qibW1o9nynrYhVZrm1nlQmGuY'),
//  consumer_secret: nconf.get('TpFwKG5mjNz0g5YaCZ2SDXsrA9wtDTJTW8Ei7FATPGUt7CYsoG'),
//  access_token: nconf.get('902593700022312960-6Kkj1AB0sQTpC7lHRpVnx2taMtzycmY'),
//  access_token_secret: nconf.get('Cgrx85qO5wNtKIFBJ5rWm0xvYKUzo4de9PgpH3qdFA19G')
//});
//
//// attach to filter stream
//var tweetStream = twitter.stream('statuses/sample');
//
//// on tweet
//tweetStream.on('tweet', function (tweet) {
//  console.log('---');
//  console.log('screen_name:', tweet.user.screen_name);
//  console.log('text:', tweet.text);
//});