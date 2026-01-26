const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/stories/ThemePresets.stories.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace spacing
content = content.replace(/tokens\.spacing\.xs/g, 'sp("xs")');
content = content.replace(/tokens\.spacing\.sm/g, 'sp("sm")');
content = content.replace(/tokens\.spacing\.md/g, 'sp("md")');
content = content.replace(/tokens\.spacing\.lg/g, 'sp("lg")');
content = content.replace(/tokens\.spacing\.xl/g, 'sp("xl")');
content = content.replace(/tokens\.spacing\['2xl'\]/g, 'sp("2xl")');
content = content.replace(/tokens\.spacing\['3xl'\]/g, 'sp("3xl")');

// Replace colors
content = content.replace(/tokens\.colors\.background\.primary/g, 'colors.background || "#fff"');
content = content.replace(/tokens\.colors\.background\.secondary/g, 'colors.surface || "#f5f5f5"');
content = content.replace(/tokens\.colors\.text\.primary/g, 'colors.textPrimary || "#000"');
content = content.replace(/tokens\.colors\.text\.secondary/g, 'colors.textSecondary || "#666"');
content = content.replace(/tokens\.colors\.text\.disabled/g, 'colors.textDisabled || "#999"');
content = content.replace(/tokens\.colors\.text\.inverse/g, 'colors.primaryContrast || "#fff"');
content = content.replace(/tokens\.colors\.brand\.primary/g, 'colors.primary');
content = content.replace(/tokens\.colors\.border\.default/g, 'colors.border || "#e0e0e0"');

// Replace radius
content = content.replace(/tokens\.radius\.sm/g, '`${radius.sm}px`');
content = content.replace(/tokens\.radius\.md/g, '`${radius.md}px`');
content = content.replace(/tokens\.radius\.lg/g, '`${radius.lg}px`');

// Replace shadows
content = content.replace(/tokens\.shadows\.sm/g, 'shadows.sm');
content = content.replace(/tokens\.shadows\.md/g, 'shadows.md');

// Replace typography fontSize
content = content.replace(/tokens\.typography\.fontSize\.xs/g, '"0.75rem"');
content = content.replace(/tokens\.typography\.fontSize\.sm/g, '"0.875rem"');
content = content.replace(/tokens\.typography\.fontSize\.base/g, '"1rem"');
content = content.replace(/tokens\.typography\.fontSize\.lg/g, '"1.125rem"');
content = content.replace(/tokens\.typography\.fontSize\.xl/g, '"1.25rem"');
content = content.replace(/tokens\.typography\.fontSize\['2xl'\]/g, '"1.5rem"');
content = content.replace(/tokens\.typography\.fontSize\['3xl'\]/g, '"1.875rem"');

// Replace typography fontWeight
content = content.replace(/tokens\.typography\.fontWeight\.normal/g, '400');
content = content.replace(/tokens\.typography\.fontWeight\.medium/g, '500');
content = content.replace(/tokens\.typography\.fontWeight\.semibold/g, '600');
content = content.replace(/tokens\.typography\.fontWeight\.bold/g, '700');

// Replace typography fontFamily
content = content.replace(/tokens\.typography\.fontFamily\.mono/g, '"monospace"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Replacements complete!');
