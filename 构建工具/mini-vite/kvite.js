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
    ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8');
  } else if (url.endsWith('.js')) {
    // js文件加载处理
    const p = path.join(__dirname, url);
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'));
  } else if (url.startsWith('/@modules/')) {
    // 裸模块名称
    const moduleName = url.replace('/@modules/', '');
    // 去node_modules目录中去找
    const prefix = path.join(__dirname, './node_modules', moduleName);
    // package.json文件获取module字段
    const module = require(prefix + '/package.json').module;
    const filePath = path.join(prefix, module);
    const ret = fs.readFileSync(filePath, 'utf8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(ret);
  } else if (url.indexOf('.vue') > -1) {
    // 获取加载的路径
    const p = path.join(__dirname, url.split('?')[0]);
    const ast = compilerSFC.parse(fs.readFileSync(p, 'utf8'));
    if (!query.type) {
      // SFC 请求
      // 读取 vue文件，解析成js
      // 获取脚本部分nei'rong
      const scriptContent = ast.descriptor.script.content;
      // 替换默认导出为一个常量，方便后续修改
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
      // 解析模板
      const tpl = ast.descriptor.template.content;
      // 编译模板成render函数
      const render = compilerDOM.compile(tpl, { mode: 'module' }).code;
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(render);
    }
  }
});

// 裸模块地址重写
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
