/**
 * Layout Registry
 * 
 * Registers all layout templates with the template registry.
 * Import this file to ensure all layouts are available for JSON rendering.
 */

import { registerTemplate } from '../registry/templateRegistry';
import { DashboardLayout } from './DashboardLayout';
import { TwoColumnLayout } from './TwoColumnLayout';
import { TabsLayout } from './TabsLayout';
import { MarketingLayout } from './MarketingLayout';
import { LandingLayout } from './LandingLayout';
import { BlankPageLayout } from './BlankPageLayout';

/**
 * Register all application layouts
 */
export function registerAllLayouts() {
  // Dashboard/Application Layouts
  registerTemplate({
    metadata: {
      id: 'dashboard-layout',
      name: 'Dashboard Layout',
      description: 'Standard dashboard layout with header, sidebar, main content, and footer',
      category: 'application',
      tags: ['dashboard', 'admin', 'app'],
      version: '1.0.0',
    },
    status: 'active',
    content: DashboardLayout,
  });

  registerTemplate({
    metadata: {
      id: 'two-column-layout',
      name: 'Two Column Layout',
      description: 'Responsive two-column layout for master-detail views',
      category: 'application',
      tags: ['two-column', 'master-detail', 'split'],
      version: '1.0.0',
    },
    status: 'active',
    content: TwoColumnLayout,
  });

  registerTemplate({
    metadata: {
      id: 'tabs-layout',
      name: 'Tabs Layout',
      description: 'Layout with tabbed navigation for organizing content',
      category: 'application',
      tags: ['tabs', 'navigation', 'organized'],
      version: '1.0.0',
    },
    status: 'active',
    content: TabsLayout,
  });

  // Marketing Layouts
  registerTemplate({
    metadata: {
      id: 'marketing-layout',
      name: 'Marketing Layout',
      description: 'Full-featured marketing website layout with header, main, sidebar, and footer',
      category: 'marketing',
      tags: ['marketing', 'website', 'sidebar', 'full-width'],
      version: '1.0.0',
    },
    status: 'active',
    content: MarketingLayout,
  });

  registerTemplate({
    metadata: {
      id: 'landing-layout',
      name: 'Landing Page Layout',
      description: 'Conversion-optimized landing page layout with minimal distractions',
      category: 'marketing',
      tags: ['landing', 'conversion', 'minimal', 'campaign'],
      version: '1.0.0',
    },
    status: 'active',
    content: LandingLayout,
  });

  registerTemplate({
    metadata: {
      id: 'blank-layout',
      name: 'Blank Page Layout',
      description: 'Minimal layout providing maximum flexibility for custom designs',
      category: 'utility',
      tags: ['blank', 'custom', 'flexible', 'minimal'],
      version: '1.0.0',
    },
    status: 'active',
    content: BlankPageLayout,
  });

  console.log('✅ All layouts registered successfully');
}

/**
 * Auto-register layouts when this module is imported
 */
registerAllLayouts();

/**
 * Export layout components for direct use
 */
export {
  DashboardLayout,
  TwoColumnLayout,
  TabsLayout,
  MarketingLayout,
  LandingLayout,
  BlankPageLayout,
};
