# Implementation Plan: 醍醐的海岸骑行

**Branch**: `feat/easy-case-3d-seaside-cycling` | **Date**: 2026-09-24 | **Spec**: [spec.md](spec.md)

## Summary

将现有鹈鹕河岸页面完全重新设计为醍醐沿晴朗海岸公路骑行的 3D 质感矢量插画。醍醐保持自然鸟形；不沿用旧版人形特征、配色或页面布局。用清晰的色彩层次和五段镜头节奏表现旅程，保留喝水、暂停/继续、键盘控制、响应式布局与减少动态效果。

## Technical Context

**Language**: HTML5, CSS3, browser JavaScript  
**Dependencies**: None  
**Rendering**: Inline SVG with CSS transforms, gradients, clipping and compositing  
**Verification**: Real-browser visual and interaction review at desktop and 360 px; reduced-motion, console, remote-resource and repeated-cycle checks  
**Constraints**: Static page; no remote assets; support keyboard and accessible state; do not merge per project Constitution.

## Visual Direction

- **Palette**: deep-ocean page background; turquoise sea and warm sunlit sky; pale sand; graphite blue-gray asphalt; chestnut and ivory pelican plumage; golden bill; coral bill pouch; blue-green bicycle.
- **Camera**: low three-quarter tracking angle; horizon above the middle, road widens toward the viewer, rider anchors the lower-right third, curved coast recedes into the left distance.
- **Depth**: keep the sea, continuous sand shoreline and coast road as distinct adjacent planes; make the road follow the shoreline and widen toward the foreground. Retain layered headlands, cast shadows, reflective sea flecks and restrained wind effects.
- **Storyboard**: 1) wide establishing shot; 2) tracking ride; 3) low wheel/road close-up; 4) stop at the shoulder, dismount at a visible freshwater stream, scoop water with the bill and tip the head back to swallow; 5) return to the bicycle, accelerate and loop.
- **Motion**: synchronize wheel spin, webbed-foot pedaling, natural bird-body bob and near/far parallax. During the water break, stop the wheels, show the kickstand, reveal the pelican beside the stream, animate bill-to-water contact, scoop and upward swallow. Keep effects behind the character; honor reduced-motion preference.

## Constitution Check

- Intentional Visual Design: covered by authored coastal composition and visual palette.
- Accessible Interaction: semantic buttons, visible focus, keyboard handling and live status remain required.
- Motion With User Control: pause/resume and reduced-motion behaviors remain required.
- Verifiable Behavior: browser checks include desktop, narrow phone, interactions and three cycles.
- Minimal Implementation: native static page and original inline SVG; no new dependency.

## Files

- `index.html`: Chinese page copy, controls, accessible SVG scene and shot status.
- `styles.css`: layout, illustration lighting, depth, responsive styles and animation choreography.
- `app.js`: rider/water state, scene stage/status coordination, pause and reduced motion.
- `README.md`: update page description and local usage.
- `specs/003-taigu-seaside-ride/`: requirements and verification artifacts.
