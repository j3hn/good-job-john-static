# Gosling showcase media

Captured from https://goslinggroup.com.au/ on 20 September 2026 at 1440 × 1000 (desktop) and 420 × 900 (mobile). Reference design: Figma file 1bmkd89lrgeqp4KFHRi3Cm, WEBSITE page 8601:2. Live captures were used for final media because design drafts contain placeholder text.

`hero.png`, `projects.png` and `phone.png` are the captured source screens. `render.cjs` composes three editorial stills and a silent 24-second, 1280 × 720 H.264 film with slow camera moves, dissolves and an end title. It requires `sharp` and an FFmpeg binary with libx264. Set NODE_PATH and FFMPEG to your installed tools, and create /tmp/gosling-showcase before rendering. The film uses no music or voiceover.

Outputs are served from `/assets/gosling/`. The video is user-initiated, with a static poster and no preload, so reduced-motion visitors are not forced into animation.

## Monitor film revision

The current project page uses `gosling-monitor-film.mp4` and `gosling-monitor-poster.webp`. It is a 22-second, 1920 × 1080, 60 fps film: wide push-in, left-angle homepage close-up, right-angle project close-up, and wide pullback. Camera transforms are calculated continuously per frame in Three.js rather than using integer-aligned FFmpeg zoompan crops. The film has no audio and uses the original captured website pixels as screen textures.

`monitor-film.html` defines the physical monitor, lighting, and camera paths. `render-monitor.cjs` renders deterministic frames through Playwright and encodes H.264 with FFmpeg. Requires `sharp`, `playwright`, a Chrome binary (CHROME_BIN), and FFmpeg (FFMPEG); NODE_PATH can point to the installed packages. `three.module.js` is Three.js r170, MIT licensed. Run from the repository root. `--proof` generates six proof frames without encoding. Intermediate files go to GOSLING_RENDER_DIR (default /tmp/gosling-showcase/monitor).

`studio.png` is a generated photographic background, created with the built-in image-generation tool. Final prompt:

> Create a photorealistic 16:9 landscape cinematic background plate for a 3D computer monitor product film. Warm sophisticated architectural studio, large timber framed windows and softly defocused sunlit green garden in the background, soft amber lighting. A honey oak desk stretches across the whole image at the bottom, its back edge exactly about 80 percent down the image, viewed frontally from computer-screen eye height with a 50mm lens. Central 75 percent of the composition must be completely empty, no monitor, no computer, no screens, no people, no text. Small plant at extreme right edge, understated desk lamp at extreme left edge. The monitor will be rendered separately later. Shallow photographic depth of field with lovely natural green and amber bokeh in the background, desktop surface reasonably sharp. Restrained natural filmic lighting, realistic materials. Landscape 1920x1080 or higher.
