import React from 'react';

export interface CssBaselineProps {
  children?: React.ReactNode;
  enableColorScheme?: boolean;
}

export const CssBaseline: React.FC<CssBaselineProps> = ({ children, enableColorScheme = false }) => {
  React.useEffect(() => {
    // Inject global styles
    const styleId = 'css-baseline-styles';
    
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          ${enableColorScheme ? 'color-scheme: light dark;' : ''}
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          line-height: 1.5;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: 600;
        }

        p {
          margin: 0;
        }

        button {
          font-family: inherit;
        }

        input,
        textarea,
        select {
          font-family: inherit;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [enableColorScheme]);

  return <>{children}</>;
};
