/**
 * Typography Adapter Usage Examples
 * 
 * The Typography adapter provides a unified API that works across
 * internal, Material-UI, and Radix UI implementations.
 */

import { Typography } from '@sakhlaqi/ui';

// Example 1: Headings
export const HeadingExample = () => (
  <div>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
  </div>
);

// Example 2: Body Text
export const BodyTextExample = () => (
  <div>
    <Typography variant="body1">
      This is body1 text. It's the default variant for regular paragraph text.
    </Typography>
    <Typography variant="body2">
      This is body2 text. It's slightly smaller than body1.
    </Typography>
  </div>
);

// Example 3: Text Alignment
export const AlignmentExample = () => (
  <div>
    <Typography align="left">Left aligned text</Typography>
    <Typography align="center">Center aligned text</Typography>
    <Typography align="right">Right aligned text</Typography>
    <Typography align="justify">
      Justified text will distribute space between words to make both edges line up.
    </Typography>
  </div>
);

// Example 4: Colors
export const ColorExample = () => (
  <div>
    <Typography color="primary">Primary color text</Typography>
    <Typography color="secondary">Secondary color text</Typography>
    <Typography color="error">Error color text</Typography>
    <Typography color="success">Success color text</Typography>
    <Typography color="textSecondary">Secondary text color</Typography>
  </div>
);

// Example 5: Additional Variants
export const VariantsExample = () => (
  <div>
    <Typography variant="caption">Caption text - for small annotations</Typography>
    <Typography variant="button">BUTTON TEXT</Typography>
    <Typography variant="overline">Overline text</Typography>
  </div>
);

// Example 6: Utility Props
export const UtilityExample = () => (
  <div>
    <Typography gutterBottom>
      This paragraph has gutter (bottom margin) for spacing.
    </Typography>
    
    <Typography noWrap className="w-[200px]">
      This is a very long text that will be truncated with ellipsis when it overflows
    </Typography>
  </div>
);

// Example 7: Complete Example
export const CompleteExample = () => (
  <article>
    <Typography variant="h1" gutterBottom>
      Article Title
    </Typography>
    
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Published on January 16, 2026 by John Doe
    </Typography>
    
    <Typography variant="body1" gutterBottom>
      This is the introduction paragraph of the article. It provides an overview
      of what the reader can expect to learn from reading this content.
    </Typography>
    
    <Typography variant="h2" gutterBottom>
      Section Heading
    </Typography>
    
    <Typography variant="body1" gutterBottom>
      This is the main content section. The Typography component automatically
      adapts to use the implementation specified in the UIProvider context.
    </Typography>
    
    <Typography variant="caption" color="textSecondary">
      * This is a footnote or caption explaining additional details
    </Typography>
  </article>
);
