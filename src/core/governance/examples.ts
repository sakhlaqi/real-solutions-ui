/**
 * Governance System Examples
 * 
 * Demonstrates how to use the governance features
 */

import {
  parseVersion,
  bumpVersion,
  migrationRegistry,
  MigrationUtils,
  deprecationRegistry,
  createDeprecation,
  templateGovernance,
  publishTemplate,
  templateValidator,
  GovernanceUtils,
} from './index';

/**
 * Example 1: Create and version a template
 */
export function example1_CreateVersionedTemplate() {
  // Create new template
  const template = GovernanceUtils.createTemplate(
    'marketing-hero-v2',
    'Marketing Hero Section v2',
    '0.1.0'
  );

  console.log('Created template:', template);
  
  // Bump version for release
  const newVersion = bumpVersion(template.version.version, 'minor');
  console.log('Next version:', newVersion);

  return template;
}

/**
 * Example 2: Register and run migrations
 */
export function example2_RegisterMigration() {
  // Register migration from v1 to v2
  migrationRegistry.register('marketing-hero', {
    id: 'v1-to-v2-color-scheme',
    from: '1.0.0',
    to: '2.0.0',
    description: 'Migrate color scheme from palette to tokens',
    breaking: true,
    migrate: (data, context) => {
      console.log(`Migrating ${context.templateId} from ${context.fromVersion} to ${context.toVersion}`);
      
      // Use migration utilities
      MigrationUtils.renameProperty(data, 'theme.colors.primary', 'theme.tokens.primary');
      MigrationUtils.renameProperty(data, 'theme.colors.secondary', 'theme.tokens.secondary');
      
      context.warnings.push('Color scheme migrated to design tokens');
      
      return data;
    },
  });

  // Run migration
  const oldData = {
    theme: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
      },
    },
  };

  const result = migrationRegistry.migrate(
    'marketing-hero',
    oldData,
    '1.0.0',
    '2.0.0'
  );

  console.log('Migration result:', result);
  return result;
}

/**
 * Example 3: Add deprecation warnings
 */
export function example3_DeprecateProperty() {
  // Register deprecation
  const deprecation = createDeprecation(
    'theme.palette.primary',
    '2.0.0',
    '3.0.0',
    'Color palette is deprecated in favor of design tokens',
    {
      replacement: 'theme.tokens.colors.primary',
      severity: 'warning',
    }
  );

  deprecationRegistry.register('marketing-hero', deprecation);

  // Check for deprecations
  const data = {
    theme: {
      palette: {
        primary: '#007bff',
      },
    },
  };

  const found = deprecationRegistry.check('marketing-hero', '2.5.0', data);
  console.log('Deprecations found:', found);

  return found;
}

/**
 * Example 4: Lock and publish template
 */
export function example4_PublishTemplate() {
  const templateId = 'marketing-hero-v2';

  // Check if can be published
  const health = GovernanceUtils.checkHealth(
    GovernanceUtils.createTemplate(templateId, 'Marketing Hero v2', '1.0.0')
  );

  if (!health.healthy) {
    console.error('Template not ready for publish:', health.issues);
    return { success: false };
  }

  // Publish and lock
  const result = publishTemplate(templateId, 'john.doe@example.com');
  console.log('Publish result:', result);

  // Try to modify (should fail)
  try {
    const canModify = templateGovernance.canModify(templateId);
    console.log('Can modify after publish:', canModify); // false
  } catch (error) {
    console.log('Modification blocked:', error);
  }

  return result;
}

/**
 * Example 5: Validate template JSON
 */
