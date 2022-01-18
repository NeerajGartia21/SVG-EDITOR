var draw = SVG().addTo("body").size(window.innerWidth, window.innerHeight);
let objs = [];

window.addEventListener('resize',function(e){
  draw.size(window.innerWidth, window.innerHeight);
})

let currentTask,
  make = false,
  prevX,
  prevY,
  move=false;

function task(t) {
  currentTask='make';
  let elem;
  draw.node.addEventListener("mousedown", function (e) {
    if(currentTask=='make'){
      make=true;
      elem = create(e, t.id);
      elem.node.addEventListener('mousedown',function(e){
        let movingElem=elem;
      })
    }else{
      move=true;
      currentTask='move';
    }
    prevX = e.clientX;
    prevY = e.clientY;
  });
  draw.node.addEventListener("mousemove",function(e){
    resize(e);
  });
  draw.node.addEventListener("mouseup", function (e) {
    make = false;
    currentTask=null;
  });
}

function resize(e){
    if(make){
      if(elem.type=='rect'){
        elem.size(e.clientX - prevX, e.clientY - prevY);
      }else if(elem.type=='circle'){
        elem.radius(Math.sqrt((e.clientX - prevX)*(e.clientX - prevX)+(e.clientY - prevY)*(e.clientY - prevY)))
      }else if(elem.type=='line'){
        elem.plot(prevX,prevY,e.clientX,e.clientY)
      }
    }else if(currentTask=='move'){
      if(elem.type=='rect'){
        elem.size(e.clientX - prevX, e.clientY - prevY);
      }else if(elem.type=='line'){
        elem.plot(prevX,prevY,e.clientX,e.clientY)
      }
    }else{
      return;
    }
}

function create(e, elem) {
  switch (elem) {
    case "rect": {
      let rect = draw
        .rect(1)
        .attr({ stroke: "#000000", fill: "#ffffff", "stroke-width": 2 })
        .center(e.clientX, e.clientY);
      objs.push(rect);
      return rect;
    }
    case "circle": {
      let circle = draw
        .circle(1)
        .attr({ stroke: "#000000", fill: "#ffffff", "stroke-width": 2 })
        .center(e.clientX, e.clientY);
      objs.push(circle);
      return circle;
    }
    case "line": {
      let line= draw.line(e.clientX,e.clientY,e.clientX+1,e.clientY+1);
      line.stroke({ color: '#000000', width: 2, linecap: 'round' })
      objs.push(line);
      return line;
    }
  }
}

// rect.center(window.innerHeight/2,window.innerWidth/2);
