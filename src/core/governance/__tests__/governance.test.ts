/**
 * Governance Integration Test
 * 
 * Tests the complete governance workflow
 */

import { describe, it, expect } from '@jest/globals';
import {
  GovernanceUtils,
  parseVersion,
  bumpVersion,
  migrationRegistry,
  MigrationUtils,
  deprecationRegistry,
  createDeprecation,
  templateGovernance,
  publishTemplate,
  templateValidator,
  compareVersions,
  satisfiesVersion,
} from './index';

describe('Governance System', () => {
  describe('Versioning', () => {
    it('should parse semantic versions correctly', () => {
      const version = parseVersion('1.2.3-beta.1+build.123');
      
      expect(version.major).toBe(1);
      expect(version.minor).toBe(2);
      expect(version.patch).toBe(3);
      expect(version.prerelease).toBe('beta.1');
      expect(version.build).toBe('build.123');
    });

    it('should compare versions correctly', () => {
      const v1 = parseVersion('1.2.3');
      const v2 = parseVersion('2.0.0');
      const v3 = parseVersion('1.2.3');
      
      expect(compareVersions(v1, v2)).toBe('less');
      expect(compareVersions(v2, v1)).toBe('greater');
      expect(compareVersions(v1, v3)).toBe('equal');
    });

    it('should bump versions correctly', () => {
      const v1 = parseVersion('1.2.3');
      
      const major = bumpVersion(v1, 'major');
      expect(major.major).toBe(2);
      expect(major.minor).toBe(0);
      expect(major.patch).toBe(0);
      
      const minor = bumpVersion(v1, 'minor');
      expect(minor.major).toBe(1);
      expect(minor.minor).toBe(3);
      expect(minor.patch).toBe(0);
      
      const patch = bumpVersion(v1, 'patch');
      expect(patch.major).toBe(1);
      expect(patch.minor).toBe(2);
      expect(patch.patch).toBe(4);
    });

    it('should check version ranges correctly', () => {
      const v1 = parseVersion('1.2.3');
      
      expect(satisfiesVersion(v1, '^1.0.0')).toBe(true);
      expect(satisfiesVersion(v1, '^2.0.0')).toBe(false);
      expect(satisfiesVersion(v1, '~1.2.0')).toBe(true);
      expect(satisfiesVersion(v1, '~1.3.0')).toBe(false);
      expect(satisfiesVersion(v1, '>=1.2.0')).toBe(true);
      expect(satisfiesVersion(v1, '>2.0.0')).toBe(false);
    });
  });

  describe('Migration', () => {
    it('should register and run migrations', async () => {
      const templateId = 'test-migration-template';
      
      migrationRegistry.register(templateId, {
        id: 'test-migration',
        from: '1.0.0',
        to: '2.0.0',
        migrate: (data) => {
          MigrationUtils.renameProperty(data, 'oldField', 'newField');
          return data;
        },
      });

      const oldData = { oldField: 'value' };
      const result = await migrationRegistry.migrate(
        templateId,
        oldData,
        '1.0.0',
        '2.0.0'
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('newField', 'value');
      expect(result.data).not.toHaveProperty('oldField');
    });

    it('should chain multiple migrations', async () => {
      const templateId = 'test-chain-template';
      
      migrationRegistry.register(templateId, {
        id: 'migration-1',
        from: '1.0.0',
        to: '1.1.0',
        migrate: (data) => {
          data.version = '1.1.0';
          return data;
        },
      });

      migrationRegistry.register(templateId, {
        id: 'migration-2',
        from: '1.1.0',
        to: '2.0.0',
        migrate: (data) => {
          data.version = '2.0.0';
          return data;
        },
      });

      const result = await migrationRegistry.migrate(
        templateId,
        {},
        '1.0.0',
        '2.0.0'
      );

      expect(result.success).toBe(true);
      expect(result.migrationsApplied).toHaveLength(2);
      expect(result.data?.version).toBe('2.0.0');
    });
  });

  describe('Deprecation', () => {
    it('should register and detect deprecations', () => {
      const templateId = 'test-deprecation-template';
      
      const deprecation = createDeprecation(
        'oldProperty',
        '2.0.0',
        '3.0.0',
        'Use newProperty instead',
        { replacement: 'newProperty' }
      );

      deprecationRegistry.register(templateId, deprecation);

      const data = { oldProperty: 'value' };
      const found = deprecationRegistry.check(templateId, '2.5.0', data);

      expect(found).toHaveLength(1);
      expect(found[0].path).toBe('oldProperty');
      expect(found[0].replacement).toBe('newProperty');
    });

    it('should not warn for future deprecations', () => {
      const templateId = 'test-future-deprecation';
      
      deprecationRegistry.register(
        templateId,
        createDeprecation('futureProperty', '3.0.0', '4.0.0', 'Future deprecation')
      );

      const data = { futureProperty: 'value' };
      const found = deprecationRegistry.check(templateId, '2.0.0', data);

      expect(found).toHaveLength(0);
    });
  });

  describe('Template Locking', () => {
    it('should lock and unlock templates', () => {
      const templateId = 'test-lock-template';
      
      const lockResult = templateGovernance.lock(templateId);
      expect(lockResult.success).toBe(true);
      expect(lockResult.locked).toBe(true);
      
      expect(templateGovernance.isLocked(templateId)).toBe(true);
      
      const unlockResult = templateGovernance.unlock(templateId, true);
      expect(unlockResult.success).toBe(true);
      expect(unlockResult.locked).toBe(false);
    });

    it('should transition template status', () => {
      const templateId = 'test-status-template';
      
      expect(templateGovernance.getStatus(templateId)).toBe('draft');
      
      const result = templateGovernance.transition(templateId, 'preview');
      expect(result.success).toBe(true);
      expect(templateGovernance.getStatus(templateId)).toBe('preview');
    });

    it('should prevent invalid transitions', () => {
      const templateId = 'test-invalid-transition';
      
      // Can't go directly from draft to deprecated
      const result = templateGovernance.transition(templateId, 'deprecated');
      expect(result.success).toBe(false);
    });

    it('should auto-lock on publish', () => {
      const templateId = 'test-publish-template';
      
      const result = publishTemplate(templateId);
      expect(result.success).toBe(true);
      expect(templateGovernance.isLocked(templateId)).toBe(true);
      expect(templateGovernance.getStatus(templateId)).toBe('published');
    });
  });

  describe('Validation', () => {
    it('should validate template metadata', () => {
      const validTemplate = GovernanceUtils.createTemplate(
        'valid-template',
        'Valid Template',
        '1.0.0'
      );

      const result = templateValidator.validate(validTemplate, {
        templateId: validTemplate.id,
        version: validTemplate.version.versionString,
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidTemplate = {
        name: 'Invalid Template',
        // Missing id and version
      };

      const result = templateValidator.validate(invalidTemplate, {
        templateId: 'invalid',
        version: '1.0.0',
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate version format', () => {
      const template = {
        id: 'test-template',
        name: 'Test Template',
        version: {
          version: { major: 1, minor: 0, patch: 0 },
          versionString: 'invalid-version',
          releaseDate: new Date().toISOString(),
        },
      };

      const result = templateValidator.validate(template, {
        templateId: template.id,
        version: '1.0.0',
      });

      const versionError = result.errors.find(e => e.ruleId === 'valid-version');
      expect(versionError).toBeDefined();
    });
  });

  describe('Governance Utilities', () => {
    it('should create template with correct metadata', () => {
      const template = GovernanceUtils.createTemplate(
        'test-template',
        'Test Template',
        '0.1.0'
      );

      expect(template.id).toBe('test-template');
      expect(template.name).toBe('Test Template');
      expect(template.version.versionString).toBe('0.1.0');
      expect(template.status).toBe('draft');
      expect(template.locked).toBe(false);
    });

    it('should prepare template for publish', () => {
      const template = GovernanceUtils.createTemplate(
        'publish-template',
        'Publish Template',
        '1.0.0'
      );

      const result = GovernanceUtils.prepareForPublish(template, {
        author: 'test@example.com',
        changelog: ['Initial release'],
      });

      expect(result.success).toBe(true);
      expect(result.metadata?.status).toBe('published');
      expect(result.metadata?.locked).toBe(true);
      expect(result.metadata?.author).toBe('test@example.com');
    });

    it('should check template health', () => {
      const template = GovernanceUtils.createTemplate(
        'health-template',
        'Health Template',
        '1.0.0'
      );

      const health = GovernanceUtils.checkHealth(template);

      expect(health.healthy).toBe(true);
      expect(Array.isArray(health.issues)).toBe(true);
      expect(Array.isArray(health.warnings)).toBe(true);
    });
  });

  describe('Complete Workflow', () => {
    it('should handle complete template lifecycle', async () => {
      // 1. Create
      const template = GovernanceUtils.createTemplate(
        'workflow-template',
        'Workflow Template',
        '0.1.0'
      );
      expect(template.status).toBe('draft');

      // 2. Add migration
      migrationRegistry.register(template.id, {
        id: 'initial-migration',
        from: '0.1.0',
        to: '1.0.0',
        migrate: (data) => data,
      });

      // 3. Add deprecation
      deprecationRegistry.register(
        template.id,
        createDeprecation('oldField', '1.0.0', '2.0.0', 'Test deprecation')
      );

      // 4. Validate
      const validation = templateValidator.validate(template, {
        templateId: template.id,
        version: template.version.versionString,
      });
      expect(validation.valid).toBe(true);

      // 5. Publish
      const publishResult = publishTemplate(template.id);
      expect(publishResult.success).toBe(true);
      expect(templateGovernance.isLocked(template.id)).toBe(true);

      // 6. Check health
      const health = GovernanceUtils.checkHealth(template);
      expect(health.healthy).toBe(true);

      // 7. Verify can't modify
      expect(templateGovernance.canModify(template.id)).toBe(false);
    });
  });
});
