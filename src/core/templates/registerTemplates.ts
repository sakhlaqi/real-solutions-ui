/**
 * Register Website Templates
 * 
 * Registers all converted MUI templates with the WebsiteTemplateRegistry
 */

import { WebsiteTemplateRegistry } from '../registry/WebsiteTemplateRegistry';
import { marketingPageMeta, marketingPageTheme } from './marketing-page';
import { landingPageMeta, landingPageTheme } from './landing-page';
import { blogTemplateMeta, blogTemplateTheme } from './blog-template';
import { signInTemplateMeta, signInTemplateTheme } from './sign-in-template';

// Import page definitions - Marketing
import marketingHomePage from './marketing-page/pages/home.json';
import marketingPricingPage from './marketing-page/pages/pricing.json';
import marketingNav from './marketing-page/navigation.json';

// Import page definitions - Landing
import landingHomePage from './landing-page/pages/home.json';
import landingNav from './landing-page/navigation.json';

// Import page definitions - Blog
import blogHomePage from './blog-template/pages/home.json';
import blogArticlePage from './blog-template/pages/article.json';
import blogNav from './blog-template/navigation.json';

// Import page definitions - Sign In
import signInPage from './sign-in-template/pages/sign-in.json';
import signUpPage from './sign-in-template/pages/sign-up.json';
import forgotPasswordPage from './sign-in-template/pages/forgot-password.json';
import signInNav from './sign-in-template/navigation.json';

/**
 * Register Marketing Page Template
 */
export function registerMarketingPageTemplate() {
  WebsiteTemplateRegistry.register({
    metadata: {
      id: marketingPageMeta.id,
      name: marketingPageMeta.name,
      description: marketingPageMeta.description,
      version: marketingPageMeta.version,
      category: marketingPageMeta.category,
      tags: marketingPageMeta.tags,
      author: marketingPageMeta.author,
      previewImage: marketingPageMeta.thumbnail,
    },
    status: 'active',
    content: {
      pages: [
        {
          id: 'home',
          path: '/',
          title: marketingHomePage.title,
          layout: marketingHomePage.layout.type,
          sections: marketingHomePage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: marketingHomePage.description,
          },
        },
        {
          id: 'pricing',
          path: '/pricing',
          title: marketingPricingPage.title,
          layout: marketingPricingPage.layout.type,
          sections: marketingPricingPage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: marketingPricingPage.description,
          },
        },
      ],
      
      // Navigation
      navigation: {
        links: marketingNav.structure.header.links.map((link: any) => ({
          label: link.label,
          path: link.href,
        })),
        logo: {
          text: marketingNav.structure.header.logo.text,
          link: marketingNav.structure.header.logo.href,
        },
        cta: (() => {
          const ctaAction = marketingNav.structure.header.actions.find((a: any) => a.variant === 'contained');
          return ctaAction ? {
            label: ctaAction.label,
            path: ctaAction.href,
          } : undefined;
        })(),
      },
    },
  });
}

/**
 * Register Landing Page Template
 */
export function registerLandingPageTemplate() {
  WebsiteTemplateRegistry.register({
    metadata: {
      id: landingPageMeta.id,
      name: landingPageMeta.name,
      description: landingPageMeta.description,
      version: landingPageMeta.version,
      category: landingPageMeta.category,
      tags: landingPageMeta.tags,
      author: landingPageMeta.author,
    },
    status: 'active',
    content: {
      pages: [
        {
          id: 'home',
          path: '/',
          title: landingHomePage.title,
          layout: landingHomePage.layout.type,
          sections: landingHomePage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: landingHomePage.description,
          },
        },
      ],
      
      // Navigation
      navigation: {
        links: landingNav.structure.header.links.map((link: any) => ({
          label: link.label,
          path: link.href,
        })),
        logo: {
          text: landingNav.structure.header.logo.text,
          link: landingNav.structure.header.logo.href,
        },
        cta: landingNav.structure.header.actions[0] ? {
          label: landingNav.structure.header.actions[0].label,
          path: landingNav.structure.header.actions[0].href,
        } : undefined,
      },
    },
  });
}

/**
 * Register all MUI templates
 */
export function registerAllMUITemplates() {
  registerMarketingPageTemplate();
  registerLandingPageTemplate();
  registerBlogTemplate();
  registerSignInTemplate();
  
  console.log('✅ All MUI templates registered successfully');
}

/**
 * Register Blog Template
 */
export function registerBlogTemplate() {
  WebsiteTemplateRegistry.register({
    metadata: {
      id: blogTemplateMeta.id,
      name: blogTemplateMeta.name,
      description: blogTemplateMeta.description,
      version: blogTemplateMeta.version,
      category: blogTemplateMeta.category,
      tags: blogTemplateMeta.tags,
      author: blogTemplateMeta.author,
      previewImage: blogTemplateMeta.previewImage,
    },
    status: 'active',
    content: {
      pages: [
        {
          id: 'home',
          path: '/',
          title: blogHomePage.title,
          layout: blogHomePage.layout.type,
          sections: blogHomePage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: blogHomePage.description,
          },
        },
        {
          id: 'article',
          path: '/article/:slug',
          title: blogArticlePage.title,
          layout: blogArticlePage.layout.type,
          sections: blogArticlePage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: blogArticlePage.description,
          },
        },
      ],
      navigation: {
        links: blogNav.structure.header.links.map((link: any) => ({
          label: link.label,
          path: link.href,
        })),
        logo: {
          text: blogNav.structure.header.logo.text,
          link: blogNav.structure.header.logo.href,
        },
        cta: (() => {
          const ctaAction = blogNav.structure.header.actions.find((a: any) => a.variant === 'contained');
          return ctaAction ? {
            label: ctaAction.label,
            path: ctaAction.href,
          } : undefined;
        })(),
      },
    },
  });
}

/**
 * Register Sign In Template
 */
export function registerSignInTemplate() {
  WebsiteTemplateRegistry.register({
    metadata: {
      id: signInTemplateMeta.id,
      name: signInTemplateMeta.name,
      description: signInTemplateMeta.description,
      version: signInTemplateMeta.version,
      category: signInTemplateMeta.category,
      tags: signInTemplateMeta.tags,
      author: signInTemplateMeta.author,
      previewImage: signInTemplateMeta.previewImage,
    },
    status: 'active',
    content: {
      pages: [
        {
          id: 'sign-in',
          path: '/sign-in',
          title: signInPage.title,
          layout: signInPage.layout.type,
          sections: signInPage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: signInPage.description,
          },
        },
        {
          id: 'sign-up',
          path: '/sign-up',
          title: signUpPage.title,
          layout: signUpPage.layout.type,
          sections: signUpPage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: signUpPage.description,
          },
        },
        {
          id: 'forgot-password',
          path: '/forgot-password',
          title: forgotPasswordPage.title,
          layout: forgotPasswordPage.layout.type,
          sections: forgotPasswordPage.sections.map((section: any) => ({
            sectionId: section.type,
            props: section.props,
          })),
          meta: {
            description: forgotPasswordPage.description,
          },
        },
      ],
      navigation: {
        links: signInNav.structure.header.links.map((link: any) => ({
          label: link.label,
          path: link.href,
        })),
        logo: {
          text: signInNav.structure.header.logo.text,
          link: signInNav.structure.header.logo.href,
        },
      },
    },
  });
}

// Auto-register on import
registerAllMUITemplates();

export default {
  registerMarketingPageTemplate,
  registerLandingPageTemplate,
  registerAllMUITemplates,
};
