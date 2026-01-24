import type { Meta, StoryObj } from '@storybook/react';
import { PageRenderer } from '../../src/renderer/renderPage';
import { validatePageConfig } from '../../src/schema';
import type { PageConfig } from '../../src/schema';
import {
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  parseZodErrors,
  AdapterWarningsDisplay,
  type AdapterWarning,
} from '../../src/renderer';
import { useState } from 'react';

// Import JSON configurations
import dashboardConfig from '../../pages/examples/dashboard.json';
import employeeFormConfig from '../../pages/examples/employee-form.json';
import analyticsDashboardConfig from '../../pages/examples/analytics-dashboard.json';
import settingsConfig from '../../pages/examples/settings.json';
import listDetailConfig from '../../pages/examples/list-detail.json';

/**
 * Story Wrapper with Inline Validation & Adapter Warnings
 * 
 * Wraps PageRenderer to display validation errors and adapter warnings inline in the UI
 */
function PageStoryWrapper({ config }: { config: any }) {
  const [adapterWarnings, setAdapterWarnings] = useState<AdapterWarning[]>([]);

  // Validate configuration
  const validation = validatePageConfig(config);

  if (!validation.success) {
    // Display validation errors inline
    const errors = validation.error ? parseZodErrors(validation.error) : [];
    return (
      <>
        <ValidationErrorDisplay 
          errors={errors}
          title="JSON Schema Validation Failed"
        />
        {/* Keep last valid render if config is partially valid - in this case show nothing */}
      </>
    );
  }

  return (
    <>
      <ValidationSuccessDisplay message="Schema validated successfully" compact />
      
      <PageRenderer 
        config={config as PageConfig}
        onAdapterWarning={(warning) => {
          setAdapterWarnings(prev => {
            // Avoid duplicates
            if (prev.some(w => 
              w.componentType === warning.componentType && 
              w.type === warning.type
            )) {
              return prev;
            }
            return [...prev, warning];
          });
        }}
        showInlineWarnings
      />
      
      {/* Display adapter warnings as floating notifications */}
      <AdapterWarningsDisplay 
        warnings={adapterWarnings}
        onDismiss={(index) => {
          setAdapterWarnings(prev => prev.filter((_, i) => i !== index));
        }}
        position="bottom"
      />
    </>
  );
}

/**
 * JSON-Driven Pages
 * 
 * Complete page stories using ONLY JSON configurations.
 * All pages are rendered through the JSON engine with schema validation.
 * 
 * **Critical Requirements:**
 * - ✅ NO JSX-based page layout (all JSON-driven)
 * - ✅ All rendering through renderPage()
 * - ✅ Real JSON configurations validated against schema
 * - ✅ Schema validation via validatePageConfig()
 * 
 * **Page Types:**
 * 1. **Dashboard**: Business metrics with sidebar and data grid
 * 2. **Employee Form**: Complete form-driven page with validation
 * 3. **Analytics Dashboard**: Data-heavy multi-grid dashboard
 * 4. **Settings**: Tabbed settings interface
 * 5. **List-Detail**: Master-detail layout pattern
 * 
 * **JSON Structure:**
 * ```json
 * {
 *   "version": "1.0.0",
 *   "title": "Page Title",
 *   "description": "Page description",
 *   "template": {
 *     "type": "DashboardLayout",
 *     "props": { ... },
 *     "slots": {
 *       "header": { "type": "HeaderComposite", ... },
 *       "main": { "type": "SearchGridComposite", ... }
 *     }
 *   }
 * }
 * ```
 * 
 * **Validation:**
 * All JSON configurations are validated against the Zod schema:
 * - Page structure validation
 * - Component type validation
 * - Props validation
 * - Slot content validation
 * 
 * **Testing:**
 * 1. Switch providers using the toolbar (MUI / Internal)
 * 2. Verify all pages render correctly
 * 3. Check that validation catches errors
 * 4. Confirm no JSX is used for layout (inspect stories)
 */

