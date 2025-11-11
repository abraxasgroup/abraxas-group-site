/* Navegación móvil + sticky + juego compacto */

const nav = document.getElementById('nav');
const btn = document.getElementById('navToggle');
btn?.addEventListener('click', ()=> nav.classList.toggle('show'));

// ===== Mini game (Clarity reducido) =====
const map = {
  tile_size: 16,
  keys: [
    {id:0, colour:'#333', solid:0},
    {id:1, colour:'#888', solid:0},
    {id:2, colour:'#555', solid:1, bounce:.35},
    {id:3, colour:'rgba(121,220,242,.35)', friction:{x:.9,y:.9}, gravity:{x:0,y:.1}, jump:1, fore:1},
    {id:4, colour:'#777', jump:1},
    {id:5, colour:'#E373FA', solid:1, bounce:1.1},
    {id:6, colour:'#666', solid:1, bounce:0},
    {id:7, colour:'#73C6FA', solid:0, script:'color'},
    {id:8, colour:'#B6FF8E', solid:0, script:'win'},
    {id:9, colour:'#C93232', solid:0, script:'die'},
    {id:10, colour:'#555', solid:1},
  ],
  data: [
    [2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,1,1,8,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,7,1,1,1,1,1,1,1,7,1,2],
    [2,1,1,1,3,1,1,1,3,1,1,1,2],
    [2,1,1,1,1,1,4,1,1,1,1,1,2],
    [2,1,1,6,6,6,6,6,6,6,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,9,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2],
  ],
  gravity:{x:0,y:.28},
  vel_limit:{x:2,y:12},
  movement_speed:{jump:6,left:.3,right:.3},
  player:{x:2,y:2,colour:'#FF9900'},
  scripts:{
    color:'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
    win:'game.msg("¡Ganaste! 🚀"); game.load_map(map);',
    die:'game.msg("Ups, moriste 😅"); game.load_map(map);'
  }
};

