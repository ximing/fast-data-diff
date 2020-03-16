### 使用

```javascript
import { diff } from 'fast-data-diff';
this.setData(diff(newobj, oldobj));
```

### diff 算法设计思路

-   深度优先遍历
-   只对同层节点进行对比
-   使用数据路径方式实现局部更新
-   尽可能减少不必要的 diff 对比

### TODO

-   [ ] 支持 immer 快速更改 data
-   [ ] 支持 observer 流形式监听
