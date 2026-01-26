/**
 * Template Versioning System
 * 
 * Semver-based versioning with backward compatibility tracking
 */

/**
 * Semantic version
 */
export interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

/**
 * Template version metadata
 */
export interface TemplateVersion {
  /** Semantic version */
  version: SemanticVersion;
  
  /** Version string (e.g., "1.2.3") */
  versionString: string;
  
  /** Release date */
  releaseDate: string;
  
  /** Changelog for this version */
  changelog?: string[];
  
  /** Breaking changes in this version */
  breakingChanges?: string[];
  
  /** Deprecations introduced in this version */
  deprecations?: DeprecationNotice[];
  
  /** Migration guide from previous version */
  migrationGuide?: string;
}

/**
 * Deprecation notice
 */
export interface DeprecationNotice {
  /** Path to deprecated property */
  path: string;
  
  /** Version when deprecated */
  since: string;
  
  /** Version when will be removed */
  removeIn: string;
  
  /** Deprecation reason */
  reason: string;
  
  /** Replacement path or instruction */
  replacement?: string;
  
  /** Severity level */
  severity: 'warning' | 'error';
}

/**
 * Template lifecycle status
 */
export type TemplateStatus = 
  | 'draft'       // In development
  | 'preview'     // Ready for testing
  | 'published'   // Production ready
  | 'deprecated'  // Still available but discouraged
  | 'archived';   // No longer available

/**
 * Template metadata with versioning
 */
export interface VersionedTemplateMetadata {
  /** Template ID */
  id: string;
  
  /** Template name */
  name: string;
  
  /** Current version */
  version: TemplateVersion;
  
  /** Lifecycle status */
  status: TemplateStatus;
  
  /** Whether template is locked (published templates are immutable) */
  locked: boolean;
  
  /** All available versions */
  versions?: TemplateVersion[];
  
  /** Minimum required library version */
  minLibraryVersion?: string;
  
  /** Maximum compatible library version */
  maxLibraryVersion?: string;
  
  /** Template author/maintainer */
  author?: string;
  
  /** License */
  license?: string;
  
  /** Tags for categorization */
  tags?: string[];
}

/**
 * Version comparison result
 */
export type VersionComparison = 'greater' | 'equal' | 'less';

/**
 * Parse semantic version from string
 */
export function parseVersion(versionString: string): SemanticVersion {
  const regex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/;
  const match = versionString.match(regex);
  
  if (!match) {
    throw new Error(`Invalid version string: ${versionString}`);
  }
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[4],
    build: match[5],
  };
}

/**
 * Convert semantic version to string
 */
export function versionToString(version: SemanticVersion): string {
  let versionString = `${version.major}.${version.minor}.${version.patch}`;
  
  if (version.prerelease) {
    versionString += `-${version.prerelease}`;
  }
  
  if (version.build) {
    versionString += `+${version.build}`;
  }
  
  return versionString;
}

/**
 * Compare two semantic versions
 */
export function compareVersions(a: SemanticVersion, b: SemanticVersion): VersionComparison {
  // Compare major
  if (a.major > b.major) return 'greater';
  if (a.major < b.major) return 'less';
  
  // Compare minor
  if (a.minor > b.minor) return 'greater';
  if (a.minor < b.minor) return 'less';
  
  // Compare patch
  if (a.patch > b.patch) return 'greater';
  if (a.patch < b.patch) return 'less';
  
  // Compare prerelease (versions without prerelease are greater than those with)
  if (!a.prerelease && b.prerelease) return 'greater';
  if (a.prerelease && !b.prerelease) return 'less';
  if (a.prerelease && b.prerelease) {
    if (a.prerelease > b.prerelease) return 'greater';
    if (a.prerelease < b.prerelease) return 'less';
  }
  
  return 'equal';
}

/**
 * Check if version satisfies a range
 */
export function satisfiesVersion(version: SemanticVersion, range: string): boolean {
  // Simple range implementation (supports ^, ~, >=, >, <=, <, =)
  if (range.startsWith('^')) {
    // ^1.2.3 means >=1.2.3 <2.0.0
    const base = parseVersion(range.slice(1));
    const versionStr = versionToString(version);
    const baseStr = versionToString(base);
    return versionStr >= baseStr && version.major === base.major;
  }
  
  if (range.startsWith('~')) {
    // ~1.2.3 means >=1.2.3 <1.3.0
    const base = parseVersion(range.slice(1));
    return version.major === base.major && 
           version.minor === base.minor && 
           version.patch >= base.patch;
  }
  
  if (range.startsWith('>=')) {
    const base = parseVersion(range.slice(2));
    return compareVersions(version, base) !== 'less';
  }
  
  if (range.startsWith('>')) {
    const base = parseVersion(range.slice(1));
    return compareVersions(version, base) === 'greater';
  }
  
  if (range.startsWith('<=')) {
    const base = parseVersion(range.slice(2));
    return compareVersions(version, base) !== 'greater';
  }
  
  if (range.startsWith('<')) {
    const base = parseVersion(range.slice(1));
    return compareVersions(version, base) === 'less';
  }
  
  // Exact match
  const base = parseVersion(range);
  return compareVersions(version, base) === 'equal';
}

/**
 * Get next version based on bump type
 */
export function bumpVersion(
  current: SemanticVersion,
  type: 'major' | 'minor' | 'patch'
): SemanticVersion {
  switch (type) {
    case 'major':
      return { major: current.major + 1, minor: 0, patch: 0 };
    case 'minor':
      return { major: current.major, minor: current.minor + 1, patch: 0 };
    case 'patch':
      return { major: current.major, minor: current.minor, patch: current.patch + 1 };
  }
}

/**
 * Check if version has breaking changes
 */
export function hasBreakingChanges(from: SemanticVersion, to: SemanticVersion): boolean {
  return to.major > from.major;
}

/**
 * Check if version is prerelease
 */
export function isPrerelease(version: SemanticVersion): boolean {
  return !!version.prerelease;
}

/**
 * Check if version is stable
 */
export function isStable(version: SemanticVersion): boolean {
  return version.major >= 1 && !version.prerelease;
}
