/** A small, dependency-free WebGL field of softly moving colour. */
const hero = document.querySelector<HTMLElement>("[data-hero]");
const backdrop = document.querySelector<HTMLElement>("[data-shader-backdrop]");
const canvas = backdrop?.querySelector<HTMLCanvasElement>("[data-shader]");
const toggle = hero?.querySelector<HTMLButtonElement>("[data-motion-toggle]");

if (hero && backdrop && canvas && toggle) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });

  if (gl) {
    const vertex = `
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * .5 + .5;
        gl_Position = vec4(position, 0., 1.);
      }
    `;
    const fragment = `
      precision mediump float;
      varying vec2 uv;
      uniform float time;
      uniform float aspect;
      uniform vec2 pointer;
      uniform vec2 pointerVelocity;
      uniform float pointerStrength;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3. - 2. * f);
        return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x),
                   mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
      }
      float field(vec2 p) {
        return noise(p) * .58 + noise(p * 2.03 + 7.4) * .28
          + noise(p * 4.01 + 13.8) * .14;
      }
      float brushStroke(
        vec2 point,
        vec2 origin,
        vec2 direction,
        float offset,
        float phase,
        float speed,
        float time
      ) {
        vec2 normal = vec2(-direction.y, direction.x);
        vec2 relative = point - origin;
        float along = dot(relative, direction);
        float across = dot(relative, normal);
        float undulation = sin(along * 6.2 + phase + time * 34.) * (.055 + speed * .025)
          + sin(along * 13. + phase * 1.7 - time * 19.) * .018;
        float tail = smoothstep(-1.3, -.82, along)
          * (1. - smoothstep(.08, .42, along));
        float bristle = exp(-pow((across - offset - undulation) * 7.5, 2.));
        return tail * bristle;
      }
      void main() {
        vec2 p = (uv - .5) * vec2(aspect, 1.);
        vec2 cursor = (pointer - .5) * vec2(aspect, 1.);
        vec2 cursorVelocity = pointerVelocity * vec2(aspect, 1.);
        float t = time * .055;
        vec2 drift = vec2(sin(t * .7), cos(t * .5)) * .35;
        vec2 warp = vec2(field(p * 1.6 + drift + t * .12),
                         field(p * 1.8 - drift + vec2(5., t * .15)));
        vec2 cursorOffset = p - cursor;
        float cursorDistance = length(cursorOffset);
        float cursorGlow = exp(-cursorDistance * 3.2) * pointerStrength;
        float cursorRipple = sin(cursorDistance * 15. - t * 2.2)
          * exp(-cursorDistance * 4.6) * pointerStrength;
        float cursorSpeed = length(cursorVelocity);
        vec2 direction = cursorVelocity / (cursorSpeed + .0001);
        vec2 wakeOffset = p - (cursor - cursorVelocity * .42);
        float alongWake = dot(wakeOffset, direction);
        float acrossWake = dot(wakeOffset, vec2(-direction.y, direction.x));
        float wake = exp(-(alongWake * alongWake * 1.25 + acrossWake * acrossWake * 5.5))
          * smoothstep(.03, .42, cursorSpeed) * pointerStrength;
        float wakeRibbon = sin(alongWake * 13. - acrossWake * 5. + t * 2.8)
          * wake;
        float brush = brushStroke(p, cursor, direction, -.13, .3, cursorSpeed, t)
          + brushStroke(p, cursor, direction, .02, 2.1, cursorSpeed, t)
          + brushStroke(p, cursor, direction, .16, 4.4, cursorSpeed, t);
        brush *= smoothstep(.03, .35, cursorSpeed) * pointerStrength;
        brush = min(brush, 1.);
        float flow = field(p * 2.1 + warp * 2.8 + vec2(t * .15, -t * .2)
          + normalize(cursorOffset + vec2(.001))
            * (cursorRipple * .16 + wakeRibbon * .23 + brush * .18));
        float ribbon = sin(p.x * 2.8 - p.y * 3.5 + flow * 5. + t * .35);
        vec3 cream = vec3(.91, .91, .79);
        vec3 sage = vec3(.56, .68, .53);
        vec3 amber = vec3(.93, .73, .40);
        vec3 deepSage = vec3(.40, .56, .44);
        vec3 colour = mix(sage, cream, smoothstep(-.8, .9, ribbon));
        float glow = exp(-length((p - vec2(.65 + sin(t) * .2, -.15)) * vec2(.8, 1.5)) * 1.3);
        colour = mix(colour, amber, glow * .8);
        colour = mix(colour, cream, cursorGlow * .42);
        colour = mix(colour, amber, cursorGlow * .24);
        colour = mix(colour, cream, wake * .22);
        colour = mix(colour, amber, wake * .36);
        colour = mix(colour, cream, brush * .24);
        colour = mix(colour, amber, brush * .3);
        colour = mix(colour, deepSage, smoothstep(.55, .92, flow) * .35);
        // Keep the left-hand title area light and readable as the field moves.
        colour = mix(colour, cream, (1. - smoothstep(.0, .85, uv.x)) * .38);
        gl_FragColor = vec4(colour, 1.);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const start = () => {
      const vs = compile(gl.VERTEX_SHADER, vertex);
      const fs = compile(gl.FRAGMENT_SHADER, fragment);
      const program = gl.createProgram();
      if (!vs || !fs || !program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        return;
      }
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      const timeUniform = gl.getUniformLocation(program, "time");
      const aspectUniform = gl.getUniformLocation(program, "aspect");
      const pointerUniform = gl.getUniformLocation(program, "pointer");
      const pointerVelocityUniform = gl.getUniformLocation(
        program,
        "pointerVelocity",
      );
      const pointerStrengthUniform = gl.getUniformLocation(
        program,
        "pointerStrength",
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      let paused = reducedMotion.matches;
      let inView = true;
      let frame = 0;
      let lastTime = 0;
      let elapsed = 0;
      let lost = false;
      let pointer: [number, number] = [0.5, 0.5];
      let pointerTarget: [number, number] = [0.5, 0.5];
      let pointerVelocity: [number, number] = [0, 0];
      let pointerVelocityTarget: [number, number] = [0, 0];
      let pointerStrength = 0;
      let pointerStrengthTarget = 0;
      let lastPointerTime = 0;

      const settlePointer = (immediate = false) => {
        const easing = immediate ? 1 : 0.14;
        pointer[0] += (pointerTarget[0] - pointer[0]) * easing;
        pointer[1] += (pointerTarget[1] - pointer[1]) * easing;
        pointerVelocity[0] +=
          (pointerVelocityTarget[0] - pointerVelocity[0]) * easing;
        pointerVelocity[1] +=
          (pointerVelocityTarget[1] - pointerVelocity[1]) * easing;
        pointerStrength += (pointerStrengthTarget - pointerStrength) * easing;
        pointerVelocityTarget[0] *= 0.88;
        pointerVelocityTarget[1] *= 0.88;
      };

      const draw = () => {
        gl.uniform1f(timeUniform, elapsed / 1000);
        gl.uniform1f(
          aspectUniform,
          canvas.clientWidth / Math.max(canvas.clientHeight, 1),
        );
        gl.uniform2f(pointerUniform, pointer[0], pointer[1]);
        gl.uniform2f(
          pointerVelocityUniform,
          pointerVelocity[0],
          pointerVelocity[1],
        );
        gl.uniform1f(pointerStrengthUniform, pointerStrength);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(canvas.clientWidth * ratio);
        canvas.height = Math.round(canvas.clientHeight * ratio);
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (!lost) draw();
      };
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (!lastTime) lastTime = now;
        const delta = now - lastTime;
        if (delta < 1000 / 30) return;
        elapsed += Math.min(delta, 100);
        lastTime = now;
        settlePointer();
        draw();
      };
      const updatePointer = (event: PointerEvent) => {
        if (!event.isPrimary) return;
        const bounds = backdrop.getBoundingClientRect();
        const isInsideBackdrop =
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom;
        if (!isInsideBackdrop) {
          clearPointer();
          return;
        }
        const nextPointer: [number, number] = [
          Math.min(
            Math.max((event.clientX - bounds.left) / bounds.width, 0),
            1,
          ),
          Math.min(
            Math.max(1 - (event.clientY - bounds.top) / bounds.height, 0),
            1,
          ),
        ];
        const now = performance.now();
        const delta = lastPointerTime
          ? Math.max((now - lastPointerTime) / 1000, 1 / 120)
          : 1 / 60;
        pointerVelocityTarget = [
          Math.min(
            Math.max((nextPointer[0] - pointerTarget[0]) / delta, -1.6),
            1.6,
          ),
          Math.min(
            Math.max((nextPointer[1] - pointerTarget[1]) / delta, -1.6),
            1.6,
          ),
        ];
        pointerTarget = nextPointer;
        lastPointerTime = now;
        pointerStrengthTarget = event.pointerType === "touch" ? 0.65 : 1;
        if (paused) {
          settlePointer(true);
          draw();
        }
      };
      const clearPointer = () => {
        pointerTarget = [0.5, 0.5];
        pointerVelocityTarget = [0, 0];
        pointerStrengthTarget = 0;
        lastPointerTime = 0;
        if (paused) {
          settlePointer(true);
          draw();
        }
      };
      const sync = () => {
        cancelAnimationFrame(frame);
        lastTime = 0;
        toggle.setAttribute("aria-pressed", String(paused));
        const label = toggle.querySelector("[data-motion-label]");
        const symbol = toggle.querySelector("[data-motion-symbol]");
        if (label) label.textContent = paused ? "Play motion" : "Pause motion";
        if (symbol) symbol.textContent = paused ? "▷" : "Ⅱ";
        if (!paused && inView && !document.hidden && !lost) {
          frame = requestAnimationFrame(tick);
        }
      };
      const onToggle = () => {
        paused = !paused;
        sync();
      };
      const onPreference = () => {
        paused = reducedMotion.matches;
        sync();
      };
      const onLost = (event: Event) => {
        event.preventDefault();
        lost = true;
        delete backdrop.dataset.shaderReady;
        toggle.hidden = true;
        sync();
      };
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      });
      const sizes = new ResizeObserver(resize);
      observer.observe(hero);
      sizes.observe(backdrop);
      toggle.addEventListener("click", onToggle);
      window.addEventListener("pointermove", updatePointer, { passive: true });
      document.addEventListener("pointerleave", clearPointer);
      reducedMotion.addEventListener("change", onPreference);
      document.addEventListener("visibilitychange", sync);
      canvas.addEventListener("webglcontextlost", onLost);
      resize();
      backdrop.dataset.shaderReady = "true";
      toggle.hidden = false;
      sync();

      window.addEventListener(
        "pagehide",
        (event) => {
          // A cached page retains its resources and resumes via visibilitychange.
          if (event.persisted) return;
          cancelAnimationFrame(frame);
          observer.disconnect();
          sizes.disconnect();
          window.removeEventListener("pointermove", updatePointer);
          document.removeEventListener("pointerleave", clearPointer);
          reducedMotion.removeEventListener("change", onPreference);
          document.removeEventListener("visibilitychange", sync);
          gl.deleteBuffer(buffer);
          gl.deleteProgram(program);
        },
        { once: true },
      );
    };
    start();
  }
}
