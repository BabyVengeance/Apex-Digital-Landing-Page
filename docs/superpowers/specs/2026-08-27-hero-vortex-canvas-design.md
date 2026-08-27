# Hero Dual Counter-Rotating Vortex Canvas Animation Design Spec

**Date**: 2026-08-27  
**System**: Apex Digital SA Landing Page Hero Wireframe Canvas (`#hero-wireframe-canvas`)  
**File Target**: `app.js` (`initWireframeCanvas` function)  

---

## 1. Executive Summary & Objective
Transform the single 3D parametric trefoil wireframe canvas into a high-density, multi-layer **Dual Counter-Rotating Vortex System** infused with 3D harmonic wave noise and an ambient 180-particle energy swarm. This architecture mirrors the Apex logo emblem, adding rich visual noise and depth while preserving 60 FPS performance and theme responsiveness across dark/light modes.

---

## 2. Technical Architecture & Mathematical Blueprint

### A. Primary Outer Wireframe Mesh
- **Base Geometry**: Trefoil Torus Knot (`p = 2, q = 3`)
- **Dimensions**: Primary radius $R = 180 + 40 \cos(3u)$, Tube radius $r_{tube} = 26\text{px}$, $uSteps = 84$, $vSteps = 16$.
- **Harmonic Surface Noise**: Dynamic 3D vertex wave displacement added per animation frame:
  $$\Delta r_{outer} = \sin(5u + 2.0t) \cdot \cos(3v + 1.5t) \cdot 6.0\text{px}$$

### B. Secondary Inner Core Wireframe Mesh
- **Base Geometry**: Inverse Trefoil Knot (`p = 3, q = 2` or offset winding) at 68% scale ($r_{tube} = 18\text{px}$).
- **Counter-Rotation State**:
  - $\text{AngleY}_{inner} = -\text{AngleY}_{outer} \times 1.35$
  - $\text{AngleX}_{inner} = \text{AngleX}_{outer} + 0.45$
  - $\text{AngleZ}_{inner} = \text{AngleZ}_{outer} \times -0.8$
- **High-Frequency Ripples**: Secondary dynamic surface noise:
  $$\Delta r_{inner} = \cos(8u - 3.0t) \cdot 4.0\text{px}$$

### C. Expansive Particle Swarm (180 Photons)
1. **Track Photons (40 Particles)**:
   - Constrained along the outer and inner tube knot paths.
   - Speed ranging between $0.004$ and $0.008$ rad/frame.
2. **Vortex Dust Cloud (140 Micro-Particles)**:
   - 3D ambient floating particles with randomized initial $(x, y, z)$ coordinates within a 350px bounding sphere.
   - Rotates around the central z-axis and y-axis with gravitational pull toward the core.
   - Depth-attenuated radius ($0.8\text{px} - 3.2\text{px}$) and alpha opacity fading ($0.15 - 0.85$).

---

## 3. UI/UX & Sovereign Minimalist Theme Mapping
- **Dark Mode**: Wireframe lines render in `rgba(223, 195, 138, depthAlpha)`, track particles glow in `#DFC38A` with shadow blur.
- **Light Mode**: Wireframe lines render in `rgba(184, 146, 85, depthAlpha)`, track particles render in `#B89655`.
- **Eased Mouse Parallax & Scroll Speed**:
  - Eased mouse position tracking (`mouseX += (targetMouseX - mouseX) * 0.05`).
  - Scroll position increments Y-axis rotation velocity smoothly.

---

## 4. Verification & Criteria for Success
1. Both inner and outer knots rotate smoothly without visual clipping or stuttering.
2. 180 particles render continuously with depth shading and zero lag.
3. Light and dark theme toggles update wireframe and particle colors dynamically.
4. No console errors or memory leaks during long-running animation frames.
