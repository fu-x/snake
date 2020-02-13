;(function(){
  let div;
  function Food(map, obj){
    this.obj = obj || {};
    this.obj.width = 10;
    this.obj.height = 10;
    this.obj.x = obj.x || 300;
    this.obj.y = obj.y || 250;
    this.obj.bgc = 'green';
    this.map = map;
  }
  Food.prototype.render = function(obj){
    obj = obj || {};
    this.obj.x = obj.x || this.obj.x;
    this.obj.y = obj.y || this.obj.y;
    if(div) div.remove();
    div = document.createElement('div');
    this.map.appendChild(div);
    div.style.width = this.obj.width + 'px';
    div.style.height = this.obj.height + 'px';
    div.style.position = 'absolute';
    div.style.left = this.obj.x + 'px';
    div.style.top = this.obj.y + 'px';
    div.style.backgroundColor = this.obj.bgc;
  }
  window.Food = Food;
})()