var ffmpeg = require('fluent-ffmpeg');
var Twit = require('twit');
var periscope = require('node-periscope-stream');

function PeriscopeRecorder(config) {
	this.T = new Twit(config);
}

PeriscopeRecorder.prototype.start = function(userId) {
	var stream = this.T.stream('statuses/filter', { follow: [userId] });

	stream.on('tweet', function (tweet) {
		if (!tweet.entities.urls || !tweet.entities.urls.length) {
			return;
		}
		
		var periscopeUrl = tweet.entities.urls[0].expanded_url;
		
		periscope(periscopeUrl, function(err, info) {
			if (err) {
				console.log(err);
				return;
			}
			
			var hls = info['hls_url'];
			
			ffmpeg(hls)
				.on('error', function(err) { console.log(err.message) })
				.output(userId + '-' + Math.round(Date.now() / 1000) + '.mp4')
				.run();
		});
	});
};

module.exports = PeriscopeRecorder;
