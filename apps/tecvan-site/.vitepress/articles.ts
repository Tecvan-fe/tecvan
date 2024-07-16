interface SeriesDefinition {
  title: string;
  subPath: string;
  icon: string;
  children: { title: string; subPath: string }[];
}

export const series: SeriesDefinition[] = [
  {
    title: '通往工程化之路',
    subPath: 'fee',
    icon: '💼',
    children: [
      { title: '序言', subPath: '1-preface' },
      { title: '编码提效', subPath: '2-improve-coding-efficiency' },
    ],
  },
  {
    title: 'Webpack 技术揭秘',
    icon: '💪',
    subPath: 'webpack',
    children: [
      {
        title: '一文吃透 Webpack 核心原理',
        subPath: '1-how-webpack-works',
      },
      {
        title: '插件架构深度讲解',
        subPath: '2-deep-in-architecture',
      },

      {
        title: 'module.issuer 属性详解',
        subPath: '3-module-issuer',
      },
      {
        title: '深度解析 Dependency Graph',
        subPath: '4-dependencies-graph',
      },
    ],
  },
  {
    title: '杂文',
    icon: '👽',
    subPath: 'essay',
    children: [{ title: '如何写出有亮点的简历', subPath: '1-better-resume' }],
  },
];
