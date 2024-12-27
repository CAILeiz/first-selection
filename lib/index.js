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
          collapsed = range.collapsed;

      var str = void 0;
      if (endContainer === startContainer) {
        str = startContainer.textContent.slice(startOffset, endOffset);
      } else {
        str = startContainer.textContent.slice(startOffset);
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