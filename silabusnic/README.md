# Silabusnic

Silabusnic is a mobile-friendly web app prototype for college materials and equipment management.
This version is focused on `3rd Year Odontology` and is built around the first spreadsheet provided
by the program.

Current product direction:

- students can review required materials by semester and midterm
- students can track what they have already acquired
- professors are the editing role for catalog management
- the official XLS workbook can be downloaded directly from the app
- the data model supports future item images uploaded by professors

## Current prototype behavior

- `Student View`: filter materials, choose a student profile, and mark items as acquired
- `Professor View`: review the catalog layout and management workflow
- local browser storage is used for the student acquisition checklist in this static version

## Data files

- `silabusnic/data/MATERIALES ODONTOLOGIA.xlsx`: source workbook used by the app
- `silabusnic/data/materials.json`: normalized frontend dataset generated from the workbook
- `silabusnic/scripts/extract_materials.py`: workbook-to-JSON conversion script

## Frontend files

- `silabusnic/index.html`: portal structure
- `silabusnic/styles.css`: mobile-first styling
- `silabusnic/app.js`: filters, role switching, and student progress tracking

## Run locally

From the project root:

```bash
python3 silabusnic/server.py
```

Then open:

`http://127.0.0.1:8010/silabusnic/index.html`

## Refresh the materials data

If the workbook changes, regenerate the JSON file with:

```bash
python3 silabusnic/scripts/extract_materials.py "/full/path/to/MATERIALES ODONTOLOGIA.xlsx" silabusnic/data/materials.json
```

## Deploy on Render

The current version of Silabusnic is a static app, so the simplest Render setup is a `Static Site`.

Blueprint file:

- `render-silabusnic.yaml`

Manual Render settings:

- Build Command: `echo "Static site ready"`
- Publish Directory: `silabusnic`

## Next logical steps

- add real authentication for students and professors
- add professor image upload and item editing
- support per-student saved progress in a backend database
- add Spanish and English language switching
