/* 
 * Visual Regression Testing Utilities
 * 
 * Helpers for making stories deterministic and stable for visual regression testing.
 */

/**
 * Fixed Date Constants
 * Use these instead of new Date() for deterministic testing
 */
export const FIXED_DATES = {
  /** 2024-06-15 10:00:00 */
  NOW: new Date('2024-06-15T10:00:00'),
  
  /** 2024-06-15 09:00:00 */
  MORNING: new Date('2024-06-15T09:00:00'),
  
  /** 2024-06-15 14:30:00 */
  AFTERNOON: new Date('2024-06-15T14:30:00'),
  
  /** 2024-06-15 18:00:00 */
  EVENING: new Date('2024-06-15T18:00:00'),
  
  /** 2024-06-01 */
  START_OF_MONTH: new Date('2024-06-01'),
  
  /** 2024-06-30 */
  END_OF_MONTH: new Date('2024-06-30'),
  
  /** 2024-01-01 */
  START_OF_YEAR: new Date('2024-01-01'),
  
  /** 2024-07-20 (future date) */
  FUTURE: new Date('2024-07-20'),
  
  /** 2024-05-01 (past date) */
  PAST: new Date('2024-05-01'),
};

/**
 * Fixed Timestamps
 * Use these instead of Date.now() for deterministic testing
 */
export const FIXED_TIMESTAMPS = {
  /** 1718452800000 - 2024-06-15 10:00:00 */
  NOW: 1718452800000,
  
  /** 1718452801000 - 2024-06-15 10:00:01 (1 second later) */
  NOW_PLUS_1S: 1718452801000,
  
  /** 1718452860000 - 2024-06-15 10:01:00 (1 minute later) */
  NOW_PLUS_1M: 1718452860000,
  
  /** 1718456400000 - 2024-06-15 11:00:00 (1 hour later) */
  NOW_PLUS_1H: 1718456400000,
};

/**
 * Disable animations for visual regression testing
 * Add this to story decorators to disable CSS animations and transitions
 */
export const disableAnimations = (Story: any) => (
  <div
    style={{
      // Disable all CSS animations and transitions
      // @ts-ignore
      '--animation-duration': '0s',
      '--transition-duration': '0s',
    }}
    className="disable-animations"
  >
    <style>
      {`
        .disable-animations *,
        .disable-animations *::before,
        .disable-animations *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `}
    </style>
    <Story />
  </div>
);

/**
 * Mock data generator with fixed seed
 * Use this instead of random data generation
 */
export const mockData = {
  /** Fixed user data */
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Admin' },
  ],
  
  /** Fixed product data */
  products: [
    { id: 1, name: 'Laptop', price: 999.99, stock: 42, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29.99, stock: 156, category: 'Accessories' },
    { id: 3, name: 'Keyboard', price: 79.99, stock: 89, category: 'Accessories' },
    { id: 4, name: 'Monitor', price: 299.99, stock: 23, category: 'Electronics' },
    { id: 5, name: 'Headphones', price: 149.99, stock: 67, category: 'Audio' },
  ],
  
  /** Fixed task data */
  tasks: [
    { id: 1, title: 'Review pull request', completed: false, priority: 'high', dueDate: FIXED_DATES.FUTURE },
    { id: 2, title: 'Update documentation', completed: true, priority: 'medium', dueDate: FIXED_DATES.PAST },
    { id: 3, title: 'Fix bug #234', completed: false, priority: 'high', dueDate: FIXED_DATES.NOW },
    { id: 4, title: 'Refactor auth module', completed: false, priority: 'low', dueDate: FIXED_DATES.FUTURE },
    { id: 5, title: 'Write unit tests', completed: true, priority: 'medium', dueDate: FIXED_DATES.PAST },
  ],
  
  /** Fixed metrics data */
  metrics: {
    totalUsers: 1234,
    activeUsers: 856,
    revenue: 56789,
    growth: 12.5,
    satisfaction: 4.7,
  },
  
  /** Fixed chart data */
  chartData: [
    { month: 'Jan', value: 4200 },
    { month: 'Feb', value: 5100 },
    { month: 'Mar', value: 4800 },
    { month: 'Apr', value: 6300 },
    { month: 'May', value: 7100 },
    { month: 'Jun', value: 6800 },
  ],
};

/**
 * Deterministic ID generator
 * Use this instead of UUID or random ID generation
 */
let idCounter = 1;
export const generateDeterministicId = (prefix = 'item'): string => {
  return `${prefix}-${idCounter++}`;
};

/**
 * Reset ID counter (useful for test isolation)
 */
export const resetIdCounter = (): void => {
  idCounter = 1;
};

/**
 * Wait for all images to load
 * Use in stories with images for stable screenshots
 */
export const waitForImages = async (container: HTMLElement): Promise<void> => {
  const images = container.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve; // Resolve even on error
    });
  });
  await Promise.all(promises);
};

/**
 * Wait for fonts to load
 * Use in stories for stable text rendering
 */
export const waitForFonts = async (): Promise<void> => {
  if (document.fonts) {
    await document.fonts.ready;
  }
};

/**
 * Viewport sizes for responsive testing
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  wide: { width: 1920, height: 1080 },
};
