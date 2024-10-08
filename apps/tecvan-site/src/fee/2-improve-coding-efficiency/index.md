---
title: 前端工程化系列二：编码提效
---

# 前端工程化系列二：编码提效

**编码** 是软件工程全生命周期中最最关键的环节，不幸的是，这同时也是最复杂最容易出问题的环节。编码是一种非常复杂抽象的脑力活动，开发者之间受技能、熟练度、经验、习惯、偏好等影响往往会呈现出较大的效率差异，这是普遍存在的客观事实，但站在工程化管理视角，我们**需要设法尽可能克服这些差异，使得团队每一个个体都有较为稳定的编码产出**；**需要保证不同个体产出的代码集成后，系统各部件依然能如预期地正常运行**；同时，**需要确保不同个体尽可能克服各自的偏好而编写出风格相对一致的代码，以维持长期可读与可维护性**。

显然，原生的 Web 核心语言 —— JS、CSS、HTML 等都难以满足上述诉求的，现代的前端工程通常会在原生语言基础上叠加一些工具、框架，组合出更具约束力、表现力的开发环境，进而保证多人协作时的工程效率、一致性、健壮、可维护性等。

![](assets/2024-07-09-12-55-22.png)

## 1. Javascript

以 Javascript 为例，语言本身的动态解释特性虽然使其整体灵活性更高也更容易学习，但却完全丧失了静态阶段的类型检查能力，**许多基础的编码问题需要一直延迟到动态执行阶段才会被暴露**，致使应用稳定性下降，后续的测试、调试、定位问题的成本均有所增加，这在大型工程项目中是难以接受的。

为此，在现代前端工程中通常会在 JS 基础上叠加一些类型约束方案 —— 例如 Typescript、Flow 等，以实现在编码或构建阶段提前抛出类型兼容问题，虽然这会相应增加学习维护成本，但必要的类型约束确实能更早地暴露出接口兼容问题 —— 设想我们无意间改动了某大型项目的某个底层方法的方法签名，在纯 Javascript 环境中很难识别出这会对那些上层依赖造成破坏性更新，而 Typescript 环境下这会导致类型不兼容而提前报错，从而实现**质检环节“左移”**效果。

> PS: 以笔者的经验，虽然网络上流传着许多关于 Typescript 的负面论调，例如过度约束、上手成本高、弱化代码表现力等，但在新工具出现之前，Typescript 依然是实现类型约束的最优解之一。

---

类似的，原生 Javascript 还面临严重的版本碎片化导致的**兼容性问题**。自 2015 年以来，W3C 组织保持着每年一个版本的速度，持续迭代着 ECMAScript 规范，极大提升了语言的活力，但问题在于，并不是所有浏览器厂商都有意愿或能力步步紧跟 ECMAScript 的更新；加之对于浏览器的终端用户而言，也并没有义务必须时刻更新到浏览器最新版本。最终导致 Web 应用的执行环境可能比预想的要复杂且“割裂”，一些 ECMAScript 承诺的语法特性在某些环境下可能无法正常执行 —— 也就是所谓的兼容性问题。

在没有辅助工具加持的情况下，这会导致编写代码时总需要花费额外的时间精力“人工”确认某些新语言特性在目标浏览器上是否能够正常运行，这明显是一种非常低效的处理方式！为此，我们可以使用一些语法工具(如 Babel)，**自动将高版本语法等价转换为相应的低版本语法实现**，向下获得更宽广的兼容范围，例如：

![](assets/2024-07-09-13-00-37.png)

图例右侧是经过 Babel 转换生成的代码，可以看出已经去除了箭头函数、字符串模板之类的 ES6 特性，等价转换为兼容性更佳的 ES5 版本。这种方式只需投入少量的时间搭建好工具运行环境，就能标准化、自动化地处理好语法降级转换，对开发者而言不再需要关注具体规则的兼容情况，能够毫无负担地始终以较高版本的语法更优雅、高效的编写代码。

除语法层面的兼容性冲突外，还有一个值得注意的历史遗留问题：**混乱的模块化方案**。当下 ECMAScript 已经提供了标准的 ES Module 方案，代码表现上更规格工整，其静态特性也使得更容易对代码做静态扫描分析(如 Tree-Shaking)，能一定程度上降低开发时的心智负担，提升效率。但因诸多历史原因 —— 包括 JS 引擎版本碎片化引发的兼容问题，多数时候我们无法直接交付 ESM 产物，转而降级为 CMD、AMD、UMD 等形态的非标准方案。

