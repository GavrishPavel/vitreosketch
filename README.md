# VitreoSketch

VitreoSketch is a small static web portal for people with vitreous floaters who want to sketch what they see and simulate how it drifts.

## What it does

- edit floaters per eye:
  - left eye
  - right eye
- preview either:
  - the active eye only
  - both eyes moving independently
- add common floater presets:
  - dot cluster
  - ring (inspired by Weiss ring descriptions)
  - thread / strand
  - cobweb
  - smudge / cloud
- draw your own floater paths directly on the stage
- adjust contrast, blur, structure, scale, rotation
- animate with:
  - random drift
  - camera-based eye tracking via MediaPipe FaceMesh
- canvas-based local background distortion for the main floater types (ring, smudge, cloud): the app samples the real scene underneath, then locally offsets and blurs it inside the floater mask
- user control for background refraction strength
- runs as a plain static site, so it is easy to host on GitHub Pages
- includes built-in UI localization for:
  - English
  - Russian
  - Spanish
  - Portuguese
  - Chinese
  - Arabic

## Notes on movement logic

This project adapts the core idea from the private `eye-foaters` repo:

- **random mode**: each eye gets its own floater layer with its own independently refreshed random target
- **eye mode**: FaceMesh landmarks estimate each iris horizontal offset plus a shared eyelid-distance delta, then the left and right floater layers follow separately with smoothing

The implementation here is rewritten for a web page instead of a Chrome extension, but the motion model is intentionally similar.

## Research / default shape choices

This MVP uses a practical set of commonly reported floater forms seen in patient descriptions and educational materials:

- spots / dots
- rings
- thread-like strands
- cobweb-like fibers
- cloudy smudges

This is not a medical diagnostic tool. It is only a visual approximation editor.

## Run locally

You can open `index.html` directly for most features.

For camera eye tracking, use HTTPS or localhost because browser camera access requires a secure context.

## Publish

The repo is intended to be published directly through GitHub Pages from the root of the main branch.
