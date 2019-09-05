var Game = function () {

    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var levelDiv;

    //定义每个格子的大小
    var divWidth=30;
    //得分
    var score=0;
    //时间
    var time=0;
    //时间计时器
    var mytimer = "";
    //等级
    var level = 1;
    // 游戏矩阵
    var gameData=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;

    var nextDivs =[];
    var gameDivs = [];


    // 初始化div
    var initDiv = function(container,data,divs){
        for(var i=0;i<data.length;i++){
            var div = [];
            for(var j=0;j<data[0].length;j++){
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * divWidth)+'px';
                newNode.style.left = (j * divWidth)+'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };
    // 刷新div
    var refreshDiv = function (data,divs) {
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j] === 0){
                    divs[i][j].className = 'none';
                }else if(data[i][j] === 1){
                    divs[i][j].className = 'done';
                }else if(data[i][j] === 2){
                    divs[i][j].className = 'current';
                }
            }
        }
    };
    // 监测点是否合法
    var check = function (pos,x,y) {
        if(pos.x + x < 0){//上边界
            return false;
        }else if(pos.x + x >= gameData.length){//下边界
            return false;
        }else if(pos.y + y < 0){//左边界
            return false;
        }else if(pos.y + y >= gameData[0].length){//右边界
            return false;
        }else if(gameData[pos.x+x][pos.y+y]===1){//已存在方块
            return false;
        }else{
            return true;
        }
    }
    //监测数据是否合法
    var isValid = function (pos,data) {
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j] !== 0){
                    if(!check(pos,i,j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    //清除数据
    var clearData = function () {
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j]=0;
                }
            }
        }
    }
    // 设置数据
    var setData = function () {
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];
                }
            }
        }
    };
    //下移
    var down =function () {
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData,gameDivs);
            return true;
        }else{
            return false;
        }
    };
    //左移
    var left =function () {
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    };
    //右移
    var right =function () {
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    };
    //旋转
    var rotate =function () {
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    };
    //方块移动到底部，固定
    var fixed =function () {
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    if(gameData[cur.origin.x + i][cur.origin.y +j] === 2){
                        gameData[cur.origin.x + i][cur.origin.y +j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData,gameDivs);
    }
    //消行
    var checkClear = function () {
        var line = 0;
        for(var i=gameData.length-1;i>=0;i--){
            var clear = true;
            for(var j=0;j<gameData[0].length;j++){
                if(gameData[i][j] !== 1){
                    clear = false;
                    break;
                }
            }
            if(clear){
                line += 1;
                for(var m=i;m>0;m--){
                    for(var n=0;n<gameData[0].length;n++){
                        gameData[m][n] = gameData[m-1][n];
                    }
                }
                for(var n=0;n<gameData[0].length;n++){
                    gameData[0][n] = 0;
                }
                i++;
            }
        }
        return line;
    }
    //检查游戏结束
    var checkGameOver = function () {
        var gameOver =false;
        for(var i=0; i< gameData[0].length;i++){
            if(gameData[1][i] === 1){
                gameOver = true;
            }
        }
        return gameOver;
    }
    //使用下一个方块
    var performNext = function (type,dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type,dir);
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs);
    }
    //重置游戏界面
    var reset = function () {
        gameData=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        Square.data = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        refreshDiv(gameData,gameDivs);
        refreshDiv(Square.data,nextDivs);
        score=0;
        setScore(score);
        time = 0;
        setTime(time);
        stopTime();
    }
    //设置时间
    var setTime = function (time) {
        var m=0;
        var s=0;
        if(time < 60){
            s = time;
            timeDiv.innerHTML = s + 's';
        }else{
            m = Math.floor( time/60 );
            s = time % 60;
            if(s !== 0){
                timeDiv.innerHTML = m + 'm' + s + 's';
            }
            else {
                timeDiv.innerHTML = m + 'm' ;
            }
        }
    }
    //设置得分
    var setScore = function (score) {
        scoreDiv.innerHTML = score;
    }
    //计时
    var startTime = function () {
        mytimer = setInterval(function () {
            time++;
            setTime(time);
        },1000);
    }
    //停止计时
    var stopTime = function () {
        clearInterval(mytimer);
        mytimer = null;
    }
    //加分规则
    var addScore = function (line) {
        var s=0;
        //加分规则
        switch (line){
            case 1:
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3:
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                s = 150;
                break;
        }
        score += s;
        setScore(score);
    }
    //游戏等级
    var addLevel = function () {
        if(score<100){
            level = 1;
            levelDiv.innerHTML = "第一关";
        }else if(score < 250){
            level = 2;
            levelDiv.innerHTML = "第二关";
        }else if(score < 400){
            level = 3;
            levelDiv.innerHTML = "第三关";
        }else {
            level = 4;
            levelDiv.innerHTML = "第四关";
        }
        return level;
    }

    //游戏结束
    var gameover = function () {
        //停止计时
        stopTime();

    }
    // 初始化
    var init = function (doms,type,dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        levelDiv = doms.levelDiv;
        next = SquareFactory.prototype.make(type,dir);
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        refreshDiv(next.data,nextDivs);
        //开始计时
        startTime();
    }

    // 导出api
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () {while(down()){}}
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.addScore = addScore;
    this.gameover = gameover;
    this.reset = reset;
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.getscore = function () {
        return score;
    }
    this.addLevel = addLevel;
}