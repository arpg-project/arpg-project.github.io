# ARPG project website

Public project page for Scaling Dexterous Manipulation via Action Representation Pretraining.

Public URL: https://arpg-project.github.io/

Static website; publish the main branch root using GitHub Pages.

## Action-space explainer

`manifold.js` adds a 20-second, bilingual Canvas animation at `#action-space`,
inside the Motivation section, between the robot demonstrations and Method. It has play/pause, replay, chapter navigation,
and a keyboard-accessible timeline. The animation plays once on first entering the viewport and suspends
when offscreen or when the document is hidden. The three-segment switch seeks
and plays each stage; the round transport button pauses or replays it.
Reduced-motion users receive static stage views without autoplay.

The points and surfaces are deterministic illustrative geometry, not measured
embeddings, a fitted training run, or a demonstration of causal manifold
flattening. The evidence link refers to the site's Table 2(a) ablation.
Conceptual background: Bengio et al., Representation Learning: A Review and New
Perspectives (https://arxiv.org/abs/1206.5538).

Preview locally with `python3 -m http.server 8765`, then open
`http://localhost:8765/#action-space`. No build step or extra dependency is needed.

## Real-world task videos

The large demonstration player switches between `assets/videos/hammer.mp4`, `coffee.mp4`, and
`cabinet.mp4`, mapped respectively from 递锤子.mp4, 咖啡豆.mp4, and 开柜取物.mp4
in the supplied edited-video folder. Web copies use H.264/AAC, 1920×1080,
60 fps, and MP4 fast-start metadata. Source edits, timing, and playback speed
are preserved; original source files are untouched. The three copies total
approximately 50.6 MiB. Video is encoded from the original 1080p edits with
x264 CRF 17 / slow; source audio is copied without re-encoding. Native controls, inline mobile playback, matching 1080p 16:9 frame
posters, and `preload="none"` keep playback user initiated.

Animation pacing: 4 seconds to establish the samples, 7 seconds for encoding,
and 9 seconds for fitting and a final synchronized moving-ball comparison. One short caption per
scene; method details and scientific caveats are available in a disclosure.

## Page presentation

`editorial.css` provides the white, light-gray, and purple presentation layer.
The reading order is title → robot demonstrations → visual intuition → method
→ experiments → resources. Training details, complete comparisons, real-world
evaluation, and supplemental ablations remain available in disclosures.
The method diagram can be enlarged; stage selection highlights its corresponding region.
Both English and Chinese share the same layout. Code remains marked as coming soon
until the repository URL is provided.

The animation studio uses a light neutral stage, softly shaded lavender meshes,
corresponding samples, a sliding stage selector, and a minimal transport rail.
The final three seconds retain a synchronized sphere and path on each surface.