因此在前端工程中通常会引入一些编译工具 —— 例如被大众熟知的 Webpack、RSPack、Vite、ESBuild 等，将源码及三方依赖代码等价编译为更适合分发的另一种模块形态，常见案例如借助 Webpack 将 ESM 形态的 Web 应用代码打包(Bundle)成类 CMD 形态的产物文件再分发到用户的浏览器上执行。

> PS: Web 技术并不是被某个特定组织线性规划出来的，而是在社区通力协作下逐步被迭代出来的，这种方式有极强的生命力与灵活性，但副作用则是许多问题的解决方案做不到一步到位，很可能伴随着一些中间过渡态，许多工程化工具的设计初衷就是为了减缓这些中间混乱局面引发的效率损耗。

---

除上述兼容性、健壮性外，在工程管理视角还有一个值得注意的问题：**一致性** —— 包括架构、技术方案、编码风格方方面面的一致性。这并不是 Javascript 独有的，而是所有技术栈的软件工程团队都必须面对且设法克服的基础管理课题，问题的主因在于“人”的随机性，在面对同样的开发需求时，不同人甚至同一个人的不同时间都可能产出不同风格的代码，虽然这些代码可能最终能正常工作并满足此刻的功能诉求，但在团队开发时，多种风格并存必然会导致整体杂乱无序甚至相互冲突，大大降低可读性，增加理解成本。若不及时加以管控，随项目的功能迭代与人员更替，工程复杂度会逐渐失控并在到达临界点时彻底丧失可维护性。因此，有必要时刻花费一些时间精力保持工程整体一致性 —— 大到架构设计，小到具体代码行。

不幸的是，虽然“架构”与“技术方案”对工程质量至关重要，但社区目前依然缺少置信的工具能够量化、自动化评估具体方案是否与现存方案保持一致，依然需要借助**抽象**的“规范”实现有限度约束，这部分规范对于开发者而言，需要花费不少心智去沟通、理解规范的内容；对于监督者(如果有)而言，需要在编码之外花费额外成本理解产出代码，判断是否与现行规范相悖。两个视角的执行成本都比较高，“人”天然的随机性与惰性注定了这部分停留在“抽象”思维层面的规范，很难被严格、有效地执行，多数时候只能依赖于工程师团队的专业度与职业素养。

幸运的是，我们至少可以借助 ESLint 等工具实现编码风格的一致性约束。以 ESLint 为例，其基本原理是在将字符串形态的代码转换成 AST 结构，再借助 AST 逐一分析给定代码是否满足预设规则，以此实现**语法层面**的静态分析进而形成自动化的规则约束。借助这一类工具，我们可以轻易地将部分团队中约定好的各类规范**具象**为一条条自动化规则，开发者无需过多关注“规范”定下的繁文缛节，只需时刻遵守工具约束，不触发报错即可，最终能够以极低的成本实现一致性强约束。

> PS: 站在工程管理视角，我们期望所有需要重复执行的事情都能被工具化、自动化，这可以降低工程师在重复事项上的效率损耗并产出更稳定可靠的结果。但客观来说工具是有能力边界的，总有一些问题无法仅仅通过编码解决，或者投入到工具建设的投入与产出不成正比，此时我们需要退而求助于别的管理工具，例如规范、文化、流程等。

## 2. CSS

与 Javascript 类似，CSS 也因浏览器版本碎片化而存在严重的**兼容性问题**，但解题思路要麻烦许多。Javascript 多数是语法与运行时接口的兼容问题，基本都能找到固定规则将高版本语法、接口一一映射到低版本实现(有时需要追加 polyfill)，问题域与解题域都是可收敛的，所以容易编写工具自动化执行。CSS 的情况则复杂许多，虽然基本语法变化不大，但某些属性、属性值可能还未被部分浏览器版本支持；甚至各家浏览器对 CSS 规范的理解不同，导致最终实现出来的样式效果存在细微差异，举几个例子：

