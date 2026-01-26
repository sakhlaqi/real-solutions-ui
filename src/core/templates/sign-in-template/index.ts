/**
 * Sign-in Template - Index
 */

export * from './meta';
export * from './theme';

import { signInTemplateMeta } from './meta';
import { signInTemplateTheme } from './theme';

export const signInTemplate = {
  ...signInTemplateMeta,
  metadata: {
    title: signInTemplateMeta.name,
    description: signInTemplateMeta.description,
  },
  theme: signInTemplateTheme,
  pages: {
    signIn: {
      title: 'Sign In',
      sections: {
        form: { id: 'sign-in-form', type: 'auth-form' },
      },
    },
    signUp: {
      title: 'Sign Up',
      sections: {
        form: { id: 'sign-up-form', type: 'auth-form' },
      },
    },
    forgot: {
      title: 'Forgot Password',
      sections: {
        form: { id: 'forgot-password-form', type: 'auth-form' },
      },
    },
  },
};

export default signInTemplate;
