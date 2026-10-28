# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review

The proposed review is at `src/routes/kb/incidents/4471-review/+page.svx`.
Its `signature` is the course-issued page proof required by the challenge.
Original accepted decision 0001 and the original data are preserved.

- `tickets/parser.md`: [GitHub issue #1](https://github.com/marcinczenko/mega-s01e03/issues/1), 379 reports.
- `tickets/hint.md`: [GitHub issue #2](https://github.com/marcinczenko/mega-s01e03/issues/2), 33 reports.
- `evidence/analysis.json`: computed counts, report membership, and timeline.
- `rendered/kb/incidents/4471-review/index.html`: rendered page with component styles.
- `evidence/4471-review.png`: screenshot of that rendered page.

Reproduce with Node.js 24 and npm:

```sh
npm ci --ignore-scripts
npm run analyze
npm run build
```

The build compiles the supplied Svelte/mdsvex components and renders HTML with Svelte's
server renderer. These are static snapshots; the dedupe explorer displays its initial
state and all case results but is not interactive in this export. To follow `/kb/...`
links locally, serve the `rendered` directory with `python -m http.server --directory rendered`.
Build time determines page ages. The review date uses UTC, as does the supplied layout.

The source ZIP was exported on 4 October 2026. This work does not assert that its queue
or tenant settings are current. No production fixes have been deployed.
