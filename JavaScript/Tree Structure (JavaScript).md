# Tree Structure (JavaScript)

## Looping
```js
/**
 * For tree looping.
 * @param root tree object
 * @param listProp property name of subtree
 * @param iterator callback with item
 */
const loop = (function recursion(root, listProp, iterator) {
    if (root[listProp] && root[listProp].length > 0) {
        root[listProp].forEach(i => recursion(i, listProp, iterator));
    }
    if (typeof iterator === 'function') iterator(root);
});
```
- usage:
```js
menuList.forEach(i => {
    TreeUtil.loop(i, 'subList', m => m.id = '' + m.id);
});
```

## Transform List to Tree
```js
/**
 * Transform list to tree structure.
 * @param raw list object
 * @param listProp property name of subtree
 * @param id property name of id
 * @param pid property name of parent id
 * @param sort function of sorting, set null or false if unsort
 * @returns tree structure of data
 */
const listToTree = (raw, listProp, id, pid, sort) => {
    let tree = [];
    raw.forEach(item => {
        let isParent = true;
        for (let i = 0; i < raw.length; i++) {
            if (raw[i][id] === item[pid]) {
                isParent = false;
                if (!raw[i][listProp]) raw[i][listProp] = [];
                raw[i][listProp].push(item);
                break;
            }
        }
        if (isParent) tree.push(item);
    });

    if (sort) {
        tree.sort(sort);
        tree.forEach(root => {
            loop(root, listProp, i => {
                if (i[listProp]) i[listProp].sort(sort);
            });
        });
    }

    return tree;
};
```
- usage:
```js
menuList = TreeUtil.listToTree(menuList, 'subList', 'id', 'parentId', (lhs, rhs) => lhs.order - rhs.order);
```

