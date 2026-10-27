# ARPG project website

Public project page for Scaling Dexterous Manipulation via Action Representation Pretraining.

Public URL: https://arpg-project.github.io/

Static website; publish the main branch root using GitHub Pages.

## Action-space explainer

`manifold.js` adds a 26-second, bilingual Canvas animation at `#action-space`,
inside the Motivation section, between the robot demonstrations and Method. It has play/pause, replay, chapter navigation,
and a keyboard-accessible timeline. The animation plays once on first entering the viewport and suspends
when offscreen or when the document is hidden. The four-segment switch seeks
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
approximately 50.3 MiB. Video is encoded from the original 1080p edits with
x264 CRF 17 / slow; source audio is copied without re-encoding. Native controls, inline mobile playback, matching 1080p 16:9 frame
posters, and `preload="none"` keep playback user initiated.

Animation pacing: 0–5 s rearranges representation points while surfaces remain flat; 5–18 s fits the surfaces to the fixed points; 18–26 s retains the final comparison, including the synchronized moving-ball illustration during 23–26 s. These are conceptual visualizations, not measured trajectories or a training simulation.

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

## Video annotations

The web copies include a top-right `2x speed` label and short English stage labels
at top left, also visible in fullscreen and when the MP4 is opened directly.
The source edits already run at 2× speed; no additional speed change is applied.
Stage boundaries are editorial descriptions of the visible demonstration, not
measurements of the evaluation protocol:

- Hammer: grasp 0–8 s, handover 8–28 s, placement 28 s to end.
- Coffee: grasp the cup 0–6 s, align both hands 6–14 s, pour 14 s to end.
- Cabinet: open drawer 0–5 s, retrieve object 5–13 s, close drawer 13 s to end.

Regenerate from the original edited clips, never from an already annotated web copy.
The source files remain unmodified.

### Scroll narrative

`motion.js` derives method diagram progress from current DOM geometry on native scroll events. Language switches preserve the active scene’s normalized progress and remeasure after translation. Heading entrances use an independent IntersectionObserver. On viewports at least 760 × 700, the method diagram follows native scrolling with reversible progress. The intuition animation uses visibility-based playback on every viewport; its chapter buttons and timeline never move the page. Reduced-motion preferences disable pinned scroll scenes and entrances. No wheel events are intercepted. Previously downloaded GSAP files are retained in `assets/vendor/` but are no longer loaded.

### Web video playback

The inline player uses `*-web.mp4`: 1080p, 30 fps, H.264 CRF 23, 3 Mbps max rate, 1-second keyframes, no audio and faststart metadata. The original annotated 1080p/60 files remain available through the full-quality link. Active videos preload automatically and play muted when visible; Save-Data and reduced-motion users keep manual playback. Media elements are cached across task and language switches. Local playback checks do not establish production cold-cache network timings.

### Intuition playback

The intuition player stays in normal document flow, with no pinned panel or extra scroll distance. It starts automatically when at least 35% visible, pauses its animation clock offscreen or in a hidden tab, and resumes on return. Explicit pause and timeline scrubbing remain paused until the user presses play. Chapter buttons seek and play without moving the page. Reduced-motion users retain manual playback. Method diagram scroll stages remain independent. During Stage 1 (0–5 seconds), only the representation points move while both surfaces remain flat. During Stage 2 (5–18 seconds), the points stay fixed and the surfaces fit progressively.

The Stage 2 caption separates a prominent generation title from a smaller explanation of distribution modeling and intrinsic geometry. Its manifold-hypothesis framing follows Narayanan and Mitter, “Sample Complexity of Testing the Manifold Hypothesis” (NeurIPS 2010): https://papers.neurips.cc/paper_files/paper/2010/hash/8a1e808b55fde9455cb3d8857ed88389-Abstract.html. This is geometric intuition for the illustration, not a claim that ARPG explicitly fits a low-dimensional manifold.
