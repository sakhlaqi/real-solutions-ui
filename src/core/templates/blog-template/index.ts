/**
 * Blog Template - Index
 */

export * from './meta';
export * from './theme';

import { blogTemplateMeta } from './meta';
import { blogTemplateTheme } from './theme';

export const blogTemplate = {
  ...blogTemplateMeta,
  metadata: {
    title: blogTemplateMeta.name,
    description: blogTemplateMeta.description,
  },
  theme: blogTemplateTheme,
  pages: {
    home: {
      title: 'Home',
      sections: {
        hero: { id: 'hero', type: 'hero' },
        featured: { id: 'featured', type: 'featured-posts' },
        recent: { id: 'recent', type: 'recent-posts' },
      },
    },
    post: {
      title: 'Post',
      sections: {
        article: { id: 'article', type: 'article' },
        comments: { id: 'comments', type: 'comments' },
      },
    },
  },
};

export default blogTemplate;
