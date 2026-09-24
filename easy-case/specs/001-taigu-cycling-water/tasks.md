# Tasks: 醍醐的补水骑行

**Input**: Design documents from `specs/001-taigu-cycling-water/`

**Prerequisites**: [plan.md](plan.md) and [spec.md](spec.md)

**Tests**: Browser end-to-end verification is explicitly requested in the feature description and is required below.

## Phase 1: Setup

- [x] T001 Create the Spec Kit feature artifacts and confirm the static-page approach in `specs/001-taigu-cycling-water/`.
- [x] T002 Add the single-page source layout and repository ignore rules in `index.html`, `styles.css`, `app.js`, and `.gitignore`.

## Phase 2: User Story 1 - Watch 醍醐's refreshing ride (Priority: P1)

**Goal**: Present a polished, looping original scene of 醍醐 cycling and visibly drinking water.

**Independent Test**: Open the local page and observe three complete ride/drink cycles.

- [x] T003 [US1] Build semantic page structure, Chinese copy, control area, and inline cyclist SVG in `index.html`.
- [x] T004 [US1] Create the responsive visual system and coordinated ride/drink/scenery motion in `styles.css`.
- [x] T005 [US1] Implement loop state and reduced-motion behavior in `app.js` and `styles.css`.

## Phase 3: User Story 2 - Control the ride and take a water break (Priority: P2)

**Goal**: Let visitors pause, resume, and manually play a water break.

**Independent Test**: Operate the three controls with pointer and keyboard and verify the resulting state.

- [x] T006 [US2] Implement pause/resume and manual water-break controls with accessible labels and state in `app.js` and `index.html`.
- [x] T007 [US2] Add project overview and local run instructions in `README.md`.

## Phase 4: Polish and end-to-end verification

- [x] T008 Run the browser walkthrough in `specs/001-taigu-cycling-water/quickstart.md` at desktop and 360 px mobile widths.
- [x] T009 Fix issues found in the walkthrough and repeat the affected checks.
- [x] T010 Review the final diff for scope, console errors, remote dependencies, and reduced-motion/accessibility regressions.
