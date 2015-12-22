var express = require('express');
var router = express.Router();
var User = require('../model/userSchema');

router.post('/login', function(req, res, next){
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});

    var postData = '';
    req.setEncoding('utf8');
    req.addListener('data', function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener('end', function(){
        console.log(JSON.parse(postData));
        User.findOne(JSON.parse(postData)).then(function(user){
            if(user){
                res.end(JSON.stringify({code: 1, user: user}));                             // end函数中不能有undefined的变量，不然不会报错，且浏览器段持续
                                                                                            // POST error: net::ERR_EMPTY_RESPONSE
                res.redirect('/');
            }else{
                res.end(JSON.stringify({code: 0, user: null}));
            }
        });
    });
});

router.post('/reg', function(req, res, next){
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});

    var postData = '';
    req.setEncoding('utf8');
    req.addListener('data', function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener('end', function(){
        User.findOne(JSON.parse(postData))
            .then(function (user){
                if(user){
                    res.end(JSON.stringify({code:0, user: user}));
                }else{
                    User.create(JSON.parse(postData), function(err, user){
                        if(err){
                            res.end(JSON.stringify({code: 0, user: null}));
                        }else{
                            res.end(JSON.stringify({code: 1, user: user}));
                            console.log("Reg success: " + user);
                        }
                    });
                }
            });
    });
});

module.exports = router;
