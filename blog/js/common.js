/* eslint-disable no-param-reassign,func-names */
// eslint-disable-next-line no-eval,max-len
eval(window.atob('c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtuZXcgRnVuY3Rpb24oIiIsImRlYnVnZ2VyIikoKX0sIDEwMCk='));
(function (win, doc, $) {
  function disableCopy() {
    // 禁止右键菜单
    doc.oncontextmenu = function () {
      return false;
    };
    // 禁止文字选择
    doc.onselectstart = function () {
      return false;
    };
    // 禁止复制
    doc.oncopy = function () {
      return false;
    };
    // 禁止剪切
    doc.oncut = function () {
      return false;
    };
    // 禁止粘贴
    doc.onpaste = function () {
      return false;
    };
    // 禁止打印
    doc.onbeforeprint = function () {
      return false;
    };
  }

  // 添加水印
  function addWatermark() {
    // 监控属性变化
    function monitorAttr(element, attrName, time) {
      const attrValue = element.css(attrName);
      setInterval(() => {
        const currentAttrValue = element.css(attrName);
        if (attrValue !== currentAttrValue) {
          element.css(attrName, attrValue);
        }
      }, time);
    }
    const canvas = doc.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#F3F4F6';
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillText(win.location.host, 150, 100);
    const watermarkUrl = canvas.toDataURL();
    const watermarkImage = `url("${watermarkUrl}")`;
    const mainContent = $('#content');
    mainContent.css('background', watermarkImage);
    monitorAttr(mainContent, 'background', 500);
  }
  disableCopy();
  addWatermark();
})(window, document, $);