const meta = {
  title: 'JSON Pages/Complete Pages',
  component: PageRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# JSON-Driven Page Stories

This story collection demonstrates **100% JSON-driven page rendering** with zero JSX-based layouts.

## Constraints Enforced

✅ **No JSX-based page layout** - All pages defined in JSON  
✅ **All rendering through JSON engine** - Uses renderPage() exclusively  
✅ **Real JSON configs** - Actual .json files imported  
✅ **Schema validation** - Every config validated via Zod schema  

## Architecture

\`\`\`
JSON Config → Schema Validation → PageRenderer → React Components
\`\`\`

### Validation Flow

1. **Load JSON** from \`pages/examples/*.json\`
2. **Validate** against \`PageConfigSchema\` (Zod)
3. **Parse** template and slots
4. **Render** via \`PageRenderer\` component
5. **Adapt** to selected provider (MUI/Internal)

### Page Types

| Page | Type | Purpose |
|------|------|---------|
| Dashboard | Data Grid | Business metrics with SearchGrid |
| Employee Form | Form-Driven | Multi-section form with validation |
| Analytics | Data-Heavy | Multiple grids and tables |
| Settings | Tabbed | Multi-section settings interface |
| List-Detail | Master-Detail | Two-column layout pattern |

## JSON Structure

All pages follow this structure:

\`\`\`typescript
interface PageConfig {
  version: string;           // Schema version
  title: string;            // Page title
  description: string;      // Page description
  template: {
    type: TemplateKey;      // Template component
    props: object;          // Template props
    slots: {
      [key: string]: JsonNode;  // Slot content
    };
  };
}
\`\`\`

## Component Types Available

**Templates**: DashboardLayout, TwoColumnLayout, TabsLayout  
**Composites**: HeaderComposite, SidebarComposite, SearchGridComposite  
**Atomics**: Button, Input, Card, Table, Stack, etc.

## Provider Switching

Use the **UI Provider** toolbar to test with different implementations:
- **MUI**: Material-UI components
- **Internal**: Custom components (with MUI fallback)

All JSON configs work with both providers without modification.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Dashboard page with sidebar and employee grid.
 * 
 * **JSON Features:**
 * - DashboardLayout with 280px sidebar
 * - HeaderComposite with breadcrumbs
 * - SidebarComposite with nested navigation
 * - SearchGridComposite with employee data
 * - Search and pagination enabled
 * 
 * **Validation Status:** ✅ Schema validated
 * 
 * **Components Used:**
 * - Template: DashboardLayout
 * - Composites: HeaderComposite, SidebarComposite, SearchGridComposite
 */
export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Dashboard page demonstrating a complete business interface.

**JSON Config**: \`pages/examples/dashboard.json\`

**Key Features:**
- Sidebar navigation with badges
- Nested menu items with children
- Employee data grid with search
- Pagination controls
- Active item highlighting

**Schema Validation:**
\`\`\`typescript
const validation = validatePageConfig(dashboardConfig);
// ✅ validation.success === true
\`\`\`
        `,
      },
    },
  },
  render: () => {
    return <PageStoryWrapper config={dashboardConfig} />;
  },
};

/**
 * Employee form page - comprehensive form-driven interface.
 * 
 * **JSON Features:**
 * - Form layout without sidebar
 * - Multi-section form (Personal, Employment, Additional)
 * - Input, Select, DatePicker, Textarea, Checkbox components
 * - Responsive two-column layout for related fields
 * - Section dividers and headings
 * - Primary/Secondary action buttons
 * 
 * **Validation Status:** ✅ Schema validated
 * 
 * **Components Used:**
 * - Template: DashboardLayout (sidebar hidden)
 * - Composites: HeaderComposite
 * - Atomics: Card, Stack, Input, Select, DatePicker, Textarea, Checkbox, Button
 * - Layout: Container (max-width: md)
 */
export const EmployeeForm: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Complete form-driven page for employee registration.

**JSON Config**: \`pages/examples/employee-form.json\`

**Form Sections:**
1. **Personal Details**: Name, email, phone
2. **Employment Details**: Department, type, title, manager, salary
3. **Additional Information**: Notes, welcome email, account activation

**Form Elements:**
- Text inputs with validation (required, email, tel, number)
- Select dropdowns (department, employment type, manager)
- DatePicker for start date
- Textarea for notes
- Checkboxes for options
- Button group (submit + cancel)

**Layout:**
- Container with max-width: md for readability
- Stack for vertical spacing
- Responsive two-column layout for related fields
- Dividers between sections

**Schema Validation:**
\`\`\`typescript
const validation = validatePageConfig(employeeFormConfig);
// ✅ validation.success === true
\`\`\`

**No JSX Layout:**
All form structure defined in JSON, including:
- Field ordering
- Grouping (Stack direction: row)
- Spacing between elements
- Button placement
        `,
      },
    },
  },
  render: () => {
    return <PageStoryWrapper config={employeeFormConfig} />;
  },
};

