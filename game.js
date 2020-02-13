(function(){
  let that;
  function Game(map){
    this.speed = 200;
    this.map = map;
    this.score = 0;
    this.x = Tools.random(0, 60-1)*10;
    this.y = Tools.random(0, 50-1)*10;
    this.snake = new Snake(map);  // 生成一个蛇对象
    this.food = new Food(map, {x:this.x, y:this.y});  // 生成一个食物对象
    that = this;
  }
  Game.prototype.start = function(){  // 开始游戏
    this.food.render();
    this.snake.render();
    this.startMove = setInterval(()=>{
      this.snake.move();
      limit();
      eat();
    }, 200);
  }
  Game.prototype.control = function(event){ // 控制小蛇移动方向
    clearInterval(this.startMove);
    switch(event.keyCode){
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
    let maxWidth = that.map.clientWidth;
    let maxHeight = that.map.clientHeight;
    if(that.snake.bodys[0].x+10 > maxWidth || that.snake.bodys[0].x < 0){
      clearInterval(that.startMove);
      confirm('你挂了！得分：' + that.score);
      return;
    }else if(that.snake.bodys[0].y+10 > maxHeight || that.snake.bodys[0].y < 0){
      clearInterval(that.startMove);
      confirm('你挂了！得分：' + that.score);
      return;
    }
    that.snake.bodys.forEach((item, index)=>{
      if(index == 0) return true;
      if(that.snake.bodys[0].x == item.x && that.snake.bodys[0].y == item.y){
        clearInterval(that.startMove);
        confirm('你挂了！得分：' + that.score);
        return;
      }
    })
  }
  function eat(){ // 吃食物
    if(that.snake.bodys[0].x == that.food.obj.x && that.snake.bodys[0].y == that.food.obj.y){
      let x = that.snake.bodys[that.snake.bodys.length-1].x;
      let y = that.snake.bodys[that.snake.bodys.length-1].y;
      that.snake.bodys.push({x, y})
      let foodX = Tools.random(0, 60-1)*10;
      this.foodY = Tools.random(0, 50-1)*10;
      that.food.render({x: foodX, y: foodY});
      that.snake.render();
      that.score++;
    }
  }
  window.Game = Game;
})()