const Clarity=function(){
  this.tile_size=16; this.limit_viewport=true; this.jump_switch=0;
  this.viewport={x:400,y:400}; this.camera={x:0,y:0};
  this.key={left:false,right:false,up:false};
  this.player={loc:{x:0,y:0}, vel:{x:0,y:0}, can_jump:true, colour:'#FF9900'};
  window.addEventListener('keydown', e=>{
    if(e.code==='ArrowLeft') this.key.left=true;
    if(e.code==='ArrowRight') this.key.right=true;
    if(e.code==='ArrowUp') this.key.up=true;
  });
  window.addEventListener('keyup', e=>{
    if(e.code==='ArrowLeft') this.key.left=false;
    if(e.code==='ArrowRight') this.key.right=false;
    if(e.code==='ArrowUp') this.key.up=false;
  });
};
Clarity.prototype.msg=(t)=>{ if(!t) return; clearTimeout(window.__tTo); const n=document.createElement('div'); n.className='game-toast'; n.textContent=t; document.body.appendChild(n); window.__tTo=setTimeout(()=>n.remove(),1400); };
Clarity.prototype.load_map=function(m){
  this.current_map=m; this.tile_size=m.tile_size||16;
  m.keys.forEach(k=> m.data.forEach((row,y)=> row.forEach((t,x)=>{ if(t===k.id) m.data[y][x]=k; })));
  this.current_map.width=m.data[0].length; this.current_map.height=m.data.length;
  this.current_map.width_p=this.current_map.width*this.tile_size; this.current_map.height_p=this.current_map.height*this.tile_size;
  this.player.loc.x=m.player.x*this.tile_size; this.player.loc.y=m.player.y*this.tile_size; this.player.colour=m.player.colour||'#FF9900';
  this.player.vel.x=0; this.player.vel.y=0; this.camera.x=0; this.camera.y=0;
};
Clarity.prototype.get_tile=function(x,y){ return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0; };
Clarity.prototype.draw_tile=function(x,y,t,ctx){ if(!t||!t.colour) return; ctx.fillStyle=t.colour; ctx.fillRect(x,y,this.tile_size,this.tile_size); };
Clarity.prototype.draw_map=function(ctx,fore){
  for(let y=0;y<this.current_map.data.length;y++){
    for(let x=0;x<this.current_map.data[y].length;x++){
      const tile=this.current_map.data[y][x];
      if((!fore&&!tile.fore)||(fore&&tile.fore)){
        const tx=(x*this.tile_size)-this.camera.x; const ty=(y*this.tile_size)-this.camera.y;
        if(tx<-this.tile_size||ty<-this.tile_size||tx>this.viewport.x||ty>this.viewport.y) continue;
        this.draw_tile(tx,ty,tile,ctx);
      }
    }
  }
  if(!fore) this.draw_map(ctx,true);
};
Clarity.prototype.move_player=function(){
  const off=Math.round((this.tile_size/2)-1);
  let tile=this.get_tile(Math.round(this.player.loc.x/this.tile_size), Math.round(this.player.loc.y/this.tile_size));
  if(tile.gravity){ this.player.vel.x+=tile.gravity.x; this.player.vel.y+=tile.gravity.y; } else { this.player.vel.x+=this.current_map.gravity.x; this.player.vel.y+=this.current_map.gravity.y; }
  if(tile.friction){ this.player.vel.x*=tile.friction.x; this.player.vel.y*=tile.friction.y; }
  const lim=this.current_map.vel_limit; this.player.vel.x=Math.min(Math.max(this.player.vel.x,-lim.x),lim.x); this.player.vel.y=Math.min(Math.max(this.player.vel.y,-lim.y),lim.y);
  let tX=this.player.loc.x+this.player.vel.x; let tY=this.player.loc.y+this.player.vel.y;
  const tyUp=Math.floor(tY/this.tile_size), tyDn=Math.ceil(tY/this.tile_size), y1=Math.round((this.player.loc.y-off)/this.tile_size), y2=Math.round((this.player.loc.y+off)/this.tile_size);
  const txLf=Math.floor(tX/this.tile_size), txRg=Math.ceil(tX/this.tile_size), x1=Math.round((this.player.loc.x-off)/this.tile_size), x2=Math.round((this.player.loc.x+off)/this.tile_size);
  const top1=this.get_tile(x1,tyUp), top2=this.get_tile(x2,tyUp), bot1=this.get_tile(x1,tyDn), bot2=this.get_tile(x2,tyDn), lef1=this.get_tile(txLf,y1), lef2=this.get_tile(txLf,y2), rig1=this.get_tile(txRg,y1), rig2=this.get_tile(txRg,y2);
  if(tile.jump && this.jump_switch>12){ this.player.can_jump=true; this.jump_switch=0; } else this.jump_switch++;
  this.player.loc.x+=this.player.vel.x; this.player.loc.y+=this.player.vel.y; this.player.vel.x*=.9;
  if(lef1.solid||lef2.solid||rig1.solid||rig2.solid){
    while(this.get_tile(Math.floor(this.player.loc.x/this.tile_size),y1).solid || this.get_tile(Math.floor(this.player.loc.x/this.tile_size),y2).solid) this.player.loc.x+=.1;
    while(this.get_tile(Math.ceil(this.player.loc.x/this.tile_size),y1).solid || this.get_tile(Math.ceil(this.player.loc.x/this.tile_size),y2).solid) this.player.loc.x-=.1;
    let b=0; [lef1,lef2,rig1,rig2].forEach(t=>{ if(t.solid && t.bounce>b) b=t.bounce; }); this.player.vel.x*=-b||0;
  }
  if(top1.solid||top2.solid||bot1.solid||bot2.solid){
    while(this.get_tile(x1,Math.floor(this.player.loc.y/this.tile_size)).solid || this.get_tile(x2,Math.floor(this.player.loc.y/this.tile_size)).solid) this.player.loc.y+=.1;
    while(this.get_tile(x1,Math.ceil(this.player.loc.y/this.tile_size)).solid || this.get_tile(x2,Math.ceil(this.player.loc.y/this.tile_size)).solid) this.player.loc.y-=.1;
    let b=0; [top1,top2,bot1,bot2].forEach(t=>{ if(t.solid && t.bounce>b) b=t.bounce; }); this.player.vel.y*=-b||0;
    if((bot1.solid||bot2.solid) && !tile.jump){ this.player.on_floor=true; this.player.can_jump=true; }
  }
  const cx=Math.round(this.player.loc.x-this.viewport.x/2), cy=Math.round(this.player.loc.y-this.viewport.y/2);
  const go=(v,t)=>{const d=Math.abs(t-v); if(d>5){ v += (t>v?1:-1)*Math.round(Math.max(1,d*.1)); } return v; };
  this.camera.x=go(this.camera.x,cx); this.camera.y=go(this.camera.y,cy);
  if(this.limit_viewport){
    this.camera.x=Math.min(this.current_map.width_p-this.viewport.x+this.tile_size, Math.max(0,this.camera.x));
    this.camera.y=Math.min(this.current_map.height_p-this.viewport.y+this.tile_size, Math.max(0,this.camera.y));
  }
  if(this.last_tile!==(tile.id||-1) && tile.script){ /* eslint-disable-next-line no-eval */ eval(this.current_map.scripts[tile.script]); }
  this.last_tile=tile.id||-1;
};
Clarity.prototype.update_player=function(){
  if(this.key.left  && this.player.vel.x>-this.current_map.vel_limit.x) this.player.vel.x-=this.current_map.movement_speed.left;
  if(this.key.right && this.player.vel.x< this.current_map.vel_limit.x) this.player.vel.x+=this.current_map.movement_speed.right;
  if(this.key.up && this.player.can_jump && this.player.vel.y>-this.current_map.vel_limit.y){ this.player.vel.y-=this.current_map.movement_speed.jump; this.player.can_jump=false; }
  this.move_player();
};
Clarity.prototype.draw_player=function(ctx){
  ctx.fillStyle=this.player.colour; ctx.beginPath();
  ctx.arc(this.player.loc.x+this.tile_size/2-this.camera.x, this.player.loc.y+this.tile_size/2-this.camera.y, this.tile_size/2-1,0,Math.PI*2); ctx.fill();
};
Clarity.prototype.update=function(){ this.update_player(); };
Clarity.prototype.draw=function(ctx){ this.draw_map(ctx,false); this.draw_player(ctx); };

(function(){
  const canvas=document.getElementById('canvas'); if(!canvas) return;
  const ctx=canvas.getContext('2d'); const BASE=400;
  const game=new Clarity(); game.set_viewport=(x,y)=>{ game.viewport.x=x; game.viewport.y=y; };
  game.load_map(map);
  const setSize=()=>{ const w=Math.min(680, Math.floor(window.innerWidth*.92)); canvas.width=Math.min(BASE,w); canvas.height=canvas.width; game.set_viewport(canvas.width, canvas.height); };
  setSize(); window.addEventListener('resize', setSize);
  (function loop(){ ctx.fillStyle='#222'; ctx.fillRect(0,0,canvas.width,canvas.height); game.update(); game.draw(ctx); requestAnimationFrame(loop); })();
})();
