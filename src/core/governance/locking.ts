/**
 * Template Locking and Status Management
 * 
 * Controls template lifecycle and immutability
 */

import type { TemplateStatus, VersionedTemplateMetadata } from './versioning';

/**
 * Template lock result
 */
export interface LockResult {
  success: boolean;
  locked: boolean;
  message?: string;
  timestamp?: string;
}

/**
 * Template status transition
 */
export interface StatusTransition {
  from: TemplateStatus;
  to: TemplateStatus;
  timestamp: string;
  author?: string;
  reason?: string;
}

/**
 * Template governance manager
 */
export class TemplateGovernance {
  private locks = new Map<string, boolean>();
  private statuses = new Map<string, TemplateStatus>();
  private history = new Map<string, StatusTransition[]>();

  /**
   * Lock a template (make immutable)
   */
  lock(templateId: string, reason?: string): LockResult {
    if (this.isLocked(templateId)) {
      return {
        success: false,
        locked: true,
        message: 'Template is already locked',
      };
    }

    this.locks.set(templateId, true);
    
    return {
      success: true,
      locked: true,
      message: reason || 'Template locked successfully',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Unlock a template
   */
  unlock(templateId: string, force = false): LockResult {
    if (!this.isLocked(templateId)) {
      return {
        success: false,
        locked: false,
        message: 'Template is not locked',
      };
    }

    const status = this.getStatus(templateId);
    if (status === 'published' && !force) {
      return {
        success: false,
        locked: true,
        message: 'Cannot unlock published template without force flag',
      };
    }

    this.locks.set(templateId, false);
    
    return {
      success: true,
      locked: false,
      message: 'Template unlocked successfully',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Check if template is locked
   */
  isLocked(templateId: string): boolean {
    return this.locks.get(templateId) ?? false;
  }

  /**
   * Transition template status
   */
  transition(
    templateId: string,
    to: TemplateStatus,
    options: { author?: string; reason?: string } = {}
  ): { success: boolean; message?: string } {
    const from = this.getStatus(templateId);
    
    // Validate transition
    const validTransitions = this.getValidTransitions(from);
    if (!validTransitions.includes(to)) {
      return {
        success: false,
        message: `Invalid status transition from ${from} to ${to}`,
      };
    }

    // Check lock status for published templates
    if (to === 'published' && !this.isLocked(templateId)) {
      this.lock(templateId, 'Auto-locked on publish');
    }

    // Record transition
    this.statuses.set(templateId, to);
    
    const transition: StatusTransition = {
      from,
      to,
      timestamp: new Date().toISOString(),
      author: options.author,
      reason: options.reason,
    };
    
    if (!this.history.has(templateId)) {
      this.history.set(templateId, []);
    }
    this.history.get(templateId)!.push(transition);

    return { success: true };
  }

  /**
   * Get template status
   */
  getStatus(templateId: string): TemplateStatus {
    return this.statuses.get(templateId) ?? 'draft';
  }

  /**
   * Get status history
   */
  getHistory(templateId: string): StatusTransition[] {
    return this.history.get(templateId) || [];
  }

  /**
   * Get valid transitions from current status
   */
  getValidTransitions(from: TemplateStatus): TemplateStatus[] {
    const transitions: Record<TemplateStatus, TemplateStatus[]> = {
      draft: ['preview', 'archived'],
      preview: ['draft', 'published', 'archived'],
      published: ['deprecated', 'archived'],
      deprecated: ['archived'],
      archived: [], // No transitions from archived
    };
    
    return transitions[from] || [];
  }

  /**
   * Check if template can be modified
   */
  canModify(templateId: string): boolean {
    if (this.isLocked(templateId)) {
      return false;
    }
    
    const status = this.getStatus(templateId);
    return status === 'draft' || status === 'preview';
  }

  /**
   * Validate template metadata
   */
  validateMetadata(metadata: VersionedTemplateMetadata): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields
    if (!metadata.id) {
      errors.push('Template ID is required');
    }
    
    if (!metadata.name) {
      errors.push('Template name is required');
    }
    
    if (!metadata.version) {
      errors.push('Version information is required');
    }

    // Validate status
    const validStatuses: TemplateStatus[] = ['draft', 'preview', 'published', 'deprecated', 'archived'];
    if (metadata.status && !validStatuses.includes(metadata.status)) {
      errors.push(`Invalid status: ${metadata.status}`);
    }

    // Validate lock state
    if (metadata.status === 'published' && !metadata.locked) {
      errors.push('Published templates must be locked');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create snapshot for rollback
   */
  createSnapshot(templateId: string, data: any): string {
    const snapshotId = `${templateId}-${Date.now()}`;
    // In production, this would save to storage
    return snapshotId;
  }
}

/**
 * Global governance instance
 */
export const templateGovernance = new TemplateGovernance();

/**
 * Template modification guard
 */
export function guardModification(templateId: string): void {
  if (!templateGovernance.canModify(templateId)) {
    const status = templateGovernance.getStatus(templateId);
    const locked = templateGovernance.isLocked(templateId);
    
    throw new Error(
      `Cannot modify template ${templateId}: ` +
      `status=${status}, locked=${locked}. ` +
      `Published and locked templates are immutable.`
    );
  }
}

/**
 * Publish template
 */
export function publishTemplate(
  templateId: string,
  author?: string
): LockResult {
  // Transition to published
  const result = templateGovernance.transition(templateId, 'published', {
    author,
    reason: 'Template published to production',
  });
  
  if (!result.success) {
    return {
      success: false,
      locked: false,
      message: result.message,
    };
  }

  // Lock the template
  return templateGovernance.lock(templateId, 'Auto-locked on publish');
}

/**
 * Deprecate template
 */
export function deprecateTemplate(
  templateId: string,
  reason: string,
  author?: string
): { success: boolean; message?: string } {
  return templateGovernance.transition(templateId, 'deprecated', {
    author,
    reason,
  });
}

/**
 * Archive template
 */
export function archiveTemplate(
  templateId: string,
  reason: string,
  author?: string
): { success: boolean; message?: string } {
  return templateGovernance.transition(templateId, 'archived', {
    author,
    reason,
  });
}
