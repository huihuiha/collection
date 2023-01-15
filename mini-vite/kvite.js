const Koa = require('Koa');
const fs = require('fs');
const path = require('path');
const compilerSFC = require('@vue/compiler-sfc');
const compilerDOM = require('@vue/compiler-dom');
const app = new Koa();

app.use(async (ctx) => {
  const { url, query } = ctx.request;
  // 首页请求
  if (url === '/') {
    ctx.type = 'text/html';
    let content = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8');
    content = content.replace(
      '<script',
      `
      <script>
        window.process = { env: { NODE_ENV: 'development' } };
      </script>
      <script
      `
    );
    ctx.body = content;
  } else if (url.endsWith('.js')) {
    // js文件加载处理
    const p = path.join(__dirname, url);
    ctx.type = 'application/javascript';
    // 重写第三方模块的引入
    let content = fs.readFileSync(p, 'utf8');
    ctx.body = rewriteImport(content);
  } else if (url.startsWith('/@modules/')) {
    // 第三方库的支持 /@modules/ => node_modules 的 es 模块入口
    // 裸模块名称
    const moduleName = url.replace('/@modules/', '');
    // 去node_modules目录中去找
    const prefix = path.join(__dirname, './node_modules', moduleName);
    // package.json文件获取module字段
    const module = require(prefix + '/package.json').module;
    const filePath = path.join(prefix, module);
    const ret = fs.readFileSync(filePath, 'utf8');
    ctx.type = 'application/javascript';
    // 重写第三方模块的引入
    ctx.body = rewriteImport(ret);
  } else if (url.indexOf('.vue') > -1) {
    // SFC 文件的支持
    // *vue文件 => template模板 => render
    /**
     * 具体措施
     * 1. vue文件 => template script (compiler-sfc)
     * 2. template => render函数 (compiler-dom)
     */
    // 获取加载的路径
    const p = path.join(__dirname, url.split('?')[0]);
    // 编译
    const ast = compilerSFC.parse(fs.readFileSync(p, 'utf8'));
    if (!query.type) {
      // SFC 请求
      // 读取 vue文件，编译成js
      // 获取脚本部分内容（script + template 生成的 render 函数）
      const scriptContent = ast.descriptor.script.content;
      // 替换默认导出为一个常量，方便后续修改

      /**
       * 此处相当于将组件的 export default {} 内容 变成 const __script = {}
       */
      const script = scriptContent.replace(
        'export default',
        'const __script = '
      );
      ctx.type = 'application/javascript';
      ctx.body = `
        ${rewriteImport(script)}
        // 解析tpl
        import { render as __render} from '${url}?type=template';
        __script.render = __render;
        export default __script;
    `;
    } else if (query.type === 'template') {
      // 解析模板（将template的内容生成render函数）
      const template = ast.descriptor.template.content;
      // 编译模板成render函数
      /**
       * 例如 export default render() {}
       */
      const render = compilerDOM.compile(template, { mode: 'module' }).code;

      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(render);
    }
  } else if (url.endsWith('.css')) {
    // 解析css文件 css 转化成 js
    const p = path.join(__dirname, url);
    const file = fs.readFileSync(p, 'utf8');

    // 利用 js 添加一个 style 标签
    const content = `
      const css = "${file.replace(/\n/g, '')}";
      let link = document.createElement('style');
      link.setAttribute('type', 'text/css');
      document.head.appendChild(link);
      link.innerHTML = css;
      export default css;
    `;

    ctx.type = 'application/javascript';
    ctx.body = content;
  }
});

// 裸模块地址重写（浏览器只支持 . ./ ../ 的路径引入)
function rewriteImport(content) {
  return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
    if (s2.startsWith('./') || s2.startsWith('/') || s2.startsWith('../')) {
      return s1;
    } else {
      // 裸模块
      return ` from '/@modules/${s2}'`;
    }
  });
}

app.listen(3000, () => {
  console.log(`server start in 3000`);
});
