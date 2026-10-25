# ARPG project website

Public project page for Scaling Dexterous Manipulation via Action Representation Pretraining.

Planned URL: https://arpg-project.github.io/

Static website; publish the main branch root using GitHub Pages.

## Action-space explainer

`manifold.js` adds a 32-second, bilingual Canvas animation at `#action-space`,
between Motivation and Method. It has play/pause, replay, chapter navigation,
and a keyboard-accessible timeline. Playback is user initiated and suspends
when offscreen or when the document is hidden. Reduced-motion users can inspect
individual stages without autoplay.

The points and surfaces are deterministic illustrative geometry, not measured
embeddings, a fitted training run, or a demonstration of causal manifold
flattening. The evidence link refers to the site's Table 2(a) ablation.
Conceptual background: Bengio et al., Representation Learning: A Review and New
Perspectives (https://arxiv.org/abs/1206.5538).

Preview locally with `python3 -m http.server 8765`, then open
`http://localhost:8765/#action-space`. No build step or extra dependency is needed.

## Real-world task videos

The real-world cards play `assets/videos/hammer.mp4`, `coffee.mp4`, and
`cabinet.mp4`, mapped respectively from 递锤子.mp4, 咖啡豆.mp4, and 开柜取物.mp4
in the supplied edited-video folder. Web copies use H.264/AAC, 1280×720,
60 fps, and MP4 fast-start metadata. Source edits, timing, and playback speed
are preserved; original source files are untouched. The three copies total
approximately 4.8 MiB. Native controls, inline mobile playback, existing image
posters, and `preload="none"` keep playback user initiated.
