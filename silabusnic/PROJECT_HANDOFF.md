# Silabusnic Project Handoff

## Project Identity

- Project name: `silabusnic`
- Purpose: college materials and equipment portal
- Current landing audience: Spanish-speaking users
- Current live focus: `Odontologia`

## Deployment

- GitHub repo: `dmelendezroyalthreads/silabusnic`
- Render live URL: `https://silabusnic.onrender.com`
- Deployment model: static site on Render

## Current Product Direction

- Mobile-first experience
- Header title: `SILABUS PORTAL 2026`
- Subtitle: `Powered by E&D Technologies`
- Career and year must be selected before data access
- Role flow is step-based:
  - Paso 1: Carrera
  - Paso 2: Ano
  - Paso 3: Usuario / acceso
- Student and professor modes are prototype access modes for now
- Real login and validation will come later
- A 3-step guided landing tour opens on refresh/load

## Career Selector

- Career dropdown now includes grouped academic programs:
  - Salud
  - Derecho y Ciencias Sociales
  - Negocios y Economia
  - Ingenieria y Arquitectura
  - Creativo y Digital
- Current materials dataset only functions for `Odontologia`
- Other careers show a "data in preparation" style message

## Data Model

- Source spreadsheet: `MATERIALES ODONTOLOGIA.xlsx`
- Current working cohort: `3rd Year Odontology`
- Materials support:
  - semester
  - partial / midterm
  - subject
  - type
  - quantity
  - presentation
  - location
  - purchase frequency
  - notes
  - image

## Student Experience

- Can filter materials
- Can mark materials as acquired
- Can view student checklist stats
- Student checklist partial count uses unique `semestre + parcial` combinations
- Can click material image to open larger zoomable viewer
- Can submit a question from each material card
- `Ver pendientes` now has a demo popup and then reduces the list to only pending items

### Student Question Form

- Dialog title: `Consulta del estudiante`
- Required fields:
  - `NUMERO DE CARNET`
  - `Nombre del Estudiante`
  - `EMAIL del Estudiante`
  - `Pregunta`
- For now, questions are stored locally in the browser
- Future requirement: validate carnet before live submission

## Professor Experience

- Three test professor profiles exist
- Professors can switch into professor view
- Professor workflow only appears in professor mode
- Professors can edit material fields through a dialog
- Professor draft/change state is tracked in local browser storage

## Materials UI

- Materials render in a compact grid
- Material thumbnails show the whole item when possible
- Materials without uploaded photos now use generated category-based illustration thumbnails
- Clicking a thumbnail opens a larger zoomable modal
- Active filters are shown above the materials list
- Top XLS download now shows a disclaimer before download begins

## Guided Tour

- Page 1: explains the required 1-2-3 flow and that step 3 is demo-only
- Page 2: explains mobile-first design, supported user groups, and grid/filter behavior
- Page 3: explains student inquiries and possible future institutional login using `@unica.edu.ni`
- The `Cerrar` button is hidden until the final guided-tour page

## Persistence Notes

- App code is stored locally in this workspace
- Deployment history is stored in GitHub and Render once pushed
- Student/professor prototype interactions currently use browser localStorage
- If the laptop reboots, the project files remain on disk
- If the browser/app closes, reopening the workspace restores the codebase state
- To avoid losing unpushed work, always commit and push after important changes

## Resume Prompt

When resuming later, mention any of these:

- `college materials project`
- `silabus project`
- `silabusnic`

Then open this file first:

- `silabusnic/PROJECT_HANDOFF.md`

## Recommended Next Steps

- Add real backend persistence for professor edits
- Add real submission flow for student questions
- Add carnet validation for live student submissions
- Add professor image upload workflow
- Expand data support beyond Odontologia
- Add bilingual Spanish/English toggle after Spanish launch is stable
