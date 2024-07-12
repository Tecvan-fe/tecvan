import { defineConfig } from 'vitepress'

const additionHeaders = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  process.env.NODE_ENV === 'production'
    ? [
        'script',
        {},
        `var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?d237f3fff63137976206d0b51375e273";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();`,
      ]
    : null,
].filter(r => !!r) as Parameters<typeof defineConfig>[0]['head'];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '范文杰的博客',
  srcDir: 'src',
  description: 'Everything about Tecvan',
  rewrites: {
    ':page?/index.md': ':page/',
  },
  head: additionHeaders,
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: 'assets/logo.jpg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '💪 Webpack 技术揭秘', link: '/webpack/1-how-webpack-works' },
      { text: '💼 通往工程化之路', link: '/fee/1-preface/' },
      { text: '🦀 关于我', link: '/about' },
    ],

    sidebar: [
      {
        text: '前端工程化',
        items: [
          { text: '序言', link: '/fee/1-preface/' },
          { text: '编码提效', link: '/fee/2-improve-coding-efficiency/' },
        ],
      },
      {
        text: 'Webpack 技术揭秘',
        items: [
          {
            text: '一文吃透 Webpack 核心原理',
            link: '/webpack/1-how-webpack-works',
          },
          {
            text: '插件架构深度讲解',
            link: '/webpack/2-deep-in-architecture',
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/tecvan-fe' }],
  },
});
