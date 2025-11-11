/* Planet Defense – versión adaptada Abraxas
   - Usa <canvas id="planet-defense-canvas">
   - Se ajusta al tamaño de .game-canvas-wrap (16:9) y responde al resize
   - Corrige offsets del mouse con getBoundingClientRect
*/

(function () {
  // Esperar a que exista el canvas en el DOM
  window.addEventListener("load", initGame);

  function initGame() {
    const canvas = document.getElementById("planet-defense-canvas");
    if (!canvas) return; // canvas no encontrado

    const wrap = canvas.parentElement; // .game-canvas-wrap
    const ctx = canvas.getContext("2d");

    // ======= Sprites =======
    const sprite = new Image();
    const spriteExplosion = new Image();
    sprite.src = "https://marclopezavila.github.io/planet-defense-game/img/sprite.png";
    spriteExplosion.src = "https://marclopezavila.github.io/planet-defense-game/img/explosion.png";

    // ======= Estado de juego =======
    let cW = 0, cH = 0;
    let bullets = [], asteroids = [], explosions = [];
    let destroyed = 0, record = 0, count = 0;
    let playing = false, gameOver = false;
    let _planet = { deg: 0 };

    // Jugador
    const player = {
      posX: -35,
      posY: -(100 + 82),
      width: 70,
      height: 79,
      deg: 0
    };

    // ======= Helpers =======
    function rnd(from, to) { return Math.floor(Math.random() * (to - from + 1)) + from; }

    function setCanvasSize() {
      const rect = wrap.getBoundingClientRect();
      cW = canvas.width  = Math.max(1, Math.floor(rect.width));
      cH = canvas.height = Math.max(1, Math.floor(rect.height));
    }

    function localPointer(e) {
      // normaliza a coords locales del canvas (sin confiar en offsetX/offsetY)
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top)  * (canvas.height / rect.height)
      };
    }

    // ======= Listeners =======
    window.addEventListener("resize", setCanvasSize, { passive: true });

    function move(e) {
      const p = localPointer(e);
      player.deg = Math.atan2(p.x - (cW / 2), -(p.y - (cH / 2)));
    }

    function action(e) {
      e.preventDefault();
      const p = localPointer(e);

      if (playing) {
        const bullet = {
          x: -8, y: -179, sizeX: 2, sizeY: 10,
          realX: p.x, realY: p.y, dirX: p.x, dirY: p.y,
          deg: Math.atan2(p.x - (cW / 2), -(p.y - (cH / 2))),
          destroyed: false
        };
        bullets.push(bullet);
      } else {
        let dist;
        if (gameOver) {
          dist = Math.hypot(p.x - cW / 2, p.y - (cH / 2 + 67));
          if (dist < 27) {
            if (e.type === "click") {
              gameOver = false;
              count = 0; bullets = []; asteroids = []; explosions = [];
              destroyed = 0; player.deg = 0;
              canvas.removeEventListener("contextmenu", action);
              canvas.removeEventListener("mousemove", move);
              canvas.style.cursor = "default";
            } else {
              canvas.style.cursor = "pointer";
            }
          } else {
            canvas.style.cursor = "default";
          }
        } else {
          dist = Math.hypot(p.x - cW / 2, p.y - cH / 2);
          if (dist < 27) {
            if (e.type === "click") {
              playing = true;
              canvas.removeEventListener("mousemove", action);
              canvas.addEventListener("contextmenu", action);
              canvas.addEventListener("mousemove", move);
              canvas.classList.add("playing");
              canvas.style.cursor = "default";
            } else {
              canvas.style.cursor = "pointer";
            }
          } else {
            canvas.style.cursor = "default";
          }
        }
      }
    }

    canvas.addEventListener("click", action);
    canvas.addEventListener("mousemove", action, { passive: true });

    // ======= Sistemas =======
    function fire() {
      for (let i = 0; i < bullets.length; i++) {
        if (!bullets[i].destroyed) {
          ctx.save();
          ctx.translate(cW / 2, cH / 2);
          ctx.rotate(bullets[i].deg);

          ctx.drawImage(sprite, 211, 100, 50, 75, bullets[i].x, (bullets[i].y -= 20), 19, 30);
          ctx.restore();

          // Recalcular coords reales
          bullets[i].realX = 0 - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
          bullets[i].realY = 0 + (bullets[i].y + 10) * Math.cos(bullets[i].deg);
          bullets[i].realX += cW / 2;
          bullets[i].realY += cH / 2;

          // Colisión con asteroides
          for (let j = 0; j < asteroids.length; j++) {
            if (!asteroids[j].destroyed) {
              const distance = Math.hypot(asteroids[j].realX - bullets[i].realX, asteroids[j].realY - bullets[i].realY);
              if (distance < (((asteroids[j].width / asteroids[j].size) / 2) - 4) + ((19 / 2) - 4)) {
                destroyed += 1;
                asteroids[j].destroyed = true;
                bullets[i].destroyed = true;
                explosions.push(asteroids[j]);
              }
            }
          }
        }
      }
    }

    function planet() {
      ctx.save();
      ctx.fillStyle = "white";
      ctx.shadowBlur = 100;
      ctx.shadowColor = "#999";
      ctx.beginPath();
      ctx.arc(cW / 2, cH / 2, 100, 0, Math.PI * 2);
      ctx.fill();

      ctx.translate(cW / 2, cH / 2);
      ctx.rotate((_planet.deg += 0.1) * (Math.PI / 180));
      ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200);
      ctx.restore();
    }

    function renderPlayer() {
      ctx.save();
      ctx.translate(cW / 2, cH / 2);
      ctx.rotate(player.deg);
      ctx.drawImage(sprite, 200, 0, player.width, player.height, player.posX, player.posY, player.width, player.height);
      ctx.restore();

      if ((bullets.length - destroyed) && playing) fire();
    }

    function newAsteroid() {
      const type = rnd(1, 4);
      let coordsX, coordsY;
      switch (type) {
        case 1: coordsX = rnd(0, cW); coordsY = -150; break;
        case 2: coordsX = cW + 150; coordsY = rnd(0, cH); break;
        case 3: coordsX = rnd(0, cW); coordsY = cH + 150; break;
        case 4: coordsX = -150; coordsY = rnd(0, cH); break;
      }
      asteroids.push({
        x: 278, y: 0, state: 0, stateX: 0,
        width: 134, height: 123,
        realX: coordsX, realY: coordsY,
        moveY: 0, coordsX, coordsY,
        size: rnd(1, 3),
        deg: Math.atan2(coordsX - (cW / 2), -(coordsY - (cH / 2))),
        destroyed: false
      });
    }

    function renderAsteroids() {
      for (let i = 0; i < asteroids.length; i++) {
        const a = asteroids[i];
        if (!a.destroyed) {
          ctx.save();
          ctx.translate(a.coordsX, a.coordsY);
          ctx.rotate(a.deg);
          ctx.drawImage(
            sprite,
            a.x, a.y, a.width, a.height,
            -(a.width / a.size) / 2,
            a.moveY += 1 / (a.size),
            a.width / a.size,
            a.height / a.size
          );
          ctx.restore();

          // Coords reales
          a.realX = 0 - (a.moveY + ((a.height / a.size) / 2)) * Math.sin(a.deg);
          a.realY = 0 + (a.moveY + ((a.height / a.size) / 2)) * Math.cos(a.deg);
          a.realX += a.coordsX;
          a.realY += a.coordsY;

          // Game Over
          const distance = Math.hypot(a.realX - cW / 2, a.realY - cH / 2);
          if (distance < (((a.width / a.size) / 2) - 4) + 100) {
            gameOver = true;
            playing = false;
            canvas.addEventListener("mousemove", action, { passive: true });
          }
        } else if (!a.extinct) {
          explode(a);
        }
      }

      if (asteroids.length - destroyed < 10 + Math.floor(destroyed / 6)) {
        newAsteroid();
      }
    }

    function explode(a) {
      ctx.save();
      ctx.translate(a.realX, a.realY);
      ctx.rotate(a.deg);

      let spriteY, spriteX = 256;
      if (a.state === 0) { spriteY = 0; spriteX = 0; }
      else if (a.state < 8) { spriteY = 0; }
      else if (a.state < 16) { spriteY = 256; }
      else if (a.state < 24) { spriteY = 512; }
      else { spriteY = 768; }

      if (a.state === 8 || a.state === 16 || a.state === 24) a.stateX = 0;

      ctx.drawImage(
        spriteExplosion,
        (a.stateX += spriteX), spriteY,
        256, 256,
        -(a.width / a.size) / 2,
        -(a.height / a.size) / 2,
        a.width / a.size,
        a.height / a.size
      );
      a.state += 1;
      if (a.state === 31) a.extinct = true;

      ctx.restore();
    }

    function frame() {
      requestAnimationFrame(frame);

      if (!gameOver) {
        ctx.clearRect(0, 0, cW, cH);

        // planeta + player
        planet();
        renderPlayer();

        if (playing) {
          renderAsteroids();

          ctx.font = "20px Verdana";
          ctx.fillStyle = "white";
          ctx.textBaseline = "middle";
          ctx.textAlign = "left";
          ctx.fillText("Record: " + record, 20, 30);

          ctx.font = "40px Verdana";
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.strokeText(String(destroyed), cW / 2, cH / 2);
          ctx.fillText(String(destroyed), cW / 2, cH / 2);
        } else {
          // botón start
          ctx.drawImage(sprite, 428, 12, 70, 70, cW / 2 - 35, cH / 2 - 35, 70, 70);
        }
      } else if (count < 1) {
        count = 1;
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, cW, cH);

        ctx.font = "60px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", cW / 2, cH / 2 - 150);

        ctx.font = "20px Verdana";
        ctx.fillText("Total destroyed: " + destroyed, cW / 2, cH / 2 + 140);

        record = destroyed > record ? destroyed : record;
        ctx.fillText("RECORD: " + record, cW / 2, cH / 2 + 185);

        ctx.drawImage(sprite, 500, 18, 70, 70, cW / 2 - 35, cH / 2 + 40, 70, 70);
        canvas.classList.remove("playing");
      }
    }

    // arranque
    setCanvasSize();
    frame();
  }
})();
