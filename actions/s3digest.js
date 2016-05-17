var AWS = require("aws-sdk");
var helpers = require("../helpers");
AWS.config.loadFromPath('./config.json');

var task = function(request, callback){
	var params = {
	  Bucket: request.query.bucket,
	  Key: request.query.key
	};

	var s3 = new AWS.S3(); 

	s3.getObject(params, function(err, data) {
		if (err) callback(err); return;
		var algorithms = ['md5','sha1','sha256', 'sha512'];
		var loopCount = 1;
		var doc = data.Body;
		
		
		helpers.calculateMultiDigest(doc, 
			algorithms, 
			function(err, digests) {
				callback(null, digests.join("<br>"));	
			}, 
			loopCount);   // successful response
	});
}

exports.action = task