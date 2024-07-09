import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'About Tecvan',
  srcDir: 'src',
  description: 'Everything about Tecvan',
  rewrites: {
    ':page?/index.md': ':page/',
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '前端工程化系列', link: '/fee/1-preface/' },
      { text: '🦀 About Me', link: '/about' },
    ],

    sidebar: [
      {
        text: '前端工程化',
        items: [
          { text: '序言', link: '/fee/1-preface/' },
          { text: '编码提效', link: '/fee/2-improve-coding-efficiency/' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/tecvan-fe' }],
  },
});
