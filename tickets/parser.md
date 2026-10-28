# Shared parser reads day-first dates month first — 379 reports from #4471

The 4 October 2026 export assigns **379 unique reports** from merged ticket #4471 to
`parser`, across 11 tenants, received 1 April–4 October 2026. These are snapshot counts,
not a claim about the live queue.

The shared parser reads month first for day-first tenants. R-41200 describes a 7 April
reminder sent on 4 July; R-41201 describes the reverse. A proposed reproduction is a
day-first tenant passing 07/04/2026 through the shared path: expect 7 April, not 4 July.
Production reproduction has not been run in this challenge.

Classification uses `uniqueById` followed by `mergedInto === 4471`, then `causeOf` with
the tenant directory and channel. Day-first reports are parser reports except booking-v3
form submissions, which have their own hint issue. The supplied classifier, rather than
intake guesses, determines membership: 356 are tagged parser and 23 are tagged hint.
All IDs are in `evidence/analysis.json`. The export has 427 rows, 412 unique reports,
and 15 overlapping rows; the other 33 reports belong to the hint ticket.

Five reports remain counted here but need investigation: R-41202, R-41209, R-41236,
R-41344, and R-41620. The desk notes read them as one-day moves; their bodies include
timing anomalies. The classifier does not prove their root cause. Preserve their raw
evidence, obtain timestamps/timezones and reproduction steps, and split only if evidence
supports a distinct cause. Do not count these five again as a third confirmed problem.

Acceptance: verify date interpretation for day-first locales across app, email, and
booking-v2 forms, including ambiguous dates and dates whose day exceeds 12; check that
month-first behavior stays correct. Investigate the five anomalies explicitly. Reconcile
reports received since the export and track their IDs. Closing this ticket must not close
the booking-v3 hint issue automatically.

Sources: `src/lib/kb/causes.ts`, `src/lib/kb/locales.ts`, tenant JSON, report JSON,
`desk-notes.json`, and the rendered CauseTable and QueueTimeline. See the signed review
at `src/routes/kb/incidents/4471-review/+page.svx` and its rendered HTML.
