"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstSelection = getFirstSelection;
function getFirstSelection(window) {
  var res = {};
  try {
    if (window.getSelection() && window.getSelection().getRangeAt(0)) {
      var range = window.getSelection().getRangeAt(0);
      // console.log(window.getSelection().getRangeAt(0));
      var startOffset = range.startOffset,
          endOffset = range.endOffset,
          startContainer = range.startContainer,
          endContainer = range.endContainer,
          collapsed = range.collapsed,
          commonAncestorContainer = range.commonAncestorContainer;

      res.collapsed = collapsed;
      var str = void 0;
      if (endContainer === startContainer) {
        str = startContainer.textContent.slice(startOffset, endOffset);
      } else {
        var startTextParentEl = startContainer.parentElement.parentElement;
        if (startTextParentEl) {
          var lastDoms = Array.from(startTextParentEl.children);
          var startIdx = lastDoms.findIndex(function (item) {
            return item === startContainer.parentElement;
          });
          var endIndex = void 0;
          if (startTextParentEl === commonAncestorContainer) {
            endIndex = lastDoms.findIndex(function (item) {
              return item === endContainer.parentElement;
            });
            lastDoms = lastDoms.slice(startIdx, endIndex + 1);
          } else {
            lastDoms = lastDoms.slice(startIdx);
          }
          console.log(endIndex);

          str = lastDoms.reduce(function (text, dom, curIdx) {
            var curText = endIndex && curIdx === lastDoms.length - 1 ? dom.textContent.slice(0, endOffset) : dom.textContent;
            return text + curText;
          }, "").slice(startOffset);
        } else {
          throw "处理父子节点失败";
        }
      }
      // console.log("当前第一个容器已选文本", str);
      res.success = true;
      res.firstSelectionText = str.trim();
      res.range = range;
    } else {
      res.success = false;
      res.error = "暂时不支持 window.getSelection() && window.getSelection().getRangeAt(0)";
    }
  } catch (error) {
    res.success = false;
    res.error = error;
  }
  return res;
}