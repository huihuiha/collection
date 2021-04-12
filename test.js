(function(window) {
  // 获取当前滚动条的位置
  function getScrollTop() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
          scrollTop = document.body.scrollTop;
      }
      return scrollTop;
  }

  // 获取当前可视范围的高度
  function getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      }
      else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
  }

  // 获取文档完整的高度
  function getScrollHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }

  var _text = document.querySelector('.refreshText'),
    _container = document.getElementById('refreshContainer');

  // 节流函数
  var throttle = function(method, context){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
      method.call(context);
    }, 300);
  }

  function fetchData() {
      setTimeout(function() {
          _container.insertAdjacentHTML('beforeend', '<li>new add...</li>');
      }, 1000);
  }

  window.onscroll = function() {
    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
        _text.innerText = '加载中...';
        throttle(fetchData);
    }
  };

})(window);