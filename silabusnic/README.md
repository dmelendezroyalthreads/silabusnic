# Silabusnic

Silabusnic is a starter web app concept for college materials discussion. This first pass includes:

- a polished homepage/dashboard for course materials conversations
- seeded discussion data for multiple classes
- client-side filtering by search, course, and status
- a tiny Python server for local preview

## Files

- `silabusnic/index.html`: app structure
- `silabusnic/styles.css`: visual design and responsive layout
- `silabusnic/app.js`: data loading, stats, and filters
- `silabusnic/data/discussions.json`: starter content
- `silabusnic/server.py`: local static server

## Run locally

From the project root:

```bash
python3 silabusnic/server.py
```

Then open:

`http://127.0.0.1:8010/silabusnic/index.html`

## Deploy on Render

The current version of Silabusnic is a static app, so the simplest Render setup is a `Static Site`.

Blueprint file:

- `render-silabusnic.yaml`

In Render:

1. Push this repo to GitHub.
2. In Render, create a new `Blueprint` or `Static Site`.
3. If using Blueprint, point Render at `render-silabusnic.yaml`.
4. If creating manually, use:
   - Build Command: `echo "Static site ready"`
   - Publish Directory: `silabusnic`
5. Deploy.

After deploy, Render will serve:

- `/index.html`
- `/data/discussions.json`

If we later add authentication, posting, or a database-backed API, we can switch Silabusnic to a Render `Web Service`.

## Good next steps

- add discussion creation and reply forms
- back the app with a real API or database
- add authentication for students, faculty, and moderators
- connect course rosters or syllabus imports
