# Hero Dual Counter-Rotating Vortex Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `#hero-wireframe-canvas` in `app.js` to render a dual counter-rotating trefoil torus knot system with 3D harmonic wave noise displacement and an expansive 180-particle ambient vortex photon cloud.

**Architecture:** Refactor `initWireframeCanvas` in `app.js` to compute dual concentric 3D parametric meshes (outer `p=2,q=3`, inner `p=3,q=2` at 68% scale), apply real-time wave distortion equations, update 180 particles (40 track photons + 140 ambient vortex dust), and render depth-sorted path strokes and glows on Canvas 2D.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5 Canvas 2D API, CSS Custom Properties.

---

### Task 1: Refactor Parametric Mesh Generator to Support Dual Concentric Knots & Harmonic Noise

**Files:**
- Modify: `app.js:230-310`

- [ ] **Step 1: Inspect existing `initWireframeCanvas` function structure in `app.js`**

Verify line range and variables in `app.js`.

- [ ] **Step 2: Implement dual parametric knot generator with 3D harmonic surface noise**

Update `initWireframeCanvas` in `app.js` to define generator math for both outer (`p=2, q=3`) and inner (`p=3, q=2`, 68% scale) wireframes, incorporating dynamic noise function callbacks:

```javascript
// Dynamic 3D Harmonic Wave Noise functions
function getOuterNoise(u, v, t) {
  return Math.sin(u * 5 + t * 2.0) * Math.cos(v * 3 + t * 1.5) * 6.0;
}

function getInnerNoise(u, v, t) {
  return Math.cos(u * 8 - t * 3.0) * 4.0;
}
```

- [ ] **Step 3: Update `app.js` with dual mesh generation and 180-particle photon swarm initialization**

Define 40 track photons and 140 ambient vortex dust particles with randomized radial velocity, 3D orbit radius, and depth alpha attributes.

- [ ] **Step 4: Verify syntax and preview canvas loading without errors**

Run validation check in terminal or open browser page to ensure zero JS syntax exceptions.

- [ ] **Step 5: Commit changes**

```bash
git add -f app.js
git commit -m "feat(canvas): implement dual concentric mesh math and 180-particle swarm initialization"
```

---

### Task 2: Render Dual Counter-Rotating Wireframes & Interactive Vortex Particles

**Files:**
- Modify: `app.js:320-412`

- [ ] **Step 1: Implement multi-axis counter-rotation loop in `animate()`**

Update `animate()` render frame loop in `app.js`:
- Outer knot angles: `angleY += 0.004`, `angleX += 0.0018`, `angleZ += 0.0008`
- Inner knot angles: `angleY_inner = -angleY * 1.35`, `angleX_inner = angleX + 0.45`, `angleZ_inner = angleZ * -0.8`

- [ ] **Step 2: Add dual wireframe depth stroke rendering**

Render depth-shaded stroke connections for both outer wireframe lines (`uSteps=84, vSteps=16`) and inner core wireframe lines (`uSteps=64, vSteps=12`) using theme-aware colors (`rgba(223, 195, 138, depthAlpha)` for dark mode, `rgba(184, 146, 85, depthAlpha)` for light mode).

- [ ] **Step 3: Render track photons and ambient vortex dust particles**

Update particle animation step:
- Animate 40 track photons traveling along u-v spline paths with glowing canvas shadows (`shadowColor = '#DFC38A'`).
- Animate 140 ambient vortex dust particles in 3D orbit around central origin `(centerX, centerY)` with z-axis depth sorting and size attenuation ($scale = fov / (fov + z + 300)$).

- [ ] **Step 4: Verify canvas rendering in browser**

Verify the visual rendering of the dual counter-rotating wireframes and particle swarm.

- [ ] **Step 5: Commit changes**

```bash
git add -f app.js
git commit -m "feat(canvas): complete dual counter-rotating vortex animation with wave noise and particle swarm"
```
