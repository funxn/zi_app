/**
 * Created by xiaofeng on 15/11/1.
 */

var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../model/userSchema');
var Poetry = require('../model/poetrySchema');
var Song = require('../model/songSchema');

router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/getPoetry', function(req, res, next){
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    // generate random PID: 0024
    var id =  Math.floor(Math.random()*4) + 1;
    var str = '0000' + id;
    str = 'P' + str.substring(str.length-4,str.length);
    console.log(str);
    Poetry.findOne({pid: str}, function(err, poetry){
        if(err){
            res.end(JSON.stringify({code: 0, msg: err}));
        }else if(!poetry){
            res.end(JSON.stringify({code: 0, msg: 'pid not exists'}));
        }else{
            console.log(poetry);
            res.end(JSON.stringify({code: 1, poetry: poetry}));
        }
    });
});

router.get('/getPoetry/:id', function(req, res, next){
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    console.log(req.params.id);
    Poetry.findOne({pid: req.params.id}, function(err, poetry){
        if(err){
            res.end(JSON.stringify({code: 0, msg: err}));
        }else if(!poetry){
            res.end(JSON.stringify({code: 0, msg: 'pid not exists'}));
        }else{
            console.log(poetry);
            res.end(JSON.stringify({code: 1, poetry: poetry}));
        }
    });
});

router.post('/addRedHeart', function(req, res, next){
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    var postData = '';
    req.setEncoding('utf8');
    req.addListener('data', function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener('end', function(){
        var user = JSON.parse(postData);
        console.log(user);
        User.findOneAndUpdate(
            {username: user.username, password: user.password},
            {$push: {"redHeart_list": user.pid}},
            {safe: true, upsert: true, new : true},
            function(err, userData){
                console.log(userData);
                if(userData){
                    res.end(JSON.stringify({code: 1, user: null}));  
                    //User.update(userData, {redHeart_list: userData.redHeart_list.push(user.pid)}, { multi: true });
                    //console.log(userData);                           // end函数中不能有undefined的变量，不然不会报错，且浏览器段持续                                                                   // POST error: net::ERR_EMPTY_RESPONSE
                }else{
                    res.end(JSON.stringify({code: 0, user: null}));
                }
        });
    });
});
//router.get('/music/:id', function(req, res, next){
//    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
//    fs.exists('/home/xiaofeng/MongoDB_Database/music/'+req.params.id+'.mp3', function(est){
//        if(est){
//            res.sendfile
//        }
//    });
//});

module.exports = router;
