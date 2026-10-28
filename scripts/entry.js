import { render } from 'svelte/server';
const pages = import.meta.glob('/src/routes/kb/**/+page.svx',{eager:true});
export function renderPages(){
  return Object.entries(pages).map(([path,page])=>{
    const rendered=render(page.default);
    return {path:path.replace('/src/routes/','').replace('/+page.svx','/index.html'),html:`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${rendered.head}</head><body>${rendered.body}</body></html>`};
  });
}
