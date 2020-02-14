;(function(){
  let bodyArr = [];
  function Snake(map){
    this.map = map;
    this.width = 10;
    this.height = 10;
    this.bgcHead = 'red';
    this.bgcBody = 'green';
    this.bodys = [
      {x: 70, y: 50},
      {x: 60, y: 50},
      {x: 50, y: 50}
    ],
    this.direction = 1;  // 移动方向 0、1、2、3分别代表上下左右
  }
  // 渲染最新的小蛇
  Snake.prototype.render = function () {
    this.remove();
    this.bodys.forEach((item, index)=>{
      bodyArr.push(document.createElement('div'));
      this.map.appendChild(bodyArr[index]);
      bodyArr[index].style.width = this.width + 'px';
      bodyArr[index].style.height = this.height + 'px';
      bodyArr[index].style.position = 'absolute';
      bodyArr[index].style.left = item.x + 'px';
      bodyArr[index].style.top = item.y + 'px';
      bodyArr[index].style.backgroundColor = index==0 ? this.bgcHead : this.bgcBody;
    })
  }
  // 小蛇移动
  Snake.prototype.move = function(direction){
    // 判断如果是反方向，就不改变方向
    if(direction || direction == 0)
      this.direction = Math.abs(direction-this.direction)===2 ? this.direction : direction;
    for(let i=this.bodys.length-1; i>0; i--){
      this.bodys[i].x = this.bodys[i-1].x;
      this.bodys[i].y = this.bodys[i-1].y;
    }
    switch(this.direction){
      case 0: 
        this.bodys[0].y -= 10;
        break;
      case 1:
        this.bodys[0].x += 10;
        break;
      case 2:
        this.bodys[0].y += 10;
        break;
      case 3:
        this.bodys[0].x -= 10;
        break;
    }
    this.render();
  }
  // 删除之前的小蛇
  Snake.prototype.remove = function(){
    bodyArr.forEach(item=>{
      item.remove();
    })
    bodyArr = []
  }
  window.Snake = Snake;
})()
