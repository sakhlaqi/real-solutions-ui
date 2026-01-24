/**
 * Navigation Behaviors
 * 
 * Behavior handlers for navigation actions
 */

export interface NavigationBehavior {
  id: string;
  handler: (params: any) => void;
}

/**
 * Navigate to a specific path
 */
export const navigateToPath = (path: string) => {
  // Implementation will be provided by the consuming application
  console.log('Navigate to:', path);
};

/**
 * Navigate back
 */
export const navigateBack = () => {
  // Implementation will be provided by the consuming application
  console.log('Navigate back');
};

/**
 * Open external link
 */
export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const navigationBehaviors = {
  navigateToPath,
  navigateBack,
  openExternalLink,
};
