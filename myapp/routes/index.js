var express = require('express');
var router = express.Router();

var url = require("url");
var querystring = require("querystring");

var data = {};
var datax = {
  "data": {
    "accessToken": "123",
    "samples": {
      "actions": {
        "autobed": {
		"bed":{
			"action1":"head up",
			"action2":"head down"
		}
        }
      },
      "actionRecordSkipping": {
        "autobed": {
		"bed":{
			"action1":"head up",
			"action2":"head down"
		}
        }
      }
    }
  }
}

var data1 = {
  "data": {
    "accessToken": "123",
    "samples": {
      "actions": {
        "autobed": {
          "act": "head up"
        }
      },
      "actionRecordSkipping": {
        "autobed": {
          "act": "head up"
        }
      }
    }
  }
}

var userinfo = {
  "data":  {
    "name": "shuming fan",
    "id": "fanshuming2011",
    "url": "http://example.com/users/fanshuming2011"
  }
}

var errorinfo = {
  "errors": [
    {
      "message": "Something went wrong!"
    }
  ]
}

var actionerr = {
  "errors": [
    {
      "status": "SKIP",
      "message": "Audio file size too big"
    }
  ]
}

var triggerdata = {
  "data": [
    {
      "image_url": "http://example.com/images/128",
      "tags": "banksy, brooklyn",
      "posted_at": "2018-08-09T19:41:12-07:00",
      "meta": {
        "id": "14b9-1fd2-acaa-5df5",
        "timestamp": 1533869085
      }
    },
    {
      "image_url": "http://example.com/images/125",
      "tags": "banksy, nyc",
      "posted_at": "2018-08-09T19:42:12-07:00",
      "meta": {
        "id": "ffb27-a63e-18e0-18ad",
        "timestamp": 1533869080
      }
    },
    {
      "image_url": "http://example.com/images/123",
      "tags": "banksy, nyc",
      "posted_at": "2018-08-09T19:43:12-07:00",
      "meta": {
        "id": "ffb27-a63e-18e0-18ac",
        "timestamp": 1533869075
      }
    }
  ]
}


var actiondata = {
  "data": [
    {
      "id": "234325",
      "url": "http://example.com/posts/234325",
    }
 ]
}

var tokendata = {
  "token_type": "Bearer",
  "access_token": "123",
  "refresh_token": "123r"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ifttt/v1/actions', function(request, response) {

  response.status(200)
    .set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    .send({success: true});
});

router.get('/smarthome/ifttt/v1/status', function(request, response) {
	
	console.log("get head =========================");
	console.log(request.headers);

	var arg = url.parse(request.url).query;
	//var params = querystring.parse(arg);
	console.log("method - " + request.method);
	console.log("url - " + request.url);

	console.log(request.headers['ifttt-channel-key']);



	if(request.headers['ifttt-channel-key'] == 'INVALID'){
		response.status(401).set({
                	'Access-Control-Allow-Origin': '*',
                	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	        	}).send({success: true});

	}else{

		response.status(200).set({
      			'Access-Control-Allow-Origin': '*',
      			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    		}).send({success: true});
	}
	//response.send(JSON.stringify(data1));
});



router.post('/smarthome/ifttt/v1/test/setup', function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        //var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);

        console.log(request.headers['ifttt-channel-key']);



        if(request.headers['ifttt-channel-key'] == 'INVALID'){
                response.status(401).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).json({fail:true});

        }else{

                response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(data1);
        }
        //response.send(JSON.stringify(data1));
});



router.get('/smarthome/ifttt/v1/user/info', function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        //var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);

        console.log(request.headers['ifttt-channel-key']);


        if(request.headers['authorization'] == 'Bearer INVALID'){
                response.status(401).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).send(errorinfo);

        }else{

                response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(userinfo);
        }
        //response.send(JSON.stringify(data1));
});


router.post('/smarthome/ifttt/v1/triggers/smartbed', function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        //var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);

        console.log(request.headers['ifttt-channel-key']);


        if(request.headers['authorization'] != 'Bearer 123'){
                response.status(401).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).send(errorinfo);

        }else{

                response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(triggerdata);
        }
        //response.send(JSON.stringify(data1));
});


/*
router.post('/smarthome/ifttt/v1/actions/autobed', function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        //var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);

        console.log(request.headers['ifttt-channel-key']);


        if(request.headers['authorization'] != 'Bearer 123'){
                response.status(401).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).send(errorinfo);

        }else{

                response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(actiondata);
        }
        //response.send(JSON.stringify(data1));
});

*/
router.get('/oauth',function(request, response) {

	console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);
	console.log("params ==============");
	console.log('client_id:'+params.client_id);
	console.log('redirect_uri:'+params.redirect_uri);
	console.log('response_type:'+params.response_type);
	console.log('scope:'+params.scope);
	console.log('state:'+params.state);
	response.redirect(params.redirect_uri+"?code=123456&state="+params.state);
	
});

router.post('/token',function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);
        console.log("request ==============");
	console.log("client_id:"+request.body.client_id);
	console.log("client_secret:"+request.body.client_secret);
	console.log("grant_type:"+request.body.grant_type);
	console.log("code:"+request.body.code);
	console.log("redirect_uri:"+request.body.redirect_uri);

	if(request.body.code != ''){
                response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).send(tokendata);

        }else{

                response.status(401).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(errorinfo);
        }


});

/*
router.post('/ifttt/v1/actions',function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);

        var arg = url.parse(request.url).query;
        var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);
        console.log(request.headers);

        response.status(200).set({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       }).send({sucess:true});
});

*/

router.post('/smarthome/ifttt/v1/actions/autobed',function(request, response) {

        console.log("get head =========================");
        console.log(request.headers);
        console.log(request);

        var arg = url.parse(request.url).query;
        var params = querystring.parse(arg);
        console.log("method - " + request.method);
        console.log("url - " + request.url);
        console.log("==============");
        console.log(request.headers['authorization']);
        console.log(request.body);

	if(request.headers['authorization'] != 'Bearer 123'){
		response.status(401).set({
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }).send(errorinfo);

	}/*else{
		response.status(200).set({
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }).send(actiondata);

	}
*/

	else if(request.body.actionFields != null)
	{
		if(request.body.actionFields.act != null)
	        {
               	 	response.status(200).set({
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                	}).send(actiondata);
        	}else{
			response.status(400).set({
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                	}).send(errorinfo);
		}
	}else{
        	response.status(400).set({
                	        'Access-Control-Allow-Origin': '*',
                        	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       		}).send(actionerr);
	}


});

//export
module.exports = router;
