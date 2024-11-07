const { writeFile, writeFileSync } = require('fs');

const execSync = require('child_process').execSync;

const output = execSync(
  'grep -R --exclude-dir="node_modules" --exclude-dir=".venv" --include=package.json -v betrybe',
  { encoding: 'utf-8' }
);

// console.log('output: ', typeof output, output);
// console.log('test line', output.split('\n'));
const lines = output.split('\n');

const mapped = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const colon = line.indexOf(':');
  const lastSlash = line.lastIndexOf('/package.json');

  // colon index is not inclusive in slice end position
  const pathname = line.slice(0, lastSlash);
  const value = line.slice(colon + 1);

  // console.log('pathname:', pathname, '\ncolon:', value);

  if (!mapped[pathname]) {
    mapped[pathname] = value;
    continue;
  }
  mapped[pathname] += value;
}

console.log('mapped', mapped);

const pwd = execSync('pwd', { encoding: 'utf-8' });

const keys = Object.keys(mapped);
for (let i = 0; i < keys.length; i++) {
  if (i > 1) break;
  const path = keys[i];
  const pathname = pwd.trim() + '/' + path;

  let jsonValue = mapped[path];

  // find an unnecessary trailling comma
  const traillingCommaRegex = /,\s*\n?}/gm;
  const traillingCommaPosition = traillingCommaRegex.exec(jsonValue);

  if (traillingCommaPosition) {
    const index = traillingCommaPosition['index'];
    const beforeComma = jsonValue.slice(0, index);
    const afterComma = jsonValue.slice(index + 1);

    jsonValue = beforeComma + afterComma;
  }

  console.log('\npathname:', pathname, '\ndata:', jsonValue);

  const data = new Uint8Array(
    Buffer.from(JSON.parse(JSON.stringify(jsonValue)))
  );
  try {
    writeFile(pathname + '/package.tmp.json', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  } catch {
    console.log(`\nSomething went wrong: \n${path}`);
  }

  execSync(`mv ${pathname}/package.json ${pathname}/package.backup.json`);
  execSync(`mv ${pathname}/package.tmp.json ${pathname}/package.json`);
  // execSync(
  //   `rm -rf ${pathname}/package.tmp.json ${pathname}/package.backup.json`
  // );
}
