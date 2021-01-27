(function (win, doc, $) {
    function disableCopy() {
        // 禁止右键菜单
        doc.oncontextmenu = function () { return false; };
        // 禁止文字选择
        doc.onselectstart = function () { return false; };
        // 禁止复制
        doc.oncopy = function () { return false; };
        // 禁止剪切
        doc.oncut = function () { return false; };
        // 禁止粘贴
        doc.onpaste = function () { return false; };
        // 禁止打印
        doc.onbeforeprint = function() { return false; };
    }
    // 添加水印
    function addWatermark() {
        var canvas = doc.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#F3F4F6';
        ctx.rotate(-20 * Math.PI / 180);
        ctx.fillText(win.location.host, 150, 100);
        var watermarkUrl = canvas.toDataURL();
        var watermarkImage = 'url("' + watermarkUrl + '")';
        var mainContent = $('#content');
        mainContent.css("background", watermarkImage),
        monitorAttr(mainContent, "background", 500);
    }
    // 监控属性变化
    function monitorAttr(element, attrName, time) {
        var attrValue = element.css(attrName);
        setInterval(function () {
            var currentAttrValue = element.css(attrName);
            if (attrValue != currentAttrValue) {
                element.css(attrName, attrValue);
            }
        }, time);
    }

    disableCopy();
    addWatermark();
})(window, document, jQuery);