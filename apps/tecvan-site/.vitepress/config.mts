import { defineConfig } from 'vitepress'
import { type DefaultTheme } from 'vitepress/theme';
import { series } from './articles';

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
      ...series.map(r => ({
        text: `${r.icon} ${r.title}`,
        link: `/${r.subPath}/${r.children[0].subPath}/`,
      })),
      { text: '🦀 关于我', link: '/about/' },
      // { text: '💰 投币', link: 'https://afdian.net/a/tecvan' },
    ],

    sidebar: series.reduce((acc, { subPath }) => {
      return {
        ...acc,
        [`/${subPath}`]: series.map(r => {
          const node: DefaultTheme.SidebarItem = {
            text: `${r.icon} ${r.title}`,
          };
          if (r.subPath === subPath) {
            node.items = r.children.map(c => ({
              text: c.title,
              link: `/${r.subPath}/${c.subPath}/`,
            }));
          } else {
            node.link = `/${r.subPath}/${r.children[0].subPath}/`;
          }
          return node;
        }),
      };
    }, {}),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tecvan-fe' },
      { icon: 'twitter', link: 'https://x.com/tecvan_fe' },
    ],
  },
});
