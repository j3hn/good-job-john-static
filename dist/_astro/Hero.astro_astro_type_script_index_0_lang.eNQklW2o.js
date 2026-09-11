var e=document.querySelector(`[data-hero]`),t=e?.querySelector(`[data-shader]`),n=e?.querySelector(`[data-motion-toggle]`);if(e&&t&&n){let r=t.getContext(`webgl`,{alpha:!1,antialias:!1,depth:!1,powerPreference:`low-power`});if(r){let i=(e,t)=>{let n=r.createShader(e);return n?(r.shaderSource(n,t),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(r.deleteShader(n),null)):null};(()=>{let a=i(r.VERTEX_SHADER,`
      attribute vec2 position;
      varying vec2 uv;
      void main() {
        uv = position * .5 + .5;
        gl_Position = vec4(position, 0., 1.);
      }
    `),o=i(r.FRAGMENT_SHADER,`
      precision mediump float;
      varying vec2 uv;
      uniform float time;
      uniform float aspect;

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
      void main() {
        vec2 p = (uv - .5) * vec2(aspect, 1.);
        float t = time * .055;
        vec2 drift = vec2(sin(t * .7), cos(t * .5)) * .35;
        vec2 warp = vec2(field(p * 1.6 + drift + t * .12),
                         field(p * 1.8 - drift + vec2(5., t * .15)));
        float flow = field(p * 2.1 + warp * 2.8 + vec2(t * .15, -t * .2));
        float ribbon = sin(p.x * 2.8 - p.y * 3.5 + flow * 5. + t * .35);
        vec3 cream = vec3(.91, .91, .79);
        vec3 sage = vec3(.56, .68, .53);
        vec3 amber = vec3(.93, .73, .40);
        vec3 deepSage = vec3(.40, .56, .44);
        vec3 colour = mix(sage, cream, smoothstep(-.8, .9, ribbon));
        float glow = exp(-length((p - vec2(.65 + sin(t) * .2, -.15)) * vec2(.8, 1.5)) * 1.3);
        colour = mix(colour, amber, glow * .8);
        colour = mix(colour, deepSage, smoothstep(.55, .92, flow) * .35);
        // Keep the left-hand title area light and readable as the field moves.
        colour = mix(colour, cream, (1. - smoothstep(.0, .85, uv.x)) * .38);
        gl_FragColor = vec4(colour, 1.);
      }
    `),s=r.createProgram();if(!a||!o||!s)return;if(r.attachShader(s,a),r.attachShader(s,o),r.linkProgram(s),r.deleteShader(a),r.deleteShader(o),!r.getProgramParameter(s,r.LINK_STATUS)){r.deleteProgram(s);return}r.useProgram(s);let c=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,c),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r.STATIC_DRAW);let l=r.getAttribLocation(s,`position`);r.enableVertexAttribArray(l),r.vertexAttribPointer(l,2,r.FLOAT,!1,0,0);let u=r.getUniformLocation(s,`time`),d=r.getUniformLocation(s,`aspect`),f=window.matchMedia(`(prefers-reduced-motion: reduce)`),p=f.matches,m=!0,h=0,g=0,_=0,v=!1,y=()=>{r.uniform1f(u,_/1e3),r.uniform1f(d,t.clientWidth/Math.max(t.clientHeight,1)),r.drawArrays(r.TRIANGLES,0,6)},b=()=>{let e=Math.min(window.devicePixelRatio||1,1.5);t.width=Math.round(t.clientWidth*e),t.height=Math.round(t.clientHeight*e),r.viewport(0,0,t.width,t.height),v||y()},x=e=>{h=requestAnimationFrame(x),g||=e;let t=e-g;t<1e3/30||(_+=Math.min(t,100),g=e,y())},S=()=>{cancelAnimationFrame(h),g=0,n.setAttribute(`aria-pressed`,String(p));let e=n.querySelector(`[data-motion-label]`),t=n.querySelector(`[data-motion-symbol]`);e&&(e.textContent=p?`Play motion`:`Pause motion`),t&&(t.textContent=p?`▷`:`Ⅱ`),!p&&m&&!document.hidden&&!v&&(h=requestAnimationFrame(x))},C=()=>{p=!p,S()},w=()=>{p=f.matches,S()},T=t=>{t.preventDefault(),v=!0,delete e.dataset.shaderReady,n.hidden=!0,S()},E=new IntersectionObserver(([e])=>{m=e.isIntersecting,S()}),D=new ResizeObserver(b);E.observe(e),D.observe(t),n.addEventListener(`click`,C),f.addEventListener(`change`,w),document.addEventListener(`visibilitychange`,S),t.addEventListener(`webglcontextlost`,T),b(),e.dataset.shaderReady=`true`,n.hidden=!1,S(),window.addEventListener(`pagehide`,e=>{e.persisted||(cancelAnimationFrame(h),E.disconnect(),D.disconnect(),f.removeEventListener(`change`,w),document.removeEventListener(`visibilitychange`,S),r.deleteBuffer(c),r.deleteProgram(s))},{once:!0})})()}}