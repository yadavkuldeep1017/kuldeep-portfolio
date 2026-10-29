# Kuldeep Yadav — Portfolio

Java backend engineering portfolio with career details, eight work case studies, 68 illustrated study lessons, a 26-step AI learning path, a 30-note OBRH notebook, professional links, education, achievements, a photo, and the updated downloadable resume.

This repository contains the ready-to-host website. GitHub Pages serves the root of the `main` branch. There are no JavaScript package dependencies and no build service is needed.

## Edit your information

| File | Content |
| --- | --- |
| `profile.json` | Contact details, career links, summary, and experience and expertise highlights |
| `career.json` | Roles, contributions, projects, education, awards, and training |
| `technologies.json` | Technology explanations, examples, experience context, and reference links |
| `assets/Kuldeep-Yadav-Resume.pdf` | The downloadable resume |
| `assets/kuldeep-yadav.jpg` | The profile photo |
| `app.js` | Page text, page layout, and interactions |
| `styles.css` | Visual design and mobile layout |
| `theme.css` | Dark colors, component styling, and the full-name logo |
| `obrh.html` | Public OBRH overview and learning notebook, including fictional walkthroughs and references |
| `obrh.css` | Notebook layout and responsive reading styles |
| `ai.html` | AI learning path from foundations to retrieval, agents, evaluation, and production |
| `study-data.js` | Generated educational content and curriculum bundle |
| `study.js` / `study.css` | Lesson rendering, original SVG diagrams, image downloads, and local study progress |

Open [the technology library](technologies.html) or [the AI learning path](ai.html). Each lesson has ten illustrated sections covering definitions, use cases, mechanics, trade-offs, comparisons, an example, deeper topics, mistakes, practice, and references. New AI topics are labelled as learning material. Diagram images can be downloaded as SVG files. Progress stays in the reader's browser; the site does not run the teaching samples or call model APIs. In the editable local source, update the `content/study-*.json` files and `content/ai-curriculum.json`, then run `python build.py` to regenerate the public bundle.

The OBRH notebook is linked from Experience, Work, global search, and the previous OBRH case-study URL. Its content is static HTML, so the notes remain readable without JavaScript. In the editable local source, update `content/obrh-guide.json` and run `python build.py` to regenerate it. Keep employer source, internal configuration, actual payloads, and private review records out of this public repository.

Keep project and technology IDs stable so existing links still work. Add real project/demo links in a project's `links` array as `{"label":"Repository","url":"https://your-real-project-link"}`. Do not add guessed links or unsupported experience claims.

The hosted site reads the JSON files directly. After changing JSON, also run `python refresh-offline-data.py` and commit `data.js` to keep the offline copy current. Update role labels and dated text in `app.js` or page footers when your career details change.

## Preview

Open `index.html` in a browser to use the offline copy, or run `python -m http.server 8765` in this folder and open `http://localhost:8765`.

## Publish updates

Commit updated files to `main`. In repository Settings → Pages, use “Deploy from a branch”, branch `main`, folder `/ (root)`. GitHub Pages publishes that folder. `.nojekyll` keeps the files as ordinary HTML, CSS, and JavaScript.

The resume and photo are public website assets. Technology examples explain general concepts. Resume context records the specific experience supplied in the resume.

See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for hosting settings.