/**
 * Analytics dashboard - data-heavy multi-grid interface.
 * 
 * **JSON Features:**
 * - Multiple SearchGridComposite instances
 * - Metric cards with statistics (4-column responsive grid)
 * - Recent orders grid (8 rows, search, filters)
 * - Top products table
 * - Traffic sources table
 * - User activity log grid
 * - Mixed layouts (Stack, Card, Table, SearchGridComposite)
 * 
 * **Validation Status:** ✅ Schema validated
 * 
 * **Components Used:**
 * - Template: DashboardLayout
 * - Composites: HeaderComposite, SidebarComposite, SearchGridComposite
 * - Atomics: Stack, Card, Text, Table
 * 
 * **Data Grids:**
 * 1. Recent Orders (SearchGrid with 8 rows)
 * 2. User Activity Log (SearchGrid with 6 rows)
 * 3. Top Products (Simple Table)
 * 4. Traffic Sources (Simple Table)
 */
export const AnalyticsDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Data-heavy analytics dashboard with multiple grids and metrics.

**JSON Config**: \`pages/examples/analytics-dashboard.json\`

**Dashboard Components:**

1. **Metric Cards (4 cards)**
   - Total Revenue: $124,567 (↑ 12.5%)
   - Active Users: 1,234 (↑ 8.2%)
   - Conversion Rate: 3.45% (↓ 0.3%)
   - Avg Order Value: $89.50 (↑ 5.1%)

2. **Recent Orders Grid (SearchGridComposite)**
   - 8 rows of order data
   - Columns: Order ID, Customer, Product, Amount, Status, Date
   - Search enabled
   - Status filter (Completed, Processing, Pending, Refunded)
   - Pagination: 5, 10, 25 per page

3. **Top Products Table**
   - 4 rows showing best sellers
   - Columns: Product, Sales

4. **Traffic Sources Table**
   - 4 rows showing visitor sources
   - Columns: Source, Visitors

5. **User Activity Log (SearchGridComposite)**
   - 6 rows of user interactions
   - Columns: Time, User, Action, Resource, Result
   - Search enabled
   - Pagination: 5, 10, 25 per page

**Layout Structure:**
\`\`\`
Stack (vertical)
├── Stack (horizontal) - Metric Cards
├── Card + SearchGrid - Recent Orders
├── Stack (horizontal)
│   ├── Card + Table - Top Products
│   └── Card + Table - Traffic Sources
└── Card + SearchGrid - Activity Log
\`\`\`

**Schema Validation:**
\`\`\`typescript
const validation = validatePageConfig(analyticsDashboardConfig);
// ✅ validation.success === true
\`\`\`

**100% JSON-Driven:**
- No hardcoded JSX for layout
- All grids defined in JSON
- All data inline in JSON config
- Layout spacing via Stack props
        `,
      },
    },
  },
  render: () => {
    return <PageStoryWrapper config={analyticsDashboardConfig} />;
  },
};

/**
 * Settings page with tabbed navigation.
 * 
 * **JSON Features:**
 * - TabsLayout template
 * - 4 tab panels (Profile, Account, Notifications, Security)
 * - HeaderComposite with breadcrumbs
 * - Card content in each tab
 * 
 * **Validation Status:** ✅ Schema validated
 * 
 * **Components Used:**
 * - Template: TabsLayout
 * - Composites: HeaderComposite
 * - Atomics: Card, Text
 */
export const Settings: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Settings interface with tabbed navigation.

**JSON Config**: \`pages/examples/settings.json\`

**Tabs:**
1. Profile - User profile information
2. Account - Account settings
3. Notifications - Notification preferences
4. Security - Security settings and 2FA

**Schema Validation:**
\`\`\`typescript
const validation = validatePageConfig(settingsConfig);
// ✅ validation.success === true
\`\`\`
        `,
      },
    },
  },
  render: () => {
    return <PageStoryWrapper config={settingsConfig} />;
  },
};

/**
 * List-detail view with two-column layout.
 * 
 * **JSON Features:**
 * - TwoColumnLayout template (30/70 split)
 * - SearchGridComposite in left column (list)
 * - Card in right column (detail view)
 * - Single selection mode
 * 
 * **Validation Status:** ✅ Schema validated
 * 
 * **Components Used:**
 * - Template: TwoColumnLayout
 * - Composites: HeaderComposite, SearchGridComposite
 * - Atomics: Card
 */
