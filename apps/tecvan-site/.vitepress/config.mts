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
    ':page/.md': ':page',
  },
  sitemap: {
    hostname: 'https://tecvan.fun',
  },
  head: additionHeaders,
  markdown: {
    image: {
      // image lazy loading is disabled by default
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: '/logo.jpg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '💪 Webpack 技术揭秘', link: '/webpack/1-how-webpack-works' },
      { text: '💼 通往工程化之路', link: '/fee/1-preface' },
      { text: '👽 杂文', link: '/essay/1-better-resume' },
      { text: '🦀 关于我', link: '/about/' },
      { text: '💰 投币', link: 'https://afdian.net/a/tecvan' },
    ],

    sidebar: {
      '/essay': [
        { text: '💼 通往工程化之路', link: '/fee/1-preface/' },
        { text: '💪 Webpack 技术揭秘', link: '/webpack/1-how-webpack-works/' },
        {
          text: '👽 杂文',
          items: [
            { text: '如何写出有亮点的简历', link: '/essay/1-better-resume/' },
          ],
        },
      ],
      '/fee': [
        {
          text: '💼 通往工程化之路',
          items: [
            { text: '序言', link: '/fee/1-preface/' },
            { text: '编码提效', link: '/fee/2-improve-coding-efficiency/' },
          ],
        },
        { text: '💪 Webpack 技术揭秘', link: '/webpack/1-how-webpack-works/' },
        { text: '👽 杂文', link: '/essay/1-better-resume/' },
      ],
      '/webpack': [
        { text: '💼 通往工程化之路', link: '/fee/1-preface/' },
        {
          text: '💪 Webpack 技术揭秘',
          items: [
            {
              text: '一文吃透 Webpack 核心原理',
              link: '/webpack/1-how-webpack-works/',
            },
            {
              text: '插件架构深度讲解',
              link: '/webpack/2-deep-in-architecture/',
            },

            {
              text: 'module.issuer 属性详解',
              link: '/webpack/3-module-issuer/',
            },
            {
              text: '深度解析 Dependency Graph',
              link: '/webpack/4-dependencies-graph/',
            },
          ],
        },
        { text: '👽 杂文', link: '/essay/1-better-resume/' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tecvan-fe' },
      { icon: 'twitter', link: 'https://x.com/tecvan_fe' },
    ],
  },
});
