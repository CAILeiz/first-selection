export function getFirstSelection(window) {
  const res = {};
  try {
    if (window.getSelection() && window.getSelection().getRangeAt(0)) {
      const range = window.getSelection().getRangeAt(0);
      // console.log(window.getSelection().getRangeAt(0));
      const {
        startOffset,
        endOffset,
        startContainer,
        endContainer,
        collapsed,
        commonAncestorContainer,
      } = range;
      res.collapsed = collapsed;
      let str;
      if (endContainer === startContainer) {
        str = startContainer.textContent.slice(startOffset, endOffset);
      } else {
        const startTextParentEl = startContainer.parentElement.parentElement;
        if (startTextParentEl) {
          let lastDoms = Array.from(startTextParentEl.children);
          const startIdx = lastDoms.findIndex(
            (item) => item === startContainer.parentElement
          );
          let endIndex;
          if (startTextParentEl === commonAncestorContainer) {
            endIndex = lastDoms.findIndex(
              (item) => item === endContainer.parentElement
            );
            lastDoms = lastDoms.slice(startIdx, endIndex + 1);
          } else {
            lastDoms = lastDoms.slice(startIdx);
          }
          console.log(endIndex);

          str = lastDoms
            .reduce((text, dom, curIdx) => {
              const curText =
                endIndex && curIdx === lastDoms.length - 1
                  ? dom.textContent.slice(0, endOffset)
                  : dom.textContent;
              return text + curText;
            }, "")
            .slice(startOffset);
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
      res.error =
        "暂时不支持 window.getSelection() && window.getSelection().getRangeAt(0)";
    }
  } catch (error) {
    res.success = false;
    res.error = error;
  }
  return res;
}
