<script>
(function initPlanetDefense(selector){
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector(selector);
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    // DPR & resize a su contenedor (no a window directo)
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    function fitToParent(){
      const r = canvas.getBoundingClientRect();
      canvas.width  = Math.floor(r.width  * dpr);
      canvas.height = Math.floor(r.height * dpr);
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    }
    fitToParent();
    window.addEventListener('resize', fitToParent, {passive:true});

    // Sprites
    const sprite = new Image();
    const spriteExplosion = new Image();
    sprite.src = 'https://marclopezavila.github.io/planet-defense-game/img/sprite.png';
    spriteExplosion.src = 'https://marclopezavila.github.io/planet-defense-game/img/explosion.png';

    // Estado
    let bullets=[], asteroids=[], destroyed=0, record=0, count=0;
    let playing=false, gameOver=false;
    const planet = { deg: 0 };
    const player = { posX:-35, posY:-(100+82), width:70, height:79, deg:0 };

    // Helpers coordenadas relativas al canvas
    function pointerPos(evt){
      const r = canvas.getBoundingClientRect();
      const x = (evt.touches ? evt.touches[0].clientX : evt.clientX) - r.left;
      const y = (evt.touches ? evt.touches[0].clientY : evt.clientY) - r.top;
      return { x, y };
    }
    function center(){ const r=canvas.getBoundingClientRect(); return { x:r.width/2, y:r.height/2 }; }
    function dist(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return Math.hypot(dx,dy); }
    function rnd(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

    // Eventos
    canvas.addEventListener('click', onAction);
    canvas.addEventListener('mousemove', onAction);
    canvas.addEventListener('touchstart', onAction, {passive:false});
    canvas.addEventListener('touchmove',  onMove,   {passive:false});

    canvas.addEventListener('contextmenu', e => e.preventDefault());

    function onMove(e){
      e.preventDefault();
      const c = center();
      const p = pointerPos(e);
      player.deg = Math.atan2(p.x - c.x, -(p.y - c.y));
    }
    function onAction(e){
      e.preventDefault();
      const r  = canvas.getBoundingClientRect();
      const p  = pointerPos(e);
      const c  = { x:r.width/2, y:r.height/2 };

      if(playing){
        // disparo
        const deg = Math.atan2(p.x - c.x, -(p.y - c.y));
        bullets.push({
          x:-8, y:-179, sizeX:2, sizeY:10,
          realX:p.x, realY:p.y, dirX:p.x, dirY:p.y, deg, destroyed:false
        });
      }else{
        const startBtnPos = { x:c.x, y:c.y };         // círculo de start en el centro
        const isOverBtn = dist(p, startBtnPos) < 27;

        if(gameOver){
          const retryPos = { x:c.x, y:c.y+67 };       // botón retry bajo el centro
          if(dist(p, retryPos) < 27){
            if(e.type==='click'){
              // reset
              gameOver=false; count=0; bullets=[]; asteroids=[]; destroyed=0; player.deg=0;
              canvas.classList.remove('playing');
              canvas.style.cursor='default';
            }else{
              canvas.style.cursor='pointer';
            }
          }else{
            canvas.style.cursor='default';
          }
        }else{
          if(isOverBtn){
            if(e.type==='click'){
              playing=true;
              canvas.classList.add('playing');
              canvas.style.cursor='default';
              // activar mira con movimiento
              canvas.addEventListener('mousemove', onMove);
            }else{
              canvas.style.cursor='pointer';
            }
          }else{
            canvas.style.cursor='default';
          }
        }
      }
    }

    // Dibujo
    function drawPlanet(){
      const r = canvas.getBoundingClientRect();
      const c = { x:r.width/2, y:r.height/2 };

      ctx.save();
      ctx.fillStyle='white';
      ctx.shadowBlur=100; ctx.shadowOffsetX=0; ctx.shadowOffsetY=0; ctx.shadowColor="#999";
      ctx.beginPath();
      ctx.arc(c.x, c.y, 100, 0, Math.PI*2);
      ctx.fill();

      ctx.translate(c.x, c.y);
      ctx.rotate((planet.deg+=0.1) * (Math.PI/180));
      ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200);
      ctx.restore();
    }

    function drawPlayer(){
      const r = canvas.getBoundingClientRect();
      const c = { x:r.width/2, y:r.height/2 };

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(player.deg);
      ctx.drawImage(sprite, 200, 0, player.width, player.height, player.posX, player.posY, player.width, player.height);
      ctx.restore();

      if(bullets.length - destroyed && playing) fire();
    }

    function fire(){
      const r = canvas.getBoundingClientRect();
      const c = { x:r.width/2, y:r.height/2 };

      for(let i=0;i<bullets.length;i++){
        const b = bullets[i];
        if(b.destroyed) continue;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(b.deg);
        ctx.drawImage(sprite, 211, 100, 50, 75, b.x, (b.y -= 20), 19, 30);
        ctx.restore();

        // coords reales
        b.realX = (0) - (b.y + 10) * Math.sin(b.deg) + c.x;
        b.realY = (0) + (b.y + 10) * Math.cos(b.deg) + c.y;

        // colisión con asteroides
        for(let j=0;j<asteroids.length;j++){
          const a = asteroids[j];
          if(a.destroyed) continue;
          const d = Math.hypot(a.realX - b.realX, a.realY - b.realY);
          if(d < (((a.width/a.size)/2)-4) + ((19/2)-4)){
            destroyed++; a.destroyed=true; b.destroyed=true;
            a.state=0; a.stateX=0; a.extinct=false; // para anim de explosión
          }
        }
      }
    }

    function newAsteroid(){
      const r = canvas.getBoundingClientRect();
      const type = rnd(1,4);
      let x, y;
      if(type===1){ x=rnd(0, r.width); y=-150; }
      if(type===2){ x=r.width+150; y=rnd(0, r.height); }
      if(type===3){ x=rnd(0, r.width); y=r.height+150; }
      if(type===4){ x=-150; y=rnd(0, r.height); }

      const c = { x:r.width/2, y:r.height/2 };
      asteroids.push({
        x:278, y:0, state:0, stateX:0, width:134, height:123,
        realX:x, realY:y, moveY:0, coordsX:x, coordsY:y,
        size:rnd(1,3),
        deg: Math.atan2(x - c.x, -(y - c.y)),
        destroyed:false, extinct:false
      });
    }

    function drawAsteroids(){
      const r = canvas.getBoundingClientRect();
      const c = { x:r.width/2, y:r.height/2 };

      for(let i=0;i<asteroids.length;i++){
        const a = asteroids[i];

        if(!a.destroyed){
          ctx.save();
          ctx.translate(a.coordsX, a.coordsY);
          ctx.rotate(a.deg);
          ctx.drawImage(
            sprite, a.x, a.y, a.width, a.height,
            -(a.width/a.size)/2,
            a.moveY += 1/(a.size),
            a.width/a.size,
            a.height/a.size
          );
          ctx.restore();

          a.realX = (0) - (a.moveY + ((a.height/a.size)/2)) * Math.sin(a.deg) + a.coordsX;
          a.realY = (0) + (a.moveY + ((a.height/a.size)/2)) * Math.cos(a.deg) + a.coordsY;

          // fin de la partida si toca el planeta
          const d = Math.hypot(a.realX - c.x, a.realY - c.y);
          if(d < (((a.width/a.size)/2)-4) + 100){
            gameOver=true; playing=false;
            canvas.classList.remove('playing');
            canvas.addEventListener('mousemove', onAction);
          }
        }else if(!a.extinct){
          // explosión
          ctx.save();
          ctx.translate(a.realX, a.realY);
          ctx.rotate(a.deg);

          let spriteY, spriteX=256;
          if(a.state===0){ spriteY=0; spriteX=0; }
          else if(a.state<8){ spriteY=0; }
          else if(a.state<16){ spriteY=256; }
          else if(a.state<24){ spriteY=512; }
          else { spriteY=768; }

          if(a.state===8 || a.state===16 || a.state===24) a.stateX=0;

          ctx.drawImage(
            spriteExplosion,
            (a.stateX += spriteX), spriteY, 256, 256,
            -(a.width/a.size)/2,
            -(a.height/a.size)/2,
            a.width/a.size,
            a.height/a.size
          );
          a.state += 1;
          if(a.state===31) a.extinct=true;

          ctx.restore();
        }
      }

      // dificultad progresiva
      if(asteroids.filter(a=>!a.destroyed && !a.extinct).length < 10 + Math.floor(destroyed/6)){
        newAsteroid();
      }
    }

    // Loop
    function frame(){
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0,0,r.width,r.height);

      if(!gameOver){
        drawPlanet();
        drawPlayer();

        if(playing){
          drawAsteroids();

          // HUD
          ctx.font = "20px Verdana";
          ctx.fillStyle = "white";
          ctx.textBaseline = 'middle';
          ctx.textAlign = "left";
          ctx.fillText('Record: '+record, 20, 30);

          ctx.font = "40px Verdana";
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.textAlign = "center";
          ctx.strokeText(String(destroyed), r.width/2, r.height/2);
          ctx.fillText(String(destroyed),  r.width/2, r.height/2);
        }else{
          // botón start (sprite)
          ctx.drawImage(sprite, 428, 12, 70, 70, r.width/2 - 35, r.height/2 - 35, 70, 70);
        }
      }else if(count<1){
        count=1;
        ctx.fillStyle='rgba(0,0,0,0.75)';
        ctx.fillRect(0,0,r.width,r.height);

        ctx.font = "60px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", r.width/2, r.height/2 - 150);

        ctx.font = "20px Verdana";
        ctx.fillText("Total destroyed: "+ destroyed, r.width/2, r.height/2 + 140);

        record = destroyed > record ? destroyed : record;
        ctx.fillText("RECORD: "+ record, r.width/2, r.height/2 + 185);

        // botón retry
        ctx.drawImage(sprite, 500, 18, 70, 70, r.width/2 - 35, r.height/2 + 40, 70, 70);
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
})('#planet-defense-canvas');
</script>