- **盒模型不一致**：在 IE 浏览器中，盒模型的宽度和高度包含了边框，而标准盒模型则是内容的宽度和高度；
- **不支持渐变(Gradient)效果**：IE9 及以下版本不支持 CSS 渐变效果，需要使用滤镜（Filter）作为降级方案，但 Filter 与 Gradient 效果并不完全对齐，有时候需要用复杂的 Javascript 代替实现；
- **Flexbox 的最小内容尺寸**：这是一个规范中的概念，默认情况下，Flex 项目不能比它的内容更小，但在 Chrome 和 Safari 中，这一规则不被充分遵守，这可能会导致内容溢出容器；
- **滚动行为**：Safari 并不支持 `scroll-behavior: smooth`; 这个 CSS 属性，如果需要平滑滚动效果，可能需要通过 JavaScript 来实现；
- **-webkit-mask-image**：Safari 对于 `-webkit-mask-image` 这个 CSS 属性的处理方式和其他浏览器有所不同，可能导致遮罩效果在 Safari 上的效果和预期不同。

问题粒度细致到具体的属性、属性值，非常分散且随机，很难被收敛到有限的解决方案中，因此目前社区还没有权威工具能自动化解决所有 CSS 兼容性问题，多数时候还是需要工程师手动解决，效率较低。不过，退而求其次，有不少工具能“部分”解决兼容性问题，例如 [autoprefixer](https://github.com/postcss/autoprefixer)，它的解题思路是扫描 CSS 代码，对部分较新版本的属性、属性值追加浏览器前缀并修复语法差异，看个实例：

- 源码：

```css
a {
  background: linear-gradient(to top, black, white);
  display: flex;
}
```

- 编译结果：

```css
a {
  background: -webkit-linear-gradient(bottom, black, white);
  background: linear-gradient(to top, black, white);
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
```

但这种方式的效果是比较有限的，对于部分老版本浏览器即使追加了前缀也不能正常执行，为此还可以继续叠加兼容性检测工具 —— 如 [caniuse](https://www.npmjs.com/package/caniuse) ，用于细致检测某个规则在某个特定版本浏览器上的支持情况，辅助开发者判断是否需要做更多兼容性处理。

> PS: 务必谨记，上述工具都只能“部分”解决兼容性问题， 许多场景(例如不同浏览器厂商在具体实现上的细微差异)依然需要人工介入解决。

---

除兼容性外，CSS 还面临非常严重的“**可复用性**”问题。CSS 语言的精髓在于“层叠”，也就是基于选择器规则，在规则 A 基础上继续追加 B、C、D 规则，最终 A/B/C/D 规则按选择器的权重顺序组合成最终的样式规则集应用到 HTML 元素上，重在“组合”而不是“复用”！因而 CSS 语言本身并没有提供必要的代码复用方案，直观的说，对于已经定义在某个选择器下的规则，我们无法将其复用到其他选择器上。

对此，社区已经推出了许多解决方案，包括：`Less`、`Sass`、`Stylus` 等方言，它们的解题思路是在 CSS 基础上定义一层超集 —— **类似于 Typescript 之于 Javascript**，在超集中扩展支持嵌套、复用、混入等语法，以 Less 为例：

- Less 代码：

```css
.vbg-gradient(@fc: #FFF, @tc: #CCC) {
  background: @fc;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(@fc),
    to(@tc)
  );
  background: -moz-linear-gradient(top, @fc, @tc);
  background: linear-gradient(top, @fc, @tc);
}
.button {
  .vbg-gradient(#33a, #55c);
}

.modal {
  .vbg-gradient(#fff, #ddd);
}
```

- 编译结果：

```css
.button {
  background: #3333aa;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#3333aa),
    to(#5555cc)
  );
  background: -moz-linear-gradient(top, #3333aa, #5555cc);
  background: linear-gradient(top, #3333aa, #5555cc);
}
.modal {
  background: #ffffff;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ffffff),
    to(#dddddd)
  );
  background: -moz-linear-gradient(top, #ffffff, #dddddd);
  background: linear-gradient(top, #ffffff, #dddddd);
}
```

示例通过 `.vbg-gradient` 预定义了从 `@fc` 到 `@tc` 参数的渐变样式，之后如同 Javascript 中调用函数一般，在各处消费 `.vbg-gradient` 扩展，生成对应样式规则，这在当前版本的原生 CSS 中是根本不可能做到。

当然，Less 等工具并不只是解决了复用性问题，它们设计初衷就是全方位补齐 CSS 语言本身各方面的缺陷，例如我们可以借此为项目预设一套基础样式工具 —— 如同 Javascript 中的基础库，之后在工程的不同位置适当消费这些样式工具，使得样式代码更可读、可维护、可复用，甚至更健壮。

此外，社区中还存在另一种解题思路：**原子 CSS**，其理念是由工具预设海量原子样式类，每一个类只负责单一样式特性 —— 例如文字颜色、背景颜色、边距等，之后在具体场景中如同搭积木一般反复组合使用这些原子类实现样式效果。这种思路虽然放弃了 CSS 中的层叠和灵活性，但却能在 HTML 代码中直观感知到每一个元素的样式配置，避免选择器优先级引发的样式混乱问题，同时每个原子类都可以被不限次数消费复用，不必重复编写各种样式规则。以 [Tailwind](https://tailwindcss.com/) 为例：

- 源码：

```html
<div class="text-center bg-blue-400 p-3 m-2 rounded-full w-64">
  Hello, Tailwind CSS!
</div>
```

- 编译产物：

```html
<div class="_23er463 text-center bg-blue-400 p-3 m-2 rounded-full w64-">
  Hello, Tailwind CSS!
</div>

<style>
  ._23er463 {
    text-align: center;
    background-color: #60a5fa;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 9999px;
    width: 16rem;
  }
</style>
```

基于这种思路，极致情况下我们甚至不需要编写任何 CSS 代码，只需组合复用 [Tailwind](https://tailwindcss.com/) 提供的各类 Class 工具即可组装出预期效果。

除预编译器、原子 CSS 外，社区还流行另一种方案：**CSS-in-JS**，通俗理解就是以 JS 方式编写 CSS，其理念是：既然 CSS 语言在模块化、复用性方面表现得非常弱，那就干脆“抛弃”CSS，转而借用 Javascript 语言描述样式代码，之后借助各类编译工具将 Javascript 代码转移为可正常执行的 CSS 代码，典型代表如 **Style-components**：

- 源码：

```jsx
import styled from 'styled-components'
const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  &:hover {
    background-color: darkblue;
  }
`
// 在组件中使用
<Button>Click Me</Button>
```

- 执行结果：

```jsx
<!-- HTML -->
<button class="Button-sc-1xa3k7-0">Click Me</button>

/* CSS */
.Button-sc-1xa3k7-0 {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
}
.Button-sc-1xa3k7-0:hover {
  background-color: darkblue;
}
```

这种方式能够充分复用 Javascript 语言本身的数值计算、逻辑运算、参数传递、模块化等能力，从而能以更符合“编程”思维习惯的方式编写出更易于管理与复用的样式代码。

当然，上述方案都不是银弹，预编译器虽然增强了语法特性，但在大型项目中依然难以管理容易出现混乱，且无法对样式代码做有效的“Tree-shaking”优化；原子 CSS 虽然灵活，但太过于零碎具象，理解成本较高，不利于长期维护；CSS-in-JS 虽然借助 Javascript 语言达到空前的灵活度，但它终究是运行时方案，有一定性能损耗。以我个人经验而言，更推荐综合多种方案搭配出最佳效果，例如可以借助预编译器搭建页面主框架代码 —— 例如布局，之后借助原子 CSS 处理样式细节，借助 CSS-in-JS 实现更内聚的功能组件等。

---

由于缺乏模块化能力，原生 CSS 还面临另一个问题：**样式的互相覆盖污染**，现代前端工程通常很复杂，动辄出现几十上百份样式文件，基于 CSS 的层叠规则，最终的样式效果取决于文件导入页面的顺序，非常容易出现 Class 名相同导致样式互相覆盖的情况，在使用 `node_module` 包时，这种问题会愈加严重。对此，社区也给出了许多解决方案。

首先是 **CSS Modules**，其核心理念是将 CSS 文件当做“模块”来导入和使用，在构建时借助 Webpack 等工具为样式自动添加哈希前缀，通过特性化的“随机”类名实现样式隔离，举个例子：

- 源码：

```jsx
// Component.module.css
.wrapper { color: red; }

// xxx.tsx
import styles from './Component.module.css';

function Component() {
  return <div className={styles.wrapper}>Hello World</div>;
}
```

- 编译后：

```jsx
// Component.module.css
._23_aKvs-b8bW2Vg3fwHozO { color: red; }

// xxx.js
function Component() {
  return <div className="_23_aKvs-b8bW2Vg3fwHozO">Hello World</div>;
}
```

其次，还有一种过去曾十分流行的解决方案 —— **BEM 命名法**，其解题思路是通过限定命名规则 —— 如 `.block__element--modifier` 格式约束类型名称，降低类型冲突的可能性，但这本质上依然是一种人为约束，项目增长到一定程度后依然有较大的冲突风险。

此外，对于 Vue 项目还可以借助 `Scoped CSS` 技术实现样式隔离，其理念与上述 **CSS Modules** 类似，借助编译工具按 Vue 文件为单位为每一个选择器生成唯一限定符，实现组件级别的样式隔离，例如：

- 源码：

```html
<template>
  <div class="example">Hello world</div>
</template>

<style scoped>
  .example {
    color: red;
  }
</style>
```

- 编译结果：

```html
<div class="example" data-v-21e5b78>Hello world</div>

.example[data-v-21e5b78] { color: red; }
```

而对于 React 项目，则可以借助诸多 **CSS-in-JS** 工具实现样式隔离，效果不一而足。

---

最后，与 Javascript 类似，CSS 也同样面临**风格一致性问题**，以及由此引发的可读性、可维护性差等一系列衍生问题，例如：

```css
.example {
  color: red;
  font-size: 12px;
}

// vs
.example {
  font-size: 12px;
  color: red;
}
```

两者虽书写顺序不同，但执行效果完全一致，对于小型项目无论谁前谁后效果差异不大，但放在大型项目则容易导致阅读理解成本增高。为此，社区提供了与 `eslint` 类似的 `style-lint` 工具用于检测样式代码问题并给予修复。

## 3. HTML

作为 Web 语言的重要组成部分之一，HTML 主要用于以类 XML 的结构化语法表述页面“内容” —— 包括文本、图片、视频、链接等元素，问题在于语言本身相对静态且过于“描述性”，侧重于“声明”内容而无法响应变化，必须借助 Javascript 语言才能实现页面的动态效果 —— 如表单验证、内容更新等，但基于 DOM 规范所提供 HTML 文档接口实在过于晦涩难懂(个人感觉，设计的过于教条化了)，例如，为了插入一个元素：

```js
// 创建新的 div 元素
const newDiv = document.createElement('div')
// 给 div 设置文本内容
newDiv.textContent = '这是一个新的 div 元素！'
// 找到这个新元素的父节点
const parentDiv = document.querySelector('.parentDiv')
// 把新的元素插到页面上
parentDiv.appendChild(newDiv)
```

其次，DOM 接口同样面临严重的兼容性问题，例如上例中的 `querySelector` 接口许多低版本浏览器中无法正常执行，为此需要进一步扩展示例：

```js
// 创建新的 div 元素
const newDiv = document.createElement('div')
// 给 div 设置文本内容
newDiv.textContent = '这是一个新的 div 元素！'
let parentDiv
// 如果浏览器支持 `querySelector`，我们优先使用
if (document.querySelector) {
  parentDiv = document.querySelector('.parentDiv')
}
// 如果浏览器不支持 `querySelector`，那我们则使用 `getElementById`
else {
  parentDiv = document.getElementsByClassName('parentDiv')
}

// 把新的元素插到页面上
parentDiv.appendChild(newDiv)
```

这就导致了，在基于原生 HTML 开发应用时，需要编写许多 Javascript 代码调用诸多晦涩难懂 DOM 接口才能实现基本的动态交互效果，大部分时间都花在低级接口调用与兼容性调优上，这明显是一种非常低效的开发方式。

为解决这个问题，过去曾出现过一个当之无愧的王者：**jQuery**，它基于 DOM 接口封装出一套更简明易懂的链式调用接口体系，屏蔽了底层接口诸多繁琐细节，并在此基础做了许多浏览器兼容性处理，很大程度上解决了上述易用性与兼容性问题，甚至可以说，它革命性地降低了 Web 页面的复杂度，开发者可以将更多心智放在正确实现业务规则上 —— 而非适配多环境的接口逻辑，因此能在同等时间内构建出业务复杂度更高的应用，造就 Web 的第一次繁荣。

- 使用 jQuery 插入元素：

```
// 创建新的 div 元素并设置文本内容
var newDiv = $('', {
    text: '这是一个新的 div 元素！'
});

// 选择 .parentDiv
var parentDiv = $(".parentDiv");

// 把新的元素插到页面上
parentDiv.append(newDiv);
```

- 使用原生 DOM 接口：

```
// 创建新的 div 元素
var newDiv = document.createElement('div');
// 给 div 设置文本内容
newDiv.textContent = '这是一个新的 div 元素！';
var parentDiv;
// 如果浏览器支持 `querySelector`，我们优先使用
if(document.querySelector) {
  parentDiv = document.querySelector(".parentDiv");
}
// 如果浏览器不支持 `querySelector`，那我们则使用 `getElementById`
else {
  parentDiv = document.getElementsByClassName("parentDiv");
}

// 把新的元素插到页面上
parentDiv.appendChild(newDiv);
```

但 `jQuery` 整体定位更偏工具而非自上而下的结构化“框架”，只是提供了一系列适用性更强的接口而缺乏对 Web 应用生命周期关键部件的处理方案 —— 例如没有关于应用状态管理的权威解决方案，这就导致许多应用代码最终会组织的非常凌乱、“面条”化，甚至毫无架构可言，随项目迭代会愈加难以维护。

当下，`jQuery` 已成过去式(但不应被忘记)，**Vue**、**React** 等 MVVM 框架已经成为绝对的主流，它们不再满足于仅仅优化 DOM 接口的“命令式”调用规则，而是更进一步将“状态”自动映射为“UI”，对使用者而言，只需要定义好状态到 UI 的映射与交互规则，并管理好应用状态流转即可，具体的渲染、更新、事件动作、数据追踪都可交由框架层实现，开发规则从“命令式”跃迁为“声明式”，注意力也从“底层” DOM 操作迁移到框架规则与业务逻辑上，这是一种“质”的变化，算得上是 HTML 开发模式上的第二次革命。看个对比：

```
import React, { useState } from 'react';

const Hello = () => {
  const [name, setName] = useState('World');

  const changeName = () => {
    setName('React');
  };

  return (
    <div>
      <h1 onClick={changeName}>
        Hello, {name}!
      </h1>
    </div>
  );
};

export default Hello;
```

> name 属性的变化会被自动映射到界面上。

而使用 `jQuery` 实现相同功能时：

```
$(document).ready(function() {
  let name = "World";
  $('#hello').text('Hello, ' + name);

  $('#hello').click(function() {
    name = "React";
    $('#hello').text('Hello, ' + name);
  });

});
```

> 需要单独跟踪 name 的变化，调用 jQuery 接口更新到界面上，当状态增多时，这种处理会变得非常复杂。

虽然 MVVM 框架会带来新的学习成本，但它提供了一种行之有效的架构范式，并且现实已经无数次证明这种架构模式非常适合基于常规 HTML 构建的 Web 应用，多数情况下我们无需投入精力设计新的架构规则，只需遵循 MVVM 范式 —— 管理好数据以及数据到 UI 的映射关系，就足以构建出能容纳较高业务复杂度的应用代码。

不过，这些框架原生提供的 API 并没有脱离 Javascript 语法范畴，还是比较原始难用的，例如：

```js
var Hello = function Hello (props) {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Hello, ', props.name)
  )
}
var Hello = {
  render () {
    return _c('div', { on: { click: changeName } }, [
      _v('Hello, ' + _s(name) + '!')
    ])
  }
}
```

而这正是工程化擅长解决的问题，我们可以在这些底层 API 基础上叠加一层更易于理解与使用的语法，例如 JSX 之于 React，Vue SFC 之于 Vue，之后借助 Babel、ESBuild、SWC 等工具将其转换回原始的 Javascript 调用，以 JSX 为例：

- 源码：

```
var Hello = function Hello(props) {
  return (
    <div>
      <h1>Hello, {props.name}</h1>
    </div>
  );
};
```

- 编译后：

```
var Hello = function Hello(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Hello, ', props.name
    )
  );
};
```

## 4. 工具集成

上述章节提到了许多知名的工程化工具，包括 Typescript、ESLint、PostCSS 等，分开来看它们都非常优秀，能够解决某类特定问题 —— 但也都只能解决某类问题，因此现代前端工程中通常会组合多种工具，共同协作形成更立体更全面的解决方案，但这会引入另一个问题：**如何管理这些工具的配置、交互以及最终的执行效率**，这在过去并不是一件简单的事情。

首先，这些工具很独立，都有各自特化的应用配置规则且互不相通，工程上需要为它们分别提供若干合适的配置才能如预期执行，管理上比较碎片化。其次，这些工具虽独立但不完全孤立，从工程应用视角看是有其潜在因果或关联关系的，例如只有通过 ESLint 检测的代码才需要继续构建，或者需要先用 TS 编译成 JS 之后再继续用 Babel 补充 Polyfill，这种潜在关系决定了应用时不能只做简单堆叠而需要考虑兼顾好工具之间的前后交互需求。最后，也是最难的一点，工具越多则必然性能损耗越大！孤立来看每个工具可能都做了最优实现，但相似的动作可能会在不同工具之间重复执行，导致最终执行性能低下，例如 ESLint、Typescript、Babel 都需要将源码解析为 AST 结构，这是一种 CPU 密集型的操作，这在 Javascript 这种单线程运行时下执行效率是比较低的。

做个思维实验，设想在没有 Webpack、Vite 等集成工具的情况下，为实现上述工程特性，我们可能需要专门编写一段基于 NodeJS 的构建脚本，首先调用 ESLint 接口对代码做全量检测，确认无误后再调用 Typescript 接口将 TS 代码降级转换为 Javascript，之后再调用 Babel 降低代码语法版本补齐 Polyfill，之后调用文件系统接口将结果写到物理文件中，之后再将生成文件路径写入 HTML。这是一个非常繁琐、低效、难以复用的过程，当问题扩大到 CSS、HTML、性能、防劣化等领域时，构建脚本也会随之变得非常复杂难以维护。

为解决这些问题，历史上曾出现过许多值得称道的优秀工具，比较有代表性的一是 Grunt/Gulp 之类的任务流引擎，其次是 Webpack/Vite 之类集成构建框架。

任务流引擎的解题思路是“**可编程性**”，以 Gulp 为例，它抽象定义了一套支持并行、串行的任务执行框架以及一系列较易用的文件接口，启动后按照用户提供的配置规则按序逐次执行各项任务，前一个任务的输出作为下一个任务的输入逐层传递，形成流式执行效果。例如：

```js
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const gulp = require('gulp')

gulp.task('compress', function () {
  gulp
    .src('src/*.js') // 匹配需要压缩的 JavaScript 文件
    .pipe(uglify()) // 压缩 JavaScript
    .pipe(rename({ suffix: '.min' })) // 重命名文件，添加 ".min" 后缀
    .pipe(gulp.dest('dist')) // 输出结果到 "dist" 文件夹
})
```

示例中的 `compress` 任务首先调用 `gulp.src` 读入 `src/*.js` 文件，之后调用 `gulp-uglify` 进行压缩，之后调用 `gulp-rename` 重命名文件并调用 `gulp.dest` 将结果输出到 `dist` 目录。这是一个非常经典的例子，由此可窥见 Gulp 框架本身只是提供了一些工具性质的任务流与文件输入输出接口，以此简化构建工作的流程控制，但并不直接参与处理文件内容，用户可在任务(本质上就是 JS 函数)中通过编程方式接入诸多工程化工具 —— 包括 ESLint、Typescript、Babel 等，实现集成效果。

这种模式优点在于灵活性极高，且简单直观因此学习成本极低；缺点也不少，一是任务之间依然存在较多重复处理的情况，可能出现性能问题，二是不同资源的处理规则完全由用户负责，框架没有提供相似的心智模型，致使复杂场景下应对乏力，三是任务之间相对孤立，串联能力较差，某些场景的处理规则会变得很复杂，例如对 Javascript 文件重命名后难以把正确的名字插入 HTML 模板中。

而 Webpack 这类集成框架的解题思路则是**可扩展性**，简言之，它们针对 Web 不同类型资源的构建需求定义了一套通用执行框架，框架会对项目资源执行读入、解析、递归识别依赖、编译构建、打包输出等标准处理动作，并在此基础上暴露一系列基于事件流的高度可扩展 API 方便用户实现对不同类型资源的特化处理。以 Webpack 为例：

```
module.exports = {
  entry: './src/index.js',  // 入口文件
  module: {
    rules: [
      {
        test: /\.js$/,   // 匹配 JS 文件
        exclude: /node_modules/,   // 排除 node_modules 目录
        use: {
          loader: 'babel-loader',  // 使用 babel-loader
          options: {
            presets: ['@babel/preset-env']  // 转码规则预设
          }
        }
      },
      {
        test: /\.ts$/,  //匹配 TS 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: 'ts-loader',  // 使用 ts-loader
      },
      {
        enforce: 'pre',  // ESLint 优先处理
        test: /\.js$/, // 匹配 JS 文件
        exclude: /node_modules/,  // 排除 node_modules 目录
        loader: 'eslint-loader',// 使用 eslint-loader
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],  // 自动解析确定的扩展
  },
  output: {
    filename: 'bundle.js',  // 出口文件名
    path: path.resolve(__dirname, 'dist'),  // 出口文件路径
  },
};
```

上述示例通过 `loader` 方式接入 Babel、ESLint、Typescript 工具，以此定义针对 `ts/tsx/js` 文件的特化处理逻辑，Webpack 框架会完成剩余工具，将源码最终打包为产物形态。

Webpack 这类集成构建框架与 Gulp 这类任务流引擎所定义的职责范围是完全不一样的，如果说任务流引擎提供了一套更易用的流程接口，那么集成框架则深入理解资源的内容属性，接替开发者完成资源发现、编译打包、拆包优化等工作，同时在生命流程中暴露出足够多的生命周期钩子以支持三方扩展，事实证明这种方式更利于集成其他工程化工具，例如可以在上一个处理环节结束后，将 AST 信息传递到下一个环节，而不需要重新解析生成 AST，以此提升整体效率；其次，工具内部标准化的数据结构也更易于三方工具之间的交互，例如可以轻易地将 CSS 插入 Javascript 中，也可以将最终构建出的文件路径写入 HTML 中。

无论是 Webpack 还是 Gulp，使用这类集成工具后一个非常显著的收益在于：**工程的管理思维从碎片化离散处理递进为更体系的集成管理模式**，我们无需再分开为诸多工程化工具单独提供配置，而是可以收敛套用到有限的心智模型之中，这可以大大降低工程管理的复杂度；其次，可以**复用集成工具提供的流程框架能力以及诸多优秀的社区扩展**，而无需直接面对基础工具接口重复设计执行流程与集成规则；最后，虽然叠加集成工具会带来新的性能损耗，但也更容易**在工具之间复用资源中间状态减少重复计算从而达到整体性能更优的效果**。总之，借助集成工具可将诸多基础工具收敛同一个管理模型中，更容易搭建体系化的工程化环境，这已经是前端社区广泛采用的实践模式之一。

## 5. 总结

自 09 年 Nodejs 横空出世以来，经过十几年的发展，前端的能力边界已经发生翻天覆地的变化，已经不是简单的切图、组装页面的角色，表现力上从过往规格化的浏览器页面到如今具备丰富的可视化功能、3D 渲染、AR、VR 等；执行平台也从单纯的浏览器跃迁至如今的小程序、Hybrid APP、桌面应用、VR 设备、PWA、物联网终端等形态。但即便如此，当下的 Web 核心语言 —— JS、CSS、HTML 依然在不同方面存在不同类型的问题。

本文主要讲解 JS/CSS/HTML 三类语言目前存在的缺陷与相关应对方案，重点不在于具体工具的使用方法 —— 这个我会在后续章节中补齐，而在于理解为什么需要使用这些工具，有了这些基础认知在后续学习中才能更好地有的放矢。

下一篇文章我会继续讲解如何提升开发效率，感兴趣的同学可关注我的个人公众号，持续围观。

![](assets/2024-07-09-12-56-00.png)