export const ListDetail: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Master-detail layout with list in left column and detail in right.

**JSON Config**: \`pages/examples/list-detail.json\`

**Layout:**
- Left column (30%): SearchGrid with items list
- Right column (70%): Detail view card
- Single selection mode for list

**Schema Validation:**
\`\`\`typescript
const validation = validatePageConfig(listDetailConfig);
// ✅ validation.success === true
\`\`\`
        `,
      },
    },
  },
  render: () => {
    return <PageStoryWrapper config={listDetailConfig} />;
  },
};

/**
 * Schema validation example - shows what happens with invalid JSON.
 * 
 * **Demonstrates:**
 * - Schema validation catches invalid template types
 * - Error messages show exactly what's wrong
 * - Validation prevents rendering of bad configs
 */
export const ValidationError: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates schema validation catching an invalid configuration.

**Invalid Config:**
\`\`\`json
{
  "version": "1.0.0",
  "title": "Invalid Page",
  "template": {
    "type": "NonExistentTemplate",  // ❌ Invalid template
    "props": {},
    "slots": {}
  }
}
\`\`\`

**Validation Result:**
\`\`\`typescript
const validation = validatePageConfig(invalidConfig);
// validation.success === false
// validation.errors contains detailed error info
\`\`\`

The validator will show:
- Path to the error (e.g., \`template.type\`)
- Error message (e.g., "Invalid template type")
- Available valid values
        `,
      },
    },
  },
  render: () => {
    const invalidConfig = {
      version: '1.0.0',
      title: 'Invalid Page',
      description: 'This config has validation errors',
      template: {
        type: 'NonExistentTemplate',
        props: {},
        slots: {},
      },
    };

    const validation = validatePageConfig(invalidConfig);
    const errors = validation.error ? parseZodErrors(validation.error) : [];

    return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ marginBottom: '16px' }}>Schema Validation Error Example</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          This story demonstrates what happens when a JSON config doesn't match the schema.
          Errors are displayed inline using <code>ValidationErrorDisplay</code>.
        </p>
        
        <ValidationErrorDisplay 
          errors={errors}
          title="JSON Schema Validation Failed"
        />
        
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p>
            <strong>Why validation failed:</strong> The template type "NonExistentTemplate" is
            not registered in the TemplateRegistry.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Valid template types:</strong> DashboardLayout, TwoColumnLayout, TabsLayout
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Minimal JSON page - simplest possible valid configuration.
 * 
 * **JSON Features:**
 * - DashboardLayout with sidebar hidden
 * - HeaderComposite
 * - Single Card with Text
 * 
 * **Validation Status:** ✅ Schema validated
 */
export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Minimal valid JSON page configuration.

**Config:**
\`\`\`json
{
  "version": "1.0.0",
  "title": "Minimal Page",
  "description": "Simplest valid config",
  "template": {
    "type": "DashboardLayout",
    "props": { "sidebarVisible": false },
    "slots": {
      "header": {
        "type": "HeaderComposite",
        "props": { "title": "Minimal Page" }
      },
      "main": {
        "type": "Card",
        "props": { "title": "Welcome" },
        "children": [
          {
            "type": "Text",
            "props": { "children": "Hello World" }
          }
        ]
      }
    }
  }
}
\`\`\`

Shows the minimum required structure for a valid page.
        `,
      },
    },
  },
  render: () => {
    const minimalConfig = {
      version: '1.0.0',
      title: 'Minimal Page',
      description: 'A minimal page with just a header',
      template: {
        type: 'DashboardLayout',
        props: {
          sidebarVisible: false,
        },
        slots: {
          header: {
            type: 'HeaderComposite',
            props: {
              title: 'Minimal Page',
              subtitle: 'This page has just a header and main content area.',
            },
          },
          main: {
            type: 'Card',
            props: {
              title: 'Welcome',
              padding: 'lg',
            },
            children: [
              {
                type: 'Text',
                props: {
                  children: 'This is a minimal page configuration with just a header and a card.',
                },
              },
            ],
          },
        },
      },
    } as PageConfig;

    return <PageStoryWrapper config={minimalConfig} />;
  },
};
