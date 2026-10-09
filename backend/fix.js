const fs = require('fs');
const path = require('path');
const dir = 'src/models';
const files = fs.readdirSync(dir);
files.forEach(file => {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/@Column\(\)/g, "@Column({ type: 'varchar' })");
    content = content.replace(/@Column\(\{ nullable: true \}\)/g, "@Column({ type: 'varchar', nullable: true })");
    fs.writeFileSync(p, content);
});