export function example5_ValidateTemplate() {
  const templateData = {
    id: 'invalid-template',
    name: 'Invalid Template',
    version: {
      version: { major: 1, minor: 0, patch: 0 },
      versionString: '1.0.0',
      releaseDate: new Date().toISOString(),
      // Missing changelog for published template
    },
    status: 'published',
    locked: true,
  };

  const result = templateValidator.validate(templateData, {
    templateId: 'invalid-template',
    version: '1.0.0',
  });

  console.log('Validation result:');
  console.log(`Valid: ${result.valid}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  // Print issues
  for (const error of result.errors) {
    console.log(`  ❌ ${error.path}: ${error.message}`);
  }
  for (const warning of result.warnings) {
    console.log(`  ⚠️  ${warning.path}: ${warning.message}`);
  }

  return result;
}

/**
 * Example 6: Complete workflow
 */
export async function example6_CompleteWorkflow() {
  console.log('=== Complete Template Governance Workflow ===\n');

  // 1. Create template
  console.log('1. Creating template...');
  const template = GovernanceUtils.createTemplate(
    'product-showcase',
    'Product Showcase Section',
    '0.1.0'
  );
  console.log(`   Created: ${template.name} v${template.version.versionString}`);

  // 2. Validate
  console.log('\n2. Validating template...');
  const validation = templateValidator.validate(template, {
    templateId: template.id,
    version: template.version.versionString,
  });
  console.log(`   Valid: ${validation.valid}`);
  console.log(`   Warnings: ${validation.warnings.length}`);

  // 3. Add deprecation for old property
  console.log('\n3. Registering deprecation...');
  deprecationRegistry.register(
    template.id,
    createDeprecation(
      'layout.grid',
      '0.1.0',
      '1.0.0',
      'Grid layout is deprecated',
      { replacement: 'layout.flex' }
    )
  );

  // 4. Register migration
  console.log('\n4. Registering migration...');
  migrationRegistry.register(template.id, {
    id: 'grid-to-flex',
    from: '0.1.0',
    to: '1.0.0',
    description: 'Migrate from grid to flexbox',
    breaking: true,
    migrate: (data) => {
      MigrationUtils.renameProperty(data, 'layout.grid', 'layout.flex');
      return data;
    },
  });

  // 5. Prepare for publish
  console.log('\n5. Preparing for publish...');
  const publishPrep = GovernanceUtils.prepareForPublish(template, {
    author: 'design-team@example.com',
    changelog: ['Initial release', 'Product grid layout', 'Responsive design'],
  });

  if (!publishPrep.success) {
    console.log(`   ❌ Publish preparation failed: ${publishPrep.errors.join(', ')}`);
    return;
  }

  // 6. Publish
  console.log('\n6. Publishing template...');
  const publishResult = publishTemplate(template.id, 'design-team@example.com');
  console.log(`   ${publishResult.success ? '✅' : '❌'} ${publishResult.message}`);

  // 7. Check health
  console.log('\n7. Checking template health...');
  const health = GovernanceUtils.checkHealth(publishPrep.metadata!);
  console.log(`   Healthy: ${health.healthy}`);
  console.log(`   Issues: ${health.issues.length}`);
  console.log(`   Warnings: ${health.warnings.length}`);

  console.log('\n=== Workflow Complete ===');
}

/**
 * Example 7: Version comparison and ranges
 */
export function example7_VersionComparison() {
  const v1 = parseVersion('1.2.3');
  const v2 = parseVersion('2.0.0');
  const v3 = parseVersion('1.2.4-beta.1');

  console.log('Version comparisons:');
  console.log(`  1.2.3 vs 2.0.0: ${compareVersions(v1, v2)}`);
  console.log(`  2.0.0 vs 1.2.3: ${compareVersions(v2, v1)}`);
  console.log(`  1.2.3 vs 1.2.4-beta.1: ${compareVersions(v1, v3)}`);

  // Check version ranges
  import { satisfiesVersion } from './versioning';
  console.log('\nVersion range checks:');
  console.log(`  1.2.3 satisfies ^1.0.0: ${satisfiesVersion(v1, '^1.0.0')}`);
  console.log(`  2.0.0 satisfies ^1.0.0: ${satisfiesVersion(v2, '^1.0.0')}`);
  console.log(`  1.2.3 satisfies ~1.2.0: ${satisfiesVersion(v1, '~1.2.0')}`);
}

// Import for example 7
import { compareVersions } from './versioning';
