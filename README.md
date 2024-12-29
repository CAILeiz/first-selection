# first-selection

用途：获取操作第一个节点的划线内容或者第一个节点父级的划线内容

## Installation

```
npm install first-selection
```

## Usage

`const res = getFirstSelection(window)`

### 返回值

```ts
const res = {
  success: boolean, // 是否成功获取到划线内容
  firstSelectionText: string, // 划线内容
  collapsed: boolean, // 是否有选中内容
  range: Range, // Range对象
  error: string | object, // 错误信息
};
```

#### Example:

```javascript
import { getFirstSelection } from "first-selection";

function handleWindowSelection(event) {
  // event: 鼠标 event
  setTimeout(() => {
    const { collapsed, success, firstSelectionText, range } = selection;
    if (!collapsed && success) {
      console.log("当前划词内容：", firstSelectionText);
    } else {
      if (error) console.log("错误信息", error);
      else console.log("没有划词内容");
    }
  });
}
```
