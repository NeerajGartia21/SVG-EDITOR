var draw = SVG().addTo("body").size(window.innerWidth, window.innerHeight);
let currentElem,currentTask,elems=[],newElem;

function task(t){
    currentTask='create';
    newElem=t.id;
}

draw.node.addEventListener('mousedown',function(e){
    if(currentTask=='create'){
        currentElem={
            elem:create(e,newElem),
            prev:{
                x:e.clientX,
                y:e.clientY
            }
        }
    }
})

draw.node.addEventListener('mousemove',function(e){
    console.log(currentTask);
    if(currentTask=='resize'){
        make(e,currentElem);
    }
})

draw.node.addEventListener('mouseup',function(e){
    currentElem={};
    currentTask=null;
    newElem=null;
})

function create(e, elem) {
    switch (elem) {
      case "rect": {
        let rect = draw
          .rect(1,1)
          .attr({ stroke: "#000000", fill: "#ffffff", "stroke-width": 2 })
          .center(e.clientX, e.clientY);
        elems.push(rect);
        currentTask='resize'
        return rect;
      }
      case "circle": {
        let circle = draw
          .circle(1)
          .attr({ stroke: "#000000", fill: "#ffffff", "stroke-width": 2 })
          .center(e.clientX, e.clientY);
        elems.push(circle);
        currentTask='resize'
        return circle;
      }
      case "line": {
        let line= draw.line(e.clientX,e.clientY,e.clientX+1,e.clientY+1);
        line.stroke({ color: '#000000', width: 2, linecap: 'round' })
        elems.push(line);
        currentTask='resize'
        return line;
      }
    }
  }


  function make(e,elem){
      console.log('make')
      if(currentTask=='resize'){
      if(elem.elem.type=='rect'){
        elem.elem.size(e.clientX - elem.prev.x, e.clientY - elem.prev.y);
      }else if(elem.elem.type=='circle'){
        elem.elem.radius(Math.sqrt((e.clientX - elem.prev.x)*(e.clientX - elem.prev.x)+(e.clientY - elem.prev.y)*(e.clientY - elem.prev.y)))
      }else if(elem.elem.type=='line'){
        elem.elem.plot(elem.prev.x,elem.prev.y,e.clientX,e.clientY)
      }
    // }else if(currentTask=='move'){
    //   if(elem.type=='rect'){
    //     elem.size(e.clientX - elem.prev.x, e.clientY - elem.prev.y);
    //   }else if(elem.type=='line'){
    //     elem.plot(elem.prev.x,elem.prev.y,e.clientX,e.clientY)
    //   }
    }else{
      return;
    }
}


function move(e){

}