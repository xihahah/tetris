var welcome = document.getElementById('welcome');
var playgame = document.getElementById('playgame');
var msg = document.getElementById('msg');
var cont = document.getElementById('cont');

var start=document.getElementById('start');
var btnMsg = document.getElementById('message');
var pause=document.getElementById('pause');
var con=document.getElementById('continue');
var back = document.getElementById('back');
var ptow = document.getElementById('ptow');
var again = document.getElementById('again');
var myscore = document.getElementById('myscore');

var setbgm = document.getElementById('bgm');
var bgm = setbgm.getElementsByTagName('audio')[0];
var bgmplay = true;
var hover = document.getElementById('hover');

var local = new Local();
var onplay = new Number(0);//判断游戏是否开始

// 鼠标移入音效
function myhover() {
    hover.currentTime = 0;
    hover.play();
}
// 鼠标移出音效
function myout() {
    hover.pause();
}

//开始游戏
start.onclick=function () {
    // console.log("开始： " + onplay);
    welcome.style.display = 'none';
    playgame.style.display = 'block';
    if(onplay == 0){
        local.start();
        onplay = new Number(1);
        // console.log(local.getGameScore());
    }
}
start.onmouseover = function () {
    myhover();
}
start.onmouseout = function () {
    myout();
}

//暂停游戏
pause.onclick=function () {
    if(onplay == 1) {
        local.pause();
        cont.style.display = "block";
        myscore.innerHTML = local.getGameScore();
    }
}
pause.onmouseover = function () {
    myhover();
}
pause.onmouseout = function () {
    myout();
}

//继续游戏
con.onclick=function () {
    if(onplay == 1) {
        cont.style.display = "none";
        local.continue();
    }
}
con.onmouseover = function () {
    myhover();
}
con.onmouseout = function () {
    myout();
}

//退出游戏，返回开始页面
ptow.onclick = function () {
    if(onplay == 1) {
        onplay = new Number(0);
        local.back();
        welcome.style.display = 'block';
        playgame.style.display = 'none';
    }
}
ptow.onmouseover = function () {
    myhover();
}
ptow.onmouseout = function () {
    myout();
}
//重来
again.onclick = function () {
    //结束当前游戏
    local.back();
    //开始一局新的
    local.start();
}
again.onmouseover = function () {
    myhover();
}
again.onmouseout = function () {
    myout();
}

//打开作者信息页面
btnMsg.onclick = function () {
    welcome.style.display = 'none';
    msg.style.display = 'block';
}
btnMsg.onmouseover = function () {
    myhover();
}
btnMsg.onmouseout = function () {
    myout();
}
//返回开始页面
back.onclick = function () {
    welcome.style.display = 'block';
    msg.style.display = 'none';
}
back.onmouseover = function () {
    myhover();
}
back.onmouseout = function () {
    myout();
}
setbgm.onclick = function () {
    if(bgmplay){
        this.style.animationPlayState="paused";
        bgm.pause();
        bgmplay = false;
    }else{
        this.style.animationPlayState="running";
        bgm.play();
        bgmplay = true;
    }
}
setbgm.onmouseover = function () {
    myhover();
}
setbgm.onmouseout = function () {
    myout();
}
