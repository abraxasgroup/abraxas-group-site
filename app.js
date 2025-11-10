// Año footer
document.getElementById('y').textContent = new Date().getFullYear();

/* ---- FONDO: video + fallback estrellas ---- */
const video = document.getElementById('bg-video');
const stars = document.getElementById('stars');
let starsCtx, starArr=[];

function starfield(){
  stars.width = innerWidth; stars.height = innerHeight;
  starsCtx = stars.getContext('2d');
  starArr = Array.from({length: 180}, _ => ({
    x: Math.random()*stars.width,
    y: Math.random()*stars.height,
    z: Math.random()*2+0.5,
    r: Math.random()*1.6+0.2
  }));
  function tick(){
    starsCtx.clearRect(0,0,stars.width,stars.height);
    for(const s of starArr){
      s.x += s.z*0.25; if(s.x>stars.width) s.x=0;
      starsCtx.fillStyle = `hsla(${210+Math.random()*40},90%,${60+Math.random()*20}%,.9)`;
      starsCtx.beginPath(); starsCtx.arc(s.x,s.y,s.r,0,Math.PI*2); starsCtx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}
function enableStarsFallback(){
  stars.style.display='block';
}
video?.addEventListener('error', enableStarsFallback);
video?.addEventListener('stalled', enableStarsFallback);
if(!('canPlayType' in document.createElement('video'))) enableStarsFallback();

// ---------- JUEGO (Clarity mod) ----------
(function(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Tamaño responsivo
  function sizeGame(){
    const w = Math.min(520, Math.floor(window.innerWidth*0.9));
    canvas.width = w; canvas.height = w;
    if(game){ game.set_viewport(w,w); }
  }
  window.addEventListener('resize', sizeGame);

  // Motor (versión compacta con mapa)
  const map = {
    tile_size: 16,
    keys: [
      {id:0,colour:'#111'}, {id:1,colour:'#1d2a44'},
      {id:2,colour:'#2e4d85',solid:1,bounce:.2},
      {id:3,colour:'rgba(121,220,242,.22)',friction:{x:.94,y:.94},gravity:{x:0,y:.08},jump:1,fore:1},
      {id:4,colour:'#7EE228',solid:0,script:'next_level'},
      {id:5,colour:'#C93232',solid:0,script:'death'},
      {id:6,colour:'#3657a7',solid:1,bounce:0}
    ],
    data: (()=>{ // pequeño nivel horizontal
      const base = Array.from({length:32}, _ => 1);
      const grid = [];
      for(let r=0;r<28;r++){ grid.push([...base]); }
      // marco
      grid.forEach((row,ri)=>{row[0]=2;row[31]=2; if(ri===27) row.fill(2);});
      // plataformas
      for(let x=3;x<28;x+=4){ grid[20][x]=2; grid[16][(x+2)%31]=2; }
      grid[24][28]=4; // meta
      return grid;
    })(),
    gravity:{x:0,y:.35},
    vel_limit:{x:2.2,y:14},
    movement_speed:{jump:6.2,left:.32,right:.32},
    player:{x:2,y:2,colour:'#FF9900'},
    scripts:{
      next_level:'game.player.colour="#7EE228";',
      death:'game.player.loc.x=map.player.x*map.tile_size;game.player.loc.y=map.player.y*map.tile_size;'
    }
  };

  function Clarity(){
    this.alert_errors=false; this.log_info=false; this.tile_size=16; this.limit_viewport=true; this.jump_switch=0;
    this.viewport={x:320,y:320}; this.camera={x:0,y:0}; this.key={left:false,up:false,right:false};
    this.player={loc:{x:0,y:0},vel:{x:0,y:0},can_jump:true};
    addEventListener('keydown',e=>{if(e.keyCode===37)this.key.left=true; if(e.keyCode===38)this.key.up=true; if(e.keyCode===39)this.key.right=true;});
    addEventListener('keyup',e=>{if(e.keyCode===37)this.key.left=false; if(e.keyCode===38)this.key.up=false; if(e.keyCode===39)this.key.right=false;});
  }
  Clarity.prototype.set_viewport=function(x,y){this.viewport.x=x;this.viewport.y=y};
  Clarity.prototype.load_map=function(m){
    this.current_map=m; this.tile_size=m.tile_size||16;
    this.current_map.width=0; this.current_map.height=0;
    m.keys.forEach(k=>{ m.data.forEach((row,y)=>{ this.current_map.height=Math.max(this.current_map.height,y); row.forEach((t,x)=>{ this.current_map.width=Math.max(this.current_map.width,x); if(t==k.id) this.current_map.data[y][x]=k; }); }); });
    this.current_map.width_p=this.current_map.width*this.tile_size; this.current_map.height_p=this.current_map.height*this.tile_size;
    this.player.loc.x=m.player.x*this.tile_size; this.player.loc.y=m.player.y*this.tile_size; this.player.colour=m.player.colour||'#ff0';
    this.key.left=this.key.right=this.key.up=false; this.camera={x:0,y:0}; this.player.vel={x:0,y:0};
    return true;
  };
  Clarity.prototype.get_tile=function(x,y){ return (this.current_map.data[y]&&this.current_map.data[y][x])?this.current_map.data[y][x]:0 };
  Clarity.prototype.draw_tile=function(x,y,t,ctx){ if(!t||!t.colour) return; ctx.fillStyle=t.colour; ctx.fillRect(x,y,this.tile_size,this.tile_size) };
  Clarity.prototype.draw_map=function(ctx,fore){
    for(let y=0;y<this.current_map.data.length;y++){
      for(let x=0;x<this.current_map.data[y].length;x++){
        if((!fore&&!this.current_map.data[y][x].fore)||(fore&&this.current_map.data[y][x].fore)){
          const tx = (x*this.tile_size)-this.camera.x; const ty=(y*this.tile_size)-this.camera.y;
          if(tx<-this.tile_size||ty<-this.tile_size||tx>this.viewport.x||ty>this.viewport.y) continue;
          this.draw_tile(tx,ty,this.current_map.data[y][x],ctx);
        }
      }
    }
    if(!fore) this.draw_map(ctx,true);
  };
  Clarity.prototype.move_player=function(){
    const tX=this.player.loc.x+this.player.vel.x, tY=this.player.loc.y+this.player.vel.y;
    const off=Math.round(this.tile_size/2-1);
    const here=this.get_tile(Math.round(this.player.loc.x/this.tile_size), Math.round(this.player.loc.y/this.tile_size));
    if(here.gravity){ this.player.vel.x+=here.gravity.x; this.player.vel.y+=here.gravity.y; } else { this.player.vel.x+=this.current_map.gravity.x; this.player.vel.y+=this.current_map.gravity.y; }
    if(here.friction){ this.player.vel.x*=here.friction.x; this.player.vel.y*=here.friction.y; }

    const tyu=Math.floor(tY/this.tile_size), tyd=Math.ceil(tY/this.tile_size), yn1=Math.round((this.player.loc.y-off)/this.tile_size), yn2=Math.round((this.player.loc.y+off)/this.tile_size);
    const txl=Math.floor(tX/this.tile_size), txr=Math.ceil(tX/this.tile_size), xn1=Math.round((this.player.loc.x-off)/this.tile_size), xn2=Math.round((this.player.loc.x+off)/this.tile_size);
    const top1=this.get_tile(xn1,tyu), top2=this.get_tile(xn2,tyu), bot1=this.get_tile(xn1,tyd), bot2=this.get_tile(xn2,tyd);
    const left1=this.get_tile(txl,yn1), left2=this.get_tile(txl,yn2), right1=this.get_tile(txr,yn1), right2=this.get_tile(txr,yn2);

    if(here.jump && this.jump_switch>15){ this.player.can_jump=true; this.jump_switch=0; } else this.jump_switch++;
    this.player.vel.x=Math.min(Math.max(this.player.vel.x,-this.current_map.vel_limit.x),this.current_map.vel_limit.x);
    this.player.vel.y=Math.min(Math.max(this.player.vel.y,-this.current_map.vel_limit.y),this.current_map.vel_limit.y);
    this.player.loc.x+=this.player.vel.x; this.player.loc.y+=this.player.vel.y; this.player.vel.x*=.9;

    if(left1.solid||left2.solid||right1.solid||right2.solid){
      while(this.get_tile(Math.floor(this.player.loc.x/this.tile_size),yn1).solid || this.get_tile(Math.floor(this.player.loc.x/this.tile_size),yn2).solid) this.player.loc.x+=.1;
      while(this.get_tile(Math.ceil(this.player.loc.x/this.tile_size),yn1).solid || this.get_tile(Math.ceil(this.player.loc.x/this.tile_size),yn2).solid) this.player.loc.x-=.1;
      let b=0; if(left1.solid&&left1.bounce>b)b=left1.bounce; if(left2.solid&&left2.bounce>b)b=left2.bounce; if(right1.solid&&right1.bounce>b)b=right1.bounce; if(right2.solid&&right2.bounce>b)b=right2.bounce;
      this.player.vel.x*=-b||0;
    }
    if(top1.solid||top2.solid||bot1.solid||bot2.solid){
      while(this.get_tile(xn1,Math.floor(this.player.loc.y/this.tile_size)).solid || this.get_tile(xn2,Math.floor(this.player.loc.y/this.tile_size)).solid) this.player.loc.y+=.1;
      while(this.get_tile(xn1,Math.ceil(this.player.loc.y/this.tile_size)).solid || this.get_tile(xn2,Math.ceil(this.player.loc.y/this.tile_size)).solid) this.player.loc.y-=.1;
      let b=0; if(top1.solid&&top1.bounce>b)b=top1.bounce; if(top2.solid&&top2.bounce>b)b=top2.bounce; if(bot1.solid&&bot1.bounce>b)b=bot1.bounce; if(bot2.solid&&bot2.bounce>b)b=bot2.bounce;
      this.player.vel.y*=-b||0; if((bot1.solid||bot2.solid)&&!here.jump){ this.player.on_floor=true; this.player.can_jump=true; }
    }
    const cx=Math.round(this.player.loc.x-this.viewport.x/2);
    const cy=Math.round(this.player.loc.y-this.viewport.y/2);
    if(Math.abs(cx-this.camera.x)>5) this.camera.x += cx>this.camera.x ? 3 : -3;
    if(Math.abs(cy-this.camera.y)>5) this.camera.y += cy>this.camera.y ? 3 : -3;

    if(this.last_tile!=here.id && here.script){ eval(this.current_map.scripts[here.script]); }
    this.last_tile=here.id;
  };
  Clarity.prototype.update_player=function(){
    if(this.key.left && this.player.vel.x>-this.current_map.vel_limit.x) this.player.vel.x-=this.current_map.movement_speed.left;
    if(this.key.right && this.player.vel.x<this.current_map.vel_limit.x) this.player.vel.x+=this.current_map.movement_speed.right||this.current_map.movement_speed.left;
    if(this.key.up && this.player.can_jump && this.player.vel.y>-this.current_map.vel_limit.y){ this.player.vel.y-=this.current_map.movement_speed.jump; this.player.can_jump=false; }
    this.move_player();
  };
  Clarity.prototype.draw_player=function(ctx){
    ctx.fillStyle=this.player.colour;
    ctx.beginPath();
    ctx.arc(this.player.loc.x+this.tile_size/2-this.camera.x, this.player.loc.y+this.tile_size/2-this.camera.y, this.tile_size/2-1, 0, Math.PI*2);
    ctx.fill();
  };
  Clarity.prototype.update=function(){ this.update_player(); };
  Clarity.prototype.draw=function(ctx){ this.draw_map(ctx,false); this.draw_player(ctx); };

  // init
  const game = new Clarity();
  sizeGame();
  game.set_viewport(canvas.width, canvas.height);
  game.load_map(map);

  function loop(){
    ctx.fillStyle = '#0f1320';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    game.update(); game.draw(ctx);
    requestAnimationFrame(loop);
  }
  loop();
})();
