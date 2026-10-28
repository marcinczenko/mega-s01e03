import fs from 'node:fs';
import path from 'node:path';
import {renderPages} from '../.build/entry.js';
for(const page of renderPages()){
 const target=path.join('rendered',page.path);
 fs.mkdirSync(path.dirname(target),{recursive:true});
 fs.writeFileSync(target,page.html);
 console.log(target);
}
