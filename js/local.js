var Local = function () {
    // 游戏对象
    var game;
    //时间间隔
    var INTERVAL = 1200;
    //定时器
    var timer = null;
    var level =1;
    var resultDiv = document.getElementById('gameover');
    var tishi = document.getElementById('tishi');
    var shibai = document.getElementById('shibai');
    var shengji = document.getElementById('shengji');
    var guding = document.getElementById('guding');
    // 绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function(e){
            guding.currentTime = 0;
            guding.play();
            if(e.keyCode === 38){//up
                game.rotate();
            }else if(e.keyCode === 39){//right
                game.right();
            }else if(e.keyCode === 40){//down
                game.down();
            }else if(e.keyCode === 37){//left
                game.left();
            }else if(e.keyCode === 32){//space
                game.fall();
            }
        }
    };
    // 展示关卡
    var showLevel = function (level) {
        resultDiv.innerHTML = level;
        shengji.currentTime = 0;
        shengji.play();
        resultDiv.style.display = "block";
        setTimeout(function () {
            resultDiv.style.display = "none";
        },1000);
    }
    //移动
    var move = function () {
        timer = setInterval(function () {
            if (game.down()) {

            }else{
                // 固定方块
                game.fixed();
                //固定音效
                guding.currentTime = 0;
                guding.play();
                // 判断加分
                var line = game.checkClear();//可以消去的行数
                if (line) {
                    game.addScore(line);
                    game.checkClear();
                }
                if(level != game.addLevel()){
                    level = game.addLevel();
                    switch (level){
                        case 1:{
                            INTERVAL = 1200;
                            showLevel("第一关");
                            break;
                        }
                        case 2:
                        {
                            INTERVAL = 700;
                            showLevel("第二关");
                            break;
                        }

                        case 3:
                        {
                            INTERVAL = 400;
                            showLevel("第三关");
                            break;
                        }
                        default:
                        {
                            INTERVAL = 200;
                            showLevel("第四关");
                            break;
                        }

                    }
                    stopmove();
                    move();
                }
                var gameOver = game.checkGameOver();
                if(gameOver){
                    game.gameover();
                    resultDiv.innerHTML = "游戏结束";
                    resultDiv.style.display = "block";
                    tishi.style.display = "block";
                    stopmove();
                    shibai.play();
                    if(shibai.ended){
                        shibai.pause();
                    }
                }else{
                    game.performNext(generateType(),generateDir());
                }
            }
        },INTERVAL);
    }
    // 停止移动
    var stopmove = function () {
        clearInterval(timer);
        timer = null;
    }
    //随机生成一个方块种类
    var generateType = function () {
        return Math.ceil(Math.random() * 7 ) - 1;
    }
    //随机生成一个旋转类型
    var generateDir = function () {
        return Math.ceil(Math.random() * 4 ) - 1;
    }

    //开始
    var start = function () {
        var doms = {
        gameDiv : document.getElementById('game'),
        nextDiv : document.getElementById('next'),
        timeDiv : document.getElementById('time'),
        scoreDiv : document.getElementById('score'),
        levelDiv : document.getElementById('level')
        };
        game = new Game();
        tishi.style.display = "none";
        game.init(doms,generateType(),generateDir());
        bindKeyEvent();
        game.performNext(generateType(),generateDir());
        //方块自动下落
        move();
        if(level = 1){
            showLevel("第一关");
        }
    };
    //暂停游戏
    var pause = function () {
        if(timer){
            // 停止创建方块
            stopmove();
            //停止计时
            game.stopTime();
            document.onkeydown = null ;
        }
    }
    //继续游戏
    var cont = function () {
        if(!timer){
            // timer = setInterval(move,INTERVAL);
            move();
            game.startTime();
            bindKeyEvent();
        }
    }
    //重置数据
    var back = function () {
        game.reset();
        stopmove();
        document.onkeydown = null ;
    }

    this.start = start;
    this.pause = pause;
    this.continue = cont;
    this.back = back;
    this.getGameScore = function () {
        return game.getscore();
    }
};