var localHost = 'http://localhost:3000';
// GetPoetry when page loaded ready:
$(document).ready(function(){
    $.get(
        localHost + '/getPoetry',
        function(result){
            res = JSON.parse(result);
            window.poetry = res.poetry;
            var poeBC = window.poetry.bgColor_list;
            var id =  Math.floor(Math.random()*poeBC.length);
            $('body').css('background-color',poeBC[id]);
            showPoetry();
            loadMusic();
        }
    );
});

$('#stop_music').click(function(){
	$('#music_box')[0].pause();
});
$('#play_music').click(function(){
	$('#music_box')[0].play();
});

$('#doLogin').click(function(){
    info = {username: $('#input-4').val(), password: $('#input-5').val()};
    $.post(
    localHost+'/user/login',
    JSON.stringify(info),
    function(data, status){
        var res = JSON.parse(data);
        if(res.code){
            window.user = res.user;
            alert("Login success!" + window.user);
            $('#myModal').hide();
            $('.reveal-modal-bg').hide();
            $('#checkLogin').removeAttr("data-reveal-id");
        }else{
            alert("Username not exist or password wrong. please retry or Reg");
            $('#username').val("");
            $('#password').val("");
        }
    });

});

$('#checkLogin').click(function(){
    if(window.user){
        var opts = confirm("Already Logined in! You want to logout?");
        if(opts){
            window.user = null;
            location.reload();
        }
    }
});
// Reg:
$('#doReg').click(function(){
    /*
    if($('#reg_passwd').val() != $('#reg_repasswd').val()){
        return alert("password do not match , please retry!");
    }
    */
    str = JSON.stringify({username: $('#input-4').val(), password: $('#input-5').val()});
    $.post(
        localHost+'/user/reg',
        str,
        function(data, status){
            var res = JSON.parse(data);
            if(res.code){
                alert("Reg success!" + JSON.stringify(res.user) + "\nAlready auto Logined!");
                window.user = res.user;
                $("#myModal").hide();
                $('.reveal-modal-bg').hide();
                $('#checkLogin').removeAttr("data-reveal-id");
            }else{
                alert("Username existed, please change and retry!");
                $('#reg_passwd').val("");
                $('#reg_repasswd').val("");
                $('#reg_uname').val("");
            }
        }
    );


});

$('#doRefresh').click(function(){
	removePoetry();
    removeMusic();
    $.get(
        localHost + '/getPoetry',
        function(result){
            res = JSON.parse(result);
            window.poetry = res.poetry;
            var poeBC = window.poetry.bgColor_list;
            var id =  Math.floor(Math.random()*poeBC.length);
            $('body').css('background-color',poeBC[id]);
            showPoetry();
            loadMusic();
        }
    );
});

$('#loveList').click(function(){
    if(window.user){
        removePoetry();
        removeMusic();
        var redHL = window.user.redHeart_list;
        if(redHL.length == 0){                                      // redHeart_list exist???
            alert("redHeart_list is empty!\nPlease add the poetry you love");
        }else{
            var id =  Math.floor(Math.random()*redHL.length);
            $.get(
            localHost + '/getPoetry/'+redHL[id],
            function(result){
                res = JSON.parse(result);
                //$("#content").html(JSON.stringify(res));
                window.poetry = res.poetry;
                var poeBC = window.poetry.bgColor_list;
                var id =  Math.floor(Math.random()*poeBC.length);
                $('body').css('background-color',poeBC[id]);
                showPoetry();
                loadMusic();
            });
        }
    }
    else
        alert("Please login to use this function");
});

$('#aboutUs').click(function(){
    if(window.user){
        str = JSON.stringify({username: window.user.username, password: window.user.password, pid: window.poetry.pid});
        $.post(
            localHost + '/addRedHeart',
            str,
            function(result, statuse){
                res = JSON.parse(result);
                if(res.code){
                    alert("add redHeart_list successfully!");
                }else{
                    alert("Error while adding redHeart_list");
                }
            }
        );
    }else{
        alert("Please login to use this function");
    }
});

//=======================================================================
// 					以下是上面jqeury动作实现所依赖的函数
//=======================================================================
function loadMusic(){
    var id =  Math.floor(Math.random()*window.poetry.song_list.length);
    $('#music').append('<audio id="music_box"><source class="sid" src="'+ localHost + '/music/'+window.poetry.song_list[id]+'.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>');
    $('#music_box')[0].play();
}
function removeMusic(){
    $('#music_box').remove();
}
var text_len;
var intR;
function showPoetry(){
	var title = window.poetry.content.title;
	var auther = window.poetry.content.author;
	var text = window.poetry.content.lines.split('\n');
	text_len = text.length;

	document.getElementById("title").innerHTML= title;
	document.getElementById("auther").innerHTML= auther;
	$("#title").hide();
	$("#auther").hide();
	$("#title").fadeIn(3000);
	$("#auther").fadeIn(3000);

	//function CreatDiv()
	for(var i=0;i<text_len;i++){
		//var thenew= document.createElement('li');
		//thenew.setAttribute("id","j"+i);
		//thenew.innerHTML = text[i];
		$(".lyric").append('<li>'+text[i]+'</li>');
	}
    document.body.style.overflow='hidden';
    document.documentElement.style.overflowY = 'hidden';
	(function(){

        var setCurrent=function(){

            var last=lyrics.get(index);
            $(last).removeClass("current");

            if (index>lineCount) {
                index=-1;
            }
            index+=1;

            var current=lyrics.get(index);
            $(current).addClass("current");

        }


        var scroll = function(){
            var current=$(".lyric li.current");
            var top=current.parent().scrollTop()-(current.parent().offset().top-current.offset().top) - offset;
            current.parent().animate({
                scrollTop:top
            });
        }

        var index=-1;
        var lineCount=44;
        var lyrics=$(".lyric li").not('.empty');
        var offset=55;

        setInterval(setCurrent,3500);
        setInterval(scroll,3500);

    })();
}
function removePoetry(){
    clearInterval(intR);
    for(var i=0; i<text_len; i++)
        $('#j'+i).remove();
}


function mOver(obj){
   obj.style.opacity = "0.5";
   obj.style.filter = "alpha(opacity=50%)";
}

function mOut(obj){
   obj.style.opacity = "1.0";
   obj.style.filter = "alpha(opacity=100%)";
}



