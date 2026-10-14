# Saltwater Freshwater Festival showcase

Derived from the user-supplied `Screen Recording 2026-10-14 at 3.44.52 pm.mov`
on 14 October 2026. The original recording is unchanged and remains outside the
repository.

- `website-scroll.mp4`: silent H.264, 1580 × 980, 30 fps, approximately 19 seconds.
  Encoded with libx264, CRF 22, yuv420p and fast-start; source metadata removed.
  The full recording is retained, with no cropping or background baked in.
- `website-poster.webp`: the recording’s first frame, WebP quality 88.

The reusable frame lives in `src/components/VideoShowcase.astro`. The warm-sand
background and shared source dimensions live in `src/data/saltwater-freshwater.ts`.
Changing the backdrop never requires re-encoding the recording.
