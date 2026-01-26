/**
 * Templates Module
 * 
 * Layout templates and complete website templates.
 */

// Layout Components
export * from './DashboardLayout';
export * from './TwoColumnLayout';
export * from './TabsLayout';
export * from './MarketingLayout';
export * from './LandingLayout';
export * from './BlankPageLayout';

// Complete Website Templates
export * from './marketing-page';
export * from './landing-page';
export * from './blog-template';
export * from './sign-in-template';

// Registration
export { registerAllLayouts } from './registerLayouts';
export * from './registerTemplates';
export * from './templatePreviews';

// Auto-register templates
import './registerTemplates';
