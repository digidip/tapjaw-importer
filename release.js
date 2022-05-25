const { execSync, spawnSync } = require('child_process');
const newPackage = require('./package.json');
const newVersion = newPackage.version;

console.log('Updating documentation...');
execSync('rm -rf docs/assets docs/classes docs/enums docs/interfaces docs/modules index.html && node node_modules/.bin/typedoc')


console.log('Committing documentation...')
execSync('git add -A docs/ package.json');
execSync(`git commit -am "bump version to ${newVersion}"`);

console.log('git tagging new version')
execSync(`git tag -a v${newVersion} -m "bump version to ${newVersion}"`, {
    stdio: 'pipe'
});

console.log(`✨ Done - New version created, v${newVersion}. You may not push to repository`);
