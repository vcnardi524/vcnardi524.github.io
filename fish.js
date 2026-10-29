// A little tuna that jumps out of the water now and then. Click the water to make it jump.
(function () {
  const canvas = document.getElementById("pond");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, water = 0;
  let jump = null;     // current leap
  let nextAt = 600;    // time of next automatic leap
  let ripples = [], drops = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height; water = H * 0.72;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function colors() {
    const s = getComputedStyle(document.documentElement);
    const v = (n) => s.getPropertyValue(n).trim();
    return { ink: v("--text"), soft: v("--link-line"), back: v("--tuna-back"), belly: v("--tuna-belly"), finlet: v("--tuna-fin") };
  }

  function waveY(x, now) {
    return water + Math.sin(x * 0.018 + now * 0.0012) * 2.2 + Math.sin(x * 0.047 - now * 0.0017) * 1.1;
  }

  function startJump(now, atX) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const span = 130 + Math.random() * 110;
    let x0 = atX != null ? atX - (dir * span) / 2 : 60 + Math.random() * (W - 120);
    x0 = Math.max(30, Math.min(W - 30, x0));
    let x1 = x0 + dir * span;
    if (x1 < 30 || x1 > W - 30) x1 = x0 - dir * span;
    jump = {
      x0, x1, start: now,
      dur: 1050 + Math.random() * 300,
      height: Math.min(water - 22, 60 + Math.random() * 50),
      splashedOut: false, splashedIn: false,
    };
  }

  function splash(x, now, big) {
    ripples.push({ x, born: now });
    const n = big ? 9 : 6;
    for (let i = 0; i < n; i++) {
      drops.push({
        x, y: water,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -(1.2 + Math.random() * 2.2),
        r: 1 + Math.random() * 1.3,
      });
    }
  }

  // Position of the fish at progress p (0..1) along its arc.
  function arc(j, p) {
    return {
      x: j.x0 + (j.x1 - j.x0) * p,
      y: water + 14 - (j.height + 14) * 4 * p * (1 - p),
    };
  }

  function drawFish(x, y, angle, flip, wag, c) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(1.25, 1.25);
    if (flip) ctx.scale(1, -1);

    // crescent tail
    ctx.save();
    ctx.translate(-18, 0);
    ctx.rotate(wag);
    ctx.fillStyle = c.back;
    ctx.beginPath();
    ctx.moveTo(1, 0);
    ctx.quadraticCurveTo(-4, -5, -10, -12);
    ctx.quadraticCurveTo(-6, 0, -10, 12);
    ctx.quadraticCurveTo(-4, 5, 1, 0);
    ctx.fill();
    ctx.restore();

    // second dorsal and anal fins
    ctx.fillStyle = c.back;
    ctx.beginPath(); ctx.moveTo(-3, -5); ctx.lineTo(-8, -11); ctx.lineTo(-9, -4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-3, 5); ctx.lineTo(-8, 11); ctx.lineTo(-9, 4); ctx.fill();
    // first dorsal fin
    ctx.beginPath(); ctx.moveTo(9, -6.5); ctx.quadraticCurveTo(5, -12, 1, -12); ctx.lineTo(2, -6.8); ctx.fill();

    // torpedo body: dark back, silver belly
    const grad = ctx.createLinearGradient(0, -8, 0, 8);
    grad.addColorStop(0, c.back);
    grad.addColorStop(0.45, c.back);
    grad.addColorStop(0.6, c.belly);
    grad.addColorStop(1, c.belly);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(24, 0.5);
    ctx.bezierCurveTo(20, -7, 4, -8.5, -8, -4.5);
    ctx.quadraticCurveTo(-15, -2, -19, -1);
    ctx.lineTo(-19, 1);
    ctx.quadraticCurveTo(-15, 2, -8, 4.5);
    ctx.bezierCurveTo(4, 8.5, 20, 7, 24, 0.5);
    ctx.fill();

    // yellow finlets along the back and belly
    ctx.fillStyle = c.finlet;
    for (let i = 0; i < 5; i++) {
      const fx = -9 - i * 2.2, h = 3.6 - i * 0.6;
      const fy = 4.2 - i * 0.7;
      ctx.beginPath(); ctx.moveTo(fx, -fy); ctx.lineTo(fx - 1.6, -fy - 1.2); ctx.lineTo(fx - 1, -fy + 0.6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx - 1.6, fy + 1.2); ctx.lineTo(fx - 1, fy - 0.6); ctx.fill();
    }

    // long pectoral fin
    ctx.fillStyle = c.back;
    ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.moveTo(12, 0.5); ctx.quadraticCurveTo(4, 1, -4, 3.5); ctx.quadraticCurveTo(5, 3, 12, 2); ctx.fill();
    ctx.globalAlpha = 1;

    // eye
    ctx.fillStyle = c.belly;
    ctx.beginPath(); ctx.arc(17, -1.2, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#111";
    ctx.beginPath(); ctx.arc(17.3, -1.2, 1.1, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }

  function frame(now) {
    const c = colors();
    ctx.clearRect(0, 0, W, H);

    if (!still && !jump && now > nextAt) startJump(now);

    // fish, clipped so it disappears below the surface
    if (jump || still) {
      const j = jump || { x0: W * 0.42, x1: W * 0.58, height: 70, start: 0, dur: 1 };
      const p = still ? 0.42 : (now - j.start) / j.dur;
      if (!still && p >= 1) {
        jump = null;
        nextAt = now + 1800 + Math.random() * 3500;
      } else {
        const a = arc(j, p), b = arc(j, Math.min(1, p + 0.01));
        const dir = j.x1 > j.x0 ? 1 : -1;
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const wag = Math.sin(now * 0.03) * 0.35;
        if (!still) {
          // splash when crossing the surface
          if (!j.splashedOut && a.y < water) { j.splashedOut = true; splash(a.x, now, false); }
          if (j.splashedOut && !j.splashedIn && p > 0.5 && a.y > water - 2) { j.splashedIn = true; splash(a.x, now, true); }
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let x = 0; x <= W; x += 8) ctx.lineTo(x, waveY(x, now));
        ctx.lineTo(W, 0);
        ctx.closePath();
        ctx.clip();
        drawFish(a.x, a.y, angle, dir < 0, wag, c);
        ctx.restore();
      }
    }

    // ripples on the surface
    ripples = ripples.filter((r) => now - r.born < 1400);
    ctx.strokeStyle = c.soft;
    for (const r of ripples) {
      const age = (now - r.born) / 1400;
      ctx.globalAlpha = 1 - age;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(r.x, water + 3, 6 + age * 38, 1.5 + age * 4, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // splash droplets
    ctx.fillStyle = c.soft;
    drops = drops.filter((d) => d.y <= water + 2);
    for (const d of drops) {
      d.vy += 0.12; d.x += d.vx; d.y += d.vy;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // the water line, plus two faint lines below it
    ctx.strokeStyle = c.ink;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = waveY(x, now);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = c.soft;
    ctx.lineWidth = 1;
    for (const [off, from, to] of [[12, 0.15, 0.4], [22, 0.55, 0.85]]) {
      ctx.beginPath();
      for (let x = W * from; x <= W * to; x += 4) {
        const y = waveY(x + 40, now * 0.8) + off;
        x === W * from ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    if (!still) requestAnimationFrame(frame);
  }

  canvas.addEventListener("click", (e) => {
    if (still || jump) return;
    const r = canvas.getBoundingClientRect();
    startJump(performance.now(), e.clientX - r.left);
  });
  window.addEventListener("resize", () => { resize(); if (still) frame(0); });

  resize();
  requestAnimationFrame(frame);
})();
