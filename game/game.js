/* ABRAXAS – Mini platformer (Clarity-based) – game.js
   - Canvas responsivo y nítido (devicePixelRatio)
   - Sin textos de demo ni enlaces
   - Controles: flechas (PC) + botones táctiles opcionales
   - Mapa igual al provisto (puede editarse)
*/
(() => {
  // ========= helpers =========
  const $ = (sel) => document.querySelector(sel);

  const canvas = document.getElementById('abx-canvas');
  if (!canvas) {
    console.warn('[ABRAXAS game] No se encontró #abx-canvas');
    return;
  }
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

  // Nitidez en pantallas HiDPI
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const fitCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * DPR);
    canvas.height = Math.round(rect.height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  new ResizeObserver(fitCanvas).observe(canvas);
  fitCanvas();

  // ========= MAPA =========
  const map = {
    tile_size: 16,
    keys: [
      { id: 0, colour: '#333', solid: 0 },
      { id: 1, colour: '#888', solid: 0 },
      { id: 2, colour: '#555', solid: 1, bounce: 0.35 },
      { id: 3, colour: 'rgba(121, 220, 242, 0.4)', friction: { x: 0.9, y: 0.9 }, gravity: { x: 0, y: 0.1 }, jump: 1, fore: 1 },
      { id: 4, colour: '#777', jump: 1 },
      { id: 5, colour: '#E373FA', solid: 1, bounce: 1.1 },
      { id: 6, colour: '#666', solid: 1, bounce: 0 },
      { id: 7, colour: '#73C6FA', solid: 0, script: 'change_colour' },
      { id: 8, colour: '#FADF73', solid: 0, script: 'next_level' },
      { id: 9, colour: '#C93232', solid: 0, script: 'death' },
      { id: 10, colour: '#555', solid: 1 },
      { id: 11, colour: '#0FF', solid: 0, script: 'unlock' }
    ],
    data: [
      [2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,6,6,6,6,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,1,2,2,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,7,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,4,2,2,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2,2,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],
      [2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,1,1,1,1,2],
      [2,1,2,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,1,1,1,1,2],
      [2,1,2,2,2,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,8,1,1,1,2],
      [2,1,2,2,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,4,2],
      [2,1,2,2,2,2,2,2,2,2,2,6,2,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,4,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2],
      [2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,1,1,1,1,1,1,2],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,2],
      [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ],
    gravity: { x: 0, y: 0.3 },
    vel_limit: { x: 2, y: 16 },
    movement_speed: { jump: 6, left: 0.3, right: 0.3 },
    player: { x: 2, y: 2, colour: '#FF9900' },
    scripts: {
      change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
      next_level: 'game.load_map(map);',
      death: 'game.load_map(map);',
      unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#888";'
    }
  };

  // ========= ENGINE (Clarity) – minimal, limpio =========
  function Game() {
    this.alert_errors = false;
    this.log_info = false;
    this.tile_size = 16;
    this.limit_viewport = true;
    this.jump_switch = 0;

    this.viewport = { x: 200, y: 200 };
    this.camera = { x: 0, y: 0 };
    this.key = { left: false, right: false, up: false };

    this.player = {
      loc: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      can_jump: true,
      on_floor: false,
      colour: '#FF9900'
    };
  }
  Game.prototype.set_viewport = function (x, y) { this.viewport.x = x; this.viewport.y = y; };
  Game.prototype.get_tile = function (x, y) {
    return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0;
  };
  Game.prototype.draw_tile = function (x, y, tile, context) {
    if (!tile || !tile.colour) return;
    context.fillStyle = tile.colour;
    context.fillRect(x, y, this.tile_size, this.tile_size);
  };
  Game.prototype.draw_map = function (context, fore) {
    for (let y = 0; y < this.current_map.data.length; y++) {
      for (let x = 0; x < this.current_map.data[y].length; x++) {
        const d = this.current_map.data[y][x];
        if ((!fore && !d.fore) || (fore && d.fore)) {
          const t_x = (x * this.tile_size) - this.camera.x;
          const t_y = (y * this.tile_size) - this.camera.y;
          if (t_x < -this.tile_size || t_y < -this.tile_size || t_x > this.viewport.x || t_y > this.viewport.y) continue;
          this.draw_tile(t_x, t_y, d, context);
        }
      }
    }
    if (!fore) this.draw_map(context, true);
  };
  Game.prototype.load_map = function (m) {
    if (!m || !m.data || !m.keys) return false;
    this.current_map = m;
    this.current_map.background = m.background || '#0f0f12';
    this.current_map.gravity = m.gravity || { x: 0, y: 0.3 };
    this.tile_size = m.tile_size || 16;

    this.current_map.width = 0; this.current_map.height = 0;
    m.keys.forEach(key => {
      m.data.forEach((row, y) => {
        this.current_map.height = Math.max(this.current_map.height, y);
        row.forEach((tile, x) => {
          this.current_map.width = Math.max(this.current_map.width, x);
          if (tile === key.id) this.current_map.data[y][x] = key;
        });
      });
    });
    this.current_map.width_p = this.current_map.width * this.tile_size;
    this.current_map.height_p = this.current_map.height * this.tile_size;

    this.player.loc.x = (m.player.x || 0) * this.tile_size;
    this.player.loc.y = (m.player.y || 0) * this.tile_size;
    this.player.colour = m.player.colour || '#FF9900';
    this.player.vel = { x: 0, y: 0 };
    this.camera = { x: 0, y: 0 };
    this.key.left = this.key.right = this.key.up = false;
    return true;
  };
  Game.prototype.move_player = function () {
    const tX = this.player.loc.x + this.player.vel.x;
    const tY = this.player.loc.y + this.player.vel.y;
    const off = Math.round((this.tile_size / 2) - 1);
    const tile = this.get_tile(Math.round(this.player.loc.x / this.tile_size), Math.round(this.player.loc.y / this.tile_size));

    if (tile.gravity) { this.player.vel.x += tile.gravity.x; this.player.vel.y += tile.gravity.y; }
    else { this.player.vel.x += this.current_map.gravity.x; this.player.vel.y += this.current_map.gravity.y; }
    if (tile.friction) { this.player.vel.x *= tile.friction.x; this.player.vel.y *= tile.friction.y; }

    const t_y_up = Math.floor(tY / this.tile_size);
    const t_y_down = Math.ceil(tY / this.tile_size);
    const y1 = Math.round((this.player.loc.y - off) / this.tile_size);
    const y2 = Math.round((this.player.loc.y + off) / this.tile_size);
    const t_x_left = Math.floor(tX / this.tile_size);
    const t_x_right = Math.ceil(tX / this.tile_size);
    const x1 = Math.round((this.player.loc.x - off) / this.tile_size);
    const x2 = Math.round((this.player.loc.x + off) / this.tile_size);

    const top1 = this.get_tile(x1, t_y_up), top2 = this.get_tile(x2, t_y_up);
    const bottom1 = this.get_tile(x1, t_y_down), bottom2 = this.get_tile(x2, t_y_down);
    const left1 = this.get_tile(t_x_left, y1), left2 = this.get_tile(t_x_left, y2);
    const right1 = this.get_tile(t_x_right, y1), right2 = this.get_tile(t_x_right, y2);

    if (tile.jump && this.jump_switch > 15) { this.player.can_jump = true; this.jump_switch = 0; } else this.jump_switch++;

    const lim = this.current_map.vel_limit;
    this.player.vel.x = Math.min(Math.max(this.player.vel.x, -lim.x), lim.x);
    this.player.vel.y = Math.min(Math.max(this.player.vel.y, -lim.y), lim.y);

    this.player.loc.x += this.player.vel.x;
    this.player.loc.y += this.player.vel.y;
    this.player.vel.x *= 0.9;

    if (left1.solid || left2.solid || right1.solid || right2.solid) {
      while (this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y1).solid ||
             this.get_tile(Math.floor(this.player.loc.x / this.tile_size), y2).solid) this.player.loc.x += 0.1;
      while (this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y1).solid ||
             this.get_tile(Math.ceil(this.player.loc.x / this.tile_size), y2).solid) this.player.loc.x -= 0.1;
      let bounce = 0;
      if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
      if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
      if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
      if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;
      this.player.vel.x *= -bounce || 0;
    }

    if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {
      while (this.get_tile(x1, Math.floor(this.player.loc.y / this.tile_size)).solid ||
             this.get_tile(x2, Math.floor(this.player.loc.y / this.tile_size)).solid) this.player.loc.y += 0.1;
      while (this.get_tile(x1, Math.ceil(this.player.loc.y / this.tile_size)).solid ||
             this.get_tile(x2, Math.ceil(this.player.loc.y / this.tile_size)).solid) this.player.loc.y -= 0.1;
      let bounce = 0;
      if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
      if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
      if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
      if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;
      this.player.vel.y *= -bounce || 0;
      if ((bottom1.solid || bottom2.solid) && !tile.jump) {
        this.player.on_floor = true;
        this.player.can_jump = true;
      }
    }

    // cámara suave
    const c_x = Math.round(this.player.loc.x - this.viewport.x / 2);
    const c_y = Math.round(this.player.loc.y - this.viewport.y / 2);
    const moveCam = (curr, target, max) => {
      const dif = Math.abs(target - curr);
      if (dif <= 5) return curr;
      const mag = Math.round(Math.max(1, dif * 0.1));
      let next = curr + (target > curr ? mag : -mag);
      if (this.limit_viewport) {
        next = Math.min(max, next);
        next = Math.max(0, next);
      }
      return next;
    };
    this.camera.x = moveCam(this.camera.x, c_x, this.current_map.width_p - this.viewport.x + this.tile_size);
    this.camera.y = moveCam(this.camera.y, c_y, this.current_map.height_p - this.viewport.y + this.tile_size);

    if (this.last_tile !== tile.id && tile.script) {
      // Ejecuta script simple (controlado)
      const s = this.current_map.scripts[tile.script];
      if (s) { /* eslint no-eval: 0 */ eval(s); }
    }
    this.last_tile = tile.id;
  };
  Game.prototype.update_player = function () {
    if (this.key.left)  if (this.player.vel.x > -this.current_map.vel_limit.x) this.player.vel.x -= this.current_map.movement_speed.left;
    if (this.key.right) if (this.player.vel.x <  this.current_map.vel_limit.x) this.player.vel.x += this.current_map.movement_speed.right || this.current_map.movement_speed.left;
    if (this.key.up) {
      if (this.player.can_jump && this.player.vel.y > -this.current_map.vel_limit.y) {
        this.player.vel.y -= this.current_map.movement_speed.jump;
        this.player.can_jump = false;
      }
    }
    this.move_player();
  };
  Game.prototype.update = function(){ this.update_player(); };
  Game.prototype.draw = function(context){
    // fondo sólido del juego (no el video de la landing)
    context.fillStyle = '#0f0f12';
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.draw_map(context, false);
    // jugador
    context.fillStyle = this.player.colour;
    context.beginPath();
    context.arc(
      this.player.loc.x + this.tile_size / 2 - this.camera.x,
      this.player.loc.y + this.tile_size / 2 - this.camera.y,
      this.tile_size / 2 - 1, 0, Math.PI * 2
    );
    context.fill();
  };

  // ========= INSTANCIA =========
  const game = new Game();
  const setViewportFromCanvas = () => {
    const r = canvas.getBoundingClientRect();
    game.set_viewport(Math.round(r.width), Math.round(r.height));
  };
  setViewportFromCanvas();
  addEventListener('resize', setViewportFromCanvas);

  game.load_map(map);

  // ========= CONTROLES =========
  const preventScroll = (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(e.key)) e.preventDefault();
  };
  addEventListener('keydown', (e) => {
    preventScroll(e);
    if (e.key === 'ArrowLeft')  game.key.left = true;
    if (e.key === 'ArrowRight') game.key.right = true;
    if (e.key === 'ArrowUp')    game.key.up = true;
  }, { passive: false });

  addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft')  game.key.left = false;
    if (e.key === 'ArrowRight') game.key.right = false;
    if (e.key === 'ArrowUp')    game.key.up = false;
  });

  const bindTouch = (btn, prop) => {
    if (!btn) return;
    const on = (ev) => { ev.preventDefault(); game.key[prop] = true; };
    const off = () => { game.key[prop] = false; };
    btn.addEventListener('touchstart', on, { passive: false });
    btn.addEventListener('touchend', off, { passive: true });
    btn.addEventListener('touchcancel', off, { passive: true });
    // También pointer/mouse por si querés usarlo en desktop
    btn.addEventListener('pointerdown', on);
    btn.addEventListener('pointerup', off);
    btn.addEventListener('pointerleave', off);
  };
  bindTouch(document.querySelector('[data-left]'), 'left');
  bindTouch(document.querySelector('[data-right]'), 'right');
  bindTouch(document.querySelector('[data-jump]'), 'up');

  // ========= LOOP =========
  const Loop = () => {
    game.update();
    game.draw(ctx);
    requestAnimationFrame(Loop);
  };
  requestAnimationFrame(Loop);

  // Exponer por si querés debugear en consola
  window.abxGame = game;
})();
