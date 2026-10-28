import fs from 'node:fs';
import assert from 'node:assert/strict';
import { uniqueById, groupByCause, readAs } from '../src/lib/kb/causes.ts';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const base = 'src/lib/data/';
const raw = read(base + 'reports-4471.json');
const tenants = fs.readdirSync(base + 'tenants').map(f => read(base + 'tenants/' + f));
const notes = read(base + 'desk-notes.json');
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const groups = groupByCause(reports, r => tenants.find(t => t.handle === r.tenant));
const weekly = new Map();
const start = Date.parse('2026-03-30');
const week = iso => new Date(start + Math.floor((Date.parse(iso.slice(0, 10)) - start) / 604800000) * 604800000).toISOString().slice(0,10);
for (const r of reports) {
  for (const [field, kind] of [['receivedAt','received'], ['mergedAt','merged']]) {
    if (!r[field]) continue;
    const at = week(r[field]);
    const row = weekly.get(at) ?? {at, received:0, merged:0};
    row[kind]++;
    weekly.set(at,row);
  }
}
const result = {
  rows: raw.length, uniqueReports: reports.length, overlappingRows: raw.length - uniqueById(raw).length,
  groups: groups.map(g => ({...g, oneDayMove:readAs(g,notes.oneDayMove), reports:g.reports.map(r=>r.id)})),
  oneDayMoveReports: reports.filter(r => notes.oneDayMove.includes(r.id)),
  weeks: [...weekly.values()].sort((a,b)=>a.at.localeCompare(b.at)),
};
assert.equal(groups.reduce((n,g)=>n+g.reports.length,0),reports.length);
assert.equal(new Set(groups.flatMap(g=>g.reports.map(r=>r.id))).size,reports.length);
assert.equal(groups.some(g=>g.cause==='unplaced'),false);
fs.mkdirSync('evidence',{recursive:true});
fs.writeFileSync('evidence/analysis.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,groups:result.groups.map(g=>({...g,reports:g.reports.length})),oneDayMoveReports:result.oneDayMoveReports.map(r=>r.id)},null,2));
