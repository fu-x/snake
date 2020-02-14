(function(){
  let that;
  function Game(map){
    this.speed = 200;
    this.map = map;
    this.score = 0;
    this.mapWidth = Math.ceil(map.clientWidth/10);
    this.mapHeight = Math.ceil(map.clientHeight/10);
    this.x = Tools.random(0, this.mapWidth-1)*10;
    this.y = Tools.random(0, this.mapHeight-1)*10;
    this.snake = new Snake(map);  // 生成一个蛇对象
    this.food = new Food(map, {x:this.x, y:this.y});  // 生成一个食物对象
    that = this;
  }
  Game.prototype.start = function(){  // 开始游戏
    this.food.render();
    this.snake.render();
  }
  Game.prototype.control = function(keyCode){ // 控制小蛇移动方向
    clearInterval(this.startMove);
    switch(keyCode){
      case 37:
        this.startMove = setInterval(()=>{
          this.snake.move(3);
          limit();
          eat();  
        }, 200);
        break;
      case 38:
        this.startMove = setInterval(()=>{
          this.snake.move(0);
          limit();
          eat();  
        }, 200);
        break;
      case 39:
        this.startMove = setInterval(()=>{
          limit();
          this.snake.move(1);
          eat();  
        }, 200);
        break;
      case 40:
        this.startMove = setInterval(()=>{
          this.snake.move(2);
          limit();
          eat();  
        }, 200);
        break;
    }
  }
  function limit() {  // 地图界限
    console.log(that.mapWidth, that.mapHeight);
    if(that.snake.bodys[0].x+10 > that.mapWidth*10 || that.snake.bodys[0].x < 0){
      clearInterval(that.startMove);
      alert('你挂了！得分：' + that.score);
      reStart();
      return;
    }else if(that.snake.bodys[0].y+10 > that.mapHeight*10 || that.snake.bodys[0].y < 0){
      clearInterval(that.startMove);
      alert('你挂了！得分：' + that.score);
      reStart();
      return;
    }
    that.snake.bodys.forEach((item, index)=>{
      if(index == 0) return true;
      if(that.snake.bodys[0].x == item.x && that.snake.bodys[0].y == item.y){
        clearInterval(that.startMove);
        alert('你挂了！得分：' + that.score);
        reStart();
        return;
      }
    })
  }
  function eat(){ // 吃食物
    if(that.snake.bodys[0].x == that.food.obj.x && that.snake.bodys[0].y == that.food.obj.y){
      let x = that.snake.bodys[that.snake.bodys.length-1].x;
      let y = that.snake.bodys[that.snake.bodys.length-1].y;
      that.snake.bodys.push({x, y})
      let foodX = Tools.random(0, that.mapWidth-1)*10;
      this.foodY = Tools.random(0, that.mapHeight-1)*10;
      that.food.render({x: foodX, y: foodY});
      that.snake.render();
      that.score++;
    }
  }
  function reStart(){ // 重新开始游戏
    that.snake.remove();
    that.snake = new Snake(that.map);
    that.snake.render();
    that.score = 0;
  }
  window.Game = Game;
})()