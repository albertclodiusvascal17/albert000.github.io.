(function(){
  var c=document.getElementById('net');
  if(!c)return;
  var x=c.getContext('2d'),P=[],W,H,m={x:-999,y:-999};
  var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function size(){
    var r=c.parentNode.getBoundingClientRect(),d=window.devicePixelRatio||1;
    W=r.width;H=r.height;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);
    var n=Math.round(Math.min(70,W*H/14000));P=[];
    for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});
  }
  function draw(){
    x.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){
      var p=P[i];
      if(!calm){
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;
        if(p.y<0||p.y>H)p.vy*=-1;
        var dx=p.x-m.x,dy=p.y-m.y,d=dx*dx+dy*dy;
        if(d<12000){p.x+=dx*.004;p.y+=dy*.004;}
      }
      x.fillStyle='rgba(139,123,255,.8)';
      x.beginPath();x.arc(p.x,p.y,1.6,0,6.283);x.fill();
      for(var j=i+1;j<P.length;j++){
        var q=P[j],ax=p.x-q.x,ay=p.y-q.y,dd=ax*ax+ay*ay;
        if(dd<17000){
          x.strokeStyle='rgba(79,216,196,'+(.22*(1-dd/17000))+')';
          x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();
        }
      }
    }
    if(!calm)requestAnimationFrame(draw);
  }
  c.parentNode.addEventListener('pointermove',function(e){
    var r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top;
  });
  c.parentNode.addEventListener('pointerleave',function(){m.x=m.y=-999;});
  addEventListener('resize',function(){size();if(calm)draw();});
  size();draw();
})();
