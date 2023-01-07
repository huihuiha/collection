const vnode = {
  tag: 'div',
  props: {
    onClick: () => {
      alert('hellop');
    },
  },
  children: [
    {
      tag: 'div',
      props: {
        class: 'test1',
      },
      children: '1',
    },
    {
      tag: 'div',
      props: {
        id: 'test2',
      },
      children: '2',
    },
  ],
};

function renderer(vnode, container) {
  const { tag, props, children } = vnode;

  // 1.创建node
  const el = document.createElement(tag);
  // 2.设置el的属性
  for (const key in props) {
    // 2.1 事件处理
    if (key.indexOf('on') > -1) {
      el.addEventListener(key.substring(2).toLowerCase(), props[key]);
    } else {
      // 2.2 设置其他属性
      el.setAttribute(key, props[key]);
    }
  }

  // 3. 处理子元素
  if (Array.isArray(children)) {
    // 3.1 数组的情况
    children.forEach((child) => renderer(child, el));
  } else {
    // 3.2 字符串情况
    el.textContent = children;
  }

  // 4.挂载
  container.appendChild(el);
}

const app = document.querySelector('#app');
renderer(vnode, app);
