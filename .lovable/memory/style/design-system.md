---
name: Visual Aesthetic
description: Sci-Fi 3D theme — Three.js with wireframe geometry, particles, grid, and orbs across all sections
type: design
---
**Updated direction (was: Cyan/Ocean glassmorphism + CodeRain)**

Now using full-page Sci-Fi 3D background powered by react-three-fiber:
- Wireframe icosahedrons, toruses
- Glowing translucent orbs
- 1500-particle field
- Neon grid floor
- Theme-aware colors (cyan, light, golden, purple palettes)
- Performance: dpr capped at [1, 1.5], lightweight materials

All section cards remain fully transparent (`bg-transparent` glass-card) so the 3D scene shows through everywhere.

**File:** `src/components/SciFiBackground.tsx`
**Used in:** `src/pages/Index.tsx`
