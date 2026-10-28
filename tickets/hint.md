# Booking-v3 shows a month-first hint to day-first tenants — 33 reports from #4471

The 4 October 2026 export assigns **33 unique reports** from merged ticket #4471 to
`hint`, across 3 tenants, received 17 April–22 September 2026. These are snapshot counts,
not a claim about the live queue.

Booking-v3 prints `MM/DD/YYYY` below the date field, but the form interprets the input
in the tenant's day-first order. A proposed reproduction is a day-first booking-v3 user
following the hint and entering 04/07/2026 for 7 April: the form reads 4 July.
Production reproduction has not been run in this challenge.

The affected tenants are alder.physio (de-DE), copper.studio (es-ES), and pale.harbour
(pt-PT), on the form channel. R-41230, R-41241, and R-41251 are example report IDs.
App/email reports from those same tenants still belong to the shared-parser group.

Classification uses `uniqueById`, filters `mergedInto === 4471`, and runs `causeOf`
with tenant locale, form version, and channel. Of these 33 reports, intake tagged 18 as
hint and 15 as parser. Do not use intake-tag totals or browser locale as cause counts.
All IDs are in `evidence/analysis.json`; this issue and the parser issue partition the
412 unique reports without overlap. None of the five desk-noted one-day moves belongs
to this group under the supplied classifier.

Acceptance: make the hint and the form's interpretation agree for day-first tenants;
verify ambiguous and unambiguous dates in all three locales and a month-first control.
Test booking-v2 and non-form paths for regressions. Reconcile reports received since the
export. Track and verify this fix separately from the shared parser.

Sources: `src/lib/kb/causes.ts` (`DATE_HINT` and `causeOf`), `src/lib/kb/locales.ts`,
tenant and report JSON, and the rendered CauseTable. See the signed review at
`src/routes/kb/incidents/4471-review/+page.svx` and its rendered HTML.
