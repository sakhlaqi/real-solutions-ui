/**
 * Validate JSON page configurations
 * Run with: node validate-json-pages.js
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages', 'examples');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));

console.log('Validating JSON page configurations...\n');

let allValid = true;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    const json = JSON.parse(content);
    
    // Check required fields
    const errors = [];
    
    if (!json.template || typeof json.template !== 'string') {
      errors.push('  ❌ template: expected string, got ' + typeof json.template);
    }
    
    if (!json.slots || typeof json.slots !== 'object' || Array.isArray(json.slots)) {
      errors.push('  ❌ slots: expected object, got ' + (Array.isArray(json.slots) ? 'array' : typeof json.slots));
    }
    
    if (errors.length > 0) {
      console.log(`❌ ${file}:`);
      errors.forEach(err => console.log(err));
      console.log('');
      allValid = false;
    } else {
      console.log(`✅ ${file}`);
      console.log(`   template: "${json.template}"`);
      console.log(`   slots: ${Object.keys(json.slots).join(', ')}`);
      console.log('');
    }
    
  } catch (err) {
    console.log(`❌ ${file}: Invalid JSON`);
    console.log(`   ${err.message}\n`);
    allValid = false;
  }
});

if (allValid) {
  console.log('\n✅ All JSON files are valid!');
  process.exit(0);
} else {
  console.log('\n❌ Some JSON files have errors!');
  process.exit(1);
}